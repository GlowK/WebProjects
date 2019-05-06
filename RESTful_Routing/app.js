const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/BlogApp",{
    useNewUrlParser: true,
    useFindAndModify: false
});

// ============================
// Schema setup
// ============================

var basicPicture = "https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Femc1tw4XEy1xHhmr2Ub4Sw%252FPencils.jpg&width=1200&quality=80";

var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: basicPicture},
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blogpost", blogSchema);


// Blog.create({
//     title: "Test blog",
//     image: basicPicture,
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque reprehenderit quaerat aperiam debitis voluptatibus amet maxime illo ea dolorum."
// });

// ============================
// RESTful routes
// ============================

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) =>{
        if(err){
            console.log(err)
        }else{
            res.render("index", {blogs: blogs});
        }
    })
});

// NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE route
app.post("/blogs", (req, res) =>{
    Blog.create(req.body.blog, (err, newBlogPost) => {
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

//SHOW route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundPost) =>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundPost});
        }
    })
});

//EDIT route
app.get("/blogs/:id/:edit", (req, res) =>{
    Blog.findById(req.params.id, (err, foundPost) =>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundPost})
        }
    });
});

//UPDATE route
app.put("/blogs/:id", (req, res) => {
    Blog.findOneAndUpdate({_id: req.params.id}, req.body.blog, function(err, updatePost){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// ============================
// Listen init
// ============================
app.listen(3000, () =>{
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("Blog sever is running....");
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
})