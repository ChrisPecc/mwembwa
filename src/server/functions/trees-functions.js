import Tree from "../model/tree";
import User from "../model/users";

const displayAllTrees = (req, res) => {
    Tree.find()
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

module.exports = {displayAllTrees, addComment};
