import { getPortfolioData } from "../utils/localStorage";
import { useGetCoinsQuery } from "../service/coinApi";

function calculatePercentageChange(oldPrice: number, newPrice: number): number {
    return ((newPrice - oldPrice) / oldPrice) * 100;
}

export function CalculatePortfolioPercentageChange() {
    const portfolioData = getPortfolioData();

    if (portfolioData === null) {
        return 0;
    }

    let totalPercentageChange = 0;


    const { data: coinsData } = useGetCoinsQuery({
        limit: 100,
    },{
        pollingInterval: 1000,
    });

    for (const purchase of portfolioData) {
        const coinSymbol = purchase.coinSymbol;


        const coinData = coinsData?.data.find((coin) => coin.name === coinSymbol);

        if (coinData) {
            const currentPrice = coinData.priceUsd;

            if (currentPrice !== undefined) {
                const percentageChange = calculatePercentageChange(
                    purchase.price,
                    parseFloat(currentPrice)
                );
                totalPercentageChange += percentageChange;
            }
        }
    }

    return totalPercentageChange.toFixed(2);
}
