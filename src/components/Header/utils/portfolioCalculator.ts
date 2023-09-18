import { getPortfolioData } from "../utils/localStorage";
import { useGetCoinsQuery } from "../service/coinApi";


function calculatePortfolioValue(portfolioData: any[], coinsData: any[]): number {
    let totalValue = 0;

    for (const purchase of portfolioData) {
        const coinSymbol = purchase.coinSymbol;
        const coinData = coinsData.find((coin) => coin.name === coinSymbol);

        if (coinData) {
            const currentPrice = parseFloat(coinData.priceUsd);
            const quantity = purchase.quantity;
            totalValue += currentPrice * quantity;
        }
    }

    return totalValue;
}

export function CalculatePortfolioPercentageChange() {
    const { data: coinsData } = useGetCoinsQuery({
        limit: 100,
    });


    const portfolioData = getPortfolioData();

    if (!portfolioData || !coinsData) {
        return { difference: "N/A", percentageChange: "N/A" };
    }

    const oldPortfolioValue = portfolioData.reduce(
        (total, purchase) => total + purchase.quantity * purchase.price,
        0
    );

    const newPortfolioValue = calculatePortfolioValue(portfolioData, coinsData.data);

    const difference = newPortfolioValue - oldPortfolioValue;
    const percentageChange = ((difference) * 100) / oldPortfolioValue;

    return { difference: difference.toFixed(2) + " USD" , percentageChange: percentageChange.toFixed(2) };
}

