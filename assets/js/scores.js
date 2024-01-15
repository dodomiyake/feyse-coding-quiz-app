let scoresBtn = document.querySelector(".scores");

// Rank previous scores in order by
// Retrieving scores from localStorage

function printHighScores() {
  let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  highScores.forEach(function (score) {
    let liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;
    let olEl = document.querySelector("#highscores");
    olEl.appendChild(liTag);
  });
}

// Clear previous scores when users click clear
function clearHighScores() {
  window.localStorage.removeItem("highScores");
  window.location.reload();
}
document.querySelector("#clear").onclick = clearHighScores;

printHighScores();
