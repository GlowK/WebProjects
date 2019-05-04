var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assigment");
});

app.get("/speak/:animalName", function(req, res){
    var animalName = req.params.animalName.toLowerCase();
    var sound = {
        pig: "oink",
        cow: "moo",
        dog: "woof",
        cat: "I have tou human",
        golfish: "..."
    }
    var sound = sound[animalName];
    res.send("The " + animalName +"  says: " + sound);
});

app.get("/repeat/:string/:numberOfTimes", function(req, res){
    var string = req.params.string;
    var numberOfTimes = Number(req.params.numberOfTimes);
    var output = "";
    for(var i = 0; i<numberOfTimes; i++){
        output = output + " " + string;
    }
    res.send(output);
});

// app.get("/r/:subbreditName/comments/:id/:title/", function(req, res){
//     console.log(req.params);
//     res.send("<h2>HEOOLOOOOOOLLOOOOLO</h2>")
// });

app.get("*", function(req, res){
    res.send("404");
});

app.listen(3000, function(){
    console.log("Server has started");
});