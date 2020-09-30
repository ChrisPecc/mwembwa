import Tree from "../model/tree";

const displayAllTrees = (req, res) => {
    Tree.find()
        .then(resp => res.status(200).json({message: resp}))
        .catch(error => res.status(500).json({message: error}));
};

module.exports = {displayAllTrees};
