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
var correctAudio = new Audio("../sfx/correct.wav");
var wrongAudio = new Audio("../sfx/incorrect.wav");

// Function to play audio
function playAudio(audio) {
  audio.play();
}

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
    playAudio(wrongAudio);
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
    feedbackContainer.textContent = `Wrong! The correct answer was  
          ${questions[currentQuestionIndex].correctAnswer}.`;
    feedbackContainer.style.color = "red";
  } else {
    playAudio(correctAudio);
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

// End quiz by hiding questions, Stop timer and show final score

function endQuiz() {
  clearInterval(timerInterval);
  endScreen.removeAttribute("class");
  finalScoreElement.textContent = timeLeft;
  questionsScreen.setAttribute("class", "hide");
}

// Save score in local storage along with user's Initial

function saveHighScore() {
  let name = initialsInput.value.trim();
  if (name !== "") {
    let highScores =
      JSON.parse(window.localStorage.getItem("highScores")) || [];
    let newScore = {
      score: timeLeft,
      name: name
    };
    highScores.push(newScore);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    // Clear the initials input field after submitting initials
    initialsInput.value = "";

    alert("Your Score has been Submitted");
  }
}

// Save user's score after pressing enter

function saveScore(event) {
    if (event.key === "Enter") {
      saveHighScore();
      alert("Your Score has been Submitted");
    }
  }
  initialsInput.onkeyup = saveScore;
  
  // Save users' score after clicking submit
  
  submitButton.onclick = saveHighScore;
  
  // Start quiz after clicking Start Quiz button
  
  startButton.onclick = startQuiz;