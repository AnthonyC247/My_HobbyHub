import Button from './Button';
import './SortFilters.css';

const SortFilters = ({handleTime, handlePopularity}) => {
    return (
        <div className="sorting-btns-container">
            <h2>Sort By:</h2>
            <div className="min-content row">
                <Button 
                    handleClick={() => handleTime()}
                    content={"Time"}
                    classes={"sort-btn"} />
                <Button 
                    handleClick={() => handlePopularity()}
                    content={"Popularity"}
                    classes={"sort-btn"} />
            </div>
            
            
        </div>
    );
};

export default SortFilters;