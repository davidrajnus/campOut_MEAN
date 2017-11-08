var express = require('express');
var app = express();
var router = express.Router();

var campgrounds =[
  {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
  {name: "Pulau Ketam", image: "http://photosforclass.com/download/15989950903"},
  {name: "Bahahulu", image: "http://photosforclass.com/download/14435096036"},
  {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
  {name: "Pulau Ketam", image: "http://photosforclass.com/download/15989950903"},
  {name: "Bahahulu", image: "http://photosforclass.com/download/14435096036"},
  {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
  {name: "Pulau Ketam", image: "http://photosforclass.com/download/15989950903"},
  {name: "Bahahulu", image: "http://photosforclass.com/download/14435096036"}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/campgrounds', function(req,res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

router.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image : image};
  campgrounds.push(newCampground)

  res.redirect("/campgrounds");
});

router.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs")
});

module.exports = router;
