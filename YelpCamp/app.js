const express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// ============================
// Initial setups 
// ============================
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true});

// ============================
// Schema setup
// ============================
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite hilll", 
//     image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg",
//     description: "very nice place"
// }, (error, camp) =>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log("New campgrounds:");
//         console.log(camp);
//     }
// });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
//     {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
//     {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
//     {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
//     {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"}
// ];

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
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new")
});

//SHOW - more information about the campground
app.get("/campgrounds/:id", (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground:foundCampground});
        }
    } )
});

// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("#############################");
    console.log("YelpCamp Sever is running....");
    console.log("########## ##################");
})