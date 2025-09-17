let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  clickedCell.disabled = true;
  checkResult();
}

function checkResult() {
  let roundWon = false;
  let winningCombination = null;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombination = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    highlightWinningCells(winningCombination);
    scores[currentPlayer]++;
    updateScoreDisplay();
    gameActive = false;
    disableAllCells();
    return;
  }

  if (!board.includes('')) {
    statusDisplay.textContent = "It's a draw!";
    scores.draw++;
    updateScoreDisplay();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(winningCombination) {
  winningCombination.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function disableAllCells() {
  cells.forEach(cell => {
    cell.disabled = true;
  });
}

function updateScoreDisplay() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'winner');
  });
}

function resetScore() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScoreDisplay();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateScoreDisplay();
