import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

// Navigation links array (easier to edit)
const navLinks = ["Dashboard", "Fleet", "Order Management", "Logistics", "Invoices"];

const Navbar = ({ onSearchClick }) => {
  return (
    <nav className="bg-white h-[10vh] px-8 w-[90%] mx-auto py-4 flex items-center justify-between">
      {/* Left - Navigation Links */}
      <ul className="flex space-x-6 text-sm font-medium text-gray-800">
        {navLinks.map((link, index) => (
          <li key={index} className="hover:text-gray-500 cursor-pointer">{link}</li>
        ))}
      </ul>

      {/* Right - Icons */}
      <div className="flex space-x-4">
        <button onClick={onSearchClick}>
          <Icon icon="carbon:search" className="text-lg cursor-pointer text-gray-700 hover:text-gray-500" />
        </button>
        <button>
          <Icon icon="iconoir:sun-light" className="text-lg cursor-pointer text-gray-700 hover:text-gray-500" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
