import { test, expect } from '@playwright/test';

test('has products', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.getByText('Products: 20')).toBeVisible();
  await expect(page.getByText('20 products found, averaging: $162.05')).toBeVisible();
});

test('search functionality filters products', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Products: 20')).toBeVisible();

  await page.getByPlaceholder('Search').fill('White Gold Plated Princess');

  await expect(page.getByText('Products: 3')).toBeVisible();
  await expect(page.getByText('3 products found, averaging: $58.66')).toBeVisible();
});

test('toggle products by price', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Products: 20')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Ascending' })).toBeVisible();
  await page.getByRole('button', { name: 'Ascending' }).click();
  await expect(page.getByRole('button', { name: 'Descending' })).toBeVisible();
});