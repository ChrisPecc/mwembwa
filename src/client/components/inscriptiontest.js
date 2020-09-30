import * as React from "react";
import {useForm} from "react-hook-form";
// import React, {useState, useEffect} from "react";
import axios from "axios";

const Test = () => {
    const {register, handleSubmit} = useForm();

    const submitValues = data => {
        axios
            .post("/api/user/signup", data)
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submitValues)}>
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
                    type={"text"}
                    className={"password"}
                    ref={register}
                />
                <br /> <br />
                <input type={"submit"} value={"submit"} />
            </form>
        </div>
    );
};

export default Test;
