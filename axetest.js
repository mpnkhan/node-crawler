const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

async function runAxe(url, axeOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Inject axe-core into the page
  await page.evaluate(`(${axeCore.source})()`);

  // Run axe with the provided options
  const results = await page.evaluate(async (options) => {
    return await axe.run(document, options);
  }, axeOptions);

  await browser.close();
  return results;
}

// Example usage in processUrls.js
async function processUrls() {
  const url = 'https://example.com';
  const axeOptions = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa']
    }
  };

  try {
    const results = await runAxe(url, axeOptions);
    console.log('Violations:', results.violations);
  } catch (error) {
    console.error('Error running axe:', error);
  }
}

processUrls();
