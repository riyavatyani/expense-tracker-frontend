import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(user);

  return (
    <div>
     {/* 🔹 TOP NAVBAR */}
<div className="relative z-50 flex items-center justify-between px-6 py-4 bg-white">
  <h2 className="text-lg font-semibold">Expense Tracker</h2>

  {!isLoggedIn && (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate("/login")}
        className="text-sm font-medium text-gray-600 hover:text-violet-600"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        className="add-btn-fill"
      >
        Sign Up
      </button>
    </div>
  )}
</div>


      <div className="flex">
        {/* 🔹 SIDE MENU (LOGGED IN ONLY) */}
        {isLoggedIn && (
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        {/* 🔹 MAIN CONTENT */}
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
