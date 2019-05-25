const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//const seedDb = require("./seeds");

// ============================
// Requring routes 
// ============================
var commentRoutes       = require("./routes/comments");
var campgroundsRoutes   = require("./routes/campgrounds");
var authRoutes          = require("./routes/auth");

// ============================
// Initial setups 
// ============================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //Static links 
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true});
mongoose.set('useFindAndModify', false); //potrzbne od uzycia findByIdAndUpdate (depricated)
//seedDb();

// ============================
// Models
// ============================
//var Campground = require("./models/campground");
//var Comment = require("./models/comment");
var User = require("./models/user");

// ============================
// Passport configuration
// ============================
app.use(require("express-session")({
    secret: "To jest nasze haslo szyfrujace",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============================
// Passing currentUser check to every route
// ============================
app.use((req, res, next)=>{ 
    res.locals.currentUser = req.user;
    next();
});

// ============================
// Routes 4 Express router
// ============================
app.use("/", authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);

// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("#############################");
    console.log("YelpCamp Sever is running....");
    console.log("#############################");
})