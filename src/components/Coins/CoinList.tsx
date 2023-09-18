import React, { useEffect, useState } from 'react';
import { Coins } from '../types/types';
import CoinTable from './CoinTable';
import SearchBar from './Bar/SearchBar';
import '../style/CoinTable.scss';
import { useGetCoinsQuery } from '../service/coinApi';
import { sortData } from '../formattingAndSorting/sorting';
import Loader from './Loader/Loader';

const CoinList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadedCoins, setLoadedCoins] = useState<Coins[]>([]);
    const [sortBy, setSortBy] = useState('marketCapUsd');
    const [isLoadingMore, setIsLoadingMore] = useState(false);


    useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    const { data, error, isLoading } = useGetCoinsQuery(
        { offset: page, limit: 7, search: searchQuery },
    );

    useEffect(() => {
        if (data?.data) {
            setLoadedCoins(data?.data || []);
            setIsLoadingMore(false);
        }
    }, [data]);

    const handlePrevPage = () => {
        if (!isLoadingMore && page > 0) {
            setIsLoadingMore(true);
            setPage((prevPage) => prevPage - 10);
        }
    };

    const handleNextPage = () => {
        if (!isLoadingMore) {
            setIsLoadingMore(true);
            setPage((prevPage) => prevPage + 10);
        }
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

    const sortedData = sortData(loadedCoins, sortBy);

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
                        <button
                            className='load--button'
                            onClick={handlePrevPage}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <button className='load-more-button' onClick={handleNextPage}>
                            {isLoadingMore ? 'Loading...' : 'Next'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinList;
