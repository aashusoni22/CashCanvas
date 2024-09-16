import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Dashboard,
  AddExpense,
  BudgetForm,
  ExpenseBarChart,
  ExpenseList,
  Summary,
} from "./components";
import Layout from "./components/Layout.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { ExpenseProvider } from "./contexts/ExpenseContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-transaction" element={<AddExpense />} />
      <Route path="/add-budget-goal" element={<BudgetForm />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ExpenseProvider>
        <RouterProvider router={router} />
      </ExpenseProvider>
    </ThemeProvider>
  </StrictMode>
);
