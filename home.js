let currentQuestion = {};
let totalQuestions = 0;
let correctAnswers = 0;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function setupQuiz() {
  document.getElementById("result").textContent = "";
  document.getElementById("answer").value = "";
  document.getElementById("question").textContent = "";
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${correctAnswers} / ${totalQuestions}`;
}

function generateQuestion() {
  const type = document.getElementById("quizType").value;
  const level = document.getElementById("level").value;

  document.getElementById("result").textContent = "";
  document.getElementById("answer").value = "";

  if (type === "number") {
    let max = level === "easy" ? 20 : level === "medium" ? 50 : 100;
    let num = Math.floor(Math.random() * (max - 2)) + 2; // avoid <2
    let beforeOrAfter = Math.random() < 0.5 ? "before" : "after";

    currentQuestion = {
      question: `What number comes ${beforeOrAfter} ${num}?`,
      answer: beforeOrAfter === "before" ? num - 1 : num + 1
    };

  } else {
    let range = level === "easy" ? 10 : level === "medium" ? 20 : 25;
    let index = Math.floor(Math.random() * (range - 2)) + 1;

    let letter = alphabet[index];
    let beforeOrAfter = Math.random() < 0.5 ? "before" : "after";

    currentQuestion = {
      question: `What letter comes ${beforeOrAfter} ${letter}?`,
      answer: beforeOrAfter === "before" ? alphabet[index - 1] : alphabet[index + 1]
    };
  }

  document.getElementById("question").textContent = currentQuestion.question;
}

function checkAnswer() {
  const userInput = document.getElementById("answer").value.trim().toUpperCase();
  const correct = currentQuestion.answer.toString().toUpperCase();

  totalQuestions++;
  if (userInput === correct) {
    correctAnswers++;
    document.getElementById("result").textContent = "✅ Correct!";
    document.getElementById("yay-sound").play();
  } else {
    document.getElementById("result").textContent = `❌ Oops! Correct answer: ${currentQuestion.answer}`;
  }

  updateScore();
  setTimeout(generateQuestion, 1500); // auto next
}

setupQuiz();
updateScore();
