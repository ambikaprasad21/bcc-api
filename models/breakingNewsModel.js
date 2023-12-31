const mongoose = require("mongoose");

const breakingNewsSchema = new mongoose.Schema({
  news: {
    type: String,
    trim: true,
  },
});

const breakingNews = mongoose.model("BreakingNews", breakingNewsSchema);

module.exports = breakingNews;
