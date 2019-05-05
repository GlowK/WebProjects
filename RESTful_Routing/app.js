const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/BlogApp",{useNewUrlParser: true});

// ============================
// Schema setup
// ============================

var basicPicture = "https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Femc1tw4XEy1xHhmr2Ub4Sw%252FPencils.jpg&width=1200&quality=80";

var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: basicPicture},
    body: String,
    created: {typ: Date, default: Date.now}
});
var Campground = mongoose.model("Campground", campgroundSchema);



// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("Blog sever is running....");
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
})