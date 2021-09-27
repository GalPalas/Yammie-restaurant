const mongoose = require("mongoose");
const winston = require("winston");
require("dotenv").config();

const username = "gal";
const password = process.env.MONGO_KEY;
const cluster = "cluster0.vmtp0";
const dbname = "YammieDB";

module.exports = function () {
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
    )
    .then(() => winston.info("Connected to MongoDB successfully"));
};
