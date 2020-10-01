const express = require("express");
const treerouter = express.Router();
const treesFunctions = require("../functions/trees-functions");

treerouter.get("/all", treesFunctions.displayAllTrees);
treerouter.get("/one/:id", treesFunctions.displayOneTree);

treerouter.post("/comment/:id", treesFunctions.addComment);
treerouter.post("/buy/:id", treesFunctions.buyOneTree);

module.exports = treerouter;
