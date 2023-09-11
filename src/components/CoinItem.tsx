import React from 'react';
import Icon from 'react-crypto-icons';

import { Coin } from '../types/Coin';
import '../style/CoinTable.scss';
import { formatValue } from '../formattingAndSorting/PriceFormatting';

interface CoinItemProps {
    coin: Coin;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
    const handleRowClick = () => {

        window.location.href = `/coins/${coin.id}`;
    };

    return (
        <tr className="coin-row" onClick={handleRowClick}>
            <td>{coin.symbol}</td>
            <td>
                <Icon name={coin.symbol.toLowerCase()} size={25} />
            </td>
            <td>{formatValue(parseFloat(coin.priceUsd))}</td>
            <td>{formatValue(parseFloat(coin.marketCapUsd))}</td>
            <td>{(parseFloat(coin.changePercent24Hr) * 100).toFixed(2)}%</td>
            <td>
                <button className="add-button">Add</button>
            </td>
        </tr>
    );
};

export default CoinItem;
