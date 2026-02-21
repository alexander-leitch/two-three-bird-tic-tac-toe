import { createGame } from './gameLogic.js';

// DOM elements for the game board
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart');

// Initialize a new game instance
let game = createGame();

/**
 * Renders the current game state to the UI
 * Updates cell contents and status message
 */
function render() {
  // Get current game state
  const state = game.getState();
  
  // Update each cell with the current player's mark
  cells.forEach((cell, index) => {
    cell.textContent = state.gameState[index];
    cell.classList.remove('x', 'o');
    if (state.gameState[index]) {
      cell.classList.add(state.gameState[index].toLowerCase());
    }
  });

  // Update status message based on game state
  if (!state.gameActive) {
    // Game is over - show result
    const lastResult = game.lastResult;
    if (lastResult && lastResult.winner) {
      statusDisplay.textContent = `Player ${lastResult.winner} wins!`;
    } else if (lastResult && lastResult.draw) {
      statusDisplay.textContent = "It's a draw!";
    }
  } else {
    // Game in progress - show current player
    statusDisplay.textContent = `Player ${state.currentPlayer}'s turn`;
  }
}

/**
 * Handles click events on game cells
 * @param {Event} e - Click event object
 */
function handleCellClick(e) {
  const cell = e.target;
  // Get the cell index from data attribute
  const index = parseInt(cell.getAttribute('data-index'));

  // Attempt to make a move and store result
  const result = game.makeMove(index);
  game.lastResult = result;
  render();
}

/**
 * Resets the game to initial state
 */
function restartGame() {
  game = createGame();
  render();
}

// Set up event listeners for game interaction
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Initial render to display the starting board
render();
