import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
      {children}
    </div>
  );
};

export default AuthLayout;
