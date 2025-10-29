import React from "react";
import { CATEGORIES } from "../utils/categories";
import { PlusCircle } from "lucide-react";

export default function ExpenseForm({ onAdd }) {
    const [form, setForm] = React.useState({
        amount: "",
        category: "food",
        date: new Date().toISOString().slice(0, 10),
        note: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(form.amount);
        if (!amountNum || amountNum <= 0) return alert("Enter a valid amount");
        onAdd({ ...form, amount: amountNum });
        setForm({
            amount: "",
            category: "food",
            date: new Date().toISOString().slice(0, 10),
            note: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 shadow-lg rounded-2xl p-6 backdrop-blur-sm"
        >
            <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                <PlusCircle className="text-indigo-500" size={22} />
                Add New Expense
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="Enter amount"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Category
                    </label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Note Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Note
                    </label>
                    <input
                        type="text"
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        placeholder="Optional note"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>
            </div>

            <div className="mt-5 text-right">
                <button
                    type="submit"
                    className="px-5 py-2.5 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Add Expense
                </button>
            </div>
        </form>
    );
}
