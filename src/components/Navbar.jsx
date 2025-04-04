import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import logo from "../assets/foundry_logo.png";
import logoWhite from "../assets/foundry_logo_white.png";
import { NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/fleet", label: "Fleet" },
  { to: "/order_Management", label: "Order Management" },
  { to: "/logistics", label: "Logistics" },
  { to: "/invoices", label: "Invoices" },
  { to: "/locations", label: "Locations" },
];

const Navbar = ({ onSearchClick, onToggleTheme, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-3 w-[95%] h-[10vh]  md:w-[90%]  mx-auto flex items-center justify-between dark:border-white/10 relative z-50">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <img
          src={isDarkMode ? logoWhite : logo}
          alt="logo"
          className="w-4 h-5"
        />
        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <NavLink
              to={link.to}
              key={index}
              className="hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Right - Icons & Mobile Toggle */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <button
          onClick={onSearchClick}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon="carbon:search"
            className="text-lg cursor-pointer  hover:text-gray-500 transition"
          />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon={isDarkMode ? "mynaui:moon" : "iconoir:sun-light"}
            className="text-lg group-hover:text-gray-500 transition"
          />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <Icon
            icon={menuOpen ? "ic:round-close" : "ci:hamburger-md"}
            className="text-2xl"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-[100%] h-sc left-0 w-full ${
            isDarkMode ? "bg-[#333333]" : "bg-white"
          } lg:hidden py-4 px-6 space-y-4`}
        >
          {navLinks.map((link, index) => (
            <NavLink
              to={link.to}
              key={index}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
