const quizData = {
    math: {
      beginner: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          answer: "4"
        },
        {
          question: "What is 5 - 3?",
          options: ["1", "2", "3", "4"],
          answer: "2"
        }
      ],
      intermediate: [
        {
          question: "What is 12 x 3?",
          options: ["36", "30", "33", "39"],
          answer: "36"
        },
        {
          question: "What is 100 / 4?",
          options: ["20", "25", "30", "40"],
          answer: "25"
        }
      ],
      advanced: [
        {
          question: "Solve: 2x + 3 = 9",
          options: ["x=1", "x=2", "x=3", "x=4"],
          answer: "x=3"
        },
        {
          question: "What is the derivative of x^2?",
          options: ["x", "2x", "x^2", "2"],
          answer: "2x"
        }
      ]
    },
    Geography: {
        beginner: [
          {
            question: "1. What is the largest of the seven continents?",
            options: ["Europe", "Asia", "South America"],
            answer: "Asia"
          },
          {
            question: "2. Which of the following is not a part of Antarctica?",
            options: ["The Arctic Circle", "The Vinson Massif", "The Ross Ice Shelf"],
            answer: "The Vinson Massif"
          }
          ,
          {
            question: "3 .Which continent has the same name as a country?",
            options: ["Asia", "Europe", "Africa"],
            answer: "Europe"
          }
          ,
          {
            question: "4 .This continent is very cold. No one lives there all the time. What is it called?",
            options: ["Antarctica", "Asia", "South America"],
            answer: "Antarctica"
          }
          ,
          {
            question: "5. How many continents are there?",
            options: ["3", "7", "11","6"],
            answer: "7"
          }
        ],
        intermediate: [
          {
            question: "Which of these islands is a part of the Australian continent?",
            options: [" Sri Lanka", "Madagascar", "Tasmania"],
            answer: "Tasmania"
          },
          {
            question: "What is 100 / 4?",
            options: ["20", "25", "30", "40"],
            answer: "25"
          }
        ],
        advanced: [
          {
            question: "Solve: 2x + 3 = 9",
            options: ["x=1", "x=2", "x=3", "x=4"],
            answer: "x=3"
          },
          {
            question: "What is the derivative of x^2?",
            options: ["x", "2x", "x^2", "2"],
            answer: "2x"
          }
        ]
      },

    science: {
      beginner: [
        {
          question: "What planet do we live on?",
          options: ["Mars", "Earth", "Venus", "Jupiter"],
          answer: "Earth"
        },
        {
          question: "Water freezes at ___ °C?",
          options: ["0", "100", "10", "-5"],
          answer: "0"
        }
      ],
      intermediate: [
        {
          question: "What gas do plants absorb?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          answer: "Carbon Dioxide"
        },
        {
          question: "How many bones in adult human body?",
          options: ["206", "205", "208", "210"],
          answer: "206"
        }
      ],
      advanced: [
        {
          question: "What is the chemical symbol for gold?",
          options: ["Gd", "Au", "Ag", "Go"],
          answer: "Au"
        },
        {
          question: "What is Newton's Third Law?",
          options: [
            "For every action, there is an equal and opposite reaction",
            "F = ma",
            "Objects in motion stay in motion",
            "Energy is conserved"
          ],
          answer: "For every action, there is an equal and opposite reaction"
        }
      ]
    }
  };
  
  let selectedQuestions = [];
  
  function startQuiz() {
    const subject = document.getElementById("subject").value;
    const level = document.getElementById("level").value;
  
    selectedQuestions = quizData[subject][level];
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
  
    selectedQuestions.forEach((q, i) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `<strong>${i + 1}. ${q.question}</strong>`;
  
      const answersDiv = document.createElement("div");
      answersDiv.classList.add("answers");
  
      q.options.forEach(option => {
        const id = `q${i}_${option}`;
        answersDiv.innerHTML += `
          <label>
            <input type="radio" name="q${i}" value="${option}" id="${id}" />
            ${option}
          </label><br/>
        `;
      });
  
      quizContainer.appendChild(questionDiv);
      quizContainer.appendChild(answersDiv);
    });
  
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("result").innerHTML = "";
  }
  
  function submitQuiz() {
    let score = 0;
  
    selectedQuestions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });
  
    document.getElementById("result").innerHTML = `<h3>You scored ${score} out of ${selectedQuestions.length}</h3>`;
  }
  
 