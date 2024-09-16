import React, { useMemo, useState } from "react";
import { ExpenseList, Summary, ExpenseBarChart, BudgetTracker } from "./";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const { expenses } = useExpense();
  const { isDarkMode } = useTheme();

  const totalExpense = useMemo(() => {
    return expenses
      .filter((exp) => exp.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  const totalIncome = useMemo(() => {
    return expenses
      .filter((exp) => exp.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  return (
    <div className="flex min-h-screen">
      <div
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold">Expenses</h2>
            <p className="text-2xl text-red-400">${totalExpense.toFixed(2)}</p>
          </div>
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold">Income</h2>
            <p className="text-2xl text-lime-400">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Analysis</h2>
            <div className="h-auto rounded">
              <ExpenseBarChart />
            </div>
          </div>
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Transactions</h2>
            <ExpenseList />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Budget/Goal Tracker</h2>
            <BudgetTracker />
          </div>
          <div
            className={`p-6 space-y-1 rounded-lg shadow-md transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
