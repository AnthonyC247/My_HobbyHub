// This component creates the Icon 
// then renders the btn content under it

import './IconButton.css';

const IconButton = ({icon, content, handleClick, classes}) => {
    return (
        <button 
            className={`icon-btn ${classes ? classes : ""}`}
            onClick={(e) => handleClick(e)}>
            {icon}
            {content}
        </button>
    );
};

export default IconButton;