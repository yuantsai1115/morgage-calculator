import React from "react";
import { capitalizeFirstLetter, formatCurrency } from "../utils/formats";

type PaymentScheduleProps = {
  result: CalculationResult;
};

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ result }) => {
  const periods: PaymentPeriod[] = [
    "weekly",
    "fortnightly",
    "monthly",
    "yearly",
  ];

  const renderScheduleItems = (items: PaymentScheduleItem[]) => {
    return items.map((item, index) => (
      <li key={index} className="mb-2">
        {item.mortgageName}: {formatCurrency(item.amount)} per {item.paymentPeriod} for {item.periods} periods
      </li>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Schedule</h2>
      <div className="mb-4">
        <p className="font-semibold">
          Deposit required: {formatCurrency(result.deposit)}
        </p>
        <p className="font-semibold">
          Actual mortgage amount: {formatCurrency(result.actualMortgage)}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {periods.map((period) => (
          <div key={period} className="border rounded-md p-4">
            <h3 className="text-lg font-semibold capitalize mb-2">
              {period} Payments
            </h3>
            <ul>{renderScheduleItems(result.paymentSchedule[period])}</ul>
            <p className="font-semibold">{capitalizeFirstLetter(period)} Maximum: {formatCurrency(result.paymentSchedule[period].reduce((acc, item) => acc + item.amount, 0))}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSchedule;
