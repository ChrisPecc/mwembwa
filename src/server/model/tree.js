const mongoose = require("mongoose");
const {ObjectID} = require("mongodb");

const treeSchema = new mongoose.Schema(
    {
        geoloc: [
            {
                lat: {type: Number},
                lon: {type: Number},
            },
        ],
        owner: {type: ObjectID, default: null},
        comments: [
            {
                comment: {type: String},
                user: {type: ObjectID},
                postDate: {type: Date, default: Date.now},
            },
        ],
        height: {type: Number},
        nickname: {type: String, default: null},
        complete_name: {type: String},
        is_locked: {type: Boolean, default: false},
        circumf: {type: Number},
    },
    {collection: "trees-data"},
);

module.exports = mongoose.model("Tree", treeSchema);
