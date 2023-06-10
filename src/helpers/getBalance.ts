export const getBalanceTotal = (balance: number, comodin: number, percent: number) => {
  balance = balance - comodin;
  return balance * percent / 100;
} 