var express = require('express');
var router = express.Router();
var Campground = require("../models/campground")

router.get('/', function(req,res) {
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
router.get("/new", isLoggedIn, function (req, res) {
  res.render("new.ejs")
});

router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user.id,
    username: req.user.username
  };
  var newCampground = {name: name, image : image, description : description, author:author};
  
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//SHOW
router.get("/:id", function (req, res) {
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

//middleware
function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  };
};


module.exports = router;