import React, { useEffect, useState } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext";

function BudgetForm() {
  const { categories, addBudget, addGoal } = useExpense();
  const { isDarkMode } = useTheme();
  const [category, setCategory] = useState("Rent");
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("budget");

  useEffect(() => {
    // Reset category when type changes
    if (type === "budget") {
      setCategory(categories.expenseCategories[0]); // Set to the first expense category by default
    } else {
      setCategory(categories.incomeCategories[0]); // Set to the first income category by default
    }
  }, [type, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      category,
      timePeriod,
      amount: parseFloat(amount),
    };

    if (type === "budget") {
      addBudget({ ...data, type });
    } else {
      addGoal({ ...data, type });
    }

    setAmount("");
    setType("budget");
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-8 rounded-lg shadow-lg`}
      >
        <h2 className="text-2xl font-semibold mb-6">
          Set{" "}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 outline-none p-2 text-sm rounded-lg bg-gray-50 text-gray-800"
          >
            <option value="budget">Budget</option>
            <option value="goal">Goal</option>
          </select>
        </h2>

        <div className="mb-6">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          >
            {type === "budget"
              ? categories.expenseCategories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))
              : categories.incomeCategories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Time Period</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            {type === "budget" ? "Budget Amount" : "Goal Amount"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={type === "budget" ? "Budget Amount" : "Goal Amount"}
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Set {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;
