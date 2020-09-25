const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {type: String},
        email: {type: String, unique: true},
        password: {type: String},
        leaves_count: {type: Number, default: 0},
        inscription_date: {type: Date, default: Date.now},
    },
    {collection: "users"},
);

module.exports = mongoose.model("User", userSchema);
