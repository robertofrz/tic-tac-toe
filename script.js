const display = document.querySelector("#display");
let selected = new Array(9).fill(null);
let currentPlayer;
let positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const restartButton = document
  .querySelector("#restart-btn")
  .addEventListener("click", restartGame);

function restartGame() {
  currentPlayer = "X";
  selected.fill(null);
  updateDisplay();
  document.querySelectorAll(".cell").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
    item.classList.remove("selected");
  });
}

function newMove(e) {
  const index = e.target.getAttribute("data-id");
  e.target.innerHTML = currentPlayer;
  e.target.removeEventListener("click", newMove);
  e.target.classList.add("selected");
  selected[index] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateDisplay();
  winnerOrDraw();
}

function winnerOrDraw() {
  let playerLastMove = currentPlayer === "X" ? "O" : "X";
  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      display.innerHTML = `PLAYER "${playerLastMove}" WON!`;
      document.querySelectorAll(".cell").forEach((item) => {
        item.removeEventListener("click", newMove);
      });
      return;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  display.innerHTML = `CURRENT PLAYER: ${currentPlayer}`;

  if (selected.every((cell) => cell !== undefined && cell !== null)) {
    display.innerHTML = "IT'S A DRAW!";
    return;
  }
}

restartGame();
