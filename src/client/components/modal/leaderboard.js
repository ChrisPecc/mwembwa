import React from "react";
// import {createPortal} from "react-dom";
// import Button from "../game-page/button";

const Leaderboard = ({show = false}) => {
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
            <h1>{"leaderboard"}</h1>
            <h2>{"tableau"}</h2>
        </div>
    );
};
export default Leaderboard;
