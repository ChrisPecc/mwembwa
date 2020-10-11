import React from "react";
// import {createPortal} from "react-dom";
// import Button from "../game-page/button";

const Gamelog = ({show = false}) => {
    if (!show) {
        return null;
    }
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
    };
    return (
        <div style={containerStyles}>
            <h1>{"gamelog"}</h1>
            <h2>{"gamelog"}</h2>
        </div>
    );
};
export default Gamelog;