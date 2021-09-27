const express = require("express");
const orders = require("../routes/orders");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/orders", orders);
  app.use(error);
};
