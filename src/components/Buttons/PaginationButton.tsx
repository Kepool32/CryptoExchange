import React from 'react';
import "./style/PaginationButton.scss"

export interface PaginationButtonProps {
    handlePrevPage: () => void;
    handleNextPage: () => void;
    page: number;
    isLoadingMore: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ handlePrevPage, handleNextPage, page, isLoadingMore }) => {
    return (
        <div className='coin-list-container'>

            <button
                className='load--button'
                onClick={handlePrevPage}
                disabled={page === 0}
            >
                Previous
            </button>
            <button className='load-more-button' onClick={handleNextPage}>
                {isLoadingMore ? 'Loading...' : 'Next'}
            </button>
        </div>
    );
};

export default PaginationButton;
