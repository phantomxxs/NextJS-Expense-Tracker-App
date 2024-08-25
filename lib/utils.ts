export const formatCurrency = (amount: number) => {
  const amountString = amount.toFixed(2).toString();
  const [whole, decimal] = amountString.split('.');
  const wholeWithCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${wholeWithCommas}.${decimal}`;
};
