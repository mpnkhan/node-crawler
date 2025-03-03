const { CheerioCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

// Configuration
const START_URL = 'https://mtnldelhi.in';
const MAX_DEPTH = 5;
const URLS_PER_FILE = 10;
const OUTPUT_DIR = 'output';

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Set to track visited URLs
const visitedUrls = new Set();
let urlBuffer = []; // Buffer to hold unsaved URLs
let fileIndex = 1;  // File index tracker

// Function to save URLs to a text file in batches of 10
function saveUrlsToFile() {
  if (urlBuffer.length >= URLS_PER_FILE) {
    const chunk = urlBuffer.splice(0, URLS_PER_FILE); // Get first 10 URLs and remove from buffer
    const filePath = path.join(OUTPUT_DIR, `urls_${fileIndex}.txt`);
    fs.writeFileSync(filePath, chunk.join('\n'));
    console.log(`Saved ${chunk.length} URLs to ${filePath}`);
    fileIndex++; // Increment file index
  }
}

// Initialize the crawler
const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 1000, // Increased limit
  async requestHandler({ request, $ }) {
    const { url, depth = 0 } = request;

    // Skip if the URL has already been visited
    if (visitedUrls.has(url)) return;

    // Mark the URL as visited
    visitedUrls.add(url);
    urlBuffer.push(url);
    console.log(`Crawling: ${url} (Depth: ${depth})`);

    // Save URLs in batches of 10
    saveUrlsToFile();

    // Stop crawling if max depth is reached
    if (depth >= MAX_DEPTH) return;

    // Extract links from the page
    const links = $('a')
      .map((_, element) => $(element).attr('href'))
      .get()
      .filter((href) => {
        if (!href) return false;
        try {
          const fullUrl = new URL(href, url).href;
          const skipExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png', '.ppt', '.pptx'];
          if (skipExtensions.some(ext => fullUrl.toLowerCase().endsWith(ext))) {
            console.log(`Skipping file: ${fullUrl}`);
            return false;
          }
          return fullUrl.startsWith('https://mtnldelhi.in');
        } catch (error) {
          return false;
        }
      });

    // Add new links to the queue
    for (const link of links) {
      const fullUrl = new URL(link, url).href;
      if (!visitedUrls.has(fullUrl)) {
        await crawler.addRequests([{ url: fullUrl, depth: depth + 1 }]);
      }
    }
  },
});

// Start the crawler
(async () => {
  await crawler.run([START_URL]);

  // Save any remaining URLs that didn't fit in the last batch
  if (urlBuffer.length > 0) {
    const filePath = path.join(OUTPUT_DIR, `urls_${fileIndex}.txt`);
    fs.writeFileSync(filePath, urlBuffer.join('\n'));
    console.log(`Saved remaining ${urlBuffer.length} URLs to ${filePath}`);
  }

  console.log('Crawling completed.');
})();