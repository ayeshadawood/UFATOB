const express = require("express");
const router = express.Router();
//For Scrapping
const request = require("request-promise");
const cheerio = require("cheerio");
//Hec Announcement page Url
const url = "https://www.hec.gov.pk/english/HECAnnouncements/";
const scrapeResults = [];

router.get("/", async (req, res) => {
  try {
    const response = await request.get(url);
    const $ = await cheerio.load(response);

    //console.log("Current Announcements:");
    $("#WebPartWPQ11 table a").each((index, element) => {
      const heading = "currentAnnouncement";
      const title = $(element).html();
      const url = $(element).attr("href");
      const scrapeResult = { heading, title, url };
      scrapeResults.push(scrapeResult);
    });

    //console.log("\nPast Announcements:");
    $("#WebPartWPQ9 table a").each((index, element) => {
      const heading = "laterAnnouncement";
      const title = $(element).html();
      const url = $(element).attr("href");
      const scrapeResult = { heading, title, url };
      scrapeResults.push(scrapeResult);
    });

    // console.log("\nTwitter Announcements:");
    // $(".panel-body a").each((index, element) => {
    //   console.log($(element).html());
    //   console.log($(element).attr("href"));
    // });
    // console.log(res);

    console.log(scrapeResults);
    res.json(scrapeResults);
  } catch (err) {
    console.error("Error occurred");
  }
});

module.exports = router;
