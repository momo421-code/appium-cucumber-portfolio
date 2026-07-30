import BasePage from '../BasePage';

class ProductsScreen extends BasePage {
  get cartBadge() {
    return '~cart-badge';
  }
  get menuButton() {
    return '~open menu';
  }

  productByName(name: string): string {
    return `//*[@content-desc="Products"]//*[contains(@content-desc, "${name}")]`;
  }

  async openProduct(name: string): Promise<void> {
    await this.clickWhenClickable(this.productByName(name));
  }

  async openMenu(): Promise<void> {
    await this.clickWhenClickable(this.menuButton);
  }

  async openMenuItem(label: string): Promise<void> {
    await this.openMenu();
    await this.clickWhenClickable(`~${label}`);
  }

  async openCart(): Promise<void> {
    await this.clickWhenClickable(this.cartBadge);
  }

  async getCartBadgeCount(): Promise<string> {
    return this.getText(this.cartBadge);
  }

  async isCartBadgeDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.cartBadge);
  }
}

export default new ProductsScreen();
