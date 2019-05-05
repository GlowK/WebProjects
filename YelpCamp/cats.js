// ==================================================================
//
// Training with mongoose
//
// ==================================================================


// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true});
// var catSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     temperament: String
// });

// var Cat = mongoose.model("Cat", catSchema);

// Cat.create({
//     name: "Jon",
//     age: 10,
//     temperament: "Bland"
// }, (err, cat) => {
//         if(err){
//             console.log(err);
//         }
//             console.log(cat);
// });

//  var george = new Cat({
//     name: "Norris",
//     age: 7,
//     temperament: "Evil"
// })

// george.save((er, cat) => {
//     if(er){
//         console.log("Something went rong");
//     }
//         console.log("We've added cat to db");
//         console.log(cat);
// });

// Cat.find({}, (err, cats) =>{
//     if(err){
//         console.log("Oh nooooooo");
//         console.log(err);
//     }else{
//         console.log("All the cats:")
//         console.log(cats);
//     }
// });