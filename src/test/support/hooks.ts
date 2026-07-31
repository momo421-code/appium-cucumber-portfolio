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

    try {
      const pageSource = await browser.getPageSource();
      console.log('----- PAGE SOURCE ON FAILURE (' + scenario.pickle.name + ') -----');
      console.log(pageSource);
      console.log('----- END PAGE SOURCE -----');
    } catch (err) {
      console.log('Could not capture page source:', err);
    }
  }
});
