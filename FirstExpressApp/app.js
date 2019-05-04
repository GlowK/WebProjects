var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Goodbyeeee!");
});

app.get("/dog", function(req, res){
    console.log("SOMEONE MADE A REQUEST");
    res.send("MEOW!");
});

app.get("/r/:subbreditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("<h2>HEOOLOOOOOOLLOOOOLO</h2>")
});

app.get("*", function(req, res){
    res.send("404");
});

app.listen(3000, function(){
    console.log("Server has started");
});