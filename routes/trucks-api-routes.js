var db = require("../models");

module.exports = app => {
  app.get("/api/trucks", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.YelpReview
    db.FoodTruck.findAll({
      include: [db.YelpReview]
    }).then(dbFoodTruck => {
      res.json(dbFoodTruck);
    });
  });

  app.get("/api/trucks/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.YelpReview
    db.FoodTruck.findOne({
      where: {
        id: req.params.id
      },
      include: [db.YelpReview]
    }).then(dbFoodTruck => {
      res.json(dbFoodTruck);
    });
  });

  app.post("/api/trucks", (req, res) => {
    db.FoodTruck.create(req.body)
    .then(dbFoodTruck => {
      // res.json(dbFoodTruck);
    });
  });

  app.put("/api/trucks/twitter", (req, res) => {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.FoodTruck.update(
      {
        address: req.body.location,
        addressUpdated: req.body.created_at
      },
      {
        where: {
          twiterId: req.body.screen_name
        }
      }
    ).then(dbFoodTruck => {
      res.json(dbFoodTruck);
    });
  });

  app.put("/api/trucks/yelp", (req, res) => {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.FoodTruck.update(
      {
        address: req.body.location,
        addressUpdated: req.body.created_at
      },
      {
        where: {
          twiterId: req.body.screen_name
        }
      }
    ).then(dbFoodTruck => {
      res.json(dbFoodTruck);
    });
  });

  app.delete("/api/trucks/:id", (req, res) => {
    db.FoodTruck.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbFoodTruck => {
      res.json(dbFoodTruck);
    });
  });
};
