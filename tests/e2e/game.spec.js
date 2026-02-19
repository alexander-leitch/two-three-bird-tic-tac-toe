import { test, expect } from '@playwright/test';

test.describe('Tic-Tac-Toe Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial state', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Tic-Tac-Toe');
    await expect(page.locator('#status')).toHaveText("Player X's turn");
  });

  test('should place X on click', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await expect(page.locator('[data-index="0"]')).toHaveText('X');
    await expect(page.locator('#status')).toHaveText("Player O's turn");
  });

  test('should alternate between X and O', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await page.locator('[data-index="1"]').click();
    await expect(page.locator('[data-index="0"]')).toHaveText('X');
    await expect(page.locator('[data-index="1"]')).toHaveText('O');
    await expect(page.locator('#status')).toHaveText("Player X's turn");
  });

  test('should not allow move on occupied cell', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await page.locator('[data-index="0"]').click();
    await expect(page.locator('#status')).toHaveText("Player O's turn");
  });

  test('should detect X winning', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await page.locator('[data-index="3"]').click();
    await page.locator('[data-index="1"]').click();
    await page.locator('[data-index="4"]').click();
    await page.locator('[data-index="2"]').click();
    await expect(page.locator('#status')).toHaveText('Player X wins!');
  });

  test('should detect O winning', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await page.locator('[data-index="3"]').click();
    await page.locator('[data-index="1"]').click();
    await page.locator('[data-index="4"]').click();
    await page.locator('[data-index="8"]').click();
    await page.locator('[data-index="5"]').click();
    await expect(page.locator('#status')).toHaveText('Player O wins!');
  });

  test('should restart game', async ({ page }) => {
    await page.locator('[data-index="0"]').click();
    await page.locator('[data-index="1"]').click();
    await page.locator('#restart').click();
    await expect(page.locator('#status')).toHaveText("Player X's turn");
    await expect(page.locator('[data-index="0"]')).toHaveText('');
    await expect(page.locator('[data-index="1"]')).toHaveText('');
  });
});
