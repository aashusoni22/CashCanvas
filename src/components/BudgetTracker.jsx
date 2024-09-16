import React, { useState, useEffect } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "../contexts/ThemeContext";

function BudgetTracker() {
  const { expenses, budgets, goals, deleteBudget, deleteGoal } = useExpense();
  const [budgetUsage, setBudgetUsage] = useState({});
  const [goalProgress, setGoalProgress] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const budgetUsageData = {};
    const goalProgressData = {};

    // Calculate budget usage
    budgets.forEach((budget) => {
      const categoryExpenses = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((acc, curr) => acc + curr.amount, 0);

      const budgetAmount = budget.amount || 1;
      const usedPercentage = (categoryExpenses / budgetAmount) * 100;
      budgetUsageData[budget.category] = {
        amountUsed: categoryExpenses,
        percentageUsed: usedPercentage,
        budget: budgetAmount,
      };
    });
    setBudgetUsage(budgetUsageData);

    // Calculate goal progress
    goals.forEach((goal) => {
      const categoryExpenses = expenses
        .filter((expense) => expense.category === goal.category)
        .reduce((acc, curr) => acc + curr.amount, 0);

      const goalAmount = goal.amount || 1;
      const achievedPercentage = (categoryExpenses / goalAmount) * 100;
      goalProgressData[goal.category] = {
        amountAchieved: categoryExpenses,
        percentageAchieved: achievedPercentage,
        goal: goalAmount,
      };
    });
    setGoalProgress(goalProgressData);
  }, [expenses, budgets, goals]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [budgets, goals]);

  const getProgressBarColor = (percentage, isGoal = false) => {
    if (isGoal) {
      return percentage < 100 ? "bg-lime-500" : "bg-red-500";
    } else {
      if (percentage < 50) return "bg-lime-500";
      if (percentage < 80) return "bg-yellow-400";
      return "bg-red-500";
    }
  };

  return (
    <div className="mt-6">
      <div className="space-y-5 shadow-lg rounded-lg mb-5">
        {/* Budgets Section */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }  rounded-lg p-4 mb-6 overflow-y-auto max-h-96`}
        >
          <h3 className="text-lg font-semibold mb-4 ">Budgets</h3>

          {budgets.length === 0 ? (
            <div
              className={`rounded-lg  font-semibold ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-700"
              } p-4`}
            >
              No budgets to track
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {Object.keys(budgetUsage).map((category) => {
                const { amountUsed, percentageUsed, budget } =
                  budgetUsage[category];
                return (
                  <div
                    key={category}
                    className={`p-4 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-200"
                    } relative`}
                  >
                    <div className="flex mt-2 justify-between items-center mb-3">
                      <span className="font-medium text-lg">{category}</span>
                      <span>
                        ${amountUsed.toFixed(2)} / ${budget.toFixed(2)} (
                        {percentageUsed.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`${getProgressBarColor(
                          percentageUsed
                        )} h-4 rounded-full`}
                        style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                      ></div>
                    </div>
                    {percentageUsed > 80 && percentageUsed < 100 && (
                      <div className="mt-4 p-3 bg-yellow-400 text-white rounded-lg flex items-center space-x-2">
                        <ExclamationCircleIcon className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">Warning:</p>
                          <p className="text-sm">
                            You are nearing your budget limit.
                          </p>
                        </div>
                      </div>
                    )}
                    {percentageUsed === 100 && (
                      <div className="mt-4 p-2 bg-red-500 text-white rounded-lg flex items-center space-x-2">
                        <ExclamationCircleIcon className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">Reached Budget</p>
                        </div>
                      </div>
                    )}
                    {percentageUsed > 100 && (
                      <div className="mt-4 p-2 bg-red-600 text-white rounded-lg flex items-center space-x-2">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">Over Budget</p>
                        </div>
                      </div>
                    )}
                    {/* Delete Budget Button */}
                    <MinusCircleIcon
                      className="w-5 h-5 text-red-500 absolute top-2 right-2 cursor-pointer"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${category} budget?`
                          )
                        ) {
                          deleteBudget(category);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Goals Section */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }  rounded-lg p-4 mb-6 overflow-y-auto max-h-96`}
        >
          <h3 className="text-lg font-semibold mb-4 ">Goals</h3>

          {goals.length === 0 ? (
            <div
              className={`rounded-lg  font-semibold ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-700"
              } p-4`}
            >
              No goals to track
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {Object.keys(goalProgress).map((category) => {
                const { amountAchieved, percentageAchieved, goal } =
                  goalProgress[category];
                return (
                  <div
                    key={category}
                    className={`p-4 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-200"
                    } relative`}
                  >
                    <div className="flex  mt-2 justify-between items-center mb-3">
                      <span className="font-medium text-lg">{category}</span>
                      <span>
                        ${amountAchieved.toFixed(2)} / ${goal.toFixed(2)} (
                        {percentageAchieved.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`${getProgressBarColor(
                          percentageAchieved,
                          true
                        )} h-4 rounded-full`}
                        style={{
                          width: `${Math.min(percentageAchieved, 100)}%`,
                        }}
                      ></div>
                    </div>
                    {percentageAchieved >= 100 && (
                      <div className="mt-4 p-3 bg-green-400 text-white rounded-lg flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div>
                          <p className="font-semibold">Goal Achieved</p>
                        </div>
                      </div>
                    )}
                    {/* Delete Goal Button */}
                    <MinusCircleIcon
                      className="w-5 h-5 text-red-500 absolute top-2 right-2 cursor-pointer"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${category} goal?`
                          )
                        ) {
                          deleteGoal(category);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;
