import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const displayLabel =
    label || payload[0]?.payload?.category || "Details";

  return (
    <div
      className="
        bg-white
        shadow-md
        rounded-lg
        px-3 py-2
        border
        text-xs
        max-w-[160px]
        whitespace-nowrap
      "
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <p className="font-semibold text-purple-800 mb-1 truncate">
        {displayLabel}
      </p>

      <p className="text-gray-600">
        Amount:&nbsp;
        <span className="font-medium text-gray-900">
          ₹{payload[0].value}
        </span>
      </p>
    </div>
  );
};

export default CustomTooltip;
