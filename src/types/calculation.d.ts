type PaymentPeriod = 'weekly' | 'fortnightly' | 'monthly' | 'yearly';

type PaymentScheduleItem = {
  amount: number;
  periods: number;
  mortgageId: string;
  paymentPeriod: PaymentPeriod;
  mortgageName: string;
};

type PaymentSchedule = {
  [key in PaymentPeriod]: PaymentScheduleItem[];
};

type CalculationResult = {
  deposit: number;
  actualMortgage: number;
  paymentSchedule: PaymentSchedule;
};