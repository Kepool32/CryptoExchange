import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCoinsQuery } from '../service/coinApi';
import Loader from './Loader/Loader';
import Icon from 'react-crypto-icons';
import PriceChart from './Chart/PriceChart';
import "../style/CoinInfo.scss"
import {formatValue} from "../formattingAndSorting/PriceFormatting";
import AddToPortfolioButton from "./Buttons/AddToPortfolioButton";

const CoinInfo = () => {
    const { coinId } = useParams();
    const history = useNavigate();
    const { data: coinData, isLoading, isError } = useGetCoinsQuery({
        limit: 1,
        search: coinId,
    });

    if (!coinId) {
        return <div>Coin ID is missing</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading coin data</div>;
    }

    if (!coinData || !coinData.data.length) {
        return <div>Coin not found</div>;
    }

    const coin = coinData.data[0];

    return (
        <div className="coin-info-container">
            <div className="coin-symbol">
                    <h1>{coin.name}</h1>
                    <Icon name={coin.symbol.toLowerCase()} size={150} />
             </div>
            <div className="coin-info">
                <p>Symbol: {coin.symbol}</p>
                <p>Rank: {coin.rank}</p>
                <p>Supply: {formatValue(parseFloat(coin.supply))}</p>
                <p>Price (USD): {formatValue(parseFloat(coin.priceUsd))}</p>
                <p>Market Cap (USD): {formatValue(parseFloat(coin.marketCapUsd))}</p>
                <p>Max Supply: {formatValue(parseFloat(coin.maxSupply))}</p>
            </div>
                <PriceChart coinId={coinId} />
                <div className="buttons-container">
                    <AddToPortfolioButton symbol={coin.name} price={coin.priceUsd}/>
                    <button className="go-back-button" onClick={() => history('/')}>Go Back</button>
                </div>
        </div>
    );
};

export default CoinInfo;
