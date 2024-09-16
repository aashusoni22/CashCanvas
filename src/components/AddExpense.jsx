import React, { useEffect, useState } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext";

function AddExpense() {
  const { addCustomCategory, categories, addExpense } = useExpense();
  const { isDarkMode } = useTheme();
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [newCategory, setNewCategory] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (category === "Choose Category") {
      alert("Please select or add a valid category.");
      return;
    }

    const expenseData = {
      type: type,
      name: title,
      category: category,
      amount: parseFloat(amount),
    };

    addExpense(
      expenseData.name,
      expenseData.category,
      expenseData.amount,
      expenseData.type
    );
    setTitle("");
    setAmount("");
    setCategory("Choose Category");
    setNewCategory("");
    setShowCustomCategoryInput(false);
  };

  const handleAddCustomCategory = () => {
    if (newCategory) {
      addCustomCategory(newCategory, type);
      setCategory(newCategory);
      setNewCategory("");
      setShowCustomCategoryInput(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleAddExpense}
        className={`w-full max-w-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-8 rounded-lg shadow-md`}
      >
        <h2 className="text-2xl font-semibold mb-6 ">
          Add New {type === "expense" ? "Expense" : "Income"}
        </h2>

        <div className="mb-6">
          <label className="block  mb-2">Transaction Type:</label>
          <select
            className={`w-full font-medium rounded-lg p-3 ${
              type === "expense"
                ? "bg-red-500 text-white"
                : "bg-emerald-500 text-white"
            }`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense" className="bg-red-500">
              Expense
            </option>
            <option value="income" className="bg-emerald-500">
              Income
            </option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block  mb-2">Title</label>
          <input
            type="text"
            placeholder="Title"
            maxLength={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block  mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            max={10000}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block  mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected === "Add Custom Category") {
                setShowCustomCategoryInput(true);
                setCategory("");
              } else {
                setCategory(selected);
                setShowCustomCategoryInput(false);
              }
            }}
            className={`${
              isDarkMode && "text-gray-900"
            } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          >
            <option value="Choose Category" className="text-gray-400">
              Choose Category
            </option>
            {(type === "expense"
              ? categories.expenseCategories
              : categories.incomeCategories
            ).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Add Custom Category">+ Add Custom Category</option>
          </select>
          {showCustomCategoryInput && (
            <div className="mt-4 flex flex-col space-y-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className={`${
                  isDarkMode && "text-gray-900"
                } w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition"
              >
                Add Category
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Add {type === "expense" ? "Expense" : "Income"}
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
