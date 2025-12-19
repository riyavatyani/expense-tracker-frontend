import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { API_PATHS } from "../../utils/apipaths";
import axiosInstance from "../../utils/axiosinstance";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeChart from "../../components/Dashboard/RecentIncomeChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import AIInsightsCard from "../../components/Dashboard/AIInsightsCard"; // ✅ ONLY NEW IMPORT

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

/* 🔹 BLUR WRAPPER (LOGGED OUT) */
const BlurWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>

      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-md text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Login to unlock your personal dashboard
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-violet-600 hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-violet-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    recentTransactions: [],
    last30DaysExpenses: { transactions: [] },
    last60DaysIncome: { transactions: [] },
  });

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      );
      if (response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Dashboard API failed", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGGED-IN FLOW (UNCHANGED)
  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const ContentWrapper = user ? React.Fragment : BlurWrapper;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">

        {/* 🔹 EDUCATIONAL HEADER (LOGGED OUT ONLY) */}
        {!user && (
          <div className="mb-5 text-sm text-gray-500">
            Track income, expenses & trends in one place.{" "}
            <Link
              to="/login"
              className="text-violet-600 hover:underline font-medium"
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              to="/signup"
              className="text-violet-600 hover:underline font-medium"
            >
              sign up
            </Link>{" "}
            to get started.
          </div>
        )}

        {/* TOP INFO CARDS */}
        <ContentWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData.totalBalance)}
              color="bg-indigo-100"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData.totalIncome)}
              color="bg-emerald-100"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData.totalExpenses)}
              color="bg-rose-100"
            />
          </div>
        </ContentWrapper>

        {/* DASHBOARD SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ContentWrapper>
            <RecentTransactions
              transactions={dashboardData.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          </ContentWrapper>

          <ContentWrapper>
            <FinanceOverview
              totalBalance={dashboardData.totalBalance}
              totalIncome={dashboardData.totalIncome}
              totalExpense={dashboardData.totalExpenses}
            />
          </ContentWrapper>

          <ContentWrapper>
            <ExpenseTransactions
              transactions={dashboardData.last30DaysExpenses.transactions}
              onSeeMore={() => navigate("/expense")}
            />
          </ContentWrapper>

          <ContentWrapper>
            <Last30DaysExpenses
              data={dashboardData.last30DaysExpenses.transactions}
            />
          </ContentWrapper>

          <ContentWrapper>
            <RecentIncomeChart
              data={dashboardData.last60DaysIncome.transactions.slice(0, 6)}
              totalIncome={dashboardData.totalIncome}
            />
          </ContentWrapper>

          <ContentWrapper>
            <RecentIncome
              transactions={dashboardData.last60DaysIncome.transactions}
              onSeeMore={() => navigate("/income")}
            />
          </ContentWrapper>
        </div>

        {/* 🤖 AI INSIGHTS (ONLY ADDITION) */}
        <div className="mt-6">
          <ContentWrapper>
            <AIInsightsCard
              totalIncome={dashboardData.totalIncome}
              totalExpenses={dashboardData.totalExpenses}
              expenses={dashboardData.last30DaysExpenses.transactions}
            />
          </ContentWrapper>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Home;
