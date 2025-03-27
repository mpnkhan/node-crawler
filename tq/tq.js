const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to determine the book number based on hno
const getBookNumber = (hno) => {
  if (hno >= 1 && hno <= 162) return 1;
  if (hno >= 163 && hno <= 556) return 2;
  if (hno >= 557 && hno <= 622) return 3;
  if (hno >= 623 && hno <= 670) return 4;
  if (hno >= 671 && hno <= 727) return 5;
  if (hno >= 728 && hno <= 801) return 6;
  if (hno >= 802 && hno <= 994) return 7;
  if (hno >= 995 && hno <= 1198) return 8;
  if (hno >= 1199 && hno <= 1243) return 9;
  if (hno >= 1244 && hno <= 1297) return 10;
  if (hno >= 1298 && hno <= 1358) return 11;
  if (hno >= 1359 && hno <= 1400) return 12;
  if (hno >= 1401 && hno <= 1424) return 13;
  if (hno >= 1425 && hno <= 1461) return 14;
  if (hno >= 1462 && hno <= 1480) return 15;
  if (hno >= 1481 && hno <= 1599) return 16;
  return null; // Fallback for hno outside the specified ranges
};

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Initialize the result array
  const allBhadiths = [];

  // Start URL
  let url = 'https://www.tamililquran.com/buluguldisp.php?start=1';

  while (url) {
    console.log(`Scraping: ${url}`);

    // Extract the "start" parameter from the URL
    const startParam = new URL(url).searchParams.get('start');
    const startValue = parseInt(startParam, 10);

    // Stop if the start parameter reaches 1601
    if (startValue >= 1601) {
      console.log('Reached start=1601. Stopping...');
      break;
    }

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the content to load
    await page.waitForSelector('.hadith-arabic-odd, .hadith-arabic-even');
    await page.waitForSelector('.bukhari-odd, .bukhari-even');

    // Extract the content
    const bhadiths = await page.evaluate((getBookNumberLogic) => {
      // Recreate the getBookNumber function in the browser context
      const getBookNumber = new Function('hno', getBookNumberLogic);

      const hadiths = [];

      // Select all Arabic and translation elements
      const arabicElements = document.querySelectorAll('.hadith-arabic-odd, .hadith-arabic-even');
      const translationElements = document.querySelectorAll('.bukhari-odd, .bukhari-even');

      arabicElements.forEach((arabicElement, index) => {
        const translationElement = translationElements[index];

        // Extract the hadith number
        const hnoElement = arabicElement.querySelector('.ayaNum');
        if (!hnoElement) {
          console.warn('Skipping hadith: Missing .ayaNum element');
          return;
        }

        const hno = parseInt(hnoElement.textContent.trim().replace('.', ''), 10);

        // Determine the book number
        const book = getBookNumber(hno);

        // Extract the Arabic content
        const arabiccontent = arabicElement.innerHTML
          .replace(/<span class="ayaNum">.*?<\/span>/, '') // Remove the ayaNum span
          .replace(/<br>/g, '') // Remove <br> tags
          .trim();

        // Extract the translated content
        const tcontent = translationElement.innerHTML
          .replace(/<span class="ayaNum">.*?<\/span>/, '') // Remove the ayaNum span
          .replace(/<br>/g, '') // Remove <br> tags
          .trim();

        // Add to the hadiths array
        hadiths.push({
          hno,
          tcontent,
          arabiccontent,
          book,
        });
      });

      return hadiths;
    }, getBookNumber.toString()); // Pass the function as a string

    // Add the current page's hadiths to the result array
    allBhadiths.push(...bhadiths);

    // Check if there is a "Next" link
    const nextLink = await page.evaluate(() => {
      const nextElement = document.querySelector('li.next a');
      return nextElement ? nextElement.href : null;
    });

    // Update the URL to the next page
    url = nextLink;
  }

  // Save the result to a JSON file
  const result = { bhadiths: allBhadiths };
  fs.writeFileSync('hadiths.json', JSON.stringify(result, null, 2));
  console.log('Data saved to hadiths.json');

  // Close the browser
  await browser.close();
})();