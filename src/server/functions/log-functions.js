/* eslint-disable no-console */
import LogEntry from "../model/log";

const writeIntoLog = (user_id, actionDone, tree_id, res) => {
    const logEntry1 = new LogEntry({
        user: user_id,
        action: actionDone,
        object_of_action: tree_id,
    });

    logEntry1
        .save()
        .then(resp => {
            console.log(`entry saved ${resp}`);
        })
        .catch(error => res.status(500).json({message: error}));
};

const displayAllLogs = (req, res) => {
    LogEntry.find()
        .populate("user")
        .populate("object_of_action")
        .then(resp => res.status(200).json({message: resp}))
        .catch(error => res.status(500).json({message: error}));
};

module.exports = {writeIntoLog, displayAllLogs};
