import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // No need to import ThemeProvider or ExpenseProvider
import Dashboard from "./Dashboard";

function Layout() {
  const { isDarkMode } = useTheme(); // Now useTheme will work correctly since ThemeProvider is applied globally

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`ml-64 flex-1 min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
