import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  onDelete,          // ✅ added
  hideDeleteBtn,     // ✅ added (optional)
}) => {
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between py-4">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
          <LuUtensils size={18} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"} ₹{amount}
        </span>

        {isIncome ? (
          <LuTrendingUp className="text-green-600" />
        ) : (
          <LuTrendingDown className="text-red-500" />
        )}

        {/* ✅ DELETE (only if provided) */}
        {!hideDeleteBtn && onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <LuTrash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
