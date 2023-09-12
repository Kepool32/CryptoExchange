import React from 'react';
import {PaginationButtonProps} from "../../types/types";



const PaginationButton: React.FC<PaginationButtonProps> = ({ handleNextPage }) => {
    return (
        <div>
            <button onClick={handleNextPage}>Load More</button>
        </div>
    );
};

export default PaginationButton;
