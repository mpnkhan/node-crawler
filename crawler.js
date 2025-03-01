const { CheerioCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

// Configuration
const START_URL = 'https://www.indiapost.gov.in/vas/Pages/IndiaPosthome.aspx';
const MAX_DEPTH = 5;
const URLS_PER_FILE = 10;
const OUTPUT_DIR = 'output';

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Set to track visited URLs
const visitedUrls = new Set();

// Function to save URLs to a text file
function saveUrlsToFile(urls, fileIndex) {
  const filePath = path.join(OUTPUT_DIR, `urls_${fileIndex}.txt`);
  fs.writeFileSync(filePath, urls.join('\n'));
  console.log(`Saved ${urls.length} URLs to ${filePath}`);
}

// Initialize the crawler
const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 100, // Limit the number of requests
  async requestHandler({ request, $ }) {
    const { url, userData: { depth } } = request;

    // Skip if the URL has already been visited
    if (visitedUrls.has(url)) {
      return;
    }

    // Mark the URL as visited
    visitedUrls.add(url);
    console.log(`Crawling: ${url} (Depth: ${depth})`);

    // Save URLs in batches of 10
    if (visitedUrls.size % URLS_PER_FILE === 0) {
      const fileIndex = Math.floor(visitedUrls.size / URLS_PER_FILE);
      const urlsToSave = Array.from(visitedUrls).slice((fileIndex - 1) * URLS_PER_FILE, fileIndex * URLS_PER_FILE);
      saveUrlsToFile(urlsToSave, fileIndex);
    }

    // Stop crawling if the maximum depth is reached
    if (depth >= MAX_DEPTH) {
      return;
    }

    // Extract links from the page
    const links = $('a')
      .map((_, element) => $(element).attr('href'))
      .get()
      .filter((href) => {
        if (!href) return false;
        try {
          const fullUrl = new URL(href, url).href;
          return fullUrl.startsWith('https://www.indiapost.gov.in/') && fullUrl.endsWith('.aspx');
        } catch (error) {
          return false;
        }
      });

    // Add new links to the queue
    for (const link of links) {
      const fullUrl = new URL(link, url).href;
      if (!visitedUrls.has(fullUrl)) {
        await crawler.addRequests([{
          url: fullUrl,
          userData: { depth: depth + 1 }, // Pass depth in userData
        }]);
      }
    }
  },
});

// Start the crawler
(async () => {
  await crawler.run([{
    url: START_URL,
    userData: { depth: 0 }, // Initialize depth for the starting URL
  }]);

  // Save any remaining URLs
  const remainingUrls = Array.from(visitedUrls);
  if (remainingUrls.length > 0) {
    const fileIndex = Math.ceil(visitedUrls.size / URLS_PER_FILE);
    saveUrlsToFile(remainingUrls, fileIndex);
  }

  console.log('Crawling completed.');
})();