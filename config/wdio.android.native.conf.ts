import { config as sharedConfig } from './wdio.shared.conf';

/**
 * Profil "native" : tests exécutés sur l'application Android open-source
 * Sauce Labs "My Demo App" (e-commerce factice), utilisée comme référence
 * standard dans l'écosystème Appium pour les démos et tutoriels.
 * APK : https://github.com/saucelabs/my-demo-app-android/releases
 */
export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ['./src/test/features/native/**/*.feature'],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
      'appium:app': process.env.ANDROID_APP_PATH || './apps/my-demo-app-android.apk',
      'appium:appPackage': 'com.saucelabs.mydemoapp.rn',
      'appium:appActivity': '.MainActivity',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  ],
  cucumberOpts: {
    ...sharedConfig.cucumberOpts,
    require: ['./src/test/step-definitions/native/**/*.ts', ...sharedConfig.cucumberOpts!.require!],
    tagExpression: '@native',
  },
};
