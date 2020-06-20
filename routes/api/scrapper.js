const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const Scrapper = require('../../models/Scrapper');
const { connectDB } = require('../../config/db');
const config = require('config');

// @route   GET /api/scrapper
// @desc    Get scraped announcements and events from HEC
// @access  Private
router.get('/', async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const scrappers = await Scrapper.find();
    res.json(scrappers[0]);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST /api/scrapper
// @desc    Scrape announcements and events from HEC
// @access  Private
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

    await browser.close();

    await connectDB(config.get('defaultMongoDatabase'));

    let scrappers = await Scrapper.find();
    let scrapper;

    if (scrappers.length === 0) {
      scrapper = new Scrapper({
        currentAnnouncements,
        pastAnnouncements,
        upcomingEvents,
        pastEvents,
      });
    } else {
      scrapper = await Scrapper.findOneAndUpdate(
        { _id: scrappers[0]._id },
        {
          $set: {
            currentAnnouncements,
            pastAnnouncements,
            upcomingEvents,
            pastEvents,
          },
        },
        { new: true }
      );
    }

    await scrapper.save();

    res.json({ msg: 'Data scraped from HEC' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
