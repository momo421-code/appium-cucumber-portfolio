import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf';

/**
 * Profil "web" : tests exécutés sur Chrome mobile (piloté via Appium/Chromedriver
 * sur un émulateur Android), contre le site de démo Sauce Demo
 * (https://www.saucedemo.com), la référence standard de l'écosystème
 * Sauce Labs pour les démos e-commerce en automatisation web.
 *
 * Important : WebdriverIO résout les chemins relatifs (specs, cucumberOpts.require)
 * par rapport au dossier contenant CE fichier de config (./config/), pas par rapport
 * à la racine du projet. On utilise donc __dirname pour pointer explicitement
 * vers la racine (config/ est un niveau en dessous).
 */
const projectRoot = path.join(__dirname, '..');

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: [path.join(projectRoot, 'src/test/features/web/**/*.feature')],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
      browserName: 'Chrome',
      'appium:newCommandTimeout': 240,
    },
  ],
  baseUrl: process.env.WEB_BASE_URL || 'https://www.saucedemo.com',
  cucumberOpts: {
    ...sharedConfig.cucumberOpts,
    require: [
      path.join(projectRoot, 'src/test/step-definitions/web/**/*.ts'),
      ...sharedConfig.cucumberOpts!.require!,
    ],
    tagExpression: '@web',
  },
};