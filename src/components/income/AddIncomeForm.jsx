import React, { useState } from "react";
import Input from "../inputs/input";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-6">

      {/* Source */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Income Source</p>
        <Input
          value={income.source}
          onChange={({ target }) =>
            handleChange("source", target.value)
          }
          placeholder="Freelance, Salary, etc"
          type="text"
        />
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Amount</p>
          <Input
            value={income.amount}
            onChange={({ target }) =>
              handleChange("amount", target.value)
            }
            type="number"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Date</p>
          <Input
            value={income.date}
            onChange={({ target }) =>
              handleChange("date", target.value)
            }
            type="date"
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="button"
          className="add-btn add-btn-fill px-6 py-2"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
