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
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// EDIT ROUT FOR COMMENT
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect("back");
        }else{
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err){
                    res.redirect("back");
                }else{
                    res.render("comments/edit", {campground: foundCampground, comment: foundComment});
                }
            })   
        }
    });
});

//UPDATE ROUTE FOR COMMENT
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY ROUTE FOR COMMENT
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//function checking is user logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

function checkCommentOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if(err){
                res.redirect("back");
            }else{
                //does user own this campground?
                //Sprawdzamy czy autor jest taki sam jak zalogowany user
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back")
                }
            }
        });
    }else{
        res.redirect("back");
    } 
}

// ============================
// Basic setup - export
// ============================
module.exports = router;

