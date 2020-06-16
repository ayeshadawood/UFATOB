const mongoose = require('mongoose');

const ScrapperSchema = mongoose.Schema({
  currentAnnouncements: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  pastAnnouncements: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  upcomingEvents: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  pastEvents: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = Scrapper = mongoose.model('scrapper', ScrapperSchema);
