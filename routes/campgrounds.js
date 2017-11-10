var express = require('express');
var router = express.Router();
var Campground = require("../models/campground")

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  };
};

router.get('/campgrounds', function(req,res) {
  // res.render("campgrounds", {campgrounds: campgrounds});
  Campground.find({}, function(err, allCampgrounds) {
    if (err){
      console.log(err);
    } else {
      res.render("index", {campgrounds:allCampgrounds});
    }
  });
});

//Create new campgrounds
router.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs")
});

router.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image : image, description : description};
  
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//SHOW
router.get("/campgrounds/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
      console.log(foundCampground);
    } else {
      console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  });
});



module.exports = router;