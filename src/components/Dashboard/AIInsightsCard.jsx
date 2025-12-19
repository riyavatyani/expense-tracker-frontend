import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";

const AIInsightsCard = ({ totalIncome, totalExpenses, expenses }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      totalIncome === 0 &&
      totalExpenses === 0 &&
      expenses.length === 0
    )
      return;

    const fetchAIInsights = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.post("/api/v1/ai/insights", {

          totalIncome,
          totalExpenses,
          categorySummary: expenses.map((e) => ({
            category: e.category,
            amount: e.amount,
          })),
        });

        setInsights(response.data.insights);
      } catch (error) {
        console.error("AI Insights failed", error);
        setInsights("Unable to generate insights right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, [totalIncome, totalExpenses, expenses]);

  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        🤖 AI Insights
      </h3>

      {loading && (
        <p className="text-sm text-gray-400">Analyzing your data...</p>
      )}

      {!loading && insights && (
        <pre className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
          {insights}
        </pre>
      )}
    </div>
  );
};

export default AIInsightsCard;
