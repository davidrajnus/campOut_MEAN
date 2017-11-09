var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Campground = mongoose.model('Campground');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

router.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs")
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

// req.params.locationid

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

module.exports = router;
