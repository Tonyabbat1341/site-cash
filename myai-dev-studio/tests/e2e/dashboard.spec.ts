import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - in a real test, you'd set up proper auth
    await page.goto('/');
  });

  test('should display all main sections', async ({ page }) => {
    // Should show header with title
    await expect(page.getByText('MyAI Dev Studio')).toBeVisible();
    
    // Should show tabs
    await expect(page.getByText('Agents IA')).toBeVisible();
    await expect(page.getByText('Projets')).toBeVisible();
    await expect(page.getByText('Workflows')).toBeVisible();
    await expect(page.getByText('Paramètres')).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    // Click on Projects tab
    await page.getByText('Projets').click();
    await expect(page.getByText('Mes Projets')).toBeVisible();
    
    // Click on Workflows tab
    await page.getByText('Workflows').click();
    await expect(page.getByText('Workflow Builder')).toBeVisible();
    
    // Click on Settings tab
    await page.getByText('Paramètres').click();
    await expect(page.getByText('Profil utilisateur')).toBeVisible();
  });

  test('should display agent cards', async ({ page }) => {
    // Should be on agents tab by default
    await expect(page.getByText('Agents IA Spécialisés')).toBeVisible();
    
    // Should show agent cards
    await expect(page.getByText('Frontend Pro')).toBeVisible();
    await expect(page.getByText('Backend Pro')).toBeVisible();
    await expect(page.getByText('Debugger')).toBeVisible();
    await expect(page.getByText('Automatiser')).toBeVisible();
    await expect(page.getByText('Architecte')).toBeVisible();
  });
});