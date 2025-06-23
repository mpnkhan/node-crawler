const { CheerioCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://powermin.gov.in/en/sitemap';
const DOMAIN = 'https://powermin.gov.in'; // Restrict URLs to this domain

const OUTPUT_FILE = 'output/powermin_sitemap_urls.txt';


const EXCLUDED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png', '.ppt', '.pptx'];

const urls = new Set();
const shouldExclude = (url) => {
    return EXCLUDED_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext));
};

// Initialize crawler
const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: 1, // Only scrape the sitemap page
    async requestHandler({ request, $ }) {
        console.log(`Scraping: ${request.url}`);

        // Extract all links from the sitemap page
        $('a').each((_, element) => {
            const link = $(element).attr('href');
            if (link) {
                try {
                    const fullUrl = new URL(link, request.url).href;
                    console.log(`fullUrl ${fullUrl}`);

                    // Only allow URLs that start with the DOMAIN and do not have excluded extensions
                    if (fullUrl.startsWith(DOMAIN) && !shouldExclude(fullUrl)) {
                        urls.add(fullUrl);
                    }
                } catch (error) {
                    console.error(`Invalid URL: ${link}`);
                }
            }
        });

        console.log(`Extracted ${urls.size} URLs`);
    },
});

// Run crawler
(async () => {
    await crawler.run([SITEMAP_URL]);

    // Save extracted URLs to a file
    fs.writeFileSync(OUTPUT_FILE, Array.from(urls).join('\n'), 'utf8');
    console.log(`✅ URLs saved in ${OUTPUT_FILE}`);
})();
