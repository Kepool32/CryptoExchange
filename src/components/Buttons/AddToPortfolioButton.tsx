import React, { useState } from 'react';
import BuyCryptoModal from '../Modals/BuyCryptoModal';
import '../../style/CoinTable.scss';
import {AddToPortfolioButtonProps} from "../../types/types";


const AddToPortfolioButton: React.FC<AddToPortfolioButtonProps> = ({ symbol, price }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="add-button" onClick={() => openModal()}>
                Add to Portfolio
            </button>

            {isModalOpen && (
                <BuyCryptoModal
                    isOpen={isModalOpen}
                    onClose={() => closeModal()}
                    coinSymbol={symbol}
                    price={price}
                />
            )}
        </>
    );
};

export default AddToPortfolioButton;
