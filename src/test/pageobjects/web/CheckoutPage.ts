import BasePage from '../BasePage';

class CheckoutPage extends BasePage {
  get checkoutButton() {
    return '[data-test="checkout"]';
  }
  get firstNameInput() {
    return '[data-test="firstName"]';
  }
  get lastNameInput() {
    return '[data-test="lastName"]';
  }
  get postalCodeInput() {
    return '[data-test="postalCode"]';
  }
  get continueButton() {
    return '[data-test="continue"]';
  }
  get finishButton() {
    return '[data-test="finish"]';
  }
  get confirmationHeader() {
    return '.complete-header';
  }

  async startCheckout(): Promise<void> {
    await this.clickWhenClickable(this.checkoutButton);
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.setValue(this.firstNameInput, firstName);
    await this.setValue(this.lastNameInput, lastName);
    await this.setValue(this.postalCodeInput, postalCode);
    await this.clickWhenClickable(this.continueButton);
  }

  async finishOrder(): Promise<void> {
    await this.clickWhenClickable(this.finishButton);
  }

  async getConfirmationMessage(): Promise<string> {
    return this.getText(this.confirmationHeader);
  }
}

export default new CheckoutPage();
