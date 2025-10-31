import { test, expect } from '@playwright/test';
import { LoginPage } from '../main/pageObject/LoginPage';

// Block images is useful to speed up tests and reduce resource consumption.
test('Purchase an Item 2', async ({ page }) => {

    // Intercept and log all network requests. Get their method and URL.
  await page.on("request", req => {
    console.log(">> Request: " + req.method() + " " + req.url());
  });

  // Block specific image requests
 // await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg", (route) => route.abort());
  //await page.route("https://www.saucedemo.com/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg", (route) => route.abort());

  // Block all .png and .jpg image requests
  await page.route("**/*.(png|jpg|jpeg)", (route) => route.abort());

  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  await loginPage.login('standard_user', 'secret_sauce');
  
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
  await page.screenshot({ path: 'screenshots/itemsDisplayed.png', fullPage: true });
  
});