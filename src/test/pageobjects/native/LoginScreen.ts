import BasePage from '../BasePage';

/**
 * Selectors basés sur les accessibility ids (testID) exposés par
 * l'app open-source Sauce Labs "My Demo App" (React Native).
 * À confirmer/ajuster avec Appium Inspector lors du premier run réel,
 * les ids peuvent varier légèrement selon la version de l'APK.
 */
class LoginScreen extends BasePage {
  get emailInput() {
    return '~input-email';
  }
  get passwordInput() {
    return '~input-password';
  }
  get loginButton() {
    return '~button-LOGIN';
  }
  get errorMessage() {
    return '~generic-error-message';
  }

  async login(email: string, password: string): Promise<void> {
    await this.setValue(this.emailInput, email);
    await this.setValue(this.passwordInput, password);
    await this.clickWhenClickable(this.loginButton);
  }

  async getErrorText(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}

export default new LoginScreen();
