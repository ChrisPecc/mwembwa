const express = require("express");
const treerouter = express.Router();
const treesFunctions = require("../functions/trees-functions");
const auth = require("../middlewares/auth");

treerouter.get("/all", treesFunctions.displayAllTrees);
treerouter.get("/one/:id/:userid", treesFunctions.displayOneTree);

treerouter.post("/comment/:id", auth.authMiddleware, treesFunctions.addComment);
treerouter.post("/buy/:id", treesFunctions.buyOneTree);
treerouter.post("/lock/:id", auth.authMiddleware, treesFunctions.lockOneTree);

module.exports = treerouter;
