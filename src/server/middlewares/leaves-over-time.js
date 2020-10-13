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
    console.log(
        `lrd ${lastRequestDate} tlfpr ${timeLeftFromPreviousRequests} qslc ${quarterSinceLastCalc}`,
    );
    console.log(`nrd${newRequestDate}`);
    const timeSinceLastRequest = newRequestDate - lastRequestDate;
    const timeSinceLastCalculation =
        timeSinceLastRequest + timeLeftFromPreviousRequests;
    const numberOfActions = Math.floor(
        timeSinceLastCalculation / timeBetweenActions,
    );
    const timeModulo = timeSinceLastCalculation % timeBetweenActions;
    console.log(
        `number of actions ${numberOfActions} time modulo ${timeModulo}`,
    );
    // let quarterCount = quarterSinceLastCalc

    let quarterCountLoop;

    const users = await User.find();
    // console.log (users)

    users.forEach(async user => {
        let treesValue = 0;
        let newLeavesAmount = user.leaves_count;
        // console.log(user.username + "'s leave count " + newLeavesAmount)
        const userTrees = await Tree.find({owner: user._id});
        // console.log("ut " + userTrees);
        userTrees.forEach(treeElement => {
            quarterCountLoop = quarterSinceLastCalc;
            treesValue = treesValue + treesFunctions.calcTreeValue(treeElement);
            for (let i = 0; i < numberOfActions; i++) {
                newLeavesAmount = newLeavesAmount + treesValue;
                quarterCountLoop++;
                if (quarterCountLoop === 4) {
                    newLeavesAmount = newLeavesAmount / 2;
                    quarterCountLoop = 0;
                }
            }
        });
        // console.log(user.username +" nla " +newLeavesAmount)
        // console.log("global quarter " + quarterSinceLastCalc)
        // console.log(user.username + " quarter count "+ quarterCountLoop)
    });

    console.log(`final quarter count ${quarterCountLoop}`);
    // quarterSinceLastCalc = quarterLeft
    req.app.set("timeLeftFromPreviousRequests", timeModulo);
    lastRequestDate = newRequestDate;
    req.app.set("lastRequestDate", newRequestDate);
    console.log(`lnrd ${lastRequestDate}`);
    next();
};

module.exports = {leavesOverTime};
