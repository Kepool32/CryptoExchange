import React from 'react';

import { Coin } from '../types/Coin';
import SortButton from './SortButton';
import '../style/CoinTable.scss';
import CoinItem from './CoinItem';

interface CoinTableProps {
    sortedData: Coin[];
    onSortByPrice: () => void;
    onSortByMarketCap: () => void;
    onSortByChange: () => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ sortedData, onSortByPrice, onSortByMarketCap, onSortByChange }) => {
    return (
        <table className="coin-table">

            <thead>
            <tr>
                <th>Symbol</th>
                <th>Logo</th>
                <th>
                    <SortButton label="Price (USDT)" onClick={onSortByPrice} />
                </th>
                <th>
                    <SortButton label="Market Cap (USDT)" onClick={onSortByMarketCap} />
                </th>
                <th>
                    <SortButton label="Change (24Hr)" onClick={onSortByChange} />
                </th>
                <th>Add to Portfolio</th>
            </tr>
            </thead>
            <tbody>
            {sortedData.map((coin) => (
                <CoinItem key={coin.id} coin={coin} />
                ))}
            </tbody>
        </table>
    );
};

export default CoinTable;
