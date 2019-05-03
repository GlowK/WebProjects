var color = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");

colorDisplay.textContent = pickedColor;

for(var i = 0; i<squares.length; i++){
    squares[i].style.backgroundColor = color[i];

    squares[i].addEventListener("click", function(){
        if( this.style.backgroundColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(pickedColor);
            h1.style.backgroundColor = pickedColor;
        }else{
            console.log("wrong");
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try again";
        }
    })
}

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() *(color.length));
    console.log(random);
    return color[random];  
}


function generateRandomColors(number){
  var arr = [];
  for (var i = 0; i < number; i++){
    arr.push(randomColor());
  }
  return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", "+ b +")"; 
}

console.table(color);