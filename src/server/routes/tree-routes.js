const express = require("express");
const treerouter = express.Router();
const treesFunctions = require("../functions/trees-functions");

treerouter.get("/all", treesFunctions.displayAllTrees);

module.exports = treerouter;
