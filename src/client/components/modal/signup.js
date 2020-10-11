import React from "react";
// import axios from "axios";
// import {createPortal} from "react-dom";
// import Button from "../game-page/button";

const Signup = ({show = false}) => {
    if (!show) {
        return null;
    }
    // const submitValues = data => {
    //     axios
    //         .post("/api/user/signup", data)
    //         .then(resp => console.log(resp))
    //         .catch(error => console.log(error));
    // };
    const containerStyles = {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        width: "50%",
        flexdirection: "column",
    };
    return (
        <div style={containerStyles}>
            <form>
                <label>{"username"}</label>
                <br />
                <input name={"username"} type={"text"} className={"username"} />
                <br />
                <label>{"email"}</label>
                <br />
                <input name={"email"} type={"email"} className={"email"} />
                <br />
                <label>{"password"}</label>
                <br />
                <input name={"password"} type={"text"} className={"password"} />
                <br /> <br />
                <input type={"submit"} value={"submit"} />
            </form>
        </div>
    );
};
export default Signup;
