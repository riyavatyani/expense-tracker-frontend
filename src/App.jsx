import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Home from "./pages/dashboard/home";
import Income from "./pages/dashboard/income";
import Expense from "./pages/dashboard/expense";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        {/* ✅ PUBLIC DASHBOARD */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* SAME DASHBOARD ROUTE (optional, but safe) */}
        <Route path="/dashboard" element={<Home />} />

        {/* PROTECTED PAGES (they already handle auth internally) */}
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: "13px" },
        }}
      />
    </>
  );
}

export default App;
