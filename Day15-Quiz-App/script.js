// ========================
// QUESTIONS DATA
// ========================

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

// ========================
// GAME STATE
// ========================

let currentQuestion = 0;
let score = 0;
let wrongAnswers = 0;
let timerInterval = null;
let timeLeft = 30;
let totalTime = 0;
let userAnswers = [];
const LETTERS = ['A', 'B', 'C', 'D'];

// ========================
// GET ELEMENTS
// ========================

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

// ========================
// SCREEN SWITCHING
// ========================

function showScreen(screen) {
  startScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultsScreen.classList.remove('active');
  screen.classList.add('active');
}

// ========================
// TIMER
// ========================

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  updateTimerDisplay();

  timerInterval = setInterval(function() {
    timeLeft--;
    totalTime++;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeOut();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = `${timeLeft}s`;
  statTime.textContent = `${timeLeft}s`;

  timerEl.classList.remove('warning', 'danger');
  if (timeLeft <= 10 && timeLeft > 5) {
    timerEl.classList.add('warning');
  } else if (timeLeft <= 5) {
    timerEl.classList.add('danger');
  }
}

function timeOut() {
  wrongAnswers++;
  statWrong.textContent = wrongAnswers;
  userAnswers.push({ question: currentQuestion, selected: -1, correct: false });
  showFeedback(false, "Time's up! ⏰", questions[currentQuestion].explanation);
  disableOptions();
  highlightCorrect();
  nextBtn.classList.remove('hidden');
}

// ========================
// RENDER QUESTION
// ========================

function renderQuestion() {
  const q = questions[currentQuestion];

  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  statQuestion.textContent = currentQuestion + 1;
  questionText.textContent = q.question;

  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;

  optionsContainer.innerHTML = '';
  feedback.classList.add('hidden');
  nextBtn.classList.add('hidden');

  q.options.forEach(function(option, index) {
    const div = document.createElement('div');
    div.classList.add('option');
    div.innerHTML = `
      <div class="option-letter">${LETTERS[index]}</div>
      <span class="option-text">${option}</span>
      <span class="option-icon">${index === q.correct ? '✓' : '✗'}</span>
    `;
    div.addEventListener('click', function() {
      selectAnswer(index);
    });
    optionsContainer.appendChild(div);
  });

  startTimer();
}

// ========================
// SELECT ANSWER
// ========================

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  disableOptions();

  const q = questions[currentQuestion];
  const isCorrect = selectedIndex === q.correct;
  const options = optionsContainer.querySelectorAll('.option');

  if (isCorrect) {
    options[selectedIndex].classList.add('correct');
    score++;
    statCorrect.textContent = score;
    showFeedback(true, '✅ Correct!', q.explanation);
  } else {
    options[selectedIndex].classList.add('wrong');
    wrongAnswers++;
    statWrong.textContent = wrongAnswers;
    highlightCorrect();
    showFeedback(false, '❌ Wrong!', q.explanation);
  }

  userAnswers.push({
    question: currentQuestion,
    selected: selectedIndex,
    correct: isCorrect
  });

  nextBtn.classList.remove('hidden');
}

function disableOptions() {
  optionsContainer.querySelectorAll('.option').forEach(function(opt) {
    opt.classList.add('disabled');
  });
}

function highlightCorrect() {
  const options = optionsContainer.querySelectorAll('.option');
  options[questions[currentQuestion].correct].classList.add('correct');
}

function showFeedback(isCorrect, title, explanation) {
  feedback.classList.remove('hidden', 'correct', 'wrong');
  feedback.classList.add(isCorrect ? 'correct' : 'wrong');
  feedback.textContent = `${title} ${explanation}`;
}

// ========================
// NEXT QUESTION
// ========================

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

// ========================
// RESULTS
// ========================

function showResults() {
  clearInterval(timerInterval);
  showScreen(resultsScreen);

  const percent = Math.round((score / questions.length) * 100);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  document.querySelector('#score-fraction').textContent = `${score}/${questions.length}`;
  document.querySelector('#score-percent').textContent = `${percent}%`;
  document.querySelector('#res-correct').textContent = score;
  document.querySelector('#res-wrong').textContent = wrongAnswers;
  document.querySelector('#res-time').textContent = timeString;

  const gradeBadge = document.querySelector('#grade-badge');
  const resultsEmoji = document.querySelector('#results-emoji');
  const resultsTitle = document.querySelector('#results-title');

  if (percent >= 90) {
    gradeBadge.textContent = 'A';
    resultsEmoji.textContent = '🏆';
    resultsTitle.textContent = 'Outstanding!';
  } else if (percent >= 80) {
    gradeBadge.textContent = 'B';
    resultsEmoji.textContent = '🎉';
    resultsTitle.textContent = 'Great Job!';
  } else if (percent >= 70) {
    gradeBadge.textContent = 'C';
    resultsEmoji.textContent = '👍';
    resultsTitle.textContent = 'Good Effort!';
  } else if (percent >= 60) {
    gradeBadge.textContent = 'D';
    resultsEmoji.textContent = '😐';
    resultsTitle.textContent = 'Keep Practicing!';
  } else {
    gradeBadge.textContent = 'F';
    resultsEmoji.textContent = '📚';
    resultsTitle.textContent = 'Keep Studying!';
  }
}

// ========================
// REVIEW ANSWERS
// ========================

function showReview() {
  reviewSection.classList.remove('hidden');
  reviewList.innerHTML = '';

  userAnswers.forEach(function(answer) {
    const q = questions[answer.question];
    const div = document.createElement('div');
    div.classList.add('review-item');

    const selectedText = answer.selected === -1
      ? 'No answer (time out)'
      : q.options[answer.selected];

    div.innerHTML = `
      <p>${answer.question + 1}. ${q.question}</p>
      <span class="review-answer ${answer.correct ? 'correct' : 'wrong'}">
        ${answer.correct ? '✓' : '✗'} Your answer: ${selectedText}
      </span>
      ${!answer.correct
        ? `<span class="review-answer correct">✓ Correct: ${q.options[q.correct]}</span>`
        : ''}
    `;
    reviewList.appendChild(div);
  });

  reviewBtn.textContent = 'Hide Review';
  reviewBtn.onclick = function() {
    reviewSection.classList.add('hidden');
    reviewBtn.textContent = 'Review Answers';
    reviewBtn.onclick = showReview;
  };
}

// ========================
// RESTART
// ========================

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  wrongAnswers = 0;
  totalTime = 0;
  userAnswers = [];
  statCorrect.textContent = 0;
  statWrong.textContent = 0;
  reviewSection.classList.add('hidden');
  reviewBtn.textContent = 'Review Answers';
  reviewBtn.onclick = showReview;
  showScreen(quizScreen);
  renderQuestion();
}

// ========================
// EVENT LISTENERS
// ========================

startBtn.addEventListener('click', function() {
  showScreen(quizScreen);
  renderQuestion();
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);