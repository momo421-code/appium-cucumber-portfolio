import BasePage from '../BasePage';

class CartScreen extends BasePage {
  get cartItems() {
    return '~cart-item';
  }
  get totalPrice() {
    return '~cart-total-price';
  }
  get emptyCartMessage() {
    return '~cart-empty-message';
  }

  removeButtonFor(name: string): string {
    return `//*[contains(@content-desc, "${name}")]//following::*[@content-desc="button-REMOVE"][1]`;
  }

  async removeItem(name: string): Promise<void> {
    await this.clickWhenClickable(this.removeButtonFor(name));
  }

  async getItemPrices(): Promise<number[]> {
    const items = await $$(this.cartItems);
    const prices: number[] = [];
    for (const item of items) {
      const text = await item.getAttribute('content-desc');
      const match = text?.match(/\$([0-9.]+)/);
      if (match) prices.push(parseFloat(match[1]));
    }
    return prices;
  }

  async getTotalPrice(): Promise<number> {
    const text = await this.getText(this.totalPrice);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async isEmpty(): Promise<boolean> {
    return this.isDisplayed(this.emptyCartMessage);
  }
}

export default new CartScreen();
