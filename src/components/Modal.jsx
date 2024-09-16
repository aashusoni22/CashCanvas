import React, { useEffect, useState } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext";

function Modal({ expenseToEdit, onClose }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const { categories, editExpense } = useExpense();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.name);
      setCategory(expenseToEdit.category);
      setAmount(expenseToEdit.amount);
      setType(expenseToEdit.type);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "Choose Category") {
      alert("Please select a valid category");
      return;
    }

    if (title !== "" && amount !== "" && category !== "") {
      editExpense(expenseToEdit.id, {
        name: title,
        amount: parseFloat(amount),
        category,
      });
      onClose();
    } else {
      alert("Please fill out all details");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg w-96`}
      >
        <h2 className="text-xl font-semibold mb-4 ">Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${
                isDarkMode && "text-gray-900"
              } w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mb-4">
            <label className="block  mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className={`${
                isDarkMode && "text-gray-900"
              } w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mb-4">
            <label className="block  mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${
                isDarkMode && "text-gray-900"
              } w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="choose" disabled>
                Choose Category
              </option>
              {(type === "expense"
                ? categories.expenseCategories
                : categories.incomeCategories
              ).map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-400 text-white p-2 rounded hover:bg-red-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-400 text-white p-2 rounded hover:bg-indigo-500 transition"
            >
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
