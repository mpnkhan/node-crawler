const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const notifier = require('node-notifier');

// Configuration
const INPUT_FILE = process.argv[2] || path.join('output', 'urls.txt');
const MAX_RETRIES = 3;

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
async function scrapPage(url, retries = MAX_RETRIES) {
  let browser;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      browser = await launchBrowserWithRetry();
      const page = await browser.newPage();

      // Log the URL being processed
      console.log(`Processing URL: ${url} (Attempt ${attempt})`);

      // Navigate to the URL and wait for the page to fully load
      console.log('Navigating to the URL...');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 }); // Increased timeout to 120 seconds

      // Wait for the body to ensure the DOM is ready
      console.log('Waiting for the body...');
      await page.waitForSelector('body', { timeout: 60000 }); // Wait for the body with a timeout

      // Check the page title
      const pageTitle = await page.title();
      // if (pageTitle === 'Page not found') {
      if (pageTitle === '404 Not Found') {
        console.log(`Skipping ${url} because the page title is "Page not found".`);
        return null; // Skip this URL
      }

      // Optional: Add a small delay to allow dynamic content to load
      // console.log('Waiting for dynamic content to load...');
      // await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000))); // 5-second delay

      // Wait for the .entry class inside the article tag to load
      await page.waitForSelector('article .entry');

      // Extract the innerHTML of the article, excluding the post-meta elements
      const content = await page.evaluate(() => {
        const article = document.querySelector('article');
        const clonedArticle = article.cloneNode(true);
        
        const postMetaElements = clonedArticle.querySelectorAll('.post-meta');
        postMetaElements.forEach((element) => element.remove());

        const sharePostEls = clonedArticle.querySelectorAll('.share-post');
        sharePostEls.forEach((element) => element.remove());        

        return clonedArticle.innerHTML;
      });

      // const content = await page.evaluate(() => {
      //   const entryElement = document.querySelector('article .entry');
      //   return entryElement ? entryElement.innerHTML : null;
      // });
      // console.log(content);
      return content;
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

// Function to process URLs from a file
async function processUrlsFromFile(filePath) {
  // Read the URLs from the file
  const urls = fs.readFileSync(filePath, 'utf-8').split('\n').filter((url) => url.trim());

  // Process each URL
  for(i=0,j=urls.length;i<j;i++) {
      const result = await scrapPage(urls[i]);
      const finalContent=`
---
title: அகீதா தஹாவிய்யா
layout: default
---

    <div id='container'>
    <p style="text-align:center">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ </p>
    <p class="tamil" style="text-align:center;font-weight:bold">
    ${result}</body>
    </p>
    </div>
      `
      const filename= `${i+1}.html`;
       fs.writeFileSync(filename, finalContent);
       console.log(`Results appended to ${filename}`);
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