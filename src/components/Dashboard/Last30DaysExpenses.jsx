import React, { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  // ✅ Derived data → useMemo (NO setState loop)
  const chartData = useMemo(() => {
    return prepareExpenseBarChartData(data);
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      {chartData.length === 0 ? (
        /* ✅ EMPTY STATE */
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
          <span className="text-4xl mb-2">📊</span>
          <p className="text-sm">No expense data for last 30 days</p>
        </div>
      ) : (
        <CustomBarChart data={chartData} />
      )}
    </div>
  );
};

export default Last30DaysExpenses;
