import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  // ✅ SAME PATTERN AS DASHBOARD
  const chartData = useMemo(() => {
    return prepareIncomeBarChartData(transactions);
  }, [transactions]);

  return (
    <div className="card overflow-visible">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income
          </p>
        </div>

        <button className="add-btn-fill" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

     <div className="mt-10 h-[320px] relative">
  <CustomBarChart data={chartData} />

  {chartData.length === 0 && (
    <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
      <p className="text-sm">No income data available</p>
    </div>
  )}
</div>

    </div>
  );
};

export default IncomeOverview;
