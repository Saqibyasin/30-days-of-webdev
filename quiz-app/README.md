# ⚡ WebDev Quiz App — Day 15 of 30

A fully-featured multiple-choice quiz app built with **pure HTML, CSS & JavaScript** — no frameworks, no libraries.

---

## 🚀 How to Run

1. Download the zip and unzip it
2. Open the folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
   *(Or just double-click `index.html` to open in your browser)*

That's it — no npm install, no build step.

---

## 📁 File Structure

```
quiz-app/
│
├── index.html      ← Structure (5 screens, all HTML)
├── style.css       ← All visual styling
├── script.js       ← All quiz logic
└── questions.js    ← All quiz questions & answers
```

**Why 4 files?** Separation of concerns — HTML = structure, CSS = style, JS = behaviour. Each file has one job.

---

## ✅ Features Built

| Feature | What you learned |
|---|---|
| 5-screen SPA flow | `display: none/block` + class toggling |
| Category selector | `data-*` attributes + `dataset` in JS |
| Countdown timer | `setInterval`, `clearInterval` |
| Timer colour shift | CSS classes + conditional `classList.add()` |
| Answer feedback | DOM class manipulation, `setTimeout` |
| XP + streak system | Variables, math, conditional logic |
| Speed bonus XP | `Math.floor`, `Math.max` |
| Score circle | SVG `stroke-dashoffset` animation |
| LocalStorage leaderboard | `JSON.stringify`, `JSON.parse`, `localStorage` |
| Explanations per question | Arrays of objects |
| Responsive design | `@media` queries |

---

## 🧠 Key JS Concepts Used

### Arrays of Objects
```js
const questions = [
  { question: "What is...?", options: ["A","B","C","D"], correct: 0 }
];
```

### setInterval (timer)
```js
state.timer = setInterval(() => {
  state.timeLeft--;
  if (state.timeLeft <= 0) clearInterval(state.timer);
}, 1000);
```

### localStorage
```js
// Save (must stringify objects)
localStorage.setItem('scores', JSON.stringify(scoresArray));

// Read (must parse back)
const scores = JSON.parse(localStorage.getItem('scores'));
```

### Dynamic DOM creation
```js
const btn = document.createElement('button');
btn.textContent = option;
btn.addEventListener('click', () => handleAnswer(index));
container.appendChild(btn);
```

---

## 🎮 How to Customise

### Add more questions
Open `questions.js` and add to any category array:
```js
{
  id: "h7",
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 2,        // 0-indexed (2 = "Option C")
  explanation: "Explain the answer here — this is where users learn!",
  points: 150
}
```

### Add a new category
1. Add a key in `QUESTIONS` in `questions.js`
2. Add a `<div class="category-card" data-category="yourkey">` in `index.html`

### Change the colour accent
Open `style.css`, find `:root`, change `--accent`:
```css
--accent: #22c55e;   /* green */
--accent: #f59e0b;   /* amber */
--accent: #ef4444;   /* red */
```

---

## 💡 What to Build Next (Day 16+)

- [ ] **Difficulty levels** — easy/medium/hard questions
- [ ] **Sound effects** using the Web Audio API
- [ ] **Animations** with CSS `@keyframes`
- [ ] **API questions** — fetch questions from Open Trivia DB API
- [ ] **Share score** — generate a screenshot or copy-to-clipboard

---

## 📚 Concepts to Review

If anything is unclear, look these up:
- `addEventListener` — MDN Web Docs
- `setInterval` vs `setTimeout` — javascript.info
- CSS Flexbox — flexboxfroggy.com (game!)
- CSS Grid — cssgridgarden.com (game!)
- localStorage — MDN Web Docs

---

*Built on Day 15 of a 30-day WebDev challenge. Keep going! 🚀*
