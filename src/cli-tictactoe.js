import readline from 'readline';

// Game state variables
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
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

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Displays the current state of the game board to the console
 */
function displayBoard() {
    console.log('\n ' + board[0] + ' | ' + board[1] + ' | ' + board[2] + ' ');
    console.log('---+---+---');
    console.log(' ' + board[3] + ' | ' + board[4] + ' | ' + board[5] + ' ');
    console.log('---+---+---');
    console.log(' ' + board[6] + ' | ' + board[7] + ' | ' + board[8] + ' \n');
}

/**
 * Checks for win or draw conditions after each move
 * Handles game end scenarios or switches to next player
 */
function handleResultValidation() {
    let roundWon = false;
    
    // Check each winning condition
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        
        // Skip if any position is empty
        if (a === ' ' || b === ' ' || c === ' ') {
            continue;
        }
        // Check if all three positions match
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Handle win condition
    if (roundWon) {
        console.log(`Player ${currentPlayer} has won!`);
        gameActive = false;
        rl.close();
        return;
    }

    // Check for draw (board full with no winner)
    let roundDraw = !board.includes(' ');
    if (roundDraw) {
        console.log('Game ended in a draw!');
        gameActive = false;
        rl.close();
        return;
    }

    // No win or draw - switch players and continue
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn();
}

/**
 * Prompts the current player for their move
 * Validates input and updates the board
 */
function playerTurn() {
    displayBoard();
    rl.question(`Player ${currentPlayer}'s turn. Enter a number 1-9: `, (input) => {
        const position = parseInt(input);

        // Validate input is a number between 1-9
        if (isNaN(position) || position < 1 || position > 9) {
            console.log('Invalid input. Please enter a number between 1 and 9.');
            playerTurn();
        // Check if position is already taken
        } else if (board[position - 1] !== ' ') {
            console.log('Position already taken. Please choose another one.');
            playerTurn();
        // Valid move - update board and check for win/draw
        } else {
            board[position - 1] = currentPlayer;
            handleResultValidation();
        }
    });
}

// Start the game
console.log('Welcome to Tic-Tac-Toe!');
playerTurn();
