import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Test 3', async ({ page }) => {

  await page.goto('https://www.mercadolibre.com.co/');
  //await expect(page).toHaveTitle(/Mercado Libre Colombia - Donde comprar y vender de todo/);
  await page.locator('input[id=cb1-edit]').fill('Iphone 15');
  await page.keyboard.press('Enter');
 // await page.locator('button[type=submit]').click();

  await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible();

  const titles = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//h3").allInnerTexts();

  console.log('The number of titles are: ' + titles.length);
  for (const title of titles) {
    console.log('The Title is: ' + title);
  }
});

// Validate that prices are displayed correctly in search results
test('Test 4', async ({ page }) => {

  await page.goto('https://www.mercadolibre.com.co/');
  
  await page.locator('input[id=cb1-edit]').fill('Iphone 15');
  await page.keyboard.press('Enter');

  // Wait for search results to load
  await page.waitForURL(/.*\/iphone-15.*/);
  
  // Validate that the results list is visible
  await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible();

  // Get and save all product prices from the first page
  const prices = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//div/span/span[@class='andes-money-amount__fraction']").allInnerTexts();
  
  // Display the number of prices found in console
  console.log('The number of prices are: ' + prices.length);
  
  // Display each individual price
  for (const price of prices) {
    console.log('The Price is: ' + price);
  }
});