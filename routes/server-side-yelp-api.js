var yelpApi = require("../helper/yelpAPIcall");
var db = require("../models");

// call to the database to receive the names of the food trucks stored
function populateArray(){
   let truckNamesFromDatabase = [];
    db.FoodTruck.findAll({
    attributes: ["name"]
}).then(function (results) {
    for (var g = 0; g < results.length; g++) {
        truckNamesFromDatabase.push(results[g].dataValues.name);
    }
}).then(function(){runApiArray(truckNamesFromDatabase)})}

// setInterval to make API call to yelp once per day, updating the info for each food truck

var yelpApiTimer = setInterval(function () {
    populateArray();
}, 30 * 1000); // run yelp API every 12 hours  insert  ( 12 * 60 * 60 * 1000 )

// server-side API call to yelp
function runApiArray(truckArray) {
<<<<<<< HEAD
=======

>>>>>>> 751103de9941a9dce923e62c5203014956f2ae67
    for (let i = 0; i < truckArray.length; i++) {
        yelpApi(truckArray[i]).then(function (response) {
            // console.log(response);
            // console.log("truckArray[i]",truckArray[i])
            let FoodTruckId;
            let Response = response;
            db.FoodTruck.findAll({ where: { name: truckArray[i] } }).then(function (dbFoodTruck) {
                FoodTruckId = dbFoodTruck[0].id
                var dbAddressField = dbFoodTruck[0].addressUpdated;
                db.YelpReview.destroy({
                    where: {
                        FoodTruckId: FoodTruckId
                    }
                }).then(function (dbFoodTruck) {
                    for (let b = 0; b < Response.reviewText.length; b++) {
                        db.YelpReview.create({
                            rating: Response.reviewRating[b],
                            username: Response.reviewAuthor[b],
                            content: Response.reviewText[b],
                            contentTimeCreated: Response.reviewTime[b],
                            contentUrl: Response.reviewUrl[b],
                            userImage: Response.reviewImage[b],
                            FoodTruckId: FoodTruckId
                        })
                    }
                    if (dbAddressField === null) {
                        console.log('dbAdressField is NULL will update address to default')
                        db.FoodTruck.update({
                            address: Response.address,
                            phone: Response.phone,
                            overallRating: Response.rating,
                            image: Response.image_url,
                            priceRating: Response.price
                        },
                            {
                                where: {
                                    id: FoodTruckId
                                }
                            })
                            console.log(Response.address,Response.phone, FoodTruckId)
                    } else {
                        console.log('dbAdressField has content will not update address to default')
                        db.FoodTruck.update({
                            phone: Response.phone,
                            overallRating: Response.rating,
                            image: Response.image_url,
                            priceRating: Response.price,
                        }, {
                                where: {
                                    id: FoodTruckId
                                }
                            })
                    }

                }).then(function (result) {
                    // console.log("saved to database");
                    // console.log(result);
                });
            });
        })
    }
}
