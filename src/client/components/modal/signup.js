import React from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {CirclePicker} from "react-color";
// import {createPortal} from "react-dom";
// import Button from "../game-page/button";
// import Close from "./close";

const Signup = ({show = false}) => {
    if (!show) {
        return null;
    }
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    let colorSelected = getRandomColor();

    const handleClickColor = e => {
        colorSelected = e.target.title;
    };
    const {register, handleSubmit} = useForm();

    const submitValues = data => {
        console.log({data});
        axios
            .post("/api/users/signup", data)
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
    };
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
        <div style={containerStyles} onSubmit={handleSubmit(submitValues)}>
            <form>
                <label>{"username"}</label>
                <br />
                <input
                    name={"username"}
                    type={"text"}
                    className={"username"}
                    ref={register}
                />
                <br />
                <label>{"email"}</label>
                <br />
                <input
                    name={"email"}
                    type={"email"}
                    className={"email"}
                    ref={register}
                />
                <br />
                <label>{"password"}</label>
                <br />
                <input
                    name={"password"}
                    type={"password"}
                    className={"password"}
                    ref={register}
                />
                <label>{"confirm password"}</label>
                {/* <input
                    name={"confirm-password"}
                    type={"password"}
                    className={"confirmPassword"}
                /> */}
                <div className={"formRandomColor"}>
                    <span
                        onClick={e => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={e => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={e => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={e => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={e => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                </div>
                <input
                    name={"color"}
                    type={"color"}
                    className={"color"}
                    value={colorSelected}
                    ref={register}
                    hidden
                />
                <br /> <br />
                <input type={"submit"} value={"submit"} />
            </form>
        </div>
    );
};
export default Signup;
