import React from 'react';
import Icon from 'react-crypto-icons';
import {Coins} from "types/types";
import {formatValue, formatValuePercent} from "./utils/priceFormatter";
import AddToPortfolioButton from "../Buttons/AddToPortfolioButton";

export interface CoinItemProps {
    coin: Coins;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
    const handleRowClick = () => {

        window.location.href = `/coins/${coin.id}`;
    };

    return (
        <tr  onClick={handleRowClick}>
            <td>{coin.symbol}</td>
            <td>
                <Icon name={coin.symbol.toLowerCase()} size={25} />
            </td>
            <td>{formatValue(parseFloat(coin.priceUsd))}</td>
            <td>{formatValue(parseFloat(coin.marketCapUsd))}</td>
            <td>{(formatValuePercent(parseFloat(coin.changePercent24Hr)))}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <AddToPortfolioButton symbol={coin.name} price={coin.priceUsd}/>
            </td>
        </tr>

    );
};

export default CoinItem;
