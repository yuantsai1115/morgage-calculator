const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const numPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
};

const calculatePaymentSchedule = (
  mortgages: Mortgage[],
  actualMortgage: number
): PaymentSchedule => {
  const schedule: PaymentSchedule = {
    weekly: [],
    fortnightly: [],
    monthly: [],
    yearly: [],
  };

  mortgages.forEach((mortgage) => {
    const monthlyPayment = calculateMonthlyPayment(
      mortgage.amount,
      mortgage.rate,
      mortgage.years
    );
    const yearlyPayment = monthlyPayment * 12;
    const weeklyPayment = yearlyPayment / 52;
    const fortnightlyPayment = yearlyPayment / 26;

    const periods: PaymentPeriod[] = [
      "weekly",
      "fortnightly",
      "monthly",
      "yearly",
    ];
    const paymentAmounts = [
      weeklyPayment,
      fortnightlyPayment,
      monthlyPayment,
      yearlyPayment,
    ];
    const periodCounts = [
      52 * mortgage.years,
      26 * mortgage.years,
      12 * mortgage.years,
      mortgage.years,
    ];

    periods.forEach((period, index) => {
      schedule[period].push({
        amount: paymentAmounts[index],
        periods: periodCounts[index],
        mortgageId: mortgage.id,
        mortgageName: mortgage.name,
        paymentPeriod: period,
      });
    });

  });

  return schedule;
};

export const calculateMortgage = (
  state: MortgageCalculatorState
): CalculationResult => {
  const { housePrice, deposit, mortgages } = state;
  const actualMortgage = housePrice - deposit;
  const totalMortgageAmount = mortgages.reduce(
    (sum, mortgage) => sum + mortgage.amount,
    0
  );

  const paymentSchedule = calculatePaymentSchedule(mortgages, actualMortgage);

  return {
    deposit,
    actualMortgage,
    paymentSchedule,
  };
};
