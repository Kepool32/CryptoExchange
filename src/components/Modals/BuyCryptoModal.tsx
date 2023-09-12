import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../Error/ErrorMessage';
import '../../style/buyCryptoModal.scss';
import { getPortfolioData, setPortfolioData } from "../../utils/localStorage";
import {BuyCryptoModalProps} from "../../types/types";


const BuyCryptoModal: React.FC<BuyCryptoModalProps> = ({ isOpen, onClose, coinSymbol, price }) => {

    const [quantity, setQuantity] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(parseFloat(price));
    const [error, setError] = useState<string>('');


    useEffect(() => {
        setTotalPrice(quantity * parseFloat(price));
    }, [quantity, price]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 15) {
            setQuantity(value);
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
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleInputChange}
                        min="1"
                        max="15"
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
