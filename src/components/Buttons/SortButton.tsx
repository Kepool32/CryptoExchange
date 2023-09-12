import React from 'react';
import "../../style/SortButton.scss"
import {SortButtonProps} from "../../types/types";


const SortButton: React.FC<SortButtonProps> = ({ label, onClick }) => {
    return (
        <button className="sort-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default SortButton;
