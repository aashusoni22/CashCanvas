import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  editExpense: () => {},
  deleteExpense: () => {},
  addBudget: () => {},
  deleteBudget: () => {},
  addCustomCategory: () => {},
  addGoal: () => {},
  deleteGoal: () => {},
});

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [budgets, setBudgets] = useState(() => {
    const storedBudgets = localStorage.getItem("budgets");
    return storedBudgets ? JSON.parse(storedBudgets) : [];
  });

  const [goals, setGoals] = useState(() => {
    const storedGoals = localStorage.getItem("goals");
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories
      ? JSON.parse(storedCategories)
      : {
          expenseCategories: ["Rent", "Groceries", "Entertainment", "Others"],
          incomeCategories: ["Salary", "Bonus", "Investments", "Others"],
        };
  });

  const addExpense = (name, category, amount, type) => {
    const newExpense = {
      id: Date.now(),
      name,
      category,
      amount,
      type,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const addBudget = (budgetData) => {
    setBudgets((prevBudgets) => {
      const existingBudget = prevBudgets.find(
        (budget) =>
          budget.category === budgetData.category &&
          budget.timePeriod === budgetData.timePeriod
      );

      if (existingBudget) {
        return prevBudgets.map((budget) =>
          budget === existingBudget ? { ...budget, ...budgetData } : budget
        );
      } else {
        return [...prevBudgets, budgetData];
      }
    });
  };

  const addGoal = (goalData) => {
    setGoals((prevGoals) => {
      const existingGoal = prevGoals.find(
        (goal) =>
          goal.category === goalData.category &&
          goal.timePeriod === goalData.timePeriod
      );

      if (existingGoal) {
        return prevGoals.map((goal) =>
          goal === existingGoal ? { ...goal, ...goalData } : goal
        );
      } else {
        return [...prevGoals, goalData];
      }
    });
  };

  const addCustomCategory = (category, type) => {
    setCategories((prevCategories) => {
      const newCategories = { ...prevCategories };
      if (type === "expense") {
        if (!newCategories.expenseCategories.includes(category)) {
          newCategories.expenseCategories.push(category);
        }
      } else if (type === "income") {
        if (!newCategories.incomeCategories.includes(category)) {
          newCategories.incomeCategories.push(category);
        }
      }
      return newCategories;
    });
  };

  const deleteGoal = (category) => {
    setGoals(goals.filter((goal) => goal.category !== category));
  };

  const deleteBudget = (category) => {
    setBudgets(budgets.filter((budget) => budget.category !== category));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        budgets,
        addBudget,
        addCustomCategory,
        categories,
        addGoal,
        goals,
        deleteBudget,
        deleteGoal,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  return useContext(ExpenseContext);
};
