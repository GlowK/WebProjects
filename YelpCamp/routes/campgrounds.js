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
router.post("/", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,image: image, description: desc, author:author};
    //campgrounds.push(newCampground);
    //console.log(req.user)
    Campground.create(newCampground, (err, newlyCreatedCampground) =>{
        if(err){
            console.log(err);
        }else{
            // Redirect to Campgrounds
            // console.log(newlyCreatedCampground)
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", (req, res) =>{
    //find and update the correct campground
    // var data = {
    //     name: req.body.name,
    //     image: req.body.image,
    //     description: req.body.description
    // };
    Campground.findByIdAndUpdate(req.params.id, req.body.campground , (err, updatedCampground) =>{
        if(err){
            res.redirect("/campgrounds")
        }else{
            //redirect to the just edited page
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY CAMPGROUND ROUTE
// router.delete("/:id", (req, res) =>{

// });

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


