import React from "react";
import Button from "./game-page/button";

const Tools = ({leaderboard, gamelog, signin, signup}) => (
    <div>
        <Button
            title={"leaderboard"}
            label={"leaderboard"}
            onClick={leaderboard}
        />
        <Button title={"gamelog"} label={"gamelog"} onClick={gamelog} />
        <Button title={"signin"} label={"signin"} onClick={signin} />
        <Button title={"signup"} label={"signup"} onClick={signup} />
    </div>
);
export default Tools;
