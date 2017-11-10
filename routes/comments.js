var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  };
};

router.get("/new",isLoggedIn , function(req, res){
  console.log(req.isAuthenticated);
  Campground.findById(req.params.id, function(err, campground) {
    if (err){
      console.log(err);
    } else {
        res.render("comments/new" , {campground : campground});
    };
  });
});

router.post("/",isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      var text = req.body.text;
      var author = req.body.author;
      var newComment = {text, author}
      Comment.create(newComment, function(err, comment) {
        if (err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  });
});

module.exports = router;