const express = require("express");
var app = express();
var bodyParser = require("body-parser");

// ============================
// Initial setups 
// ============================
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
    {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
    {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
    {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
    {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
    {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
    {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
    {name: "Granite hilll", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg"},
    {name: "MOntaing Goat ", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"}

];

// ============================
// Routes 
// ============================
app.get("/", (req, res) =>{
    res.render("landing");
    //res.send("This will be a landing  page soon")
})

app.get("/campgrounds", (req, res) =>{
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    }
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
});

// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("#############################");
    console.log("YelpCamp Sever is running....");
    console.log("########## ##################");
})