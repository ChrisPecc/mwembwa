const express = require("express");
const router = express.Router();
const userFunctions = require("../functions/user-function");

router.get("/all", userFunctions.displayAllUsers);

router.post("/signup", userFunctions.signUp);
router.post("/login", userFunctions.login);

module.exports = router;
