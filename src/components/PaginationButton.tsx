import React from 'react';

interface PaginationButtonProps {
    handleNextPage: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ handleNextPage }) => {
    return (
        <div>
            <button onClick={handleNextPage}>Load More</button>
        </div>
    );
};

export default PaginationButton;
