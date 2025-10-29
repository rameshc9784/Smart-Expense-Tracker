import React from "react";
import { CATEGORIES } from "../utils/categories";
import { Filter, Calendar, Search, ArrowUpDown } from "lucide-react";

export default function Filters({ filters, setFilters }) {
    const update = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () =>
        setFilters({
            category: "all",
            startDate: "",
            endDate: "",
            minAmount: "",
            maxAmount: "",
            sortBy: "recent",
            search: "",
        });

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 rounded-2xl shadow-md p-6 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                    <Filter size={20} className="text-indigo-500" />
                    Filters
                </h3>
                <button
                    onClick={clearFilters}
                    className="text-sm px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => update("category", e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Range */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <Calendar size={14} /> Start Date
                    </label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => update("startDate", e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <Calendar size={14} /> End Date
                    </label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => update("endDate", e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                {/* Amount Range */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Min Amount</label>
                    <input
                        type="number"
                        value={filters.minAmount}
                        onChange={(e) => update("minAmount", e.target.value)}
                        placeholder="₹0"
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Max Amount</label>
                    <input
                        type="number"
                        value={filters.maxAmount}
                        onChange={(e) => update("maxAmount", e.target.value)}
                        placeholder="₹5000"
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                {/* Sort By */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <ArrowUpDown size={14} /> Sort By
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => update("sortBy", e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="amount">Highest Amount</option>
                    </select>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:col-span-2 lg:col-span-3">
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <Search size={14} /> Search
                    </label>
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => update("search", e.target.value)}
                        placeholder="Search by note or amount..."
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>
            </div>
        </div>
    );
}
