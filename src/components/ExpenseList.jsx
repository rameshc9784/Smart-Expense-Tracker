import React from "react";
import { CalendarDays, Tag, Wallet, Clock, Trash2 } from "lucide-react";
import { CATEGORIES } from "../utils/categories";

export default function ExpenseList({ expenses, filters, setExpenses }) {
    // --- Filtering logic ---
    const filtered = expenses.filter((e) => {
        if (filters.category !== "all" && e.category !== filters.category) return false;
        if (filters.startDate && e.date < filters.startDate) return false;
        if (filters.endDate && e.date > filters.endDate) return false;
        if (filters.minAmount && e.amount < +filters.minAmount) return false;
        if (filters.maxAmount && e.amount > +filters.maxAmount) return false;
        if (
            filters.search &&
            !`${e.note} ${e.amount}`.toLowerCase().includes(filters.search.toLowerCase())
        )
            return false;
        return true;
    });

    // --- Sorting ---
    let sorted = [...filtered];

    if (filters.sortBy === "recent") {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
    } else if (filters.sortBy === "amount") {
        sorted.sort((a, b) => b.amount - a.amount); // Highest amount first
    };

    // --- Group by month ---
    const grouped = sorted.reduce((acc, ex) => {
        const monthKey = new Date(ex.date).toLocaleString("en-IN", {
            month: "long",
            year: "numeric",
        });
        acc[monthKey] = acc[monthKey] || [];
        acc[monthKey].push(ex);
        return acc;
    }, {});

    const groupedEntries = Object.entries(grouped);

    // --- Delete Handler ---
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        }
    };

    // --- No data state ---
    if (groupedEntries.length === 0) {
        return (
            <div className="text-center py-24 text-gray-500 bg-white rounded-2xl shadow-sm">
                <Wallet className="mx-auto mb-3 text-gray-400" size={56} />
                <p className="text-lg font-medium">No expenses found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="mt-0">
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
                <Clock className="text-indigo-500" size={22} />
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-500">
                    Expense History
                </h2>
            </div>

            {/* Expense Cards */}
            <div className="space-y-4">
                {groupedEntries.map(([month, items]) => {
                    const total = items.reduce((sum, e) => sum + e.amount, 0);

                    return (
                        <div
                            key={month}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={18} />
                                    <h3 className="text-sm sm:text-base font-medium">{month}</h3>
                                </div>
                                <p className="text-sm sm:text-base font-semibold">
                                    Total: ₹{total.toLocaleString()}
                                </p>
                            </div>

                            {/* Expense Items */}
                            <ul className="px-4 sm:px-6 py-3">
                                {items.map((ex, i) => {
                                    const category = CATEGORIES.find((c) => c.id === ex.category);
                                    const categoryColor =
                                        [
                                            "bg-sky-100 text-sky-700",
                                            "bg-emerald-100 text-emerald-700",
                                            "bg-amber-100 text-amber-700",
                                            "bg-rose-100 text-rose-700",
                                            "bg-violet-100 text-violet-700",
                                        ][i % 5];

                                    return (
                                        <li
                                            key={ex.id}
                                            className="flex justify-between items-center py-2 px-2 hover:bg-sky-50 rounded-lg transition-all duration-200"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {ex.note || "No note added"}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span
                                                        className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}
                                                    >
                                                        <Tag size={12} />
                                                        {category ? category.label : ex.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(ex.date).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right side — Amount + Delete */}
                                            <div className="flex items-center gap-3">
                                                <p className="font-bold text-sky-700 text-lg">
                                                    ₹{ex.amount}
                                                </p>
                                                <button
                                                    onClick={() => handleDelete(ex.id)}
                                                    className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition"
                                                    title="Delete entry"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
