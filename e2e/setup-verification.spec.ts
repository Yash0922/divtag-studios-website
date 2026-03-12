import { test, expect } from '@playwright/test';

/**
 * Setup verification test
 * Ensures Playwright is configured correctly and can access the application
 */
test.describe('Playwright Setup Verification', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Verify the page loads successfully
    await expect(page).toHaveTitle(/Div Tag Studios/);
  });

  test('should have correct viewport dimensions', async ({ page, viewport }) => {
    // Verify viewport is set correctly
    expect(viewport).toBeTruthy();
    expect(viewport?.width).toBeGreaterThan(0);
    expect(viewport?.height).toBeGreaterThan(0);
  });
});
