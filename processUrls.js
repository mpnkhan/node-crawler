const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const notifier = require('node-notifier');

// Configuration
const INPUT_FILE = process.argv[2] || path.join('output', 'urls.txt');
const OUTPUT_FILE = path.join('output', 'output.json'); 
const OUTPUT_404_FILE = '404.txt';

// Make sure the file is empty at start (optional)
fs.writeFileSync(OUTPUT_404_FILE, '', 'utf8');

const MAX_RETRIES = 3;

// Axe-core options
  const axeOptions = {
      include: [['iframe']],
      iframes: true,
      allowedOrigins: ["<unsafe_all_origins>", "<same_origin>"],
      runOnly: ["wcag2a", "wcag2aa"]
  };


// Function to launch browser with retry for EBUSY error
async function launchBrowserWithRetry() {
  let retries = 3;
  while (retries > 0) {
    try {
      const browser = await puppeteer.launch({ headless: false }); // Run in non-headless mode
      return browser;
    } catch (error) {
      if (error.code === 'EBUSY' && retries > 0) {
        retries--;
        console.log(`EBUSY error encountered. Retrying (${retries} attempts left)...`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      } else {
        throw error; // Re-throw the error if retries are exhausted
      }
    }
  }
}

// Function to run axe-core on a URL with retries
async function runAxe(url, options, retries = MAX_RETRIES) {
  let browser;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      browser = await launchBrowserWithRetry();
      const page = await browser.newPage();

      // Log the URL being processed
      console.log(`Processing URL: ${url} (Attempt ${attempt})`);

      // Navigate to the URL and wait for the page to fully load
      console.log('Navigating to the URL...');
      // await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 }); // Increased timeout to 120 seconds
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
      if (response.status() === 404) {
        fs.appendFileSync(OUTPUT_404_FILE, url + '\n', 'utf8');
        console.log(`Skipping ${url} due to HTTP 404`);
        return null;      // Skip further processing
      }      

      // Wait for the body to ensure the DOM is ready
      console.log('Waiting for the body...');
      await page.waitForSelector('body', { timeout: 60000 }); // Wait for the body with a timeout

      // Check the page title
      const pageTitle = await page.title();
      // if (pageTitle === 'Page not found') {
      if (pageTitle.toLowerCase().includes('404')) {
        fs.appendFileSync(OUTPUT_404_FILE, url + '\n', 'utf8');
        console.log(`Skipping ${url} because the page title is "Page not found".`);
        return null; // Skip this URL
      }

      // Optional: Wait for additional elements (e.g., main content)
      // console.log('Waiting for main content...');
      // await page.waitForSelector('#main-content', { timeout: 60000 }).catch(() => {
      //   console.log('Main content not found. Proceeding with analysis...');
      // });

      // Optional: Add a small delay to allow dynamic content to load
      console.log('Waiting for dynamic content to load...');
      await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000))); // 5-second delay

      // Inject and run axe-core with the provided options
      console.log('Running axe-core analysis...');
      //Read https://www.npmjs.com/package/@axe-core/puppeteer
      // const results = await new AxePuppeteer(page).configure(options).analyze();
      const results = await new AxePuppeteer(page)
                      .withTags(['wcag2a', 'wcag2aa'])
                      .analyze();

      console.log(`Accessibility results for ${url}:`, results.violations.length, 'violations');

      // Return the URL and violations
      return {
        url,
        violations: results.violations,
      };
    } catch (error) {
      console.error(`Attempt ${attempt} failed for ${url}:`, error.message);
      if (attempt === retries) {
        // Log the error and return null to indicate failure
        console.error(`All attempts failed for ${url}. Skipping.`);
        return null;
      }
    } finally {
      if (browser) {
        console.log('Closing the browser...');
        await browser.close();
      }
    }
  }
}

// Function to safely read and parse the output file
function readOutputFile() {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      const fileContent = fs.readFileSync(OUTPUT_FILE, 'utf-8');
      if (fileContent.trim() === '') {
        return []; // Return an empty array if the file is empty
      }
      return JSON.parse(fileContent); // Parse the file content as JSON
    }
  } catch (error) {
    console.error('Error reading or parsing output file:', error.message);
  }
  return []; // Return an empty array if the file doesn't exist or is invalid
}

// Function to process URLs from a file
async function processUrlsFromFile(filePath) {
  // Read the URLs from the file
  const urls = fs.readFileSync(filePath, 'utf-8').split('\n').filter((url) => url.trim());

  // Initialize the output array
  let output = readOutputFile();

  // Process each URL
  for (const url of urls) {
    const result = await runAxe(url, axeOptions);

    // Only save results if violations are found
    if (result && result.violations.length > 0) {
      output.push(result);

      // Append the result to the output file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
      console.log(`Results appended to ${OUTPUT_FILE}`);
    }
  }
}

// Start processing
(async () => {
  await processUrlsFromFile(INPUT_FILE);
  console.log('Processing completed.');
  notifier.notify({
    title: 'processUrls.js',
    message: 'Processing completed!',
    sound: true, // Play the default notification sound
  }); 
})();