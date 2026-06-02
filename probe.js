const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];

  if (!url) {
    console.error('Usage: node probe.js <STREAMLIT_APP_URL>');
    process.exit(1);
  }

  console.log(`Probing: ${url}`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Streamlit Cloud shows a primary button to reactivate dormant apps
    const reactivateBtn = await page.$('button[kind="primary"]');

    if (reactivateBtn) {
      const btnText = await page.evaluate(el => el.innerText, reactivateBtn);
      console.log(`Dormant app detected — button: "${btnText}". Reactivating...`);
      await reactivateBtn.click();
      await new Promise(r => setTimeout(r, 8000));
      console.log('Reactivation triggered.');
    } else {
      console.log('App is active — nothing to do.');
    }
  } finally {
    await browser.close();
  }
})();
