import React, { useEffect, useState } from 'react';
import { Types } from '../types/types';
import CoinTable from './CoinTable';
import SearchBar from './Bar/SearchBar';
import '../style/CoinTable.scss'
import { useGetCoinsQuery } from "../service/coinApi";
import { sortData } from "../formattingAndSorting/sorting";
import Loader from "./Loader/Loader";

const CoinList: React.FC = () => {
    const [limit, setLimit] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [allCoins, setAllCoins] = useState<Types[]>([]);
    const [sortBy, setSortBy] = useState<string>('marketCapUsd');

    const { data, error, isLoading } = useGetCoinsQuery(
        { limit, search: searchQuery },
        {
            pollingInterval: 1000,
        }
    );

    useEffect(() => {
        if (data?.data) {
            setAllCoins(data.data);
        }
    }, [data]);

    const handleNextPage = () => {
        setLimit((prevLimit) => prevLimit + 10);
    };

    const handleSortByPrice = () => {
        setSortBy('priceUsd');
    };

    const handleSortByMarketCap = () => {
        setSortBy('marketCapUsd');
    };

    const handleSortByChange = () => {
        setSortBy('changePercent24Hr');
    };

    const sortedData = sortData(allCoins, sortBy);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>Error: {error.toString()}</p>
            ) : (
                <div>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <CoinTable
                        sortedData={sortedData}
                        onSortByPrice={handleSortByPrice}
                        onSortByMarketCap={handleSortByMarketCap}
                        onSortByChange={handleSortByChange}
                    />
                    <div className='coin-list-container'>
                        <button className="load-more-button" onClick={handleNextPage}>
                            Load More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinList;
