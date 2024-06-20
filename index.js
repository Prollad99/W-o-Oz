const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://techyhigher.com/wizard-of-oz-slots-free-coins/';

axios.get(url)
  .then(({ data }) => {
    const $ = cheerio.load(data);
    const links = [];

    $('a[href*="zdnwoz0-a.akamaihd.net"], a[href*="zynga.social"]').each((index, element) => {
      let link = $(element).attr('href');
      const text = $(element).text().trim();
      
      // Check if the link is relative and convert it to an absolute URL if necessary
      if (!link.startsWith('http')) {
        const baseUrl = new URL(url);
        link = new URL(link, baseUrl).href;
      }

      links.push({ href: link, text: text });
    });

    console.log('Fetched links:', links);
    fs.writeFileSync('links.json', JSON.stringify(links, null, 2));
  })
  .catch(err => {
    console.error('Error fetching links:', err.response ? err.response.status + ' - ' + err.response.statusText : err.message);
    process.exit(1); // Exit with an error code
  });
