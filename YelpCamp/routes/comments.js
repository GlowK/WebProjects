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
var middleware = require("../middleware");
// ============================
// ROUTES
// ============================

// Comments NEW
router.get("/new", middleware.isLoggedIn, (req, res) =>{
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
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, newComment) =>{
                if(err){
                    req.flash("error", "Something went wrong");
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
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// EDIT ROUT FOR COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
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
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY ROUTE FOR COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// ============================
// Basic setup - export
// ============================
module.exports = router;

