/* eslint-disable no-throw-literal */
import {verify} from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verify(
            token,
            "D4CC737A277F6B29C32D302E385C238AD8B2E1CC0C368B9FAD7537F9D27DD106",
        );
        const userId = decodedToken.user_id;
        if (req.body.user_id && req.body.user_id !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
    } catch {
        res.status(401).json({message: "Invalid request"});
    }
};

module.exports = {authMiddleware};
