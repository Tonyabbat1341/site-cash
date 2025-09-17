import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Should show login form
    await expect(page.getByText('MyAI Dev Studio')).toBeVisible();
    await expect(page.getByText('Connectez-vous à votre compte')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
  });

  test('should show sign up form when clicking sign up', async ({ page }) => {
    await page.goto('/');
    
    // Click on sign up link
    await page.getByText('Créer un compte').click();
    
    // Should show sign up form
    await expect(page.getByText('Créez votre compte')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Créer le compte' })).toBeVisible();
  });

  test('should validate email field', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit without email
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Should show validation error
    await expect(page.getByDisplayValue('')).toBeInvalid();
  });
});