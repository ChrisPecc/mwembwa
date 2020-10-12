/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import express from "express";
import path from "path";
import leavesMiddleware from "./middlewares/leaves-over-time";

import Tree from "./model/tree";

const mongoose = require("mongoose");
const routesUsers = require("./routes/user-routes");
const routesTrees = require("./routes/tree-routes");
const routesLogs = require("./routes/log-routes");
const bodyParser = require("body-parser");

const {APP_PORT} = process.env;

const app = express();
global.lastRequestDate = Date.now();
global.timeLeftFromPreviousRequests = 0; //between 0 and 15min
global.quarterSinceLastCalc = 1;

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

app.use("/api/", leavesMiddleware.leavesOverTime);
app.use("/api/users", routesUsers);
app.use("/api/trees", routesTrees);
app.use("/api/logs", routesLogs);

// DATA TREE COLLECTION MODIFIERS

Tree.find({owner: "5f845ef875a6600616e4faa9"})
    // .populate("comments.user")
    .then(resp => console.log(resp))
    .catch(error => {
        console.log(error);
    });

// Tree.update({}, {$set: {former_owners: []}}, {multi: true})
// .then(resp => {
//     console.log("field added");
// })
// .catch(error => {
//     console.log("Error: " + error)
// })
// let count2 = 0;
// let counttotal2 = 0;

// Tree.find()
//     .then(resp => resp.forEach(async resp1 => {
//         if (!resp1.location ) {
//             console.log("the one that is missing")
//             count2 ++
//             counttotal2 ++
//         }
//         else{
//             counttotal2 ++
//             console.log(resp1._id)
//             console.log(resp1.location.coordinates)
//             console.log(count2 +"/"+ counttotal2)
//             await Tree.updateOne(
//                 {_id: resp1._id},
//                 {
//                     $set : {
//                         lat : resp1.location.coordinates[0],
//                         lon : resp1.location.coordinates[1]
//                     }
//                 }
//             )

//         }

//     }))
//     .catch(error => {
//         console.log("Error: " + error)
//     })

// Tree.find()
//     .then(resp => resp.forEach(async resp1 => {
//         if (resp1.geoloc === null){
//             console.log("this one is the faulty one")
//         }
//         else {
//             console.log(resp1._id)
//             console.log(resp1.lat)
//             console.log(resp1.lon)
//             await Tree.updateOne(
//                 {_id: resp1._id},
//                 {$set: {
//                     location : {
//                             type : "Point",
//                             coordinates : [resp1.lon , resp1.lat]
//                         }
//                     }
//                 },
//             )
//         }
//     }))
//     .catch(error => {
//         console.log("Error: " + error)
//     })

// let count = 0;
// let totalcount = 0;
// Tree.find()
//     .then(resp => resp.forEach(resp1 => {
//         if (resp1.location === undefined) {
//             console.log(resp1)
//             console.log("this is the wrong one")
//             totalcount = totalcount + 1
//         }
//         else {
//             if (resp1.lat === resp1.location.coordinates[0]){
//                 count ++
//                 totalcount = totalcount + 1
//             }
//             else {
//                 if (resp1.lon === resp1.location.coordinates[1]){
//                     count ++
//                     totalcount = totalcount + 1
//                 }
//                 else {
//                     totalcount = totalcount + 1
//                 }
//             }
//             console.log(count +"/"+ totalcount)
//         }
//     }
//     ))

// Tree.update({}, {$rename: {"comments.user": "comments.author"}}, false, true)
// .then(resp => {
//     console.log("Field added");
// })
// .catch(error => {
//     console.log("Error: " + error)
// })
