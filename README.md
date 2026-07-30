# 📱 Appium + Cucumber + TypeScript — Mobile Test Automation Portfolio

[![CI](https://github.com/<your-username>/appium-cucumber-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-username>/appium-cucumber-portfolio/actions/workflows/ci.yml)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9-EA5906?logo=webdriverio)
![Appium](https://img.shields.io/badge/Appium-2-purple?logo=appium)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A BDD mobile test automation framework demonstrating **native app** and **mobile web**
testing with a single, consistent toolchain: **Appium 2**, **WebdriverIO**, **Cucumber
(Gherkin)** and **TypeScript**.

Built as a portfolio project by a QA automation engineer with a production background in
Cypress/Cucumber/TypeScript E2E testing (see the companion
[k6 performance testing portfolio](https://github.com/<your-username>/k6-performance-testing-portfolio)),
extended here to cover mobile.

---

## Why this project

Most portfolios show a single happy-path script against one demo app. This one is built
to look like a real, small-scale test framework:

- **Two test targets, one framework** — a native Android app and a mobile web site,
  run through the same Appium/WebdriverIO/Cucumber stack, with dedicated config profiles.
- **Page Object Model** with a shared `BasePage` (explicit waits everywhere — no
  hard-coded sleeps, no flaky `cy.each()`-style anti-patterns).
- **15 Gherkin scenarios** covering authentication, browsing, gestures (swipe), cart
  management, price calculation, checkout, and navigation.
- **CI on real emulators** — GitHub Actions spins up an actual Android emulator
  (`reactivecircus/android-emulator-runner`) to run both suites headlessly, then
  publishes an aggregated **Allure** report as a build artifact.

## Tech stack

| Layer               | Choice                                             |
| ------------------- | --------------------------------------------------- |
| Automation driver   | Appium 2 (UiAutomator2 driver + Chromedriver)        |
| Test runner         | WebdriverIO 9 (`@wdio/cli`, local runner)             |
| BDD framework       | Cucumber.js (Gherkin `.feature` files)                |
| Language            | TypeScript (strict mode)                              |
| Reporting           | Allure (per-step results, screenshots on failure)      |
| CI/CD               | GitHub Actions, Android emulator runner               |

## Targets under test

| Profile  | Target                                                                 | Why this app                                                                 |
| -------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `native` | [Sauce Labs "My Demo App"](https://github.com/saucelabs/my-demo-app-android) (Android APK) | Open-source e-commerce demo app, the de-facto standard for Appium tutorials/demos |
| `web`    | [saucedemo.com](https://www.saucedemo.com) via Chrome mobile             | Purpose-built demo store with stable `data-test` attributes, standard for web automation training |

## Project structure

```
appium-cucumber-portfolio/
├── apps/                          # Android APK goes here (gitignored)
├── config/
│   ├── wdio.shared.conf.ts        # Common WebdriverIO/Cucumber options
│   ├── wdio.android.native.conf.ts
│   └── wdio.android.web.conf.ts
├── src/test/
│   ├── features/
│   │   ├── native/                # login.feature, catalog-and-cart.feature
│   │   └── web/                   # login.feature, shopping.feature
│   ├── pageobjects/
│   │   ├── BasePage.ts
│   │   ├── native/                # LoginScreen, ProductsScreen, ProductDetailScreen, CartScreen
│   │   └── web/                   # LoginPage, InventoryPage, CheckoutPage
│   ├── step-definitions/
│   │   ├── native/
│   │   └── web/
│   └── support/                   # Custom Cucumber World + global hooks
├── .github/workflows/ci.yml
└── package.json
```

## Scenarios (15 total)

**Native app (9)** — `@native`
- ✅ Successful login with valid credentials
- ✅ Login rejected with invalid password
- ✅ Login rejected with malformed email
- ✅ View product detail screen
- ✅ Swipe through product image carousel (touch gesture via W3C actions)
- ✅ Add product to cart → cart badge updates
- ✅ Add multiple products → cart total matches sum of item prices
- ✅ Remove product from cart
- ✅ Navigate to the in-app Webview screen from the side menu

**Mobile web (6)** — `@web`
- ✅ Successful login (`standard_user`)
- ✅ Login rejected for `locked_out_user`
- ✅ Sort products by price (low → high) and verify order
- ✅ Add product to cart → cart badge updates
- ✅ Remove product from cart
- ✅ Full checkout flow → order confirmation message

Run only smoke scenarios with the `@smoke` tag if you want a fast subset.

## Getting started

### Prerequisites
- Node.js ≥ 18
- Android SDK + an emulator or physical device (for local runs)
- Appium 2 (`appium` is a project dependency, no global install needed)

### Install

```bash
npm install
```

### Native profile: get the demo APK

Download the latest release of *Sauce Labs My Demo App (Android)*:
https://github.com/saucelabs/my-demo-app-android/releases

Place the `.apk` in `apps/my-demo-app-android.apk`, or point to it via:
```bash
export ANDROID_APP_PATH=/path/to/your.apk
```

### Run the tests

```bash
npm run test:native   # native app suite
npm run test:web      # mobile web suite
npm run test:all      # both, sequentially
```

### Option: run everything via Docker (no local Android SDK needed)

`docker-compose.yml` spins up [`budtmo/docker-android`](https://github.com/budtmo/docker-android),
a single container bundling an Android emulator + Appium server, viewable live in the
browser via noVNC. Useful if you don't want to install the Android SDK/emulator locally.

```bash
npm run docker:up            # starts the emulator + Appium (first boot: ~2-5 min)
npm run docker:logs          # follow emulator boot logs
# open http://localhost:6080 to watch the emulator screen live

APPIUM_HOST=localhost APPIUM_PORT=4723 APPIUM_PATH=/ \
ANDROID_APP_PATH=/root/apps/my-demo-app-android.apk \
npm run test:native

APPIUM_HOST=localhost APPIUM_PORT=4723 APPIUM_PATH=/ \
npm run test:web

npm run docker:down          # stop and remove the container
```

Notes:
- `./apps` is mounted into the container at `/root/apps`, so `ANDROID_APP_PATH` must use
  the **container path**, not the host path.
- Requires Docker with `/dev/kvm` available for hardware acceleration on Linux hosts.
  On macOS/Windows, remove the `devices: [/dev/kvm]` line in `docker-compose.yml` —
  the emulator still works, just slower (nested/software virtualization).
- When `APPIUM_HOST` is set, the WebdriverIO config skips its local `@wdio/appium-service`
  and connects straight to the container's Appium server (see `config/wdio.shared.conf.ts`).

### Reports

```bash
npm run report:generate   # builds the Allure HTML report from raw results
npm run report:open       # opens it locally
```

## Real execution results

> Not yet populated — see note below.

Once you've run the suites locally (via emulator or `docker compose`) or through the
GitHub Actions pipeline, drop the Allure report screenshots here, e.g.:

```markdown
![Allure summary](docs/screenshots/allure-summary.png)
![Allure native suite](docs/screenshots/allure-native.png)
```

## CI/CD

`.github/workflows/ci.yml` runs both suites on every push/PR, each on a fresh Android
emulator (API 33, Pixel 6 profile), then merges both result sets into a single Allure
report published as a workflow artifact. This mirrors the GitLab CI pipelines used
in production (manual per-environment jobs, Xray Cloud import) but adapted to
GitHub Actions and a public demo context.

## Known limitations / honest notes

- The native app selectors (`~input-email`, `~button-ADD TO CART`, etc.) follow the
  common accessibility-id naming conventions used in Sauce Labs' own tutorials, but
  **should be double-checked with Appium Inspector** against the exact APK version
  before a first real run — testID naming can drift slightly between app releases.
- The carousel-swipe assertion checks that the element survives the gesture rather
  than asserting a specific image index, since the app doesn't expose a stable
  carousel-position indicator by default.
- CI Android emulator jobs run on `ubuntu-latest` with KVM hardware acceleration
  enabled explicitly (GitHub-hosted macOS runners, Intel or Apple Silicon, do **not**
  support nested virtualization for the emulator — confirmed limitation, see
  [actions/runner-images#9460](https://github.com/actions/runner-images/issues/9460)).

## Author

Momo — QA Automation Engineer. Cypress/Cucumber/TypeScript in production
(healthcare-sector E2E suite), extending here into mobile with Appium.
