
const quizData = {
  science: {
    beginner: [
      { question: "What planet do we live on?", options: ["Mars", "Earth", "Venus", "Jupiter"], answer: "Earth" },
      { question: "Water freezes at ___ °C?", options: ["0", "100", "10", "-5"], answer: "0" }
    ],
    intermediate: [
      { question: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
      { question: "How many bones in adult human body?", options: ["206", "205", "208", "210"], answer: "206" }
    ],
    advanced: [
      { question: "What is the chemical symbol for gold?", options: ["Gd", "Au", "Ag", "Go"], answer: "Au" },
      { question: "What is Newton's Third Law?", options: [
        "For every action, there is an equal and opposite reaction",
        "F = ma",
        "Objects in motion stay in motion",
        "Energy is conserved"
      ], answer: "For every action, there is an equal and opposite reaction" }
    ]
  },
  Geography: {
    beginner: [
      { question: "What is the largest of the seven continents?", options: ["Europe", "Asia", "South America"], answer: "Asia" },
      { question: "Which of the following is not a part of Antarctica?", options: ["The Arctic Circle", "The Vinson Massif", "The Ross Ice Shelf"], answer: "The Vinson Massif" },
      { question: "Which continent has the same name as a country?", options: ["Asia", "Europe", "Africa"], answer: "Europe" },
      { question: "This continent is very cold. What is it called?", options: ["Antarctica", "Asia", "South America"], answer: "Antarctica" },
      { question: "How many continents are there?", options: ["3", "7", "11", "6"], answer: "7" }
    ],
    intermediate: [
      { question: "Which island is part of the Australian continent?", options: ["Sri Lanka", "Madagascar", "Tasmania"], answer: "Tasmania" },
      { question: "What is 100 / 4?", options: ["20", "25", "30", "40"], answer: "25" }
    ],
    advanced: [
      { question: "Solve: 2x + 3 = 9", options: ["x=1", "x=2", "x=3", "x=4"], answer: "x=3" },
      { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], answer: "2x" }
    ]
  }
};

let selectedQuestions = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathQuestions(level, operation) {
const questions = [];
const levelRange = level === "beginner" ? 10 : level === "intermediate" ? 50 : 100;

for (let i = 0; i < 5; i++) {
let num1, num2, correct, symbol;

if (operation === "addition") {
  num1 = getRandomInt(1, levelRange);
  num2 = getRandomInt(1, levelRange);
  correct = num1 + num2;
  symbol = '+';
} else if (operation === "subtraction") {
  num1 = getRandomInt(1, levelRange);
  num2 = getRandomInt(1, num1); // ensures num1 >= num2
  correct = num1 - num2;
  symbol = '-';
} else if (operation === "multiplication") {
  num1 = getRandomInt(1, levelRange);
  num2 = getRandomInt(1, levelRange);
  correct = num1 * num2;
  symbol = '×';
} else if (operation === "division") {
  num2 = getRandomInt(1, levelRange);
  correct = getRandomInt(1, levelRange);
  num1 = num2 * correct; // ensures no remainder
  symbol = '÷';
}

const questionText = `What is ${num1} ${symbol} ${num2}?`;
const options = generateOptions(correct);

questions.push({
  question: questionText,
  options,
  answer: correct.toString()
});
}

return questions;
}


function generateOptions(correct) {
  const options = new Set();
  options.add(correct.toString());
  while (options.size < 4) {
    const offset = getRandomInt(-10, 10);
    const distractor = correct + offset;
    if (distractor !== correct && distractor >= 0) {
      options.add(distractor.toString());
    }
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

function startQuiz() {
  const subject = document.getElementById("subject").value;
  const level = document.getElementById("levelSelect").value;
  const operation = document.getElementById("operation").value;
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";
  selectedQuestions = [];

  if (subject === "mathOperation") {
    selectedQuestions = generateMathQuestions(level, operation);
  } else {
    selectedQuestions = quizData[subject][level];
  }

  selectedQuestions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<strong>${i + 1}. ${q.question}</strong>`;

    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");

    q.options.forEach(option => {
      answersDiv.innerHTML += `
        <label>
          <input type="radio" name="q${i}" value="${option}" />
          ${option}
        </label><br/>
      `;
    });

    quizContainer.appendChild(questionDiv);
    quizContainer.appendChild(answersDiv);
  });

  document.getElementById("submit-btn").style.display = "inline-block";
  document.getElementById("quiz-result").innerHTML = "";
}

function submitQuiz() {
  let score = 0;

  selectedQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("quiz-result").innerHTML = `<h3>You scored ${score} out of ${selectedQuestions.length}</h3>`;
}
