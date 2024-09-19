type Mortgage = {
  id: string;
  name: string;
  amount: number;
  years: number;
  rate: number;
};

type MortgageCalculatorState = {
  housePrice: number;
  deposit: number;
  mortgages: Mortgage[];
};
