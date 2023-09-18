
export interface Coins {
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



export type PriceDataItem = {
    time:number;
    date: string;
    priceUsd: string;

};













