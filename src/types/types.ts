import React from "react";

export interface Types {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string ;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}

export interface CoinItemProps {
    coin: Types;
}


export interface CoinTableProps {
    sortedData: Types[];
    onSortByPrice: () => void;
    onSortByMarketCap: () => void;
    onSortByChange: () => void;
}




export type GetCoinsParams = {
    limit: number;
    search?: string;
};

export type GetPriceDataParams = {
    coinId: string;
    interval: string;
};
export type PriceDataItem = {
    time:number;
    date: string;
    priceUsd: string;

};

export interface PurchaseData {
    coinSymbol: string;
    quantity: number;
    price: number;
}


export type BuyCryptoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    coinSymbol: string;
    price: string;
};



export type PortfolioDataItem = {
    coinSymbol: string;
    quantity: number;
    price: number;
};

export type PortfolioModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export type CryptoData = {
    name: string;
    priceUsd: number;
};

export type PortfolioItem = {
    quantity: number;
    price: number;
};



export type PriceChartProps = {
    coinId: string;
};

export type AddToPortfolioButtonProps = {
    symbol: string;
    price: string;
};


export interface PaginationButtonProps {
    handleNextPage: () => void;
}


export interface SortButtonProps {
    label: string;
    onClick: () => void;
}

export interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}