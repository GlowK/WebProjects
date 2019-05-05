const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const request = require('request');



// request('https://jsonplaceholder.typicode.com/users/1', (error, response, body) => {
//     if(!error && response.statusCode == 200){
//         const parsedData = JSON.parse(body);
//         console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
//     }
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// });

app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Jas", "Malgosia", "Tomek", "Krzysiek", "Lily"];

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/search", (req, res) =>{
    res.render("search");
});

app.get("/results", (req, res) =>{
    var query = req.query.searchFor;
    var url = "http://www.omdbapi.com/?s="+ query +"&apikey=thewdb";
    request( url, (error, response, body) =>{
        if(!error && response.statusCode == 200){
            const parsedData = JSON.parse(body);
            // res.send(parsedData.Search[0].Title);
            res.render("results", {data: parsedData});
        }
    })
})

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
    console.log("########### Server is running... ###########");
});
