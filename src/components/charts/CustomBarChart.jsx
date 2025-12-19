import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const getBarColor = (index) =>
  index % 2 === 0 ? "#93C5FD" : "#BFDBFE";


const CustomBarChart = ({ data }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#555" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          {/* ✅ EXACT dashboard-style hover */}
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
