import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import InventoryPage from '../../pageobjects/web/InventoryPage';
import CheckoutPage from '../../pageobjects/web/CheckoutPage';
import { CustomWorld } from '../../support/world';

When('je trie les produits par {string}', async function (optionLabel: string) {
  await InventoryPage.sortBy(optionLabel);
});

Then('les produits sont affichés par prix croissant', async function () {
  const prices = await InventoryPage.getDisplayedPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

When('j\'ajoute le produit {string} au panier', async function (this: CustomWorld, name: string) {
  await InventoryPage.addToCart(name);
  this.lastAddedProduct = name;
});

Given('j\'ai ajouté le produit {string} au panier', async function (this: CustomWorld, name: string) {
  await InventoryPage.addToCart(name);
  this.lastAddedProduct = name;
});

Then('le badge du panier affiche {string}', async function (count: string) {
  const badge = await InventoryPage.getCartBadgeCount();
  expect(badge).toBe(count);
});

When('je retire {string} du panier depuis la page produits', async function (name: string) {
  await InventoryPage.removeFromCart(name);
});

Then('le badge du panier n\'est plus affiché', async function () {
  const displayed = await InventoryPage.isCartBadgeDisplayed();
  expect(displayed).toBe(false);
});

When('je passe la commande avec le prénom {string}, le nom {string} et le code postal {string}', async function (
  firstName: string,
  lastName: string,
  postalCode: string
) {
  await InventoryPage.openCart();
  await CheckoutPage.startCheckout();
  await CheckoutPage.fillShippingInfo(firstName, lastName, postalCode);
  await CheckoutPage.finishOrder();
});

Then('la page de confirmation affiche le message {string}', async function (expectedMessage: string) {
  const message = await CheckoutPage.getConfirmationMessage();
  expect(message).toContain(expectedMessage);
});
