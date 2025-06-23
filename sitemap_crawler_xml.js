const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

// URL of the XML sitemap
// const SITEMAP_URL = 'https://www.optavia.com/us/en/Product-en-USD-17379281080390504202.xml';
// const SITEMAP_URL = 'https://www.optavia.com/us/en/Category-en-USD-16084883131586943382.xml';
const SITEMAP_URL = 'https://www.optavia.com/us/en/Content-en-USD-5105935172362457130.xml';
const OUTPUT_FILE = 'sitemap_urls3.txt';

(async () => {
  try {
    // Fetch the sitemap
    const response = await axios.get(SITEMAP_URL);
    const xml = response.data;

    // Parse the XML
    const result = await xml2js.parseStringPromise(xml);

    // Extract <loc> entries
    const urls = result.urlset.url.map(entry => entry.loc[0]);

    // Save to file
    fs.writeFileSync(OUTPUT_FILE, urls.join('\n'), 'utf8');
    console.log(`✅ Saved ${urls.length} URLs to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error fetching or parsing the sitemap:', error.message);
  }
})();

