import { test, expect } from '@playwright/test';
import { LoginPage } from '../main/pageObject/LoginPage';

test('purchase an item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

   // Using Page Object Model - POM
   // const { LoginPage } = require('./pageObject/LoginPage');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.checkShoppingCart();


  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItem = itemsContainer[randomIndex];

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
  const expectedName = await randomItem.locator('.inventory_item_name').innerText();
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Selected item: ${expectedName} -Description: ${expectedDescription} -Price: ${expectedPrice}`);

  //add to cart
  await randomItem.getByRole('button', { name: 'Add to cart' }).click();

  //go to cart
  await page.locator('a.shopping_cart_link').click();

 //  await page.pause();

  expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

   const actualName = await page.locator('.inventory_item_name').innerText();
   const actualDescription = await page.locator('.inventory_item_desc').innerText();
   const actualPrice = await page.locator('.inventory_item_price').innerText();

   expect(actualName).toBe(expectedName);
   expect(actualDescription).toBe(expectedDescription);
   expect(actualPrice).toBe(expectedPrice);

   // Proceder al checkout
   await page.getByRole('button', { name: 'Checkout' }).click();
    // Esperar a que aparezca el formulario y llenarlo
    await expect(page.locator('#checkout_info_container')).toBeVisible();
    console.log('Llenando información de envío...');  
    
    // Llenar el formulario
    await page.fill('[data-test="firstName"]', 'Peter');
    await page.fill('[data-test="lastName"]', 'Parker');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Continuar con la compra
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verificar que llegamos a la página de revisión
    await expect(page.locator('.checkout_summary_container')).toBeVisible();

        await page.getByRole('button', { name: 'Finish' }).click();

        // the following two lines are doing the same.
    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();


   // Cerrar explícitamente la página al final de la prueba
   await page.close();
});
/*
// Do another test to verify that environment variables are working
test('navigate', async ({ page }) => {
  await page.goto(process.env.URL);
  await page.pause();
});
*/

test('Take Screenshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  await loginPage.login('standard_user', 'secret_sauce');
  await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

  for(let item of itemsContainer) {
    console.log(await item.innerText());  
  }
  await page.pause();   
});

test('Take Screenshot Third way', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // it's better to attach the screenshot to the playwright test report than saving it to a file
  await testInfo.attach('screenshot-login', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  await loginPage.login('standard_user', 'secret_sauce');

  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

  await page.pause();   
});