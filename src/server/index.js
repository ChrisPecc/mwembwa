/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import express from "express";
import path from "path";
// import { doesNotMatch } from "assert";

import Tree from "./model/tree";

const mongoose = require("mongoose");
const routesUsers = require("./routes/user-routes");
const routesTrees = require("./routes/tree-routes");
const bodyParser = require("body-parser");

const {APP_PORT} = process.env;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

mongoose
    .connect(`mongodb://mongo:27017/trees`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
        auth: {
            user: "dev",
            password: "dev",
        },
    })
    .then(() => {
        console.log("Connexion à MongoDB réussie !");
    })
    .catch(error => console.error(`Connexion à MongoDB échouée ! ${error}`));

app.use(bodyParser.json());

app.use("/api/user", routesUsers);
app.use("/api/trees", routesTrees);

//Used to modify the "tree-data" collection

Tree.findOne({_id: "5f64856c02495a3ea0b22439"})
    .populate("comments.user")
    .then(resp => {
        console.log(resp);
    });

// Tree.update({}, {$unset: {name: 1}}, {multi: true})
// .then(resp => {
//     console.log("Field deleted");
// })
// .catch(error => {
//     console.log("Error: " + error)
// })

// Tree.update({}, {$rename: {"comments.user": "comments.author"}}, false, true)
// .then(resp => {
//     console.log("Field added");
// })
// .catch(error => {
//     console.log("Error: " + error)
// })
