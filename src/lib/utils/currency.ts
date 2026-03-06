
export const getFormatForCurrency = (local: string, currency: string, amount: number) => {
    return new Intl.NumberFormat(local, { style: 'currency', currency}).format(amount);
}