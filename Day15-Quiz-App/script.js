const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Logic",
      "Home Tool Markup Language"
    ],
    correct: 0,
    explanation: "HTML stands for Hyper Text Markup Language!"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["text-size", "font-size", "text-style", "font-style"],
    correct: 1,
    explanation: "font-size controls the size of text in CSS!"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 2,
    explanation: "CSS stands for Cascading Style Sheets!"
  },
  {
    question: "Which is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correct: 2,
    explanation: "Float is not a JS data type. JS uses Number for all numbers!"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Dynamic Object Method",
      "Document Oriented Module"
    ],
    correct: 0,
    explanation: "DOM stands for Document Object Model!"
  },
  {
    question: "Which Git command saves a snapshot locally?",
    options: ["git push", "git add", "git commit", "git save"],
    correct: 2,
    explanation: "git commit saves a snapshot locally. git push uploads to GitHub!"
  },
  {
    question: "What does === check in JavaScript?",
    options: [
      "Only value",
      "Only type",
      "Value AND type",
      "Neither"
    ],
    correct: 2,
    explanation: "=== is strict equality — checks both value AND type!"
  },
  {
    question: "Which CSS unit is relative to root font size?",
    options: ["px", "em", "rem", "vh"],
    correct: 2,
    explanation: "rem is relative to the root element font size!"
  },
  {
    question: "What is Flexbox used for?",
    options: [
      "Adding animations",
      "1D layouts",
      "2D layouts",
      "Styling fonts"
    ],
    correct: 1,
    explanation: "Flexbox is for 1D layouts — row OR column!"
  },
  {
    question: "Which method adds item to end of array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
    explanation: "push() adds to end, pop() removes from end!"
  }
];

const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultsScreen = document.querySelector('#results-screen');
const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const restartBtn = document.querySelector('#restart-btn');
const reviewBtn = document.querySelector('#review-btn');
const questionCount = document.querySelector('#question-count');
const questionText = document.querySelector('#question-text');
const optionsContainer = document.querySelector('#options-container');
const feedback = document.querySelector('#feedback');
const progressFill = document.querySelector('#progress-fill');
const timerEl = document.querySelector('#timer');
const statTime = document.querySelector('#stat-time');
const statQuestion = document.querySelector('#stat-question');
const statCorrect = document.querySelector('#stat-correct');
const statWrong = document.querySelector('#stat-wrong');
const reviewSection = document.querySelector('#review-section');
const reviewList = document.querySelector('#review-list');


function showScreen(screen){
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    screen.classList.add('active');
}

startBtn.addEventListener('click',()=>{
    showScreen(quizScreen);

})