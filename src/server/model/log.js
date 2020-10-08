const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const logSchema = new mongoose.Schema(
    {
        user: {type: ObjectId, ref: "User"},
        action: {type: String},
        object_of_action: {type: ObjectId, ref: "Tree"},
        date: {type: Date, default: Date.now},
    },
    {colleciton: "logs"},
);

module.exports = mongoose.model("LogEntry", logSchema);
