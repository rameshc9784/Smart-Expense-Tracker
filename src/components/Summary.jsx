import React from "react";
import { CATEGORIES } from "../utils/categories";

export default function Summary({ expenses }) {
    // Total spending
    const total = React.useMemo(
        () => expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses]
    );

    // Category-wise totals
    const categoryTotals = React.useMemo(() => {
        const totals = {};
        CATEGORIES.forEach((cat) => {
            totals[cat.id] = expenses
                .filter((e) => e.category === cat.id)
                .reduce((sum, e) => sum + e.amount, 0);
        });
        return totals;
    }, [expenses]);

    return (
        <div className="bg-linear-to-br from-white to-sky-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                💰 Expense Summary
            </h3>

            {/* Total Spending */}
            <div className="text-center mb-6">
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                    Total Spent
                </p>
                <p className="text-4xl font-bold text-sky-600 mt-1">
                    ₹{total.toLocaleString()}
                </p>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
                {CATEGORIES.map((cat) => {
                    const amount = categoryTotals[cat.id] || 0;
                    const percentage = total ? (amount / total) * 100 : 0;

                    return (
                        <div key={cat.id}>
                            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                                <span>{cat.label}</span>
                                <span>₹{amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: cat.color,
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
