var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/campgrounds', function(req,res) {
  var campgrounds =[
    {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Pulau Ketam", image: "http://photosforclass.com/download/15989950903"},
    {name: "Bahahulu", image: "http://photosforclass.com/download/14435096036"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
})

module.exports = router;
