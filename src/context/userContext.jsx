import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // update user data (on login / signup)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // clear user data (on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token"); // ✅ IMPORTANT
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
