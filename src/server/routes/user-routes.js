const express = require("express");
const router = express.Router();
const userFunctions = require("../functions/user-function");
const {body} = require("express-validator");

router.get("/all", userFunctions.displayAllUsers);

router.post(
    "/signup",
    [
        body("username").trim().escape(),
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({min: 8}).trim().escape(),
    ],
    userFunctions.signUp,
);
router.post(
    "/login",
    [
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({min: 8}).trim().escape(),
    ],
    userFunctions.login,
);

module.exports = router;
