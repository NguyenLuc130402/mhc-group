const { chromium } = require('C:/Users/Admin/AppData/Roaming/npm/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://phucphatgroup.com/vi/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/Admin/Desktop/MHC-web/image/phucphat-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e.message); process.exit(1); });
