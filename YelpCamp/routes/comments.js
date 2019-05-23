// ============================
// COMMENTS ROUTES
// ============================
// ============================
// Basic setup - inicial
// ============================
var express = require("express");
var router = express.Router({mergeParams: true}); // {mergeParams: true} for req.params.id to work
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// ============================
// ROUTES
// ============================

// Comments NEW
router.get("/new", isLoggedIn, (req, res) =>{
    //console.log(req.params.id);
    Campground.findById(req.params.id, (err, campground) =>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground})
        }
    })
});

// Comments CREATE
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, newComment) =>{
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    //console.log(req.user.username);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save newComment
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    //console.log(newComment);
                    res.redirect("/campground s/" + foundCampground._id);
                }
            });
        }
    });
});

//function checking is user logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

// ============================
// Basic setup - export
// ============================
module.exports = router;

