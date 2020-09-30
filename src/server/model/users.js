const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true},
        email: {type: String, unique: true},
        password: {type: String},
        leaves_count: {type: Number},
        inscription_date: {type: Date, default: Date.now},
        color: {type: String, default: "#FFFFFF"},
    },
    {collection: "users"},
);

module.exports = mongoose.model("User", userSchema);
