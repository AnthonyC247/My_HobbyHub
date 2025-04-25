import "./Search.css";
import TextInput from "./TextInput";

const Search = ({handleChange, search}) => {
    return (
        <div className="search-bar">
            <TextInput 
                classes={'search'}
                handleChange={handleChange}
                placeholder={'Search...'}/>
        </div> 
    );
};

export default Search;