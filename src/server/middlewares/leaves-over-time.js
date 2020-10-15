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
    const promises = await users.map(async user => {
        const treesOfUser = await Tree.find({owner: user._id}).exec();
        return treesOfUser;
    });

    const userTrees = await Promise.all(promises);
    // console.log(`usertree${userTrees[2][0]}`);

    // users.forEach(async user =>
    for (const [i, element] of users.entries()) {
        let treesValue = 0;
        let newLeavesAmount = element.leaves_count;
        console.log(`${element.username}'s leave count ${newLeavesAmount}`);
        let quarterCountLoop = quarterSinceLastCalc;
        // eslint-disable-next-line no-await-in-loop
        // const userTrees = await Tree.find({owner: user._id});
        // console.log("ut " + userTrees);

        // userTrees.forEach(treeElement =>
        for (let j = 0; j < userTrees[i].length; j++) {
            if (element._id.toString() !== userTrees[i][j].owner.toString()) {
                console.log("there is an error");
                return res
                    .status(500)
                    .json({message: "ower and treeId don't match"});
            }
            treesValue =
                treesValue + treesFunctions.calcTreeValue(userTrees[i][j]);
            console.log(`treesvalues ${treesValue}`);
        }
        for (let k = 0; k < numberOfActions; k++) {
            newLeavesAmount = newLeavesAmount + treesValue;
            console.log(
                `${element.username} nla after ${k} turn ${newLeavesAmount}`,
            );
            quarterCountLoop++;
            if (quarterCountLoop === 4) {
                newLeavesAmount = newLeavesAmount / 2;
                quarterCountLoop = 0;
            }

            if (k === numberOfActions - 1) {
                // console.log("qcloop " + quarterCountLoop)
                console.log(`${element.username} new value ${newLeavesAmount}`);
            }
        }
        console.log(`${element.username} nla ${newLeavesAmount}`);
        // console.log("global quarter " + quarterSinceLastCalc)
        // console.log(user.username + " quarter count "+ quarterCountLoop)
        User.updateOne(
            {_id: element._id},
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
    return "done";
};

module.exports = {leavesOverTime};
