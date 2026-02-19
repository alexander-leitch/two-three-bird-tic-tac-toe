import { createGame } from './gameLogic.js';

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let game = createGame();

function render() {
  const state = game.getState();
  cells.forEach((cell, index) => {
    cell.textContent = state.gameState[index];
    cell.classList.remove('x', 'o');
    if (state.gameState[index]) {
      cell.classList.add(state.gameState[index].toLowerCase());
    }
  });

  if (!state.gameActive) {
    const lastResult = game.lastResult;
    if (lastResult && lastResult.winner) {
      statusDisplay.textContent = `Player ${lastResult.winner} wins!`;
    } else if (lastResult && lastResult.draw) {
      statusDisplay.textContent = "It's a draw!";
    }
  } else {
    statusDisplay.textContent = `Player ${state.currentPlayer}'s turn`;
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  const result = game.makeMove(index);
  game.lastResult = result;
  render();
}

function restartGame() {
  game = createGame();
  render();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
render();
