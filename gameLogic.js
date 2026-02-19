export function createGame() {
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    return gameState.every(cell => cell !== '');
  }

  function makeMove(index) {
    if (gameState[index] !== '' || !gameActive) {
      return { success: false };
    }

    gameState[index] = currentPlayer;

    if (checkWin()) {
      gameActive = false;
      return { success: true, winner: currentPlayer, gameOver: true };
    }

    if (checkDraw()) {
      gameActive = false;
      return { success: true, draw: true, gameOver: true };
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return { success: true, currentPlayer, gameOver: false };
  }

  function restart() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
  }

  function getState() {
    return {
      currentPlayer,
      gameState: [...gameState],
      gameActive
    };
  }

  return {
    makeMove,
    restart,
    getState,
    checkWin,
    checkDraw
  };
}
