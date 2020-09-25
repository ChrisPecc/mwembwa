import User from "../model/users";

// const mongoose = require("mongoose");

function signUp(req, res) {
    console.log(req.body);

    const user1 = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    user1
        .save()
        .then(() => {
            console.log("User enregistré!");
            res.send("User enregistré");
        })
        .catch(error => {
            console.error(`erreur! ${error}`);
            res.send(error);
        });
}

module.exports = {signUp};
