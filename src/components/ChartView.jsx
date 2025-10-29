import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORIES } from "../utils/categories";
import { PieChart } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartView({ expenses }) {
    const data = React.useMemo(() => {
        const labels = CATEGORIES.map((c) => c.label);
        const values = CATEGORIES.map((c) =>
            expenses
                .filter((e) => e.category === c.id)
                .reduce((sum, x) => sum + x.amount, 0)
        );

        const colors = CATEGORIES.map((c) => c.color); // 🎯 consistent colors

        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: "#fff",
                    hoverOffset: 10,
                },
            ],
        };
    }, [expenses]);

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                    <PieChart size={20} className="text-indigo-500" />
                    Spending by Category
                </h3>
                <span className="text-sm font-medium text-gray-500">
                    Total: ₹{total.toLocaleString()}
                </span>
            </div>

            <div className="h-64 relative">
                <Pie
                    data={data}
                    options={{
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    color: "#374151",
                                    font: { size: 12 },
                                },
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const value = context.raw || 0;
                                        const label = context.label || "";
                                        return `${label}: ₹${value.toLocaleString()}`;
                                    },
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
