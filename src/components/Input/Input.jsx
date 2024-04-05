const Input = ({label, inputName, value, onChange, type = "text", placeholder}) => {
    return (
            <div>
                <label for={inputName}>{label}</label>
                <input 
                    type={type}
                    id={inputName}
                    name={inputName}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
    );
}

export default Input;