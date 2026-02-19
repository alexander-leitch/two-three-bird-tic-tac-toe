const readline = require('readline');

// Game variables
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the game board
function displayBoard() {
    console.log('\n ' + board[0] + ' | ' + board[1] + ' | ' + board[2] + ' ');
    console.log('---+---+---');
    console.log(' ' + board[3] + ' | ' + board[4] + ' | ' + board[5] + ' ');
    console.log('---+---+---');
    console.log(' ' + board[6] + ' | ' + board[7] + ' | ' + board[8] + ' \n');
}

// Function to check for a win or a draw
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === ' ' || b === ' ' || c === ' ') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        console.log(`Player ${currentPlayer} has won!`);
        gameActive = false;
        rl.close();
        return;
    }

    let roundDraw = !board.includes(' ');
    if (roundDraw) {
        console.log('Game ended in a draw!');
        gameActive = false;
        rl.close();
        return;
    }

    // If no win or draw, switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn();
}

// Function to handle a player's move
function playerTurn() {
    displayBoard();
    rl.question(`Player ${currentPlayer}'s turn. Enter a number 0-8: `, (input) => {
        const position = parseInt(input);

        if (isNaN(position) || position < 0 || position > 8) {
            console.log('Invalid input. Please enter a number between 0 and 8.');
            playerTurn();
        } else if (board[position] !== ' ') {
            console.log('Position already taken. Please choose another one.');
            playerTurn();
        } else {
            board[position] = currentPlayer;
            handleResultValidation();
        }
    });
}

// Start the game
console.log('Welcome to Tic-Tac-Toe!');
playerTurn();
