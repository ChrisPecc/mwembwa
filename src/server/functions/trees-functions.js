import Tree from "../model/tree";
import User from "../model/users";

import {nameByRace} from "fantasy-name-generator";
// const mongoose = require("mongoose");

const displayAllTrees = (req, res) => {
    Tree.find()
        // .populate("comments.user")
        .then(resp => res.status(200).json({message: resp}))
        .catch(error => res.status(500).json({message: error}));
};

const displayOneTree = (req, res) => {
    Tree.findOne({_id: req.params.id})
        .populate("owner")
        .populate("comments.user")
        .then(resp => res.status(200).json({message: resp}))
        .catch(error => res.status(500).json({message: error}));
};

const addComment = async (req, res) => {
    const targetTree = await Tree.findOne({_id: req.params.id});
    // console.log(targetTree);
    const commentingUser = await User.findOne({_id: req.body.user_id});
    // console.log(buyingUser);
    if (!targetTree) {
        return res.status(404).json({message: "This tree does not exist"});
    }
    if (!commentingUser) {
        return res.status(404).json({message: "This user does not exist"});
    }

    Tree.updateOne(
        {_id: req.params.id},
        {
            $push: {
                comments: [
                    {
                        comment: req.body.comment,
                        user: req.body.user_id,
                    },
                ],
            },
        },
        {new: true},
    )
        .then(resp =>
            res.status(201).json({message: `comment created ${resp}`}),
        )
        .catch(error => res.status(500).json({message: error}));
    return "done";
};

const buyOneTree = async (req, res) => {
    const targetTree = await Tree.findOne({_id: req.params.id});
    // console.log(targetTree);
    const buyingUser = await User.findOne({_id: req.body.user_id});
    // console.log(buyingUser);
    let basicTreeValue;
    const calcTreeValue = tree => {
        let value;
        if (tree.height === null) {
            value = 250;
        } else if (tree.circumf === null) {
            value = 250;
        } else {
            value = Math.ceil((tree.height * tree.circumf) / Math.PI);
        }
        return value;
    };
    basicTreeValue = calcTreeValue(targetTree);
    // console.log(basicTreeValue)
    let treeValue;
    let targetPlayerTreeValues = 0;
    let targetPlayerTreeCount = 0;
    let totalTreeCount = 0;
    let otherPlayersTreeValues = 0;
    let playerTreeValues = 0;

    const arrayRaces = [
        "angel",
        "cavePerson",
        "darkelf",
        "demon",
        "dragon",
        "drow",
        "dwarf",
        "elf",
        "fairy",
        "gnome",
        "goblin",
        "halfdemon",
        "halfling",
        "highelf",
        "highfairy",
        "human",
        "ogre",
        "orc",
    ];
    const randomArrayRacesKey = Math.floor(Math.random() * 18);
    const randomRace = arrayRaces[randomArrayRacesKey];
    const gender = ["male", "female"];
    const randomGenderKey = Math.round(Math.random());
    const randomGender = gender[randomGenderKey];
    let randomName;
    let treeName;

    if (randomRace === "human") {
        randomName = nameByRace(randomRace, {
            gender: randomGender,
            allowMultipleNames: true,
        });
    }
    // else if (randomRace === "demon" || randomRace === "goblin" || randomRace === "ogre" || randomRace === "orc") {
    //     randomName = nameByRace(randomRace)
    // }
    else {
        randomName = nameByRace(randomRace, {gender: randomGender});
    }

    if (targetTree.is_locked === true) {
        return res
            .status(403)
            .json({message: "This tree is locked, it can't be bought!"});
    }

    if (targetTree.owner === null) {
        console.log("free tree case");
        treeValue = basicTreeValue;
        console.log(treeValue);
        treeName = randomName;
    } else if (targetTree.owner.toString() === req.body.user_id.toString()) {
        return res
            .status(409)
            .json({message: "This Tree is already yours, smartass!"});
    } else {
        console.log("owned by other case");
        // console.log(targetTree.location.coordinates);
        treeName = targetTree.nickname;
        treeValue = await Tree.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: targetTree.location.coordinates,
                    },
                    $maxDistance: 100,
                },
            },
        })
            .then(resp => {
                resp.forEach(resp1 => {
                    // console.log(`owner ${resp1.owner}`);
                    // console.log(`target user ${req.body.user_id}`);
                    if (resp1.owner === null) {
                        totalTreeCount++;
                    } else if (
                        resp1._id.toString() === targetTree._id.toString()
                    ) {
                        targetPlayerTreeCount++;
                    } else if (
                        resp1.owner.toString() === targetTree.owner.toString()
                    ) {
                        targetPlayerTreeValues =
                            targetPlayerTreeValues + calcTreeValue(resp1);
                        targetPlayerTreeCount = targetPlayerTreeCount + 1;
                        totalTreeCount++;
                    } else if (
                        resp1.owner.toString() === req.body.user_id.toString
                    ) {
                        playerTreeValues =
                            playerTreeValues + calcTreeValue(resp1);
                        totalTreeCount++;
                    } else {
                        // console.log(resp1)
                        otherPlayersTreeValues =
                            otherPlayersTreeValues + calcTreeValue(resp1);
                        totalTreeCount++;
                    }
                });
                // console.log(totalTreeCount);
                // console.log(`tptv ${targetPlayerTreeValues}`);
                // console.log(`tptc ${targetPlayerTreeCount}`);
                // console.log(`ptv ${playerTreeValues}`);
                // console.log(`optv ${otherPlayersTreeValues}`);
                // console.log(basicTreeValue)
                treeValue =
                    basicTreeValue +
                    (targetPlayerTreeValues * totalTreeCount) /
                        targetPlayerTreeCount +
                    otherPlayersTreeValues -
                    playerTreeValues;
                console.log(`final ${treeValue}`);
                return treeValue;
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (buyingUser.leaves_count < treeValue) {
        return res
            .status(403)
            .json({message: "You don't have enough leaves to buy that tree"});
    }

    User.updateOne(
        {_id: req.body.user_id},
        {leaves_count: buyingUser.leaves_count - treeValue},
    )
        .then(() => {
            Tree.updateOne(
                {_id: req.params.id},
                {
                    owner: req.body.user_id,
                    nickname: treeName,
                },
            )
                .then(() => res.status(200).json({message: "Tree bought"}))
                .catch(error => res.status(500).json({message: error}));
        })
        .catch(error => res.status(500).json({message: error}));

    return "done";
};

module.exports = {displayAllTrees, addComment, displayOneTree, buyOneTree};
