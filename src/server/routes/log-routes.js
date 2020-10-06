const express = require("express");
const logrouter = express.Router();
const logFunctions = require("../functions/log-functions");

logrouter.get("/all", logFunctions.displayAllLogs);

module.exports = logrouter;
