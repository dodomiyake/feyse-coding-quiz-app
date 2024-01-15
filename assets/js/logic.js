// DOM Elements
var startButton = document.querySelector("#start");
var questionTitle = document.querySelector("#question-title");
var choicesContainer = document.querySelector("#choices");
var feedbackContainer = document.querySelector("#feedback");
var timerElement = document.querySelector("#time");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var finalScoreElement = document.querySelector("#final-score");
var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;

// Start quiz and hide content of main page and show Questions and Options

function startQuiz() {
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    startTimer();
    getQuestion();
  }

  // Start timer and end quiz when time is less or equal to 0

function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Loop through array of questions and Answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
      let choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = i + 1 + ". " + choice;
      choiceBtn.onclick = checkAnswer;
      choicesContainer.appendChild(choiceBtn);
    });
  }

  // Check for right answers and deduct Time for wrong answer, go to next question

function checkAnswer() {
    if (this.value !== questions[currentQuestionIndex].correctAnswer) {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerElement.textContent = timeLeft;
      feedbackContainer.textContent = `Wrong! The correct answer was  
          ${questions[currentQuestionIndex].correctAnswer}.`;
      feedbackContainer.style.color = "red";
    } else {
      feedbackContainer.textContent = "Correct!";
      feedbackContainer.style.color = "green";
    }
    feedbackContainer.setAttribute("class", "feedback");
    setTimeout(function () {
      feedbackContainer.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
  }