import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

  private readonly userNameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppingCartIcon: Locator;

  constructor(page: Page) {
    this.userNameTextbox = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.shoppingCartIcon = page.locator('.shopping_cart_link');
   // this.page = page;
   // this.baseURL = 'https://www.saucedemo.com/';
  }


  async login(username: string, password: string) {
    await this.userNameTextbox.click();
    await this.userNameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async checkShoppingCart() {
    // Validate that shopping cart icon is visible
    await expect(this.shoppingCartIcon).toBeVisible();
  }
}