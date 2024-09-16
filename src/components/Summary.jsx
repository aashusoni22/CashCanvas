import React, { useEffect, useMemo, useState } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext";

function Summary() {
  const [customTotals, setCustomTotals] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [type, setType] = useState("expense");

  const { categories, expenses } = useExpense();
  const { isDarkMode } = useTheme();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (exp) => new Date(exp.id).getMonth() === selectedMonth
    );
  }, [expenses, selectedMonth]);

  const totalIncome = useMemo(() => {
    return filteredExpenses
      .filter((expense) => expense.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredExpenses]);

  const totalExpense = useMemo(() => {
    return filteredExpenses
      .filter((expense) => expense.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredExpenses]);

  const netTotal = totalIncome - totalExpense;

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    const totals = {};
    const relevantCategories =
      type === "expense"
        ? categories.expenseCategories
        : categories.incomeCategories;

    relevantCategories.forEach((cat) => {
      totals[cat] = filteredExpenses
        .filter((exp) => exp.category === cat)
        .reduce((acc, curr) => acc + curr.amount, 0);
    });

    setCustomTotals(totals);
  }, [filteredExpenses, categories, type, totalIncome, totalExpense]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      } rounded-lg shadow-md p-6 mb-6`}
    >
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-200 border-gray-600"
              : "bg-gray-50 text-gray-800 border-gray-300"
          } border rounded p-2 text-sm`}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-200 border-gray-600"
              : "bg-gray-50 text-gray-800 border-gray-300"
          } border rounded p-2 text-sm`}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div
          className={`p-4 rounded-lg shadow-sm ${
            isDarkMode
              ? "bg-blue-900 text-blue-300"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          <h3 className="text-sm font-medium">Total Income</h3>
          <p className="text-xl font-semibold">${totalIncome.toFixed(2)}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-sm ${
            isDarkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"
          }`}
        >
          <h3 className="text-sm font-medium">Total Expense</h3>
          <p className="text-xl font-semibold">${totalExpense.toFixed(2)}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-sm ${
            netTotal > 0
              ? isDarkMode
                ? "bg-green-900 text-green-300"
                : "bg-green-100 text-green-700"
              : isDarkMode
              ? "bg-red-900 text-red-300"
              : "bg-red-100 text-red-700"
          }`}
        >
          <h3 className="text-sm font-medium">Net Balance</h3>
          <p className="text-xl font-semibold">${netTotal.toFixed(2)}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {Object.keys(customTotals).map(
          (category) =>
            customTotals[category] > 0 && (
              <li
                key={category}
                className={`p-4 flex justify-between items-center rounded-lg shadow-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <h3 className="font-semibold">{category}</h3>
                <p className="font-semibold">
                  ${customTotals[category].toFixed(2)}
                </p>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Summary;
