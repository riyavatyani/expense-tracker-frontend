import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apipaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
  <AuthLayout>
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
    
    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
      Expense Tracker
    </p>

    <h2 className="text-2xl font-semibold text-slate-900 mb-1">
      Welcome back
    </h2>

    <p className="text-sm text-slate-500 mb-8">
      Access your financial dashboard
    </p>

    {error && (
      <p className="text-red-500 text-sm mb-4">{error}</p>
    )}

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="text-xs font-medium text-slate-600">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition"
      >
        Sign in
      </button>

      <p className="text-sm text-center text-slate-600 mt-6">
        New here?{" "}
        <Link to="/signup" className="font-semibold text-slate-900">
          Create an account
        </Link>
      </p>
    </form>
  </div>
</AuthLayout>



);

};

export default Login;
