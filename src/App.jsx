import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import Summary from "./components/Summary";
import ChartView from "./components/ChartView";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses_v1", []);
  const [filters, setFilters] = React.useState({
    category: "all",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "recent",
    search: "",
  });

  const addExpense = (expense) => {
    setExpenses((prev) => [{ ...expense, id: Date.now().toString() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-indigo-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-sky-500 to-indigo-500 flex items-center justify-center shadow-md">
              <span className="text-white text-xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Smart Expense Tracker
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Track • Analyze • Save Better
              </p>
            </div>
          </div>

          {/* Right: Total Spent */}
          <div className="bg-linear-to-r from-sky-100 to-indigo-100 text-sky-800 px-5 py-2 rounded-xl text-sm sm:text-base font-semibold shadow-sm border border-sky-200">
            Total Spent: ₹{totalSpent.toLocaleString()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Section (2/3 width) */}
        <section className="xl:col-span-2 space-y-8">
          {/* Expense Form */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <ExpenseForm onAdd={addExpense} />
          </div>

          {/* Filters */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <Filters filters={filters} setFilters={setFilters} />
          </div>

          {/* Expense List */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <ExpenseList
              expenses={expenses}
              filters={filters}
              onDelete={deleteExpense}
            />
          </div>
        </section>

        {/* Right Sidebar (1/3 width) */}
        <aside className="space-y-8">
          {/* Summary */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <Summary expenses={expenses} />
          </div>

          {/* Chart */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <ChartView expenses={expenses} />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} Smart Expense Tracker — Built with ❤️ by{" "}
        <span className="font-semibold text-sky-700">Ramesh Choudhary</span>
      </footer>
    </div>
  );
}
