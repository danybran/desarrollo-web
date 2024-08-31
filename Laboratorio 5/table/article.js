const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({}, { strict: false });

const article = mongoose.model("article", articleSchema);

module.exports = article;