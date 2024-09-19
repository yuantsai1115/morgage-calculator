import React, { useState } from 'react';

type MortgageFormProps = {
  addMortgage: (mortgage: Mortgage) => void;
};

const MortgageForm: React.FC<MortgageFormProps> = ({ addMortgage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mortgage, setMortgage] = useState<Omit<Mortgage, 'id'>>({
    name: '',
    amount: 0,
    years: 0,
    rate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMortgage({
      ...mortgage,
      id: Date.now().toString(),
    });
    setMortgage({ name: '', amount: 0, years: 0, rate: 0 });
    setIsOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-sky-600 p-4 text-lg font-semibold hover:bg-gray-300 transition-colors focus:outline-none"
      >
        Add Mortgage
        <span className={`float-right transform ${isOpen ? 'rotate-180' : ''} transition-transform`}>
          ▼
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={mortgage.name}
                onChange={(e) => setMortgage({ ...mortgage, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={mortgage.amount}
                onChange={(e) => setMortgage({ ...mortgage, amount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="years" className="block text-sm font-medium text-gray-700">
                Years
              </label>
              <input
                type="number"
                id="years"
                value={mortgage.years}
                onChange={(e) => setMortgage({ ...mortgage, years: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                Rate (%)
              </label>
              <input
                type="number"
                id="rate"
                value={mortgage.rate}
                onChange={(e) => setMortgage({ ...mortgage, rate: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                step="0.01"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
          >
            Add Mortgage
          </button>
        </form>
      </div>
    </div>
  );
};

export default MortgageForm;