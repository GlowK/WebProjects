var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) =>{
            if(err){
                res.redirect("back");
            }else{
                //does user own this campground?
                //Sprawdzamy czy autor jest taki sam jak zalogowany user
                if(foundCampground.author.id.equals(req.user._id)){
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
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

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

// ============================
// Basic setup - export
// ============================
module.exports = middlewareObj;