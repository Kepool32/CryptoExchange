import React, { useState, useEffect } from 'react';
import ErrorMessage from '../Error/ErrorMessage';
import './style/BuyCryptoModal.scss';
import { getPortfolioData, setPortfolioData } from "utils/localStorage";


export type BuyCryptoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    coinSymbol: string;
    price: string;
};

const BuyCryptoModal: React.FC<BuyCryptoModalProps> = ({ isOpen, onClose, coinSymbol, price }) => {

    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(parseFloat(price));
    const [error, setError] = useState('');


    useEffect(() => {
        setTotalPrice(quantity * parseFloat(price));
    }, [quantity, price]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue === "" || (/^\d+$/.test(inputValue) && parseInt(inputValue, 10) >= 1 && parseInt(inputValue, 10) <= 15)) {
            setQuantity(inputValue === "" ? 0 : parseInt(inputValue, 10));
            setError("");
        } else {
            setError("Quantity must be between 1 and 15");
        }
    };


    const handleBuyClick = () => {
        if (quantity >= 1 && quantity <= 15) {
            const purchaseData = {
                coinSymbol,
                quantity,
                price: parseFloat(price),
            };

            const currentData = getPortfolioData() || [];
            currentData.push(purchaseData);

            setPortfolioData(currentData);

            onClose();
        } else {
            setError(`Quantity must be between 1 and 15`);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Buy Crypto ({coinSymbol})</h2>
                <div className="input-container">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="total-price">
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                {error && <ErrorMessage message={error} />}
                <button onClick={handleBuyClick}>Buy</button>
            </div>
        </div>
    );
};

export default BuyCryptoModal;
