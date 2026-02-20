# Tic-Tac-Toe

A simple browser-based Tic-Tac-Toe game with unit and e2e tests.

## Prerequisites

- Node.js 20.14.0 (recommended to use [nvm](https://github.com/nvm-sh/nvm))

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:alexander-leitch/two-three-bird-tic-tac-toe.git
   cd two-three-bird-tic-tac-toe
   ```

2. If using nvm, switch to the correct Node.js version:
   ```bash
   nvm use
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

### Local Development

Open the game in your browser:

```bash
npm start
```

Or manually open `index.html` in your browser.

### Using a Dev Server

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

### Command Line Version

You can also play the game directly in your terminal using the Node.js CLI:

```bash
node cli-tictactoe.js
```

## Running Tests

### Unit Tests

Run unit tests with Vitest:

```bash
npm test
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run test:e2e
```

### All Tests

Both test suites run automatically on push/PR to main via GitHub Actions.

## GitHub Pages Deployment

The game is automatically deployed to GitHub Pages when tests pass on the main branch.

To enable GitHub Pages:

1. Go to repository Settings > Pages
2. Under "Source", select "GitHub Actions"
3. Push to main branch - the workflow will deploy automatically

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Game styles
├── game.js             # UI logic
├── gameLogic.js        # Core game logic
├── cli-tictactoe.js    # Command-line game version
├── tests/
│   ├── game.test.js    # Unit tests
│   └── e2e/
│       └── game.spec.js # E2E tests
└── .github/
    └── workflows/
        └── tests.yml   # CI/CD workflow
```

## How to Play

1. The game starts with Player X
2. Click on any empty cell to place your mark
3. Players alternate turns (X, then O)
4. First player to get 3 in a row (horizontal, vertical, or diagonal) wins
5. Click "Restart Game" to start a new game
