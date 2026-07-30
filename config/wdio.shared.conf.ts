
/**
 * Configuration commune aux deux profils d'exécution (natif Android / web mobile Android).
 * Les configs spécifiques (wdio.android.native.conf.ts / wdio.android.web.conf.ts)
 * l'étendent et surchargent uniquement les `capabilities` et les `cucumberOpts.tagExpression`.
 *
 * Deux modes de connexion à Appium sont supportés :
 *  - Mode "service local" (par défaut) : @wdio/appium-service démarre/arrête Appium
 *    automatiquement (utilisé en CI, où l'émulateur est déjà lancé par le workflow).
 *  - Mode "serveur externe" (docker-compose) : si APPIUM_HOST est défini, WebdriverIO
 *    se connecte directement au conteneur docker-android qui embarque déjà
 *    Appium + un émulateur Android prêt à l'emploi. Voir `docker-compose.yml`.
 */

import path from 'node:path';

const projectRoot = path.join(__dirname, '..');

const useExternalAppium = Boolean(process.env.APPIUM_HOST);

export const config: WebdriverIO.Config = {
  runner: 'local',

  // Surchargé par chaque profil (wdio.android.native.conf.ts / wdio.android.web.conf.ts).
  capabilities: [],

  hostname: process.env.APPIUM_HOST || 'localhost',
  port: Number(process.env.APPIUM_PORT) || 4723,
  path: process.env.APPIUM_PATH || '/',

  // En mode docker-compose, Appium tourne déjà dans le conteneur : pas besoin
  // du service local qui tenterait de démarrer un second serveur Appium.
  services: useExternalAppium
    ? []
    : [
        [
          'appium',
          {
            command: 'appium',
            args: {
              address: 'localhost',
              port: 4723,
              allowInsecure: 'chromedriver_autodownload',
            },
            logPath: './reports/appium-logs/',
          },
        ],
      ],

  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: './reports/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: [path.join(projectRoot, 'src/test/support/**/*.ts')],
    requireModule: ['ts-node/register'],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 90000,
    ignoreUndefinedDefinitions: false,
  },

  // Screenshot automatique sur échec, quel que soit le profil.
  afterStep: async function (_step, _scenario, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
