const { chromium } = require('C:/Users/Admin/AppData/Roaming/npm/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://nguyenluc130402.github.io/redesign-lady-login/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const el = document.querySelector('#usecases');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/Admin/Desktop/MHC-web/ref-usecases.png' });
  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e.message); process.exit(1); });
