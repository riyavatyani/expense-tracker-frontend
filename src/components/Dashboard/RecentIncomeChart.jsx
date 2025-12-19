import React, { useMemo } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = [
  "#A5B4FC",
  "#FECACA",
  "#FED7AA",
  "#BFDBFE",
];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  // 🔥 Group by source (Salary, Freelance, etc.)
  const chartData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (!map[item.source]) {
        map[item.source] = 0;
      }
      map[item.source] += item.amount;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      amount: map[key],
    }));
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {chartData.length === 0 ? (
        /* ✅ EMPTY STATE */
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
          <span className="text-4xl mb-2">💰</span>
          <p className="text-sm">No income in last 60 days</p>
        </div>
      ) : (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
