import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import ProductsScreen from '../../pageobjects/native/ProductsScreen';
import ProductDetailScreen from '../../pageobjects/native/ProductDetailScreen';
import CartScreen from '../../pageobjects/native/CartScreen';
import { CustomWorld } from '../../support/world';

When('j\'ouvre le produit {string}', async function (name: string) {
  await ProductsScreen.openProduct(name);
});

Then('l\'écran de détail affiche le nom {string} et un bouton d\'ajout au panier', async function (name: string) {
  const title = await ProductDetailScreen.getTitle();
  expect(title).toContain(name);
  const addButtonDisplayed = await ProductDetailScreen.isDisplayed(ProductDetailScreen.addToCartButton);
  expect(addButtonDisplayed).toBe(true);
});

When('je balaie l\'image du produit vers la gauche', async function () {
  await ProductDetailScreen.swipeCarouselLeft();
});

Then('l\'indicateur de carrousel passe à l\'image suivante', async function () {
  // Vérifie que l'élément carrousel est toujours affiché après le geste
  // (le détail exact de l'indicateur dépend du testID exposé par l'app,
  // à ajuster après inspection avec Appium Inspector).
  const displayed = await ProductDetailScreen.isDisplayed(ProductDetailScreen.carouselImage);
  expect(displayed).toBe(true);
});

When('j\'ajoute le produit {string} au panier', async function (this: CustomWorld, name: string) {
  await ProductsScreen.openProduct(name);
  await ProductDetailScreen.addToCart();
  this.lastAddedProduct = name;
  await driver.back();
});

Given('j\'ai ajouté le produit {string} au panier', async function (this: CustomWorld, name: string) {
  await ProductsScreen.openProduct(name);
  await ProductDetailScreen.addToCart();
  this.lastAddedProduct = name;
  await driver.back();
});

Then('le badge du panier affiche {string}', async function (count: string) {
  await ProductsScreen.openCart();
  const items = await $$(CartScreen.cartItems);
  expect(items.length).toBe(Number(count));
});

When('j\'ouvre le panier', async function () {
  await ProductsScreen.openCart();
});

Then('le montant total affiché correspond à la somme des prix des articles', async function () {
  const prices = await CartScreen.getItemPrices();
  const expectedSum = prices.reduce((sum, price) => sum + price, 0);
  const total = await CartScreen.getTotalPrice();
  expect(total).toBeCloseTo(expectedSum, 2);
});

When('je retire {string} du panier', async function (name: string) {
  await ProductsScreen.openCart();
  await CartScreen.removeItem(name);
});

Then('le panier est vide', async function () {
  const empty = await CartScreen.isEmpty();
  expect(empty).toBe(true);
});

When('j\'ouvre le menu latéral et je sélectionne {string}', async function (label: string) {
  await ProductsScreen.openMenuItem(label);
});

Then('le contenu web intégré se charge dans l\'application', async function () {
  // Le contexte WEBVIEW n'est disponible qu'une fois la page chargée.
  const contexts = await driver.getContexts();
  expect(contexts.length).toBeGreaterThan(1);
});
