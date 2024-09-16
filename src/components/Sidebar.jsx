import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTheme } from "../contexts/ThemeContext";

function Sidebar() {
  const { setIsDarkMode } = useTheme();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 font-medium text-gray-300">
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center px-5 py-4 mt-3 space-x-2 cursor-pointer"
      >
        <img src={logo} alt="CashCanvas Logo" width={35} />
        <h1 className="text-gray-100 text-2xl">CashCanvas</h1>
      </div>
      <nav className="flex flex-col p-5">
        <ul className="space-y-5">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 rounded hover:bg-gray-700 hover:text-gray-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add-transaction"
              className="block p-2 rounded hover:bg-gray-700 hover:text-gray-100"
            >
              Add Transaction
            </Link>
          </li>

          <li>
            <Link
              to="/add-budget-goal"
              className="block p-2 rounded hover:bg-gray-700 hover:text-gray-100"
            >
              Add Budget/Goal
            </Link>
          </li>

          <li>
            <button
              onClick={toggleDarkMode}
              className="w-full p-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Dark Mode
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
