const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const INPUT_FILE = 'sitemap_urls3.txt';
const OUTPUT_FILE = '404.txt';

// Reset output file
fs.writeFileSync(OUTPUT_FILE, '', 'utf8');

// Read URLs line by line
const rl = readline.createInterface({
  input: fs.createReadStream(INPUT_FILE),
  crlfDelay: Infinity
});

(async () => {
  for await (const url of rl) {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) continue;

    try {
      const response = await axios.get(trimmedUrl, {
        timeout: 10000,
        validateStatus: () => true // Do not throw for non-2xx
      });

      // Case 1: HTTP 404
      if (response.status === 404) {
        console.log(`❌ HTTP 404: ${trimmedUrl}`);
        fs.appendFileSync(OUTPUT_FILE, trimmedUrl + '\n');
        continue;
      }

      // Case 2: Status OK, but check if title contains "404"
      const $ = cheerio.load(response.data);
      const title = $('title').text().trim();

      if (title.toLowerCase().includes('404')) {
        console.log(`⚠️ Title says 404: ${trimmedUrl}`);
        fs.appendFileSync(OUTPUT_FILE, trimmedUrl + '\n');
      } else {
        console.log(`✅ ${response.status} OK: ${trimmedUrl}`);
      }

    } catch (err) {
      console.error(`⚠️ Error fetching ${trimmedUrl}: ${err.message}`);
    }
  }

  console.log(`📝 Done. 404 URLs written to ${OUTPUT_FILE}`);
})();
