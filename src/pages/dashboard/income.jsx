import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import axios from "axios";
import toast from "react-hot-toast";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);

  // ✅ DELETE ALERT STATE (MISSING BEFORE)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // 🔁 FETCH INCOME
  const fetchIncomeData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(
        "http://localhost:8000/api/v1/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomeData(res.data.last60DaysIncome?.transactions || []);
    } catch (error) {
      console.error("Failed to fetch income data", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  // ➕ ADD INCOME
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/v1/income/add",
        { source, amount, date, icon },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Income added successfully!");
      setOpenAddIncomeModal(false);
      fetchIncomeData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add income"
      );
    }
  };

  // 📥 DOWNLOAD INCOME (MISSING BEFORE)
  const handleDownloadIncomeDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/v1/income/download",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "income_details.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error("Failed to download income details");
    }
  };

  // ❌ DELETE INCOME (basic)
  const handleDeleteIncome = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/v1/income/${openDeleteAlert.data}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Income deleted");
      setOpenDeleteAlert({ show: false, data: null });
      fetchIncomeData();
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto grid grid-cols-1 gap-6">
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        <IncomeList
          transactions={incomeData}
          onDelete={(id) =>
            setOpenDeleteAlert({ show: true, data: id })
          }
          onDownload={handleDownloadIncomeDetails}
        />
      </div>

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      {/* ❌ Simple delete confirm */}
      {openDeleteAlert.show && (
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Income"
        >
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this income?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="card-btn"
              onClick={() =>
                setOpenDeleteAlert({ show: false, data: null })
              }
            >
              Cancel
            </button>
            <button
              className="add-btn-fill"
              onClick={handleDeleteIncome}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Income;
