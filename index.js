const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://mosttechs.com/wizard-of-oz-slots-free-coins/';

axios.get(url).then(({ data }) => {
  const $ = cheerio.load(data);
  const links = [];

  $('a[href*="zdnwoz0-a.akamaihd.net"], a[href*="zynga.social"]').each((index, element) => {
    const link = $(element).attr('href');
    const text = $(element).text().trim();
    links.push({ href: link, text: text });
  });

  console.log('Fetched links:', links);
  fs.writeFileSync('links.json', JSON.stringify(links, null, 2));
}).catch(err => {
  console.error('Error fetching links:', err);
  process.exit(1); // Exit with an error code
});