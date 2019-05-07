const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const seedDb = require("./seeds");

// ============================
// Initial setups 
// ============================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //Sttic links 
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true});

//seedDb();

// ============================
// Models
// ============================
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// var User = require("./models/user");


// ============================
// Routes 
// ============================
app.get("/", (req, res) =>{
    res.render("landing");
    //res.send("This will be a landing  page soon")
})

// INDEX - show all campegrounds
app.get("/campgrounds", (req, res) =>{
    // Get compgrounds from DB
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
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
});

//SHOW - more information about the campground
app.get("/campgrounds/:id", (req,res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) =>{
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    } )
});

//=================================================================================
app.get("/campgrounds/:id/comments/new", (req, res) =>{
    Campground.findById(req.params.id, (err, campground) =>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground})
        }
    })
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, newComment) =>{
                if(err){
                    console.log(err);
                }else{
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});


// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("#############################");
    console.log("YelpCamp Sever is running....");
    console.log("########## ##################");
})