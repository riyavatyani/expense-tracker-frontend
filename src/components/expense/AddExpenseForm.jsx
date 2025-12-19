import React, { useState } from "react";
import Input from "../inputs/input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value });

  return (
    <div className="space-y-6">

      {/* Category */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Category</p>
        <Input
          value={expense.category}
          onChange={({ target }) =>
            handleChange("category", target.value)
          }
          placeholder="Food, Travel, Rent"
          type="text"
        />
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Amount</p>
          <Input
            value={expense.amount}
            onChange={({ target }) =>
              handleChange("amount", target.value)
            }
            type="number"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Date</p>
          <Input
            value={expense.date}
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
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
