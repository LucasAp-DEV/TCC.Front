import React from "react";
import './ErrorMessage.css'

const ErrorMessage = ({ onClick, text, text1}) => {
    return (
        <div>
            <h1>{text1}</h1>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default ErrorMessage;