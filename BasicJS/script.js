// var dudesName = prompt("What is your name?");
// alert("Nice to meet you " + dudesName);

// var factorialResult = 0;
// var number = Number(prompt("Podaj liczbe"));

// function factorial(number){
//     if(number <= 1){
//         return 1;
//     }else{
//         return number * factorial(number-1);
//     }
// }

// function even(number){
//     if(number % 2 == 0){
//         return "even";
//     }else{
//         return "not even";
//     }
// }

// console.log(factorial(number));
// console.log("The number is: " + even(number) +".");

function printReverse(table){
    for( var i = table.length-1; i >= 0; i--){
        console.log(table[i]);
    }
}

var numberTable = [1,2,3,4];
var characterTable = ["a", "b", "c"];

printReverse(numberTable);
printReverse(characterTable);

var uniformTable = [1,1,1,1];
var unUniformTable = [1,2,1,1];

function isUniform(table){
    var firstOne = table[0];
    var uCannotBreakFromTheLoopOMG = 0;
    table.forEach(function (numerek){
        // console.log("sprawdzana liczba = " + numerek)
        if(numerek == firstOne){
        }else{
            uCannotBreakFromTheLoopOMG++;
        }
    });
    if(uCannotBreakFromTheLoopOMG != 0){
        return false;
    }else{
        return true;
    }
}

console.log(isUniform(uniformTable));
console.log(isUniform(unUniformTable));

function sumArrey(table){
    var sum = 0;
    table.forEach(function(number){
        sum += number;
    });
    return sum;
}

console.log(sumArrey(uniformTable));
console.log(sumArrey(unUniformTable));

function maxArrey(table){
    var max = 0;
    table.forEach(function(number){
        if(number > max){
            max = number;
        }
    });
    return max;
}

var testTable1 = [1,2,3];
var testTable2 = [10, 3, 10, 4, 22];
var testTable3 = [10, -5, 100, 4, 22];


console.log(maxArrey(testTable1));
console.log(maxArrey(testTable2));
console.log(maxArrey(testTable3));


var someObject = {
    friends: [
        {name: "Malfoy"},
        {name: "Crabble"},
        {name: "Goyle"}
    ],
    color: "baby blue",
    isEvil: true
};

console.log(someObject.friends[0].name);