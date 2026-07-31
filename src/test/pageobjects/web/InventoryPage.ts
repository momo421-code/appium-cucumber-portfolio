import BasePage from '../BasePage';

class InventoryPage extends BasePage {
  get sortDropdown() {
    return '[data-test="product-sort-container"]';
  }
  get inventoryItems() {
    return '.inventory_item';
  }
  get itemPrices() {
    return '.inventory_item_price';
  }
  get cartBadge() {
    return '.shopping_cart_badge';
  }
  get cartLink() {
    return '.shopping_cart_link';
  }

  addToCartButtonFor(name: string): string {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="add-to-cart-${slug}"]`;
  }

  removeButtonFor(name: string): string {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="remove-${slug}"]`;
  }

  async sortBy(optionLabel: string): Promise<void> {
    const dropdown = await $(this.sortDropdown);
    await dropdown.waitForDisplayed();
    await dropdown.selectByVisibleText(optionLabel);
  }

  async getDisplayedPrices(): Promise<number[]> {
    const elements = await $$(this.itemPrices);
    const prices: number[] = [];
    for (const el of elements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async addToCart(name: string): Promise<void> {
    const alreadyInCart = await this.isDisplayed(this.removeButtonFor(name));
    if (alreadyInCart) {
      return;
    }
    await this.clickWhenClickable(this.addToCartButtonFor(name));
  }

  async removeFromCart(name: string): Promise<void> {
    await this.clickWhenClickable(this.removeButtonFor(name));
  }

  async isCartBadgeDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.cartBadge);
  }

  async getCartBadgeCount(): Promise<string> {
    return this.getText(this.cartBadge);
  }

  async openCart(): Promise<void> {
    await this.clickWhenClickable(this.cartLink);
  }
}

export default new InventoryPage();
