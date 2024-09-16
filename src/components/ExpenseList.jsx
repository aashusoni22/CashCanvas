import React, { useEffect, useState } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import { useTheme } from "../contexts/ThemeContext"; // Import the theme context
import Modal from "./Modal";

function ExpenseList() {
  const { deleteExpense, expenses } = useExpense();
  const { isDarkMode } = useTheme(); // Get dark mode value
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditClick = (expense) => {
    setExpenseToEdit(expense);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setExpenseToEdit(null);
    setModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const getCategoryStyle = (category) => {
    const categoryStyles = {
      Rent: "bg-amber-400",
      Groceries: "bg-emerald-500",
      Entertainment: "bg-red-500",
      Others: "bg-slate-500",
      Investments: "bg-lime-500",
      Bonus: "bg-indigo-500",
      Salary: "bg-sky-500",
      Default: "bg-gray-400",
    };
    return categoryStyles[category] || categoryStyles.Default;
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      Rent: <i className="fa-solid fa-house"></i>,
      Groceries: <i className="fa-solid fa-shopping-cart"></i>,
      Entertainment: <i className="fa-solid fa-film"></i>,
      Others: <i className="fa-solid fa-receipt"></i>,
      Bonus: <i className="fa-solid fa-money-bill-trend-up"></i>,
      Investments: <i className="fa-solid fa-seedling"></i>,
      Salary: <i className="fa-solid fa-wallet"></i>,
      Default: <i className="fa-solid fa-tag"></i>,
    };
    return categoryIcons[category] || categoryIcons.Default;
  };

  return (
    <div className={isDarkMode ? "bg-gray-800" : "bg-white"}>
      <ul className="space-y-3 overflow-y-auto max-h-96 rounded-lg">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li
              key={expense.id}
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-50 text-gray-700"
              } flex justify-between items-center px-4 py-3 w-full rounded-lg`}
            >
              <div className="flex space-x-7 items-center">
                <span
                  title={expense.category}
                  className={`rounded-full px-2 w-8 h-8 text-white py-2 flex justify-center 
                  ${getCategoryStyle(expense.category)}`}
                >
                  {getCategoryIcon(expense.category)}
                </span>
                <div className="flex">
                  <span className="font-semibold w-40">{expense.name}</span>
                  <span
                    className={`${
                      expense.type === "expense"
                        ? "text-red-500"
                        : "text-lime-500"
                    } font-medium`}
                  >
                    {expense.type === "expense"
                      ? `-$${expense.amount}`
                      : `+$${expense.amount}`}
                  </span>
                </div>
              </div>
              <div className="space-x-6 flex items-center">
                <i
                  onClick={() => handleEditClick(expense)}
                  className="fa-regular fa-pen-to-square text-xl font-semibold hover:text-blue-500 duration-200 cursor-pointer"
                ></i>
                <i
                  onClick={() => deleteExpense(expense.id)}
                  className="fa-solid fa-delete-left text-xl font-semibold hover:text-rose-500 duration-200 cursor-pointer"
                ></i>
              </div>
            </li>
          ))
        ) : (
          <h1 className="text-slate-400">No Transaction to show</h1>
        )}
      </ul>
      {isModalOpen && (
        <Modal expenseToEdit={expenseToEdit} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default ExpenseList;
