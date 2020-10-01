/* eslint-disable react/button-has-type */
import React, {useCallback, useState} from "react";
import Tools from "../tools";
import "./game-page.css";
import MainMap from "../map/map-view";
import Leaderboard from "../modal/leaderboard";
import Gamelog from "../modal/gamelog";
import Signin from "../modal/signin";

const GamePage = () => {
    const [runLeader, setRunLeader] = useState(false);
    const showLeader = useCallback(() => {
        setRunLeader(true);
    }, [setRunLeader]);

    const [runLog, setRunLog] = useState(false);
    const showgamelog = useCallback(() => {
        setRunLog(true);
    }, [setRunLog]);

    const [runSignIn, setRunSignIn] = useState(false);
    const showsignin = useCallback(() => {
        setRunSignIn(true);
    }, [setRunSignIn]);

    const [runSignUp, setRunSignUp] = useState(false);
    const showsignup = useCallback(() => {
        setRunSignUp(true);
    }, [setRunSignUp]);
    return (
        <div>
            <div>
                <MainMap />
            </div>
            <div>
                <Tools
                    leaderboard={showLeader}
                    gamelog={showgamelog}
                    signin={showsignin}
                    signup={showsignup}
                />
            </div>
            <Leaderboard show={runLeader} />
            <Gamelog show={runLog} />
            <Signin show={runSignIn} />
            <Gamelog show={runSignUp} />
        </div>
    );
};

export default GamePage;
