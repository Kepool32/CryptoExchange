const LOCAL_STORAGE_KEY = 'cryptoPortfolio';


export interface PurchaseData {
    coinSymbol: string;
    quantity: number;
    price: number;
}

export const getPortfolioData = (): PurchaseData[] | null => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};


export const setPortfolioData = (data: PurchaseData[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};


