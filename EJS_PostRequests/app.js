var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Jas", "Malgosia", "Tomek", "Krzysiek", "Lily"];

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends")
});

app.get("/friends", function(req, res){
    res.render("friends", {
        friends: friends
    });
})

app.listen(3000, function(){
    console.log("Server is running...");
});
