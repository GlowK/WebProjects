var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    // Mode buttons event listeners
    setupModeButtons();
    //Square Button listeners 
    setupSquares();
    //Reset first run
    reset();
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New colours";
    messageDisplay.textContent = "";
    for(var i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }  
    };
    h1.style.backgroundColor = "steelblue";
}


function setupModeButtons(){
    for(var i = 0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            clearButtonsSelection();
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            }else{
                numSquares = 6;
            }
            reset();
        });
    }
}

function setupSquares(){
    for(var i = 0; i<squares.length; i++){
        squares[i].addEventListener("click", function(){
            if( this.style.backgroundColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play again?";
            }else{
                console.log("wrong");
                this.style.backgroundColor ="#232323";
                messageDisplay.textContent = "Try again";
            }
        })
    }
}

resetButton.addEventListener("click", function(){
    reset();
});

function clearButtonsSelection(){
    for(var i = 0; i<modeButtons.length; i++){
        modeButtons[i].classList.remove("selected");
    }
}

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() *(colors.length));
    console.log(random);
    return colors[random];  
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