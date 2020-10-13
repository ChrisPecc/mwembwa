import Tree from "../model/tree";
import User from "../model/users";

import treesFunctions from "../functions/trees-functions";

const leavesOverTime = async (req, res, next) => {
    const timeBetweenActions = 10000; //10 sec for work

    const newRequestDate = Date.now();

    let lastRequestDate = req.app.get("lastRequestDate");
    const timeLeftFromPreviousRequests = req.app.get(
        "timeLeftFromPreviousRequests",
    );
    const quarterSinceLastCalc = req.app.get("quarterSinceLastCalc");

    console.log(`nrd${newRequestDate}`);
    const timeSinceLastRequest = newRequestDate - lastRequestDate;
    const timeSinceLastCalculation =
        timeSinceLastRequest + timeLeftFromPreviousRequests;
    const numberOfActions = Math.floor(
        timeSinceLastCalculation / timeBetweenActions,
    );
    console.log(`noa ${numberOfActions}`);
    const timeModulo = timeSinceLastCalculation % timeBetweenActions;
    const quarterLeft = (numberOfActions + quarterSinceLastCalc) % 4;
    console.log(
        `number of actions ${numberOfActions} time modulo ${timeModulo}`,
    );
    // let quarterCount = quarterSinceLastCalc

    const users = await User.find();
    // console.log (users)

    // users.forEach(async user =>
    for (const user of users) {
        let treesValue = 0;
        let newLeavesAmount = user.leaves_count;
        console.log(`${user.username}'s leave count ${newLeavesAmount}`);
        // eslint-disable-next-line no-await-in-loop
        const userTrees = await Tree.find({owner: user._id});
        // console.log("ut " + userTrees);
        let quarterCountLoop = quarterSinceLastCalc;

        // userTrees.forEach(treeElement =>
        for (const treeElement of userTrees) {
            treesValue = treesValue + treesFunctions.calcTreeValue(treeElement);
            console.log(`treesvalues ${treesValue}`);
        }
        for (let i = 0; i < numberOfActions; i++) {
            newLeavesAmount = newLeavesAmount + treesValue;
            console.log(
                `${user.username} nla after ${i} turn ${newLeavesAmount}`,
            );
            quarterCountLoop++;
            if (quarterCountLoop === 4) {
                newLeavesAmount = newLeavesAmount / 2;
                quarterCountLoop = 0;
            }

            if (i === numberOfActions - 1) {
                // console.log("qcloop " + quarterCountLoop)
                console.log(`${user.username} new value ${newLeavesAmount}`);
            }
        }
        console.log(`${user.username} nla ${newLeavesAmount}`);
        // console.log("global quarter " + quarterSinceLastCalc)
        // console.log(user.username + " quarter count "+ quarterCountLoop)
        User.updateOne(
            {_id: user._id},
            {leaves_count: Math.floor(newLeavesAmount)},
        )
            .then(console.log("updated"))
            .catch(error => res.status(500).json({message: error}));
    }

    console.log(`final quarter count ${quarterLeft}`);
    req.app.set("quarterSinceLastCalc", quarterLeft);
    console.log(
        `app variable ${req.app.get(
            "quarterSinceLastCalc",
        )} function variable ${quarterSinceLastCalc}`,
    );
    req.app.set("timeLeftFromPreviousRequests", timeModulo);
    lastRequestDate = newRequestDate;
    req.app.set("lastRequestDate", newRequestDate);
    console.log(`lnrd ${lastRequestDate}`);
    next();
};

module.exports = {leavesOverTime};
