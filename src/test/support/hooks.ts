import { Before, After, Status } from '@cucumber/cucumber';

/**
 * Hooks globaux, communs aux deux profils (natif et web).
 */
Before(async function () {
  this.expectedTotal = 0;
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await browser.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
});
