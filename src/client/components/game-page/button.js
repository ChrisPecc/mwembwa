import React from "react";

const Button = ({label, title, onClick}) => (
    <button
        onClick={onClick}
        className={"button"}
        // eslint-disable-next-line react/button-has-type
        type={"button"}
        title={title || label}>
        {label}
    </button>
);

export default Button;
