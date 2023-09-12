import React, { useState, useEffect } from 'react';
import { useGetCoinsQuery } from '../../service/coinApi';
import '../../style/Header.scss';
import PortfolioModal from "../Modals/PortfolioModal";
import { getPortfolioData } from "../../utils/localStorage";
import { CalculatePortfolioPercentageChange } from "../../formattingAndSorting/calculatePortfolio";
import {CryptoData, PortfolioItem} from "../../types/types";


const Header: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioModalOpen, setPortfolioModalOpen] = useState<boolean>(false);
    const title = CalculatePortfolioPercentageChange()

    const { data } = useGetCoinsQuery({ limit: 3 }, { pollingInterval: 1000 });

    useEffect(() => {
        if (data) {
            const formattedCryptoData: CryptoData[] = data?.data.map((crypto) => ({
                name: crypto.name,
                priceUsd: parseFloat(crypto.priceUsd),
            }));

            setCryptoData(formattedCryptoData);

            const portfolioData: PortfolioItem[] | null = getPortfolioData();

            if (portfolioData) {
                const portfolioValueFromLocalStorage = portfolioData.reduce(
                    (total, purchase) => total + purchase.quantity * purchase.price,
                    0
                );

                setPortfolioValue(portfolioValueFromLocalStorage);
            } else {
                setPortfolioValue(0);
            }
        }
    }, [data]);

    const openPortfolioModal = () => {
        setPortfolioModalOpen(true);
    };

    const closePortfolioModal = () => {
        setPortfolioModalOpen(false);
    };

    return (
        <header className="header">
            <h2 className="logo">Crypto Exchange</h2>
            <div className="crypto-block">
                <div className="crypto-info">
                    {cryptoData.map((crypto) => (
                        <div key={crypto.name} className="crypto-item">
                            <p>{crypto.name}</p>
                            <p>{crypto.priceUsd.toFixed(2)} $</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="portfolio-info" onClick={openPortfolioModal}>
                <p>
                    {portfolioValue.toFixed(2)} USD{' '}
                </p>
                <p style={{ color: title < 0 ? 'red' : 'green' }}>
                    ({title}%)
                </p>
            </div>
            {portfolioModalOpen && (
                <PortfolioModal isOpen={portfolioModalOpen} onClose={closePortfolioModal} />
            )}
        </header>
    );
};

export default Header;
