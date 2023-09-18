import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PriceDataItem, Coins } from 'types/types';


export type GetPriceDataParams = {
    coinId: string;
    interval: string;
};

export const coinApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
    endpoints: (builder) => ({
        getCoins: builder.query<{ data: Coins[] }, { offset?: number; limit?: number; search?: string }>({
            query: ({ offset , limit = 10, search }) => ({
                url: 'assets',
                params: {
                    offset,
                    limit,
                    search,
                },
            }),
        }),
        getPriceData: builder.query<{ data: PriceDataItem[] }, GetPriceDataParams>({
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
