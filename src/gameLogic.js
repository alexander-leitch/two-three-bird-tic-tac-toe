/**
 * Creates a new Tic-Tac-Toe game instance
 * Uses the module pattern to encapsulate game state
 * @returns {Object} Game API with makeMove, restart, getState, checkWin, checkDraw methods
 */
export function createGame() {
  // Track whose turn it is (X always goes first)
  let currentPlayer = 'X';
  // Array representing the 3x3 game board (indices 0-8)
  let gameState = ['', '', '', '', '', '', '', '', ''];
  // Flag to track if the game is still active
  let gameActive = true;

  // All possible winning combinations (rows, columns, diagonals)
  const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  /**
   * Checks if the current player has won
   * @returns {boolean} True if a winning condition is met
   */
  function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      // Check if all three positions match and are not empty
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the game is a draw (all cells filled with no winner)
   * @returns {boolean} True if game is a draw
   */
  function checkDraw() {
    return gameState.every(cell => cell !== '');
  }

  /**
   * Attempts to place the current player's mark at the given index
   * @param {number} index - Board position (0-8)
   * @returns {Object} Result object with success status and game state info
   */
  function makeMove(index) {
    // Check if move is valid (cell empty and game active)
    if (gameState[index] !== '' || !gameActive) {
      return { success: false };
    }

    // Place the current player's mark
    gameState[index] = currentPlayer;

    // Check for win condition
    if (checkWin()) {
      gameActive = false;
      return { success: true, winner: currentPlayer, gameOver: true };
    }

    // Check for draw condition
    if (checkDraw()) {
      gameActive = false;
      return { success: true, draw: true, gameOver: true };
    }

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return { success: true, currentPlayer, gameOver: false };
  }

  /**
   * Resets the game to its initial state
   */
  function restart() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
  }

  /**
   * Returns a copy of the current game state
   * @returns {Object} Object containing currentPlayer, gameState array, and gameActive flag
   */
  function getState() {
    return {
      currentPlayer,
      gameState: [...gameState],
      gameActive
    };
  }

  // Return public API
  return {
    makeMove,
    restart,
    getState,
    checkWin,
    checkDraw
  };
}
