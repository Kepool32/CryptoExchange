import {PurchaseData} from "../types/types";

const LOCAL_STORAGE_KEY = 'cryptoPortfolio'; // Ключ Local Storage


export const getPortfolioData = (): PurchaseData[] | null => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};


export const setPortfolioData = (data: PurchaseData[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};


