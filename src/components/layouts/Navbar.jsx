import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-slate-200">
      
      {/* Mobile Menu Button */}
      <button
        className="block lg:hidden text-slate-800"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* App Title */}
      <h2 className="text-lg font-semibold text-slate-900">
        Expense Tracker
      </h2>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[64px] left-0 w-[240px] h-full bg-white shadow-lg z-50 lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
