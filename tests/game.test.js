import { createGame } from '../gameLogic.js';
import { describe, it, expect } from 'vitest';

describe('Tic-Tac-Toe Game Logic', () => {
  describe('initialization', () => {
    it('should start with player X', () => {
      const game = createGame();
      expect(game.getState().currentPlayer).toBe('X');
    });

    it('should start with empty board', () => {
      const game = createGame();
      expect(game.getState().gameState).toEqual(['', '', '', '', '', '', '', '', '']);
    });

    it('should start with game active', () => {
      const game = createGame();
      expect(game.getState().gameActive).toBe(true);
    });
  });

  describe('makeMove', () => {
    it('should place X on the board', () => {
      const game = createGame();
      const result = game.makeMove(0);
      expect(result.success).toBe(true);
      expect(game.getState().gameState[0]).toBe('X');
    });

    it('should switch player after valid move', () => {
      const game = createGame();
      game.makeMove(0);
      expect(game.getState().currentPlayer).toBe('O');
    });

    it('should not allow move on occupied cell', () => {
      const game = createGame();
      game.makeMove(0);
      const result = game.makeMove(0);
      expect(result.success).toBe(false);
    });

    it('should not allow move after game is over', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(3);
      game.makeMove(1);
      game.makeMove(4);
      game.makeMove(2);
      const result = game.makeMove(5);
      expect(result.success).toBe(false);
    });
  });

  describe('winning conditions', () => {
    it('should detect horizontal win', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(3);
      game.makeMove(1);
      game.makeMove(4);
      const result = game.makeMove(2);
      expect(result.winner).toBe('X');
      expect(result.gameOver).toBe(true);
    });

    it('should detect vertical win', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(1);
      game.makeMove(3);
      game.makeMove(4);
      const result = game.makeMove(6);
      expect(result.winner).toBe('X');
    });

    it('should detect diagonal win', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(1);
      game.makeMove(4);
      game.makeMove(2);
      const result = game.makeMove(8);
      expect(result.winner).toBe('X');
    });

    it('should detect O winning', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(3);
      game.makeMove(1);
      game.makeMove(4);
      game.makeMove(8);
      const result = game.makeMove(5);
      expect(result.winner).toBe('O');
    });
  });

  describe('draw conditions', () => {
    it('should detect draw', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(1);
      game.makeMove(2);
      game.makeMove(4);
      game.makeMove(3);
      game.makeMove(5);
      game.makeMove(7);
      game.makeMove(6);
      const result = game.makeMove(8);
      expect(result.draw).toBe(true);
    });
  });

  describe('restart', () => {
    it('should reset game to initial state', () => {
      const game = createGame();
      game.makeMove(0);
      game.makeMove(1);
      game.makeMove(2);
      game.restart();
      expect(game.getState().currentPlayer).toBe('X');
      expect(game.getState().gameState).toEqual(['', '', '', '', '', '', '', '', '']);
      expect(game.getState().gameActive).toBe(true);
    });
  });
});
