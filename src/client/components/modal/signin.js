import React from "react";
// import {createPortal} from "react-dom";
// import Button from "../game-page/button";
import axios from "axios";
import {useForm} from "react-hook-form";

const Signin = ({show = false}) => {
    if (!show) {
        return null;
    }
    const {register, handleSubmit} = useForm();

    const submitValues = data => {
        console.log(data);
        axios
            .post("/api/users/login", data)
            .then(resp => {
                localStorage.setItem("user_id", resp.data.user_id);
                localStorage.setItem("username", resp.data.username);
                localStorage.setItem("token", resp.data.token);
                // console.log(resp.data);
                // console.log(localStorage.getItem("username"));
            })
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
    };
    return (
        <div style={containerStyles}>
            <form onSubmit={handleSubmit(submitValues)}>
                <label>{"email"}</label>
                <br />
                <input
                    name={"email"}
                    type={"email"}
                    className={"email"}
                    ref={register}
                />
                <br /> <br />
                <label>{"password"}</label>
                <br />
                <input
                    name={"password"}
                    type={"password"}
                    className={"password"}
                    ref={register}
                />
                <input type={"submit"} value={"submit"} />
            </form>
        </div>
    );
};
export default Signin;
