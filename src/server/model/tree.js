// import User from "../model/users"

const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const treeSchema = new mongoose.Schema(
    {
        lat: {type: Number},
        lon: {type: Number},
        bought_at: {type: Date},
        former_owners: [
            {
                username: {type: ObjectId, ref: "User"},
                buying_date: {type: Date},
            },
        ],
        location: {
            type: {type: String, default: "Point"},
            // [lon, lat] so we can use $near : $geometry
            coordinates: [{type: Number}, {type: Number}],
        },
        owner: {type: ObjectId, ref: "User", default: null},
        comments: [
            {
                comment: {type: String},
                user: {type: ObjectId, ref: "User"},
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
treeSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Tree", treeSchema);
