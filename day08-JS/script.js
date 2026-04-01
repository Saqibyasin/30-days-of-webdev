console.log("Hello, World!");
console.log("I am learning JavaScript.");
console.log(2026);
console.log(true);
console.log(false);



// let — can be changed later
let name = "Alice";
let age = 30;
let city = "New York";

// const — can NEVER be changed
const country = "USA";
const pi = 3.14159;
const language = "JavaScript";

// Printing variables
console.log(name);
console.log(age);
console.log(city);
console.log(country);
console.log(language);

// data types

let firstName = "Bob"; // string
let lastName = "Smith";
let isStudent = true; // boolean
let scor = 85; // number
let hobbies = ["reading", "gaming", "hiking"];
let person = { // object
    name: "Charlie",
    age: 25,
    city: "Los Angeles"
};
let emptyBox = null; // null
let undefinedVariable; // undefined

console.log(firstName);
console.log(isStudent);
console.log(scor); 
console.log(hobbies);
console.log(person);
console.log(emptyBox);
console.log(undefinedVariable); 

// checking data types

console.log(typeof firstName); // string
console.log(typeof isStudent);
console.log(typeof scor);
console.log(typeof hobbies);


typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
typeof []       // "object" ← arrays are objects in JS!
typeof {}       // "object"

// Array → ordered list, accessed by INDEX
let skills = ["HTML", "CSS", "JS"];
skills[0] // "HTML"  ← index starts at 0!
skills[1] // "CSS"
skills[2] // "JS"

// Object → unordered, accessed by KEY
let person2 = { name: "Kifayat", age: 20 };
console.log(person2.name); // "Kifayat"
console.log(person2.age);  // 20

// Array  → shopping list  → order matters → use index
// Object → contact card   → order doesn't matter → use key
// ```

// ---

// ### 💡 Golden Rules for Data Types:
// ```

// operations 
const a = 10;
const b = 3;
console.log(a + b);  // 13 — addition
console.log(a - b);  // 7  — subtraction
console.log(a * b);  // 30 — multiplication
console.log(a / b);  // 3.33 — division
console.log(a % b);  // 1  — remainder (modulus)
console.log(a ** b); // 1000 — power (10 to the power 3)

// 2. ASSIGNMENT OPERATORS
let score = 0;
score = score + 10;  // score is now 10
score += 10;         // shorthand — score is now 20
score -= 5;          // score is now 15
score *= 2;          // score is now 30
score /= 3;          // score is now 10
console.log(score);  // 10

// 3. COMPARISON OPERATORS
console.log(10 == "10");   // true  — loose equality (bad!)
console.log(10 === "10");  // false — strict equality (good!)
console.log(10 !== 20);    // true  — not equal
console.log(10 > 5);       // true  — greater than
console.log(10 < 5);       // false — less than
console.log(10 >= 10);     // true  — greater than or equal
console.log(10 <= 9);      // false — less than or equal

// 4. LOGICAL OPERATORS
let isSmoker = true;
let hasLaptop = true;
let isEmployed = false;

console.log(isSmoker && hasLaptop);   // true  — AND
console.log(isSmoker && isEmployed);  // false — AND
console.log(isSmoker || isEmployed);  // true  — OR
console.log(!isSmoker);               // false — NOT


// ========================
// TEMPLATE LITERALS
// ========================
let myName = "Kifayat";
let myCity = "Srinagar";
let myAge = 20;
// OLD WAY (string concatenation)
let oldMessage = "Hello, my name is " + myName + ". I am " + myAge + " years old and I live in " + myCity + ".";
console.log(oldMessage);

// NEW WAY (template literals)
let newMessage = `Hello, my name is ${myName}. I am ${myAge} years old and I live in ${myCity}.`;
console.log(newMessage);

// MULTILINE STRINGS
let message = `
Name: ${myName}
Age: ${myAge}
City: ${myCity}
`;
console.log(message);
// TYPE CONVERSIONS 
let num = 100;
console.log(typeof String(num));   // string
console.log(String(num) + "px");   // "100px" ✅

// String to Boolean
console.log(Boolean("hello"));    // true
console.log(Boolean(""));         // false ← empty string = false!
console.log(Boolean(0));          // false ← 0 = false!
console.log(Boolean(1));          // true
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean([]));         // true ← empty array = true!
console.log(Boolean({}));         // true ← empty object = true!