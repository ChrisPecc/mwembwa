import Tree from "../model/tree";
import User from "../model/users";

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
    console.log(targetTree);
    const targetUser = await User.findOne({_id: req.body.user_id});
    console.log(targetUser);
    if (!targetTree) {
        return res.status(404).json({message: "This tree does not exist"});
    }
    if (!targetUser) {
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
    console.log(targetTree);
    const targetUser = await User.findOne({_id: req.body.user_id});
    console.log(targetUser);
    const basicTreeValue = Math.ceil(
        (targetTree.height * targetTree.circumf) / Math.PI,
    );
    console.log(basicTreeValue);
    let treeValue = 0;

    if (targetTree.is_locked === true) {
        return res
            .status(403)
            .json({message: "This tree is locked, it can't be bought!"});
    }

    if (targetTree.owner.toString() === req.body.user_id.toString()) {
        return res
            .status(409)
            .json({message: "This Tree is already yours, smartass!"});
    } else if (targetTree.owner === null) {
        console.log("free tree case");
        treeValue = basicTreeValue;
        console.log(treeValue);
    } else {
        console.log("owned by other case");
        treeValue = basicTreeValue * 2;
        console.log(treeValue);
    }

    if (targetUser.leaves_count < treeValue) {
        return res
            .status(403)
            .json({message: "You don't have enough leaves to buy that tree"});
    }

    User.updateOne(
        {_id: req.body.user_id},
        {leaves_count: targetUser.leaves_count - treeValue},
    )
        .then(() => {
            Tree.updateOne({_id: req.params.id}, {owner: req.body.user_id})
                .then(() => res.status(200).json({message: "Tree bought"}))
                .catch(error => res.status(500).json({message: error}));
        })
        .catch(error => res.status(500).json({message: error}));

    return "done";
};

module.exports = {displayAllTrees, addComment, displayOneTree, buyOneTree};
