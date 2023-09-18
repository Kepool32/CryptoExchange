import { Coins } from '../../../types/types';

export const sortData = (data: Coins[], sortBy: string) => {
    return [...data].sort((a, b) => {
        if (sortBy === 'priceUsd') {
            return parseFloat(b.priceUsd) - parseFloat(a.priceUsd);
        } else if (sortBy === 'marketCapUsd') {
            return parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd);
        } else if (sortBy === 'changePercent24Hr') {
            return parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr);
        } else {
            return 0;
        }
    });
};
