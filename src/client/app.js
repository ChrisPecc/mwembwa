/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";
import MainMap from "./components/map/map-view";
// eslint-disable-next-line no-unused-vars
import css from "./main.css";

ReactDOM.render(<MainMap />, document.querySelector("#app"));
