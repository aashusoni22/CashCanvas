import React, { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useExpense } from "../contexts/ExpenseContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../contexts/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ExpenseBarChart() {
  const { expenses, categories } = useExpense();
  const [type, setType] = useState("expense");
  const { isDarkMode } = useTheme();

  // Calculate total expenses and income by category
  const totalExpensesByCategory = useMemo(
    () =>
      categories.expenseCategories.map((category) =>
        expenses
          .filter((exp) => exp.category === category && exp.type === "expense")
          .reduce((acc, curr) => acc + curr.amount, 0)
      ),
    [expenses, categories.expenseCategories]
  );

  const totalIncomeByCategory = useMemo(
    () =>
      categories.incomeCategories.map((category) =>
        expenses
          .filter((exp) => exp.category === category && exp.type === "income")
          .reduce((acc, curr) => acc + curr.amount, 0)
      ),
    [expenses, categories.incomeCategories]
  );

  // Set chart data and options based on selected type (expense/income)
  const data = useMemo(
    () => ({
      labels:
        type === "expense"
          ? categories.expenseCategories
          : categories.incomeCategories,
      datasets: [
        {
          label: `Total ${type === "expense" ? "Expenses" : "Income"}`,
          data:
            type === "expense"
              ? totalExpensesByCategory
              : totalIncomeByCategory,
          backgroundColor: isDarkMode
            ? [
                "#FFB74D",
                "#66BB6A",
                "#EF5350",
                "#42A5F5",
                "#DCE775",
                "#7986CB",
                "#90A4AE",
              ]
            : [
                "#FFCA28",
                "#10B981",
                "#F56565",
                "#0EA5E9",
                "#CDDC39",
                "#6366F1",
                "#64748B",
              ],
          borderColor: isDarkMode ? "#E5E7EB" : "#ffffff",
          borderWidth: 2,
          borderRadius: 10,
          hoverBackgroundColor: isDarkMode
            ? [
                "#FFA726",
                "#4CAF50",
                "#E53935",
                "#1E88E5",
                "#C0CA33",
                "#5C6BC0",
                "#78909C",
              ]
            : [
                "#FFD54F",
                "#34D399",
                "#FC8181",
                "#38BDF8",
                "#D4E157",
                "#818CF8",
                "#94A3B8",
              ],
          hoverBorderColor: "#E5E7EB",
        },
      ],
    }),
    [
      type,
      categories,
      totalExpensesByCategory,
      totalIncomeByCategory,
      isDarkMode,
    ]
  );

  // Adjust chart options based on theme
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#374151" : "#ffffff",
        borderColor: isDarkMode ? "#E5E7EB" : "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleColor: isDarkMode ? "#E5E7EB" : "#374151",
        bodyColor: isDarkMode ? "#E5E7EB" : "#374151",
      },
      title: {
        display: true,
        text: `Total Amount by ${
          type === "expense" ? "Expense" : "Income"
        } Category`,
        color: isDarkMode ? "#E5E7EB" : "#374151",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#E5E7EB" : "#374151",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#E5E7EB" : "#374151",
        },
      },
    },
  };

  return (
    <div className="w-96 h-80 md:w-full md:h-96 pb-7 rounded-lg">
      <label htmlFor="type-select" className="sr-only">
        Select Type
      </label>
      <select
        id="type-select"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={`${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } border border-gray-300 outline-blue-500 p-1 text-sm rounded mb-4`}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ExpenseBarChart;
