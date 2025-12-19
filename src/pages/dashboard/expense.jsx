import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import axios from "axios";
import toast from "react-hot-toast";

const Expense = () => {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);

  // ✅ DELETE ALERT STATE
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // 🔁 FETCH EXPENSE
  const fetchExpenseData = async () => {
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

      setExpenseData(res.data.last30DaysExpenses?.transactions || []);
    } catch (error) {
      console.error("Failed to fetch expense data", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  // ➕ ADD EXPENSE
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
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
        "http://localhost:8000/api/v1/expense/add",
        { category, amount, date, icon },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Expense added successfully!");
      setOpenAddExpenseModal(false);
      fetchExpenseData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  };

  // 📥 DOWNLOAD EXPENSE
  const handleDownloadExpenseDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/v1/expense/download",
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
      a.download = "expense_details.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error("Failed to download expense details");
    }
  };

  // ❌ DELETE EXPENSE
  const handleDeleteExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/v1/expense/${openDeleteAlert.data}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Expense deleted");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseData();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto grid grid-cols-1 gap-6">
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) =>
            setOpenDeleteAlert({ show: true, data: id })
          }
          onDownload={handleDownloadExpenseDetails}
        />
      </div>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      {/* ❌ Delete confirm */}
      {openDeleteAlert.show && (
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Expense"
        >
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this expense?
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
              onClick={handleDeleteExpense}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Expense;
