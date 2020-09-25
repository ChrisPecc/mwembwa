const express = require("express");
const router = express.Router();
const userFunctions = require("../functions/user-function");

router.post("/signup", userFunctions.signUp);

module.exports = router;
