import React, { useState } from 'react';
import BuyCryptoModal from '../Modals/BuyCryptoModal';
import '../Coins/styles/CoinTable.scss';


export type AddToPortfolioButtonProps = {
    symbol: string;
    price: string;
};

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
