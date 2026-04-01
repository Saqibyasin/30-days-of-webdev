// function greet(name){
//     console.log(`Hello, ${name}!`);
// }

// greet("Kifayat");
// function add(a, b){
//     return a + b;
// }   

// let sum = add(5, 3);
// console.log(`The sum of 5 and 3 is: ${sum}`);

// // conditionals 

// // ========================
// // CONDITIONALS
// // ========================

// // 1. Basic if/else
// let temperature = 35;

// if (temperature > 30) {
//   console.log("It's hot outside! ☀️");
// } else {
//   console.log("It's cool outside! ❄️");
// }

// // 2. if / else if / else
// let score = 75;

// if (score >= 90) {
//   console.log("Grade: A ⭐");
// } else if (score >= 80) {
//   console.log("Grade: B 👍");
// } else if (score >= 70) {
//   console.log("Grade: C 👌");
// } else if (score >= 60) {
//   console.log("Grade: D ⚠️");
// } else {
//   console.log("Grade: F ❌");
// }

// // 3. if with multiple conditions
// let age = 20;
// let hasID = true;

// if (age >= 18 && hasID) {
//   console.log("Access granted! ✅");
// } else if (age >= 18 && !hasID) {
//   console.log("Need ID! 🪪");
// } else {
//   console.log("Too young! ❌");
// }

// // 4. Nested if
// let isLoggedIn = true;
// let isAdmin = false;

// if (isLoggedIn) {
//   console.log("Welcome back!");
//   if (isAdmin) {
//     console.log("You have admin access! 👑");
//   } else {
//     console.log("You have user access! 👤");
//   }
// } else {
//   console.log("Please login first!");
// }


// // 5. Ternary operator
// let isMember = true;
// let discount = isMember ? "20% off" : "No discount";
// console.log(`Your discount: ${discount}`);

// // SWITCH STATEMENT
// let day = "Monday";

// switch (day) {
//   case "Monday":
//     console.log("Start of the week 😫");
//     break;
//   case "Wednesday":
//     console.log("Middle of the week 😐");
//     break;
//   case "Friday":
//     console.log("Almost weekend! 😊");
//     break;
//   case "Saturday":
//   case "Sunday":
//     console.log("Weekend! 🎉");
//     break;
//   default:
//     console.log("Just another day 😴");
// }

// day = "Sunday";
// switch (day) {
//   case "Saturday": 
//   case "Sunday":
//     console.log("Weekend! 🎉"); 
// }

// // switch true

// let score2 = 95;
// switch (true) {
//   case score2 >= 90:
//     console.log("Grade: A ⭐"); 
// }

// calculator 

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return a / b;
}
function modulus(a,b){
    return a % b;
}
function exponentiate(a, b){
    return Math.pow(a, b);
}

function calculator(a, operator,b){
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return modulus(a, b);
        case "**":
            return Math.pow(a, b);
        default:
            return "Error: Invalid operator.";
    }
}

// Example usage:
console.log(calculator(10, "+", 5)); 
console.log(calculator(10, "-", 5));
console.log(calculator(10, "*", 5));
console.log(calculator(10, "/", 5));
console.log(calculator(10, "%", 5));
console.log(calculator(10, "**", 5));
console.log(calculator(10, "[", 0));

// Grade Checker

function getGrade(score) {
  if (score < 0 || score > 100) {
    return "Invalid score! ❌";
  } else if (score >= 90) {
    return "A ⭐ — Excellent!";
  } else if (score >= 80) {
    return "B 👍 — Good!";
  } else if (score >= 70) {
    return "C 👌 — Average!";
  } else if (score >= 60) {
    return "D ⚠️ — Below Average!";
  } else {
    return "F ❌ — Failed!";
  }
}

function getStatus(score){
    return score >= 60 ? "PASS ✅" : "FAIL ❌";
}

function printResult(name,score){
    console.log(`
    Student : ${name}
    Score : ${score}/100
    Grade : ${getGrade(score)}
    Status : ${getStatus(score)}
    `);
}

// Example usage:
printResult("Alice", 95);
printResult("Bob", 82);
printResult("Charlie", 68);
printResult("David", 55);

