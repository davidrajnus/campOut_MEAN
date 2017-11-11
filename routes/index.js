var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Campground = mongoose.model('Campground');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/campgrounds");
});

//=======================
// AUTHENTICATION ROUTE
//=======================
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.redirect("register");
    } else {
      passport.authenticate("local")(req, res, function (){
        req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
        res.redirect("/campgrounds");
      });
    }
  });
});

//=======================
// LOGIN
//=======================

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: 'Welcome to YelpCamp!'
    }), function(req, res) {
});

//=======================
// LOG OUT
//=======================
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/campgrounds");
});

module.exports = router;
