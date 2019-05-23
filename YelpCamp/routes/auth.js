// ============================
// AUTH ROUTES
// ============================
// ============================
// Basic setup - inicial
// ============================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// ============================
// ROUTES
// ============================

// ROOT ROUTE
router.get("/", (req, res) =>{
    res.render("landing");
    //res.send("This will be a landing  page soon")
})

//AUTH ROUTES - more information about the campground
router.get("/register", (req, res) => {
    res.render("register");
});

//handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,  (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req, res, () =>{
                res.redirect("/campgrounds")
            });
        }
    });
});

//LOGIN ROUTE
router.get("/login", (req, res) => {
    res.render("login");
});

//handlign login logic
//app.post("/page", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
        (req, res) => {
    
});

//LOGOUT ROUTE
router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/campgrounds");
})

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