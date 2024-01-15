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
      return;
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

    // Add margin to create space between options
    choiceBtn.style.marginBottom = "20px";

    choicesContainer.appendChild(choiceBtn);
  });
}

// function getQuestion() {
//     let currentQuestion = questions[currentQuestionIndex];
//     questionTitle.textContent = currentQuestion.question;
//     choicesContainer.innerHTML = "";

//     currentQuestion.options.forEach(function (choice, i) {
//       let choiceLabel = document.createElement("label");
//       let choiceRadio = document.createElement("input");
//       choiceRadio.setAttribute("type", "radio");
//       choiceRadio.setAttribute("name", "answer");
//       choiceRadio.setAttribute("value", choice);
//       choiceRadio.id = "option" + i;
//       choiceRadio.onclick = checkAnswer;

//       let choiceText = document.createTextNode(choice);

//       choiceLabel.appendChild(choiceRadio);
//       choiceLabel.appendChild(choiceText);

//       // Add for attribute to associate label with radio button
//       choiceLabel.setAttribute("for", "option" + i);

//       // Apply inline styles
//       choiceLabel.style.display = "block";
//       choiceLabel.style.marginBottom = "25px"; // Adjust this value as needed

//       // Set background color for the options
//       choiceLabel.style.backgroundColor = "#e0e0e0"; // Replace with your desired color

//       choicesContainer.appendChild(choiceLabel);
//     });
//   }

// Create an audio element
var correctAudioElement = new Audio("/assets/sfx/correct.wav");

var wrongAudioElement = new Audio("/assets/sfx/incorrect.wav");

// Check for right answers and deduct Time for wrong answer, go to next question

function checkAnswer() {
  if (this.value !== questions[currentQuestionIndex].correctAnswer) {
    wrongAudioElement.play();
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
    feedbackContainer.textContent = `Wrong! The correct answer was  
          ${questions[currentQuestionIndex].correctAnswer}.`;
    feedbackContainer.style.color = "red";
  } else {
    correctAudioElement.play();
    feedbackContainer.textContent = "Correct!";
    feedbackContainer.style.color = "green";
  }
  feedbackContainer.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackContainer.setAttribute("class", "feedback hide");
  }, 500);
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

    // Redirect to highscores page
    window.location.href = "highscores.html";

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
