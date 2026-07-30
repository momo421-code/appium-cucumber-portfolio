import BasePage from '../BasePage';

class ProductDetailScreen extends BasePage {
  get productTitle() {
    return '~product-title';
  }
  get addToCartButton() {
    return '~button-ADD TO CART';
  }
  get carouselImage() {
    return '~product-carousel-image';
  }

  async getTitle(): Promise<string> {
    return this.getText(this.productTitle);
  }

  async addToCart(): Promise<void> {
    await this.clickWhenClickable(this.addToCartButton);
  }

  async swipeCarouselLeft(): Promise<void> {
    const el = await $(this.carouselImage);
    await el.waitForDisplayed();
    const location = await el.getLocation();
    const size = await el.getSize();

    // Geste de swipe simulé via W3C actions (compatible Appium 2 / UiAutomator2)
    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: Math.round(location.x + size.width * 0.8), y: Math.round(location.y + size.height / 2) },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 300, x: Math.round(location.x + size.width * 0.2), y: Math.round(location.y + size.height / 2) },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
    await browser.releaseActions();
  }
}

export default new ProductDetailScreen();
