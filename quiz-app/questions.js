// ============================================================
//  questions.js  —  All quiz data lives here
//  LESSON: Arrays of objects are perfect for structured data.
//  Each question is an object {} stored inside an array [].
// ============================================================

// "const" means this variable can never be reassigned.
// It's an object where each KEY is a category name,
// and each VALUE is an array of question objects.
const QUESTIONS = {

  // ── CATEGORY 1 ───────────────────────────────────────────
  html: [
    {
      id: "h1",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Logic",
        "Home Tool Markup Language"
      ],
      correct: 0,          // Index of the correct option (0 = first item)
      explanation: "HTML = HyperText Markup Language. 'Hyper' means links, 'Markup' means tags like <p> and <div>.",
      points: 100
    },
    {
      id: "h2",
      question: "Which tag creates the LARGEST heading?",
      options: ["<h6>", "<heading>", "<h1>", "<big>"],
      correct: 2,
      explanation: "<h1> is the largest. Headings go from <h1> (biggest) to <h6> (smallest). Always use one <h1> per page for SEO.",
      points: 100
    },
    {
      id: "h3",
      question: "What attribute makes a link open in a new tab?",
      options: ['rel="noopener"', 'target="_blank"', 'href="new"', 'open="tab"'],
      correct: 1,
      explanation: 'target="_blank" opens a new tab. Pro tip: always pair it with rel="noopener noreferrer" for security.',
      points: 150
    },
    {
      id: "h4",
      question: "Which HTML element is used for the LARGEST block of text?",
      options: ["<span>", "<p>", "<article>", "<section>"],
      correct: 1,
      explanation: "<p> is the paragraph tag for blocks of text. <span> is inline (wraps words inside a line), <article> and <section> are layout containers.",
      points: 100
    },
    {
      id: "h5",
      question: "What does the 'alt' attribute on an <img> tag do?",
      options: [
        "Sets image size",
        "Adds a caption below",
        "Describes the image for screen readers & when image fails",
        "Links the image to a URL"
      ],
      correct: 2,
      explanation: "alt text is critical for accessibility (screen readers) and shows when the image fails to load. Google also uses it for image SEO.",
      points: 150
    },
    {
      id: "h6",
      question: "Which element is a self-closing tag?",
      options: ["<div>", "<p>", "<input>", "<section>"],
      correct: 2,
      explanation: "<input> doesn't wrap content, so it's self-closing: <input type='text' />. Other self-closing tags: <br>, <img>, <hr>, <meta>.",
      points: 150
    }
  ],

  // ── CATEGORY 2 ───────────────────────────────────────────
  css: [
    {
      id: "c1",
      question: "Which CSS property controls the SPACE OUTSIDE an element?",
      options: ["padding", "border", "margin", "spacing"],
      correct: 2,
      explanation: "margin = space outside the element (between elements). padding = space inside (between content and border). Think: padding is your coat, margin is personal space.",
      points: 100
    },
    {
      id: "c2",
      question: "What does 'display: flex' do?",
      options: [
        "Makes elements transparent",
        "Turns the element into a flexible row/column layout container",
        "Makes text bold",
        "Hides the element"
      ],
      correct: 1,
      explanation: "Flexbox makes layout easy! Children of a flex container can be aligned, spaced, and sized with simple properties like justify-content and align-items.",
      points: 150
    },
    {
      id: "c3",
      question: "Which selector targets elements with a specific CLASS?",
      options: ["#myClass", ".myClass", "myClass", "*myClass"],
      correct: 1,
      explanation: ".dot = class selector. #hash = ID selector. Class can apply to many elements; ID should be unique per page.",
      points: 100
    },
    {
      id: "c4",
      question: "What does 'position: absolute' do?",
      options: [
        "Sticks to the viewport when scrolling",
        "Positions relative to the nearest positioned ancestor",
        "Keeps the element in normal document flow",
        "Centers the element automatically"
      ],
      correct: 1,
      explanation: "absolute removes the element from normal flow and positions it relative to the nearest parent with position: relative (or the <body> if none).",
      points: 200
    },
    {
      id: "c5",
      question: "What does the CSS 'box-sizing: border-box' rule change?",
      options: [
        "Adds a border to every element",
        "Width/height now INCLUDE padding and border",
        "Removes all default browser styles",
        "Makes the element a square"
      ],
      correct: 1,
      explanation: "Without it, width: 200px + padding: 20px = 240px wide (confusing!). border-box makes width: 200px always mean 200px total. Most devs set this globally.",
      points: 200
    },
    {
      id: "c6",
      question: "Which CSS property creates smooth transitions?",
      options: ["animation", "transform", "transition", "keyframes"],
      correct: 2,
      explanation: "transition: property duration easing — e.g. 'transition: background 0.3s ease'. It animates between two states (like hover). @keyframes is for complex multi-step animations.",
      points: 150
    }
  ],

  // ── CATEGORY 3 ───────────────────────────────────────────
  javascript: [
    {
      id: "j1",
      question: "What is the correct way to declare a variable that CANNOT be reassigned?",
      options: ["var x = 5", "let x = 5", "const x = 5", "fixed x = 5"],
      correct: 2,
      explanation: "const = constant, can't be reassigned. let = can be reassigned, block-scoped. var = old way, has hoisting quirks. Rule of thumb: use const by default, let when you need to reassign.",
      points: 100
    },
    {
      id: "j2",
      question: "What does 'document.getElementById()' return?",
      options: [
        "A CSS class",
        "A string of HTML",
        "The DOM element with that ID",
        "An array of all matching elements"
      ],
      correct: 2,
      explanation: "It returns a single DOM element (or null if not found). You can then read/change its content: element.textContent = 'Hello!' or element.style.color = 'red'.",
      points: 100
    },
    {
      id: "j3",
      question: "What does the array method '.forEach()' do?",
      options: [
        "Returns a new filtered array",
        "Runs a function once for each item in the array",
        "Sorts the array",
        "Checks if any item matches a condition"
      ],
      correct: 1,
      explanation: "forEach loops through every item: arr.forEach(item => console.log(item)). Unlike .map(), it doesn't return a new array. Use .map() when you want to transform items.",
      points: 150
    },
    {
      id: "j4",
      question: "What does JSON.stringify() do?",
      options: [
        "Parses a JSON string into a JS object",
        "Converts a JS object into a JSON string",
        "Validates JSON syntax",
        "Fetches data from an API"
      ],
      correct: 1,
      explanation: "JSON.stringify(obj) → string (for storing in localStorage). JSON.parse(string) → object (for reading back). localStorage only stores strings, so you need both.",
      points: 150
    },
    {
      id: "j5",
      question: "What is a 'callback function'?",
      options: [
        "A function that returns a string",
        "A function passed as an argument to another function",
        "A function that runs on page load",
        "A function that calls the server"
      ],
      correct: 1,
      explanation: "Callbacks are functions you hand to another function to call later. Example: setTimeout(myFunction, 1000) — myFunction is the callback. addEventListener also takes a callback.",
      points: 200
    },
    {
      id: "j6",
      question: "What does 'localStorage.setItem('key', value)' do?",
      options: [
        "Stores data that resets every page refresh",
        "Sends data to a server",
        "Stores data permanently in the browser until cleared",
        "Creates a cookie"
      ],
      correct: 2,
      explanation: "localStorage persists even after the browser closes (unlike sessionStorage). It stores only strings — use JSON.stringify() to store objects/arrays.",
      points: 150
    }
  ],

  // ── CATEGORY 4 ───────────────────────────────────────────
  general: [
    {
      id: "g1",
      question: "What does 'API' stand for?",
      options: [
        "Automated Programming Interface",
        "Application Programming Interface",
        "Advanced Protocol Integration",
        "Application Process Initiator"
      ],
      correct: 1,
      explanation: "API = Application Programming Interface. It's a way for programs to talk to each other. When you use a weather app, it fetches data from a weather API.",
      points: 100
    },
    {
      id: "g2",
      question: "What does 'responsive design' mean?",
      options: [
        "The website loads fast",
        "The website looks good on all screen sizes",
        "The website responds to user input",
        "The website has animations"
      ],
      correct: 1,
      explanation: "Responsive design adapts to phones, tablets, and desktops using CSS media queries (@media), flexible units (%, vw, rem), and Flexbox/Grid.",
      points: 100
    },
    {
      id: "g3",
      question: "What is the browser's 'DOM'?",
      options: [
        "A styling language",
        "A database for websites",
        "A programming language",
        "A tree structure representing all HTML elements on the page"
      ],
      correct: 3,
      explanation: "DOM = Document Object Model. The browser parses your HTML into a tree of objects. JavaScript uses the DOM to read and change the page without reloading it.",
      points: 150
    },
    {
      id: "g4",
      question: "What is 'version control' (like Git) used for?",
      options: [
        "Making websites load faster",
        "Designing UI layouts",
        "Tracking changes to code over time and enabling collaboration",
        "Testing code automatically"
      ],
      correct: 2,
      explanation: "Git lets you save snapshots (commits) of your code, revert mistakes, and collaborate with others. GitHub hosts your Git repos online. Every dev uses it — learn it early!",
      points: 150
    },
    {
      id: "g5",
      question: "What does 'semantic HTML' mean?",
      options: [
        "HTML with inline styles",
        "Using tags that describe their content's meaning (<nav>, <article>, <footer>)",
        "HTML that runs JavaScript",
        "Compressed/minified HTML"
      ],
      correct: 1,
      explanation: "Semantic tags tell browsers AND developers what content means. <nav> = navigation, <main> = main content, <footer> = footer. Better for SEO, accessibility, and readability than <div> everywhere.",
      points: 200
    },
    {
      id: "g6",
      question: "What happens when you type a URL and press Enter?",
      options: [
        "The browser opens a file on your computer",
        "DNS resolves the domain → server returns HTML → browser renders it",
        "JavaScript runs immediately",
        "The website emails you the page"
      ],
      correct: 1,
      explanation: "1) DNS converts 'google.com' to an IP address. 2) Your browser sends an HTTP request. 3) The server sends back HTML/CSS/JS. 4) The browser parses and renders the page.",
      points: 200
    }
  ]
};
