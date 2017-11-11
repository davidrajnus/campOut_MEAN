var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var { isLoggedIn, checkUserComment, isAdmin } = middleware;

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
          req.flash('success', 'Created a comment!');
          res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  });
});


//EDIT Comment
router.get("/:commentId/edit", isLoggedIn, checkUserComment, function(req, res){
  res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});

//UPDATE Comment
router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, function(err, comment){
       if(err){
          console.log(err);
           res.render("edit");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

//DELETE Comment
router.delete("/:commentId", function(req, res){
  // find campground, remove comment from comments array, delete comment in db
  Campground.findByIdAndUpdate(req.params.id, {
    $pull: {
      comments: req.comment.id
    }
  }, function(err) {
    if(err){ 
        console.log(err)
        req.flash('error', err.message);
        res.redirect('/');
    } else {
        req.comment.remove(function(err) {
          if(err) {
            req.flash('error', err.message);
            return res.redirect('/');
          }
          req.flash('error', 'Comment deleted!');
          res.redirect("/campgrounds/" + req.params.id);
        });
    }
  });
});

module.exports = router;