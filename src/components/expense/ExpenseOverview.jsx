import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const chartData = useMemo(() => {
    return prepareExpenseBarChartData(transactions);
  }, [transactions]);

  return (
    <div className="card overflow-visible">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time
          </p>
        </div>

        <button className="add-btn-fill" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10 h-[320px] relative">
        <CustomBarChart data={chartData} />

        {chartData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <p className="text-sm">No expense data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
