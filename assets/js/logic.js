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
  