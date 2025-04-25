import Search from "./Search";
import SortFilters from "./SortFilters";
import "./Filters.css";

const Filters = ({handleTime, handlePopularity, search, handleSearch}) => {
    return (
        <div className="filters row">
            <SortFilters 
                handlePopularity={handlePopularity}
                handleTime={handleTime}/>

            <Search 
                handleChange={handleSearch}
                search={search}/>
        </div>
    );
};

export default Filters;