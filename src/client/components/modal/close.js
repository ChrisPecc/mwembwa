import React from "react";
import Button from "../game-page/button";

const Close = ({close}) => (
    <Button title={"close"} label={"close"} onClick={close} />
);

export default Close;
