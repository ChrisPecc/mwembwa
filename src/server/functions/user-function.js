import User from "../model/users";
import Tree from "../model/tree";

import nameFunctions from "./random-name";
import logFunctions from "./log-functions";

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const leavesFunctions = require("../functions/leaves-functions");

const startingFreeTrees = async (req, res) => {
    const userJustCreated = await User.findOne({
        username: req.body.username,
        email: req.body.email,
    });

    if (!userJustCreated) {
        return res.status(404).json({message: "This user doesn't exist"});
    }
    console.log(userJustCreated);

    Tree.find({owner: null})
        .then(resp => {
            for (let i = 0; i < 3; i++) {
                const randomArrayKey = Math.floor(Math.random() * resp.length);
                const treeName = nameFunctions.giveRandomName();
                console.log(resp[randomArrayKey]);
                Tree.updateOne(
                    {_id: resp[randomArrayKey]._id},
                    {
                        owner: userJustCreated._id,
                        nickname: treeName,
                    },
                );
                // .then(() =>
                //     res.json({message: "Tree allocated"}),
                // )
                // .catch(error => res.status(500).json({message: error}));
                logFunctions.writeIntoLog(
                    userJustCreated._id,
                    "has recieved",
                    resp[randomArrayKey]._id,
                    res,
                );
            }
        })
        .catch(error => res.status(500).json({message: error}));
    return "done";
};

const saveData = async (req, res, hash, leaves) => {
    const userExists = await User.exists({username: req.body.username});
    // console.log(userExists);

    const emailExists = await User.exists({email: req.body.email});

    // console.log(emailExists);

    if (userExists) {
        return res
            .status(409)
            .json({message: "this username is already in use"});
    } else if (emailExists) {
        return res.status(409).json({message: "this email is already in use"});
    }

    const user1 = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        color: req.body.color,
        leaves_count: leaves,
    });

    user1
        .save()
        .then(async () => {
            await startingFreeTrees(req, res);
            const playerJustCreated = await Tree.find({
                email: req.body.email,
                username: req.body.username,
            });
            logFunctions.writeIntoLog(
                playerJustCreated._id,
                "has joined the game",
                null,
                res,
            );
            res.status(201).json({message: "new user enregistré!"});
        })
        .catch(error => res.status(500).json({message: error}));

    return "Done";
};

const signUp = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    // console.log(hash);
    const leaves = await leavesFunctions.leavesAtStart();
    saveData(req, res, hash, leaves);
};

const login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(resp => {
            if (!resp) {
                return res
                    .status(400)
                    .json({message: "this user doesn't exist"});
            }

            const verified = bcrypt.compareSync(
                req.body.password,
                resp.password,
            );
            if (!verified) {
                return res
                    .status(401)
                    .json({message: "wrong email/password combination"});
            }

            return res.status(200).json({
                user_id: resp._id,
                username : resp.username,
                token: jwt.sign(
                    { user_id: resp._id},
                    "D4CC737A277F6B29C32D302E385C238AD8B2E1CC0C368B9FAD7537F9D27DD106",
                    {expiresIn: "24h"}
                )
            });
        })
        .catch(error => console.log(error));
};

module.exports = {signUp, login};
