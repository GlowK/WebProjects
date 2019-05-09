const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");



mongoose.connect("mongodb://localhost:27017/AuthDemo",{useNewUrlParser: true});

var app = express();
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use( new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================================
// ROUTES
//=================================


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
})

// ====== Auth Routes ========

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});

// ======== Login Routes =======

app.get("/login", (req, res) => {
    res.render("login");
});
                        //middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

app.get("/logout", (req, res) =>{
    req.logOut();
    res.redirect("/");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000, () =>{
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(" ---> Authentication app <----")
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
})