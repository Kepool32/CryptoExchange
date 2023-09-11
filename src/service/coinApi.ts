import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coin } from '../types/Coin';

type GetCoinsParams = {
    limit: number;
    search?: string;
};

type GetPriceDataParams = {
    coinId: string;
    interval: string;
};
type PriceDataItem = {
    time:number;
    date: string;
    priceUsd: string;

};

export const coinApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
    endpoints: (builder) => ({
        getCoins: builder.query<{ data: Coin[] }, GetCoinsParams>({
            query: ({ limit = 5, search }) => ({
                url: 'assets',
                params: {
                    limit,
                    search,
                },
            }),
        }),
        getPriceData: builder.query<{data:PriceDataItem []}, GetPriceDataParams>({
            query: ({ coinId, interval }) => ({
                url: `assets/${coinId}/history`,
                params: {
                    interval,
                },
            }),
        }),
    }),
});

export const { useGetCoinsQuery, useGetPriceDataQuery } = coinApi;
