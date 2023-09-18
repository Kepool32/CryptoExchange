import React, { useEffect, useState } from 'react';
import "./style/PortfolioModal.scss";
import {getPortfolioData, setPortfolioData} from "utils/localStorage";


export type PortfolioModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type PortfolioDataItem = {
    coinSymbol: string;
    quantity: number;
    price: number;
};

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
    const [portfolioData, setPortfolioDatas] = useState<PortfolioDataItem[]>([]);


    useEffect(() => {
        const data = getPortfolioData();
        setPortfolioDatas(data || []);
    }, []);

    const handleDelete = (indexToDelete: number) => {
        const updatedPortfolioData = [...portfolioData];
        updatedPortfolioData.splice(indexToDelete, 1);

        setPortfolioDatas(updatedPortfolioData);
        setPortfolioData(updatedPortfolioData);
    };



    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div  className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Portfolio Details</h2>
                <table className="portfolio-table">
                    <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolioData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.coinSymbol}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PortfolioModal;
