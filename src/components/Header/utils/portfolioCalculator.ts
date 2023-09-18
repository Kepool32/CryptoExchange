import { getPortfolioData } from "utils/localStorage";
import { useGetCoinsQuery } from "service/coinApi";


interface CoinData {
    name: string;
    priceUsd: string;
}

interface PurchaseData {
    coinSymbol: string;
    quantity: number;
}

function calculatePortfolioValue(portfolioData: PurchaseData[], coinsData: CoinData[]): number {
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
        return { difference: 0.001.toFixed(2), percentageChange: 0.001.toFixed(2) };
    }

    const oldPortfolioValue = portfolioData.reduce(
        (total, purchase) => total + purchase.quantity * purchase.price,
        0
    );

    const newPortfolioValue = calculatePortfolioValue(portfolioData, coinsData.data);

    const difference = newPortfolioValue - oldPortfolioValue;
    let percentageChange = ((difference) * 100) / oldPortfolioValue;

    return { difference: difference.toFixed(2) + " USD" , percentageChange: percentageChange.toFixed(2) };
}

