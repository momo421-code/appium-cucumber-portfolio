import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import LoginScreen from '../../pageobjects/native/LoginScreen';
import ProductsScreen from '../../pageobjects/native/ProductsScreen';


Given('l\'application native est lancée sur l\'écran de connexion', async function () {
  await ProductsScreen.waitForDisplayed(ProductsScreen.screenTitle);
  await ProductsScreen.openMenuItem('Log In');
  await LoginScreen.waitForDisplayed(LoginScreen.emailInput);
});

Given('je suis connecté à l\'application native avec un compte valide', async function () {
  await ProductsScreen.waitForDisplayed(ProductsScreen.screenTitle);
  await ProductsScreen.openMenuItem('Log In');
  await LoginScreen.waitForDisplayed(LoginScreen.emailInput);
  await LoginScreen.login('bob@example.com', '10203040');
  await ProductsScreen.waitForDisplayed(ProductsScreen.screenTitle);
});

When('je me connecte avec l\'email {string} et le mot de passe {string}', async function (email: string, password: string) {
  await LoginScreen.login(email, password);
});

Then('je suis redirigé vers l\'écran du catalogue de produits', async function () {
  const displayed = await ProductsScreen.isDisplayed(ProductsScreen.screenTitle);
  expect(displayed).toBe(true);
});

Then('un message d\'erreur {string} s\'affiche', async function (expectedMessage: string) {
  const text = await LoginScreen.getErrorText();
  expect(text).toContain(expectedMessage);
});

Then('un message d\'erreur de format d\'email s\'affiche', async function () {
  const text = await LoginScreen.getErrorText();
  expect(text.length).toBeGreaterThan(0);
});