var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require("../models").Itinerary;

router.get("/api/itineraries/:itinerary_id", (req,res,next) => {
  Itinerary.findAll({ include: [{ all: true }], where:{id: req.params.itinerary_id}}).then(function(itinerary){
    console.log(itinerary)
    res.json(itinerary) 
  })
})

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});


module.exports = router;
