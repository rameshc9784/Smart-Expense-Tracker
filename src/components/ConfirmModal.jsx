import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (typeof document === "undefined") return null; // SSR safety

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop (Full window blur) */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Box */}
                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center z-10"
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Delete Confirmation
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this expense? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body // 🔥 renders modal at the top level of DOM
    );
}
