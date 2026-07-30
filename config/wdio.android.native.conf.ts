import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf';

/**
 * Profil "native" : tests exécutés sur l'application Android open-source
 * Sauce Labs "My Demo App" (e-commerce factice), utilisée comme référence
 * standard dans l'écosystème Appium pour les démos et tutoriels.
 * APK : https://github.com/saucelabs/my-demo-app-android/releases
 *
 * Important : WebdriverIO résout les chemins relatifs (specs, cucumberOpts.require)
 * par rapport au dossier contenant CE fichier de config (./config/), pas par rapport
 * à la racine du projet. On utilise donc __dirname pour pointer explicitement
 * vers la racine (config/ est un niveau en dessous).
 */
const projectRoot = path.join(__dirname, '..');

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: [path.join(projectRoot, 'src/test/features/native/**/*.feature')],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
      'appium:app': process.env.ANDROID_APP_PATH || path.join(projectRoot, 'apps/my-demo-app-android.apk'),
      'appium:appPackage': 'com.saucelabs.mydemoapp.rn',
      'appium:appActivity': '.MainActivity',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  ],
  cucumberOpts: {
    ...sharedConfig.cucumberOpts,
    require: [
      path.join(projectRoot, 'src/test/step-definitions/native/**/*.ts'),
      ...sharedConfig.cucumberOpts!.require!,
    ],
    tagExpression: '@native',
  },
};