import React from "react";
import './Button.css'

const Button = ({ onClick, text, disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button