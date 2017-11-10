var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Pulau Tekong",
    image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description: "Nice beautiful Island for all!"
  },
  {
    name: "Mandrake Hill",
    image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
    description: "Nice beautiful Island for all!"
  },
  {
    name: "Mountain of Doom",
    image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
    description: "Nice beautiful Island for all!"
  },
  {
    name: "Zombieland",
    image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
    description: "Nice beautiful Island for all!"
  },
];

function seedDB() {
  //remove all campground
  // Campground.remove({}, function(err) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //   console.log("removed campgrounds");
    //add a few campgrounds
    // data.forEach(function(seed) {
    //   Campground.create(seed, function(err,campground) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log("added campground");
    //       Comment.create(
    //         {
    //           text: "This place is great",
    //           author: "Ronald McDonald"
    //         }, function(err, comment) {
    //             if (err){
    //               console.log(err)
    //             } else {
    //               campground.comments.push(comment);
    //               campground.save();
    //               console.log("Created new comment")
    //             };
    //         });
    //     };
    //   });
  //   };
  // });
}

module.exports = seedDB;