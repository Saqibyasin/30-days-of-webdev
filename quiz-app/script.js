// ============================================================
//  script.js  —  All quiz logic lives here
//
//  WHAT YOU'LL LEARN IN THIS FILE:
//  ✅ Selecting DOM elements
//  ✅ Event listeners
//  ✅ setInterval (countdown timer)
//  ✅ Arrays & objects
//  ✅ Functions & scope
//  ✅ localStorage (persist scores)
//  ✅ JSON.stringify / JSON.parse
//  ✅ CSS class manipulation
// ============================================================


// ── 1. SELECT DOM ELEMENTS ───────────────────────────────────
// LESSON: We grab elements ONCE at the top, then reuse them.
// querySelector returns the first matching element.
// querySelectorAll returns a NodeList (like an array) of all matches.

const screens = {
  welcome:     document.getElementById('screen-welcome'),
  quiz:        document.getElementById('screen-quiz'),
  feedback:    document.getElementById('screen-feedback'),
  results:     document.getElementById('screen-results'),
  leaderboard: document.getElementById('screen-leaderboard'),
};

const ui = {
  // Welcome screen
  categoryCards:   document.querySelectorAll('.category-card'),
  startBtn:        document.getElementById('btn-start'),
  bestScore:       document.getElementById('best-score'),

  // Quiz screen
  categoryBadge:   document.getElementById('category-badge'),
  questionNumber:  document.getElementById('question-number'),
  questionText:    document.getElementById('question-text'),
  optionsGrid:     document.getElementById('options-grid'),
  timerDisplay:    document.getElementById('timer-display'),
  timerBar:        document.getElementById('timer-bar'),
  xpDisplay:       document.getElementById('xp-display'),
  streakDisplay:   document.getElementById('streak-display'),
  progressBar:     document.getElementById('progress-bar'),
  progressText:    document.getElementById('progress-text'),

  // Feedback screen
  feedbackIcon:    document.getElementById('feedback-icon'),
  feedbackTitle:   document.getElementById('feedback-title'),
  feedbackXP:      document.getElementById('feedback-xp'),
  feedbackExplain: document.getElementById('feedback-explain'),
  nextBtn:         document.getElementById('btn-next'),

  // Results screen
  resultScore:     document.getElementById('result-score'),
  resultXP:        document.getElementById('result-xp'),
  resultCorrect:   document.getElementById('result-correct'),
  resultTime:      document.getElementById('result-time'),
  resultStreak:    document.getElementById('result-streak'),
  resultMessage:   document.getElementById('result-message'),
  restartBtn:      document.getElementById('btn-restart'),
  leaderboardBtn:  document.getElementById('btn-leaderboard'),
  saveScoreBtn:    document.getElementById('btn-save'),
  playerNameInput: document.getElementById('player-name'),

  // Leaderboard screen
  leaderboardList: document.getElementById('leaderboard-list'),
  backBtn:         document.getElementById('btn-back'),
};


// ── 2. GAME STATE ────────────────────────────────────────────
// LESSON: Storing all mutable data in one object makes it easy
// to reset the game — just overwrite this object!

let state = {
  category:        '',       // Selected category key ('html', 'css', etc.)
  questions:       [],       // Shuffled questions for this round
  currentIndex:    0,        // Which question we're on
  xp:              0,        // Total XP earned this round
  streak:          0,        // Current correct-answer streak
  maxStreak:       0,        // Highest streak reached
  correctCount:    0,        // How many answered correctly
  timeLeft:        0,        // Seconds left on current question
  timeTaken:       0,        // Seconds used on current question
  totalTimeTaken:  0,        // Sum of all question times
  timer:           null,     // Holds the setInterval reference
  answered:        false,    // Has the user answered this question?
};

const TIME_PER_QUESTION = 15;  // seconds


// ── 3. UTILITY FUNCTIONS ─────────────────────────────────────
// LESSON: Small, reusable functions = cleaner code.

// Shows one screen, hides all others
// LESSON: Object.values() turns an object into an array of its values
function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

// Shuffles an array randomly (Fisher-Yates algorithm)
// LESSON: [...arr] creates a COPY — we never mutate the original data
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];   // Destructuring swap!
  }
  return copy;
}

// Formats seconds as "0:00"
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Capitalises first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// ── 4. WELCOME SCREEN ────────────────────────────────────────

function initWelcomeScreen() {
  // Show the best score from localStorage
  const best = getBestScore();
  ui.bestScore.textContent = best > 0 ? `Best: ${best} XP` : 'No scores yet';

  // Make category cards selectable
  ui.categoryCards.forEach(card => {
    card.addEventListener('click', () => {

      // LESSON: Remove 'selected' from all, then add to clicked one
      ui.categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // LESSON: data-* attributes store custom data on HTML elements
      // <div data-category="html"> → card.dataset.category === 'html'
      state.category = card.dataset.category;
      ui.startBtn.removeAttribute('disabled');
    });
  });

  ui.startBtn.addEventListener('click', () => {
    if (!state.category) return;
    startQuiz();
  });
}


// ── 5. START / RESET QUIZ ────────────────────────────────────

function startQuiz() {
  // Reset state fully
  state = {
    ...state,               // Keep category
    questions:       shuffle(QUESTIONS[state.category]),
    currentIndex:    0,
    xp:              0,
    streak:          0,
    maxStreak:       0,
    correctCount:    0,
    timeLeft:        0,
    timeTaken:       0,
    totalTimeTaken:  0,
    timer:           null,
    answered:        false,
  };

  showScreen('quiz');
  loadQuestion();
}

function restartQuiz() {
  state.category = '';
  ui.categoryCards.forEach(c => c.classList.remove('selected'));
  ui.startBtn.setAttribute('disabled', true);
  showScreen('welcome');
}


// ── 6. QUESTION LOGIC ────────────────────────────────────────

function loadQuestion() {
  const q = state.questions[state.currentIndex];
  state.answered = false;

  // Update header info
  ui.categoryBadge.textContent = capitalize(state.category);
  ui.questionNumber.textContent = `Q${state.currentIndex + 1} of ${state.questions.length}`;
  ui.xpDisplay.textContent = `${state.xp} XP`;
  ui.streakDisplay.textContent = `🔥 ${state.streak}`;

  // Progress bar — LESSON: calculate percentage
  const pct = (state.currentIndex / state.questions.length) * 100;
  ui.progressBar.style.width = `${pct}%`;
  ui.progressText.textContent = `${state.currentIndex}/${state.questions.length}`;

  // Question text
  ui.questionText.textContent = q.question;

  // Build answer options dynamically
  // LESSON: innerHTML = '' clears old buttons before adding new ones
  ui.optionsGrid.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;

    // LESSON: data attributes store which index this button represents
    btn.dataset.index = index;

    btn.addEventListener('click', () => handleAnswer(index));
    ui.optionsGrid.appendChild(btn);
  });

  // Start the countdown timer
  startTimer();
}


// ── 7. TIMER ─────────────────────────────────────────────────
// LESSON: setInterval runs a function repeatedly every N milliseconds.
// clearInterval stops it. Always store the interval ID so you can stop it!

function startTimer() {
  state.timeLeft = TIME_PER_QUESTION;
  state.timeTaken = 0;
  updateTimerDisplay();

  // Clear any existing timer first (safety measure)
  clearInterval(state.timer);

  state.timer = setInterval(() => {
    state.timeLeft--;
    state.timeTaken++;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      handleTimeOut();
    }
  }, 1000); // 1000ms = 1 second
}

function stopTimer() {
  clearInterval(state.timer);
  state.totalTimeTaken += state.timeTaken;
}

function updateTimerDisplay() {
  ui.timerDisplay.textContent = state.timeLeft;

  // Timer bar width decreases as time runs out
  const pct = (state.timeLeft / TIME_PER_QUESTION) * 100;
  ui.timerBar.style.width = `${pct}%`;

  // LESSON: Toggle classes based on conditions to change colors via CSS
  ui.timerBar.className = 'timer-bar-fill';
  if (state.timeLeft <= 5)       ui.timerBar.classList.add('danger');
  else if (state.timeLeft <= 9)  ui.timerBar.classList.add('warning');
  // else it stays green (default)

  // Pulse animation when low
  ui.timerDisplay.classList.toggle('pulse', state.timeLeft <= 5);
}

function handleTimeOut() {
  state.streak = 0;  // Break the streak
  showFeedback(false, null, 0);
}


// ── 8. ANSWER HANDLING ───────────────────────────────────────

function handleAnswer(selectedIndex) {
  if (state.answered) return;  // Prevent double-clicking
  state.answered = true;
  stopTimer();

  const q = state.questions[state.currentIndex];
  const isCorrect = selectedIndex === q.correct;

  // Visually mark all buttons as correct/wrong
  const buttons = ui.optionsGrid.querySelectorAll('.option-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  // Calculate XP earned
  let xpEarned = 0;
  if (isCorrect) {
    xpEarned = q.points;

    // BONUS XP for answering fast
    // LESSON: Math.max ensures we never go below 0
    const speedBonus = Math.max(0, Math.floor((state.timeLeft / TIME_PER_QUESTION) * 50));
    xpEarned += speedBonus;

    // Streak multiplier: 3+ in a row = 1.5x, 5+ = 2x
    state.streak++;
    state.maxStreak = Math.max(state.maxStreak, state.streak);

    if (state.streak >= 5)      xpEarned = Math.floor(xpEarned * 2.0);
    else if (state.streak >= 3) xpEarned = Math.floor(xpEarned * 1.5);

    state.xp += xpEarned;
    state.correctCount++;
  } else {
    state.streak = 0;
  }

  // Brief delay so user sees the highlight, then show feedback
  setTimeout(() => showFeedback(isCorrect, q.explanation, xpEarned), 600);
}


// ── 9. FEEDBACK SCREEN ───────────────────────────────────────

function showFeedback(isCorrect, explanation, xpEarned) {
  const q = state.questions[state.currentIndex];

  if (isCorrect) {
    ui.feedbackIcon.textContent  = '✓';
    ui.feedbackIcon.className    = 'feedback-icon correct';
    ui.feedbackTitle.textContent = state.streak >= 3
      ? `🔥 ${state.streak} in a row!`
      : 'Correct!';
  } else {
    ui.feedbackIcon.textContent  = '✗';
    ui.feedbackIcon.className    = 'feedback-icon wrong';
    ui.feedbackTitle.textContent = 'Not quite!';
  }

  ui.feedbackXP.textContent      = isCorrect ? `+${xpEarned} XP` : 'No XP';
  ui.feedbackXP.className        = `feedback-xp ${isCorrect ? 'earned' : 'zero'}`;
  ui.feedbackExplain.textContent = explanation || `Correct answer: "${q.options[q.correct]}"`;

  showScreen('feedback');
}

// "Next" button on feedback screen
ui.nextBtn.addEventListener('click', () => {
  state.currentIndex++;

  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    showScreen('quiz');
    loadQuestion();
  }
});


// ── 10. RESULTS SCREEN ───────────────────────────────────────

function showResults() {
  const total      = state.questions.length;
  const accuracy   = Math.round((state.correctCount / total) * 100);
  const avgTime    = Math.round(state.totalTimeTaken / total);

  // Messages based on performance
  const messages = [
    { min: 90, text: "Outstanding! You're a WebDev wizard! 🧙" },
    { min: 70, text: "Great work! You know your stuff! 🚀"     },
    { min: 50, text: "Good effort! Keep practising! 💪"        },
    { min: 0,  text: "Keep going — every mistake is a lesson! 📚" },
  ];
  const msg = messages.find(m => accuracy >= m.min);

  ui.resultScore.textContent   = `${accuracy}%`;
  ui.resultXP.textContent      = `${state.xp} XP`;
  ui.resultCorrect.textContent = `${state.correctCount}/${total}`;
  ui.resultTime.textContent    = `${avgTime}s avg`;
  ui.resultStreak.textContent  = `${state.maxStreak} best`;
  ui.resultMessage.textContent = msg.text;

  // Animate score circle
  const circle = document.getElementById('result-circle');
  if (circle) {
    const circumference = 2 * Math.PI * 54;  // r=54
    const offset = circumference - (accuracy / 100) * circumference;
    circle.style.strokeDasharray  = circumference;
    circle.style.strokeDashoffset = circumference;  // Start at 0
    // LESSON: requestAnimationFrame waits for browser paint before animating
    requestAnimationFrame(() => {
      setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);
    });
  }

  showScreen('results');
}

// Save score to leaderboard
ui.saveScoreBtn.addEventListener('click', () => {
  const name = ui.playerNameInput.value.trim() || 'Anonymous';
  saveScore(name, state.xp, state.category);
  ui.saveScoreBtn.textContent   = 'Saved! ✓';
  ui.saveScoreBtn.disabled      = true;
  ui.playerNameInput.disabled   = true;
});

ui.restartBtn.addEventListener('click', restartQuiz);


// ── 11. LEADERBOARD ──────────────────────────────────────────
// LESSON: localStorage only stores STRINGS.
// We use JSON.stringify() to convert arrays/objects → string.
// We use JSON.parse() to convert back string → array/object.

function saveScore(name, xp, category) {
  const scores = getScores();

  scores.push({
    name,
    xp,
    category,
    date: new Date().toLocaleDateString()
  });

  // Sort by XP descending, keep top 10
  scores.sort((a, b) => b.xp - a.xp);
  const top10 = scores.slice(0, 10);

  // LESSON: JSON.stringify converts object → string for storage
  localStorage.setItem('quizScores', JSON.stringify(top10));
}

function getScores() {
  const raw = localStorage.getItem('quizScores');
  // LESSON: JSON.parse converts string → object. We use '|| []' as fallback
  return raw ? JSON.parse(raw) : [];
}

function getBestScore() {
  const scores = getScores();
  return scores.length > 0 ? scores[0].xp : 0;
}

function renderLeaderboard() {
  const scores = getScores();
  ui.leaderboardList.innerHTML = '';

  if (scores.length === 0) {
    ui.leaderboardList.innerHTML = '<p class="empty-state">No scores yet. Be the first!</p>';
    return;
  }

  scores.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = `lb-row ${i < 3 ? 'top-three' : ''}`;

    const medal = ['🥇','🥈','🥉'][i] || `${i + 1}.`;

    row.innerHTML = `
      <span class="lb-rank">${medal}</span>
      <span class="lb-name">${entry.name}</span>
      <span class="lb-cat">${capitalize(entry.category)}</span>
      <span class="lb-xp">${entry.xp} XP</span>
      <span class="lb-date">${entry.date}</span>
    `;
    ui.leaderboardList.appendChild(row);
  });
}

// Leaderboard button from results screen
ui.leaderboardBtn.addEventListener('click', () => {
  renderLeaderboard();
  showScreen('leaderboard');
});

// Back button on leaderboard
ui.backBtn.addEventListener('click', () => showScreen('results'));


// ── 12. INIT ─────────────────────────────────────────────────
// This runs when the page loads. Everything starts here.

function init() {
  initWelcomeScreen();
  showScreen('welcome');
}

// LESSON: 'DOMContentLoaded' fires when HTML is fully parsed.
// Always wait for this before touching the DOM!
document.addEventListener('DOMContentLoaded', init);
