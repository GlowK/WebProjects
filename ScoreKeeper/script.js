var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display")
var p2Display = document.querySelector("#p2Display")
var numInput = document.querySelector("input");
var capScoreDisplay = document.querySelector("P span");
var h1 = document.querySelector("#score");

var p1Score = 0;
var p2Score = 0;

var gameOver = false;
var winningScore = 5;

function updateScore(){
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
}

function updateGameStatus(score){
    if(score === winningScore){
        gameOver = true;
        if(score === p1Score){
            p1Display.classList.add("winner");
        }else{
            p2Display.classList.add("winner");
        }
    }
}

function clearWinners(){
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
}


function reset(){
    p1Score = 0;
    p2Score = 0;
    updateScore();
    gameOver = false;
    clearWinners();
}

p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        updateScore();
        updateGameStatus(p1Score);
    }
    
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        updateScore();
        updateGameStatus(p2Score);
    }
});

resetButton.addEventListener("click", function(){
        reset();
});

numInput.addEventListener("change", function(){
    capScoreDisplay.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})