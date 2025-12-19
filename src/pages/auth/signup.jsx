import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apipaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";

      // ✅ Upload image if present
      if (image) {
        const imgUploadRes = await uploadImage(image);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // ✅ Signup API call
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: name,
        email,
        password,
        profileImageUrl,
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
  <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
    
    <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
      Expense Tracker
    </p>

    <h2 className="text-xl font-semibold text-slate-900 mb-1">
      Create account
    </h2>

    <p className="text-sm text-slate-500 mb-4">
      Start managing your finances
    </p>

    <div className="flex justify-center mb-4">
      <ProfilePhotoSelector image={image} setImage={setImage} />
    </div>

    {error && (
      <p className="text-red-500 text-sm mb-3 text-center">
        {error}
      </p>
    )}

    <form onSubmit={handleSignup} className="space-y-4">
      
      <div>
        <label className="text-xs font-medium text-slate-600">
          Full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
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
          className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white py-2.5 rounded-md font-medium hover:bg-slate-800 transition"
      >
        Create account
      </button>

      <p className="text-xs text-center text-slate-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-slate-900">
          Sign in
        </Link>
      </p>
    </form>
  </div>
</AuthLayout>

);

};

export default Signup;
