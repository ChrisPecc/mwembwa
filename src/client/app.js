/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";
// import {BrowserRouter, Route} from "react-router-dom";
import GamePage from "./components/game-page/game-page";

// eslint-disable-next-line no-unused-vars
import css from "./main.css";

ReactDOM.render(<GamePage />, document.querySelector("#app"));
