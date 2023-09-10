import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coin } from '../types/Coin';


type GetCoinsParams = {
    limit: number;
    search?: string;
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
    }),
});

export const { useGetCoinsQuery } = coinApi;
