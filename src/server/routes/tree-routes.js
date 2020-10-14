const express = require("express");
const treerouter = express.Router();
const treesFunctions = require("../functions/trees-functions");
// const auth = require("../middlewares/auth");

const {body} = require("express-validator");

treerouter.get("/all", treesFunctions.displayAllTrees);
treerouter.get("/one/:id/:userid", treesFunctions.displayOneTree);

treerouter.post("/area", treesFunctions.displayArea);
treerouter.post(
    "/comment/:id",
    [body("user_id").trim().escape()],
    // auth.authMiddleware,
    treesFunctions.addComment,
);
treerouter.post(
    "/buy/:id",
    [body("user_id").trim().escape(), body("comment").trim().escape()],
    treesFunctions.buyOneTree,
);
treerouter.post(
    "/lock/:id",
    [body("user_id").trim().escape()],
    // auth.authMiddleware,
    treesFunctions.lockOneTree,
);

module.exports = treerouter;
