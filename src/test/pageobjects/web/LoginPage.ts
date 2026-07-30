import BasePage from '../BasePage';

/**
 * Selectors basés sur les data-test attributes exposés par saucedemo.com,
 * conçu spécifiquement pour l'entraînement à l'automatisation
 * (attributs stables, pas de risque de dépendre de classes CSS changeantes).
 */
class LoginPage extends BasePage {
  get usernameInput() {
    return '[data-test="username"]';
  }
  get passwordInput() {
    return '[data-test="password"]';
  }
  get loginButton() {
    return '[data-test="login-button"]';
  }
  get errorMessage() {
    return '[data-test="error"]';
  }

  async open(): Promise<void> {
    await browser.url('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
    await this.clickWhenClickable(this.loginButton);
  }

  async getErrorText(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}

export default new LoginPage();
