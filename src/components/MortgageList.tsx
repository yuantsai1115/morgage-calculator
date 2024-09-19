import React from "react";
import { formatCurrency } from "../utils/formats";

type MortgageListProps = {
  housePrice: number;
  deposit: number;
  mortgages: Mortgage[];
  updateMortgage: (mortgage: Mortgage) => void;
  removeMortgage: (id: string) => void;
};

const MortgageList: React.FC<MortgageListProps> = ({
  housePrice,
  deposit,
  mortgages,
  updateMortgage,
  removeMortgage,
}) => {
  const mortgageNeeded = housePrice - deposit;
  const mortgagesSum = mortgages.reduce(
    (acc, mortgage) => acc + mortgage.amount,
    0
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Mortgages</h2> 
      <p>{mortgagesSum / mortgageNeeded * 100}% ({formatCurrency(mortgagesSum/1000)}k / {formatCurrency(mortgageNeeded/1000)}k)</p>
      {mortgageNeeded-mortgagesSum > 0 ? <p>You need {formatCurrency((mortgageNeeded-mortgagesSum)/1000)}k more</p> : <p>You have {formatCurrency((mortgagesSum-mortgageNeeded)/1000)}k more</p>}
      {mortgages.length === 0 ? (
        <p className="text-gray-500">No mortgages added yet.</p>
      ) : (
        <ul className="space-y-4">
          {mortgages.map((mortgage) => (
            <li key={mortgage.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{mortgage.name}</h3>
                <button
                  onClick={() => removeMortgage(mortgage.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={mortgage.amount}
                    onChange={(e) =>
                      updateMortgage({
                        ...mortgage,
                        amount: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years
                  </label>
                  <input
                    type="number"
                    value={mortgage.years}
                    onChange={(e) =>
                      updateMortgage({
                        ...mortgage,
                        years: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rate (%)
                  </label>
                  <input
                    type="number"
                    value={mortgage.rate}
                    onChange={(e) =>
                      updateMortgage({
                        ...mortgage,
                        rate: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                    step="0.01"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MortgageList;
