import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
    // Disable background scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    // If modal is not open, don't render anything
    if (!isOpen) return null;

    // Modal JSX content
    const modalContent = (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
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
        </AnimatePresence>
    );

    // Render directly inside <body> so it covers the full window
    return ReactDOM.createPortal(modalContent, document.body);
}
