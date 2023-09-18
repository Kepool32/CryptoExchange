import React from 'react';
import "./styles/SortButton.scss"

export interface SortButtonProps {
    label: string;
    onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, onClick }) => {
    return (
        <button className="sort-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default SortButton;
