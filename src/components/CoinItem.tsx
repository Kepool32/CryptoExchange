import React from 'react';
import Icon from 'react-crypto-icons';
import {CoinItemProps} from '../types/types';
import '../style/CoinTable.scss';
import {formatValue, formatValuePercent} from '../formattingAndSorting/PriceFormatting';
import AddToPortfolioButton from "./Buttons/AddToPortfolioButton";



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
            <td>{(formatValuePercent(parseFloat(coin.changePercent24Hr)))}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <AddToPortfolioButton symbol={coin.name} price={coin.priceUsd}/>
            </td>
        </tr>

    );
};

export default CoinItem;
