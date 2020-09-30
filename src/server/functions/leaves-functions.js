import User from "../model/users";

const leavesAtStart = async () => {
    const totalUsersLeaves = await User.find()
        .then(resp => {
            let totalLeaves = 0;
            resp.forEach(res1 => {
                totalLeaves = totalLeaves + res1.leaves_count;
                console.log(totalLeaves);
            });
            return totalLeaves;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
    console.log(totalUsersLeaves);

    const playersCount = await User.countDocuments()
        .then(resp => resp)
        .catch(error => error);
    console.log(playersCount);

    const startingLeaves = Math.ceil(totalUsersLeaves / playersCount);
    console.log(startingLeaves);

    return startingLeaves;
};

module.exports = {leavesAtStart};
