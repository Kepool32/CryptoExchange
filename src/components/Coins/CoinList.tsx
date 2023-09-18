import React, { useEffect, useState } from 'react';
import PaginationButton from "../Buttons/PaginationButton";
import Loader from "../Loader/Loader";
import {Coins} from "types/types";
import {useGetCoinsQuery} from "service/coinApi";
import {sortData} from "./utils/dataSorter";
import SearchBar from "../Bar/SearchBar";
import CoinTable from "./CoinTable";

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
                    <PaginationButton
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        page={page}
                        isLoadingMore={isLoadingMore}
                    />
                </div>
            )}
        </div>
    );
};

export default CoinList;
