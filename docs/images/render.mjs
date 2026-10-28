// Renders the README overview (light and dark) and the social preview.
// Run from the repository root: node docs/images/render.mjs (needs Playwright)
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// require() so a global Playwright install works too (set NODE_PATH=$(npm root -g)).
const { chromium } = createRequire(import.meta.url)('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();

for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 600 }, deviceScaleFactor: 1.5 });
  await page.goto('file://' + join(here, 'how-it-works.html'));
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
  const h = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 1400, height: h });
  await page.screenshot({ path: join(here, `how-it-works-${theme}.png`) });
  await page.close();
}

const social = await browser.newPage({ viewport: { width: 1280, height: 640 } });
await social.goto('file://' + join(here, '..', 'brand', 'social-preview.html'));
await social.screenshot({ path: join(here, '..', 'brand', 'social-preview.png') });
await browser.close();
