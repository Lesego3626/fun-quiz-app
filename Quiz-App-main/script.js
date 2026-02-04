// ===============================
// 1. SELECT ELEMENTS
// ===============================
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreContainer = document.getElementById("scoreContainer");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

// ===============================
// 2. QUIZ DATA
// ===============================
// Array of objects: each object is a question
const quizData = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "Which color is the sky?",
    answers: ["Green", "Blue", "Red", "Yellow"],
    correct: "Blue"
  },
  {
    question: "Which animal says 'meow'?",
    answers: ["Dog", "Cat", "Cow", "Lion"],
    correct: "Cat"
  },
  {
    question: "Which season is cold?",
    answers: ["Summer", "Winter", "Spring", "Autumn"],
    correct: "Winter"
  },
  {
    question: "What do bees make?",
    answers: ["Milk", "Honey", "Water", "Cheese"],
    correct: "Honey"
  }
];

// ===============================
// 3. VARIABLES TO TRACK STATE
// ===============================
let currentQuestion = 0;
let score = 0;

// ===============================
// 4. LOAD QUESTION FUNCTION
// ===============================
function loadQuestion() {
  // Clear previous answers
  answersEl.innerHTML = "";

  // Check if quiz is over
  if (currentQuestion >= quizData.length) {
    showScore();
    return;
  }

  // Get current question
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  // Generate answer buttons
  q.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    // Handle click
    button.addEventListener("click", () => selectAnswer(button, q.correct));
    answersEl.appendChild(button);
  });
}

// ===============================
// 5. HANDLE ANSWER SELECTION
// ===============================
function selectAnswer(button, correctAnswer) {
  // Disable all buttons after selection
  const allButtons = answersEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  // Check if correct
  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");

    // Highlight correct answer
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  // Move to next question after short delay
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000);
}

// ===============================
// 6. SHOW SCORE
// ===============================
function showScore() {
  quiz.style.display = "none"; // hide quiz
  scoreContainer.classList.remove("hidden"); // show score
  scoreEl.textContent = `You got ${score} / ${quizData.length} correct!`;
}

// ===============================
// 7. RESTART QUIZ
// ===============================
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  quiz.style.display = "block";
  loadQuestion();
});

// ===============================
// 8. INITIALIZE QUIZ
// ===============================
loadQuestion();
