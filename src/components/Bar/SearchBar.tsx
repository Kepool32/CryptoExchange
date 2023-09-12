import React from 'react';
import "../../style/SearchBar.scss"
import {SearchBarProps} from "../../types/types";


const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-bar-container">
            <input
                className="search-bar"
                type="text"
                placeholder="Search "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
