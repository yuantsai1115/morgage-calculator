// src/components/MortgageCalculator.tsx

import React, { useState, useEffect } from "react";
import MortgageForm from "./MortgageForm";
import MortgageList from "./MortgageList";
import PaymentSchedule from "./PaymentSchedule";
import { calculateMortgage } from "../utils/calculations";

const MortgageCalculator: React.FC = () => {
  const [state, setState] = useState<MortgageCalculatorState>({
    housePrice: 0,
    deposit: 0,
    mortgages: [],
  });

  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  useEffect(() => {
    const savedState = localStorage.getItem("mortgageCalculatorState");
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mortgageCalculatorState", JSON.stringify(state));
  }, [state]);

  const addMortgage = (mortgage: Mortgage) => {
    setState((prevState) => ({
      ...prevState,
      mortgages: [...prevState.mortgages, mortgage],
    }));
  };

  const updateMortgage = (updatedMortgage: Mortgage) => {
    setState((prevState) => ({
      ...prevState,
      mortgages: prevState.mortgages.map((m) =>
        m.id === updatedMortgage.id ? updatedMortgage : m
      ),
    }));
  };

  const removeMortgage = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      mortgages: prevState.mortgages.filter((m) => m.id !== id),
    }));
  };

  const calculatePayments = () => {
    const mortgagesSum = state.mortgages.reduce(
      (acc, mortgage) => acc + mortgage.amount,
      0
    );
    const mortgageNeeded = state.housePrice - state.deposit;
    if (mortgagesSum !== mortgageNeeded) {
      alert(
        "The sum of the mortgages does not match the mortgage needed for the house."
      );
      return;
    }
    const result = calculateMortgage(state);
    setCalculationResult(result);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "mortgage_calculator_data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          const importedState = JSON.parse(content) as MortgageCalculatorState;
          setState(importedState);
          setCalculationResult(null); // Reset calculation result after import
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mortgage Calculator</h1>
        <div className="space-x-4">
          <button
            onClick={exportData}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            Export Data
          </button>
          <label className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-flex items-center">
            <span>Import Data</span>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">House Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="housePrice"
              className="block text-sm font-medium text-gray-700"
            >
              House Price
            </label>
            <input
              type="number"
              id="housePrice"
              value={state.housePrice}
              onChange={(e) =>
                setState({ ...state, housePrice: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="deposit"
              className="block text-sm font-medium text-gray-700"
            >
              Deposit
            </label>
            <input
              type="number"
              id="deposit"
              value={state.deposit}
              onChange={(e) =>
                setState({ ...state, deposit: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <MortgageList
        housePrice={state.housePrice}
        deposit={state.deposit}
        mortgages={state.mortgages}
        updateMortgage={updateMortgage}
        removeMortgage={removeMortgage}
      />
      <MortgageForm addMortgage={addMortgage} />

      <button
        onClick={calculatePayments}
        className="w-full bg-sky-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
      >
        Calculate Payments
      </button>

      {calculationResult && <PaymentSchedule result={calculationResult} />}
    </div>
  );
};

export default MortgageCalculator;
