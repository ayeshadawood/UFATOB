const express = require('express');
const router = express.Router();
//For Scrapping
const request = require('request-promise');
const cheerio = require('cheerio');
//Hec Announcement page Url
const url = 'https://www.hec.gov.pk/english/news/Pages/HECEvents.aspx';
const eventScrapeResults = [];

router.get('/', async (req, res) => {
  try {
    const response = await request.get(url);
    const $ = await cheerio.load(response);

    //console.log("Current Events:");
    $('#WebPartWPQ11 table a').each((index, element) => {
      const heading = 'currentEvents';
      const title = $(element).html();
      const url = $(element).attr('href');
      const scrapeResult = { heading, title, url };
      eventScrapeResults.push(scrapeResult);
    });

    //console.log("\nPast Events:");
    $('#WebPartWPQ9 table a').each((index, element) => {
      const heading = 'laterEvents';
      const title = $(element).html();
      const url = $(element).attr('href');
      const scrapeResult = { heading, title, url };
      eventScrapeResults.push(scrapeResult);
    });

    console.log(eventScrapeResults);
    res.json(eventScrapeResults);
  } catch (err) {
    console.error('Error occurred');
  }
});

module.exports = router;
