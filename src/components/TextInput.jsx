import "./TextInput.css";

const TextInput = ({handleChange, value, classes, name, placeholder, type}) => {
    return (
        <input 
            type={type ? type : "text"}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className={`txt-input ${classes ? classes : ""}`} />

    );
};

export default TextInput;