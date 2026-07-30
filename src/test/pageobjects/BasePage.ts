/**
 * Classe de base commune aux page objects natif et web.
 * Centralise les attentes explicites pour éviter les flaky tests
 * (cf. retours d'expérience Cypress du même auteur sur les race conditions).
 */
export default class BasePage {
  async waitForDisplayed(selector: string, timeout = 15000): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
  }

  async clickWhenClickable(selector: string, timeout = 15000): Promise<void> {
    const element = await $(selector);
    await element.waitForClickable({ timeout });
    await element.click();
  }

  async setValue(selector: string, value: string): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed();
    await element.setValue(value);
  }

  async getText(selector: string): Promise<string> {
    const element = await $(selector);
    await element.waitForDisplayed();
    return element.getText();
  }

  async isDisplayed(selector: string): Promise<boolean> {
    const element = await $(selector);
    return element.isDisplayed().catch(() => false);
  }
}
