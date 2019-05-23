// ============================
// CAMPGROUNDS ROUTES
// ============================
// ============================
// Basic setup - inicial
// ============================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// ============================
// ROUTES
// ============================

// INDEX - show all campegrounds
router.get("/", (req, res) =>{
    // Get compgrounds from DB
    // console.log(req.user); 
    Campground.find({}, (err, allCampgrounds) =>{
        if(err){
            console.log(err);
        }else{
            // Render the campgrounds
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    }); 
});

// CREATE - add new campground to db
router.post("/", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name,image: image, description: desc};
    //campgrounds.push(newCampground);
    Campground.create(newCampground, (err, newlyCreatedCampground) =>{
        if(err){
            console.log(err);
        }else{
            // Redirect to Campgrounds
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new")
});

// SHOW - more information about the campground
router.get("/:id", (req,res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) =>{
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    } )
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


