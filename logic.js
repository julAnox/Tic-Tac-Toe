let board = Array(9).fill(null);
let currentPlayer = "X";
let winningCombo = null;

function handleClick(index) {
  if (board[index] === null && !winningCombo) {
    board[index] = currentPlayer;
    const result = checkWinner();
    if (result.winner) {
      if (result.winner === "tie") {
        setStatus("Ничья!");
      } else {
        setStatus(`Победитель: ${result.winner}`);
        winningCombo = result.winningCombo;
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    render();
  }
}

function render() {
  const items = document.querySelectorAll(".item");
  items.forEach((item, index) => {
    item.textContent = board[index];
    item.style.color = board[index] === "O" ? "white" : "black";
    if (winningCombo && winningCombo.includes(index)) {
      item.style.backgroundColor = "lightgreen";
    } else {
      item.style.backgroundColor = "";
    }
  });
}

function setStatus(message) {
  const statusElement = document.getElementById("status");
  statusElement.textContent = message;
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningCombo: condition };
    }
  }

  for (let cell of board) {
    if (cell === null) {
      return { winner: null, winningCombo: null };
    }
  }

  return { winner: "tie", winningCombo: null };
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  winningCombo = null;
  render();
  setStatus("");
}

document.querySelectorAll(".item").forEach((item, index) => {
  item.addEventListener("click", () => handleClick(index));
});

document.getElementById("reset").addEventListener("click", resetGame);

render();
