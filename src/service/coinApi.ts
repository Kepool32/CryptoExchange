import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {GetCoinsParams, GetPriceDataParams, PriceDataItem, Types} from '../types/types';



export const coinApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
    endpoints: (builder) => ({
        getCoins: builder.query<{ data: Types[] }, GetCoinsParams>({
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
