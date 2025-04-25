import "./Button.css";

const Button = ({content, classes, type, handleClick, icon, submit}) => {
    return (
        <button 
            className={`btn ${classes ? classes : ""} ${type ? type : ""}`}
            onClick={(e) => {e.preventDefault(); handleClick(e)}}
            type={submit ? "submit" : ""}>
            {content} {icon ? icon : ""}
        </button>
    );
}

export default Button;