import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-box flex items-center gap-2">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
        value={value}
        onChange={onChange}
      />

      {type === "password" && (
        showPassword ? (
          <FaRegEye
            className="cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaRegEyeSlash
            className="cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )
      )}
    </div>
  );
};

export default Input;
