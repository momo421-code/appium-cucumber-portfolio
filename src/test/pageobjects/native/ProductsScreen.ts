import BasePage from '../BasePage';


class ProductsScreen extends BasePage {
  get screenTitle() {
    return '~title'; // content-desc="title", resource-id=".../productTV", text="Products"
  }
  get menuButton() {
    return '~View menu'; // resource-id=".../menuIV"
  }
  get sortButton() {
    return '~Shows current sorting order and displays available sorting options'; // resource-id=".../sortIV"
  }
  get cartButton() {
    return '~View cart'; // resource-id=".../cartRL", conteneur cliquable du panier
  }
  get cartIcon() {
    return '~Displays number of items in your cart'; // resource-id=".../cartIV"
  }


  productImageByName(name: string): string {
    return `//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV" and @text="${name}"]/preceding-sibling::android.widget.ImageView[@resource-id="com.saucelabs.mydemoapp.android:id/productIV"]`;
  }

  async openProduct(name: string): Promise<void> {
    await this.clickWhenClickable(this.productImageByName(name));
  }

  async openMenu(): Promise<void> {
    await this.clickWhenClickable(this.menuButton);
  }

  async openMenuItem(label: string): Promise<void> {
    await this.openMenu();
    await this.clickWhenClickable(`~${label}`);
  }

  async openCart(): Promise<void> {
    await this.clickWhenClickable(this.cartButton);
  }

  async isCartIconDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.cartIcon);
  }
}

export default new ProductsScreen();