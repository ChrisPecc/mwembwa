import User from "../model/users";

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const leavesFunctions = require("../functions/leaves-functions");

const saveData = async (req, res, hash, leaves) => {
    const userExists = await User.exists({username: req.body.username});
    // .then(resp => resp)
    // .catch(error => error);
    console.log(userExists);

    const emailExists = await User.exists({email: req.body.email});
    // .then(resp => resp)
    // .catch(error => error);
    console.log(emailExists);

    if (userExists) {
        return res
            .status(409)
            .json({message: "this username is already in use"});
    } else if (emailExists) {
        return res.status(409).json({message: "this email is already in use"});
    }

    const user1 = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        color: req.body.color,
        leaves_count: leaves,
    });

    user1
        .save()
        .then(() => res.status(201).json({message: "new user enregistré!"}))
        .catch(error => res.status(500).json({message: error}));

    return "it should never get there but I can't commit without it";
};

const signUp = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(hash);
    const leaves = await leavesFunctions.leavesAtStart();
    // .then(resp => {
    //     console.log(resp);
    //     return resp;
    // })
    // .catch(error => error);

    saveData(req, res, hash, leaves);
};

const login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(resp => {
            if (!resp) {
                return res
                    .status(400)
                    .json({message: "this user doesn't exist"});
            }

            const verified = bcrypt.compareSync(
                req.body.password,
                resp.password,
            );
            if (!verified) {
                return res
                    .status(401)
                    .json({message: "wrong email/password combination"});
            }

            return res.status(200).json({message: resp});
        })
        .catch(error => console.log(error));
};

module.exports = {signUp, login};
