// // ========================
// // ARROW FUNCTIONS
// // ========================

// // Old way — regular function
// function add(a, b) {
//   return a + b;
// }

// // New way — arrow function
// const addArrow = (a, b) => {
//   return a + b;
// };

// // Even shorter — implicit return
// const addShort = (a, b) => a + b;

// // Single parameter — no brackets needed
// const double = x => x * 2;

// // No parameters — empty brackets
// const greet = () => console.log("Hello!");

// // Testing
// console.log(add(5, 3));       // 8
// console.log(addArrow(5, 3));  // 8
// console.log(addShort(5, 3));  // 8
// console.log(double(5));       // 10
// greet();                      // Hello!

// // ========================
// // ARROW FUNCTIONS IN ARRAYS
// // ========================

// const numbers = [1, 2, 3, 4, 5];

// // Old way
// const doubledOld = numbers.map(function(num) {
//   return num * 2;
// });

// // Arrow function way
// const doubledNew = numbers.map(num => num * 2);

// console.log(doubledOld); // [2, 4, 6, 8, 10]
// console.log(doubledNew); // [2, 4, 6, 8, 10]

// // Filter with arrow
// const evens = numbers.filter(num => num % 2 === 0);
// console.log(evens); // [2, 4]

// // Find with arrow
// const firstBig = numbers.find(num => num > 3);
// console.log(firstBig); // 4

// // Reduce — new method!
// const sum = numbers.reduce((total, num) => total + num, 0);
// console.log(sum); // 15

// const sumOfNums = numbers.reduce((total, num) => total + num, 0);

// Destructuring

// ========================
// ARRAY DESTRUCTURING
// ========================

// const colors = ['red', 'green', 'blue'];

// // Old way
// const first = colors[0];
// const second = colors[1];
// const third = colors[2];

// // New way — destructuring!
// const [b,c] = colors;
// console.log(b);
// console.log(c);

// // Skip elements
// const [primary, , tertiary] = colors;
// console.log(primary);  // red
// console.log(tertiary); // blue

// // Default values
// const [x = 'default', y = 'default', z = 'default', w = 'nothing'] = colors;
// console.log(x); // red
// console.log(y);
// console.log(w); // nothing ← not in array → uses default!

// // // Swap variables!
// let p = 1, q = 2;
// [p,q] = [q,p];
// console.log(p); // 2
// console.log(q); // 1    

// // ========================
// // OBJECT DESTRUCTURING
// // ========================

// const person = {
//   name: 'Kifayat',
//   age: 20,
//   city: 'Srinagar',
//   skills: ['HTML', 'CSS', 'JS']
// };

// // Old way
// const personName = person.name;
// const personAge = person.age;

// // New way — destructuring!
// const { name, age, city } = person;
// console.log(name); // Kifayat
// console.log(age);  // 20
// console.log(city); // Srinagar

// // Rename while destructuring
// const { name: devName, city: devCity } = person;
// console.log(devName); // Kifayat
// console.log(devCity);  // Srinagar

// // Default values
// const { name: n, country = 'India' } = person;
// console.log(n);       // Kifayat object has name → uses it default value not used
// console.log(country); // India ← not in object → default!

// // Nested destructuring
// const { skills: [firstSkill, secondSkill] } = person;
// console.log(firstSkill);  // HTML
// console.log(secondSkill); // CSS

// // // ========================
// // // DESTRUCTURING IN FUNCTIONS
// // // ========================

// // // Old way
// function displayUser(user) {
//   console.log(user.name);
//   console.log(user.age);
// }

// // // New way — destructure in parameters!
// function displayUserNew({ name, age, city = 'Unknown' }) {
//   console.log(`${name} is ${age} from ${city}`);
// }

// displayUserNew(person); // Kifayat is 20 from Srinagar

// // ========================
// // REAL WORLD EXAMPLE
// // ========================

// // API response destructuring
// const apiResponse = {
//   data: {
//     user: {
//       login: 'saqibyasin',
//       public_repos: 17,
//       followers: 5
//     }
//   },
//   status: 200
// };

// const { data: { user: { login, public_repos, followers } }, status } = apiResponse;
// console.log(login);        // saqibyasin
// console.log(public_repos); // 17
// console.log(status);       // 200

// 1. Array destructuring → position based
// 2. Object destructuring → name based
// 3. Can rename: { name: newName }
// 4. Can set defaults: { x = 'default' }
// 5. Can skip array items: [a, , c]
// 6. Can destructure in function params
// 7. Nested destructuring for deep objects
// 8. Used everywhere in React! 🔥

// ========================
// SPREAD OPERATOR (...)
// ========================

// Spread in arrays
// const fruits = ['apple', 'banana', 'mango'];
// const veggies = ['carrot', 'potato'];

// // Copy array
// const fruitsCopy = [...fruits];
// console.log(fruitsCopy); // ['apple', 'banana', 'mango']

// // Merge arrays
// const food = [...fruits, ...veggies];
// console.log(food); // ['apple', 'banana', 'mango', 'carrot', 'potato']

// // Add items while spreading
// const moreFruits = [...fruits, 'orange', 'grape'];
// console.log(moreFruits); // ['apple', 'banana', 'mango', 'orange', 'grape']

// // Spread in objects
// const user = { name: 'Kifayat', age: 20 };
// const address = { city: 'Srinagar', country: 'India' };

// // Copy object
// const userCopy = { ...user };
// console.log(userCopy); // { name: 'Kifayat', age: 20 }

// // Merge objects
// const fullUser = { ...user, ...address };
// console.log(fullUser);
// // { name: 'Kifayat', age: 20, city: 'Srinagar', country: 'India' }

// // Override properties
// const updatedUser = { ...user, age: 21, job: 'Developer' };
// console.log(updatedUser);
// // { name: 'Kifayat', age: 21, job: 'Developer' }

// // ========================
// // REST PARAMETERS (...)
// // ========================

// // Collect remaining arguments
// function sum(...numbers) {
//   return numbers.reduce((total, num) => total + num, 0);
// }

// console.log(sum(1, 2, 3));       // 6
// console.log(sum(1, 2, 3, 4, 5)); // 15
// console.log(sum(10, 20));        // 30

// // Rest with other params
// function introduce(greeting, ...names) {
//   names.forEach(name => console.log(`${greeting} ${name}!`));
// }

// introduce('Hello', 'Kifayat', 'Ali', 'Sara');
// // Hello Kifayat!
// // Hello Ali!
// // Hello Sara!

// // ========================
// // REAL WORLD EXAMPLES
// // ========================

// // Update todo without mutation
// const todos = [
//   { id: 1, text: 'Learn JS', completed: false },
//   { id: 2, text: 'Build app', completed: false }
// ];

// // Toggle todo — from our todo app!
// const toggledTodos = todos.map(todo =>
//   todo.id === 1
//     ? { ...todo, completed: !todo.completed }
//     : todo
// );
// console.log(toggledTodos);
// // [{ id:1, text:'Learn JS', completed: true }, ...]

// // Add new todo
// const newTodo = { id: 3, text: 'Push to GitHub', completed: false };
// const newTodos = [...todos, newTodo];
// console.log(newTodos); // 3 todos now!

// // Remove todo
// const filteredTodos = todos.filter(todo => todo.id !== 1);
// console.log(filteredTodos); // only todo with id 2!

// // 1. ... spread → unpacks array/object
// // 2. ... rest → collects into array
// // 3. Spread = expands, Rest = collects
// // 4. Copy array: [...arr]
// // 5. Merge arrays: [...arr1, ...arr2]
// // 6. Copy object: {...obj}
// // 7. Override: {...obj, key: newValue}
// // 8. Override must come AFTER spread!
// // 9. Never mutate → always spread copy!
// // 10. Rest must be LAST parameter!


// ========================
// DEFAULT PARAMETERS
// ========================

// Old way
// function greetOld(name) {
//   name = name || 'Guest';
//   console.log(`Hello ${name}!`);
// }

// // New way — default parameters
// function greetNew(name = 'Guest') {
//   console.log(`Hello ${name}!`);
// }

// greetNew('Kifayat'); // Hello Kifayat!
// greetNew();          // Hello Guest! ← uses default!
// greetNew(undefined); // Hello Guest! ← undefined triggers default!
// greetNew(null);      // Hello null!  ← null does NOT trigger default!

// // Multiple defaults
// function createUser(
//   name = 'Anonymous',
//   age = 0,
//   role = 'user',
//   active = true
// ) {
//   return { name, age, role, active };
// }

// console.log(createUser('Kifayat', 20));
// // { name: 'Kifayat', age: 20, role: 'user', active: true }

// console.log(createUser());
// // { name: 'Anonymous', age: 0, role: 'user', active: true }

// // ========================
// // OPTIONAL CHAINING ?.
// // ========================

// const user1 = {
//   name: 'Kifayat',
//   address: {
//     city: 'Srinagar',
//     zip: '190001'
//   },
//   getFullName: function() {
//     return `${this.name} Bhat`;
//   }
// };

// const user2 = {
//   name: 'Ali'
//   // no address!
// };

// // Old way — verbose and ugly
// if (user2 && user2.address && user2.address.city) {
//   console.log(user2.address.city);
// }

// // New way — optional chaining!
// console.log(user1?.address?.city);    // Srinagar ✅
// console.log(user2?.address?.city);    // undefined ✅ no crash!
// console.log(user2?.address?.city ?? 'No city'); // No city ✅

// // Optional chaining with methods
// console.log(user1?.getFullName?.());  // Kifayat Bhat ✅
// console.log(user2?.getFullName?.());  // undefined ✅ no crash!

// // Optional chaining with arrays
// const data = {
//   users: ['Kifayat', 'Ali', 'Sara']
// };
// const emptyData = {};

// console.log(data?.users?.[0]);        // Kifayat ✅
// console.log(emptyData?.users?.[0]);   // undefined ✅

// // ========================
// // COMBINING EVERYTHING
// // ========================

// // Real world — API response handling
// const apiData = {
//   user: {
//     profile: {
//       name: 'Kifayat',
//       social: {
//         github: 'saqibyasin'
//       }
//     }
//   }
// };

// const emptyApi = {};

// // Safe access with optional chaining + nullish coalescing
// const github = apiData?.user?.profile?.social?.github ?? 'No GitHub';
// const github2 = emptyApi?.user?.profile?.social?.github ?? 'No GitHub';

// console.log(github);  // saqibyasin ✅
// console.log(github2); // No GitHub ✅

// 1. Default params → undefined triggers, null doesn't
// 2. ?. → safe property access, no crashes
// 3. ?. returns undefined if path breaks
// 4. Combine ?. with ?? for safe fallbacks
// 5. obj?.method?.() → safe method call
// 6. arr?.[index] → safe array access
// 7. Object shorthand → { name } not { name: name }
// 8. Default params → last in function signature
// 9. ?. stops at first null/undefined
// 10. Most used in API data handling! 🔥