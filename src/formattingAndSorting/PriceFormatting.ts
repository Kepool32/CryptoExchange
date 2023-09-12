


export const PriceFormatting = (price: number): string => {
    if (price >= 1e9) {
        return (price / 1e9).toFixed(2) + 'B';
    } else if (price >= 1e6) {
        return (price / 1e6).toFixed(2) + 'M';
    } else if (price >= 1e3) {
        return (price / 1e3).toFixed(2) + 'K';
    } else {
        return price.toFixed(2);
    }
};

export const formatValue = (value: number): string => {
    if (isNaN(value) || value <= 0.01) {
        return '';
    }
    return PriceFormatting(value);
}

export const formatValuePercent = (value: number) => {
    if (isNaN(value) || value <= 0.01) {
        return '';
    }
    return value.toFixed(2) + '%';
}