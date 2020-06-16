const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
//For Scrapping
const request = require('request-promise');
const cheerio = require('cheerio');
//Hec Announcement page Url
const url = 'https://www.hec.gov.pk/english/HECAnnouncements/';
const scrapeResults = [];
const Scrapper = require('../../models/Scrapper');
const { connectDB } = require('../../config/db');
const config = require('config');

router.post('/', async (req, res) => {
  let currentAnnouncements = [];
  let pastAnnouncements = [];
  let upcomingEvents = [];
  let pastEvents = [];

  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    // Getting announcements
    await page.goto(
      'https://www.hec.gov.pk/english/HECAnnouncements/Pages/default.aspx'
    );
    let response = await page.content();

    let $ = await cheerio.load(response);

    // Getting current annnouncements
    $(
      '#ctl00_ctl42_g_949e681e_c67c_4528_a3b4_7c93e7a563f2_csr > div.table-responsive > a'
    ).each((index, element) => {
      const title = element.children[0].children[0].data;
      const url = $(element).attr('href');
      currentAnnouncements = [...currentAnnouncements, { title, url }];
    });

    // Getting past announcements
    $(
      '#ctl00_ctl42_g_94cc466b_5da0_4691_9c22_df59ed3720c2_csr > div.table-responsive > a'
    ).each((index, element) => {
      const title = element.children[0].children[0].data;
      const url = $(element).attr('href');
      pastAnnouncements = [...pastAnnouncements, { title, url }];
    });

    // Getting events
    await page.goto('https://www.hec.gov.pk/english/news/Pages/HECEvents.aspx');
    response = await page.content();

    $ = await cheerio.load(response);

    // Getting upcoming events
    // #ctl00_ctl42_g_adf41684_9264_4b86_8a2c_e45c00613a15_csr > div.table-responsive > div
    $(
      '#ctl00_ctl42_g_adf41684_9264_4b86_8a2c_e45c00613a15_csr > div.table-responsive > div'
    ).each((index, element) => {
      const title =
        element.children[1].children[1].children[0].children[0].children[0]
          .data;
      const url =
        element.children[1].children[1].children[0].children[0].attribs.href;
      const description = element.children[1].children[4].data
        .replace('\t', '')
        .trim();
      upcomingEvents = [...upcomingEvents, { title, url, description }];
    });

    // Getting past events
    $(
      '#ctl00_ctl42_g_2948627b_a730_4116_8c1b_00186e51525d_csr > div.table-responsive > div'
    ).each((index, element) => {
      const title =
        element.children[1].children[1].children[0].children[0].children[0]
          .data;
      const url =
        element.children[1].children[1].children[0].children[0].attribs.href;
      const description = element.children[1].children[4].data
        .replace('\t', '')
        .trim();
      pastEvents = [...pastEvents, { title, url, description }];
    });

    // await page.goto('https://www.hec.gov.pk/english/news/Pages/HECEvents.aspx');
    // await page.waitFor(5000);

    await browser.close();

    await connectDB(config.get('defaultMongoDatabase'));

    const scrapper = new Scrapper({
      currentAnnouncements,
      pastAnnouncements,
      upcomingEvents,
      pastEvents,
    });

    await scrapper.save();

    // const response = await request.get(url);
    // const $ = await cheerio.load(response);

    // //console.log("Current Announcements:");
    // $('#WebPartWPQ11 table a').each((index, element) => {
    //   const heading = 'currentAnnouncement';
    //   const title = $(element).html();
    //   const url = $(element).attr('href');
    //   const scrapeResult = { heading, title, url };
    //   scrapeResults.push(scrapeResult);
    // });

    // //console.log("\nPast Announcements:");
    // $('#WebPartWPQ9 table a').each((index, element) => {
    //   const heading = 'laterAnnouncement';
    //   const title = $(element).html();
    //   const url = $(element).attr('href');
    //   const scrapeResult = { heading, title, url };
    //   scrapeResults.push(scrapeResult);
    // });

    // // console.log("\nTwitter Announcements:");
    // // $(".panel-body a").each((index, element) => {
    // //   console.log($(element).html());
    // //   console.log($(element).attr("href"));
    // // });
    // // console.log(res);

    // console.log(scrapeResults);
    res.json({ msg: 'Data scraped from HEC' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
