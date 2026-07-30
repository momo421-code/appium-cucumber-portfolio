import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import LoginPage from '../../pageobjects/web/LoginPage';
import InventoryPage from '../../pageobjects/web/InventoryPage';

Given('le site Sauce Demo est ouvert dans Chrome mobile', async function () {
  await LoginPage.open();
  await LoginPage.waitForDisplayed(LoginPage.usernameInput);
});

Given('je suis connecté au site Sauce Demo avec l\'utilisateur {string}', async function (username: string) {
  await LoginPage.open();
  await LoginPage.login(username, 'secret_sauce');
  await InventoryPage.waitForDisplayed(InventoryPage.sortDropdown);
});

When('je me connecte avec l\'utilisateur {string} et le mot de passe {string}', async function (username: string, password: string) {
  await LoginPage.login(username, password);
});

Then('je suis redirigé vers la page des produits', async function () {
  const displayed = await InventoryPage.isDisplayed(InventoryPage.sortDropdown);
  expect(displayed).toBe(true);
});

Then('un message d\'erreur indique que l\'utilisateur a été bloqué', async function () {
  const text = await LoginPage.getErrorText();
  expect(text).toContain('locked out');
});
