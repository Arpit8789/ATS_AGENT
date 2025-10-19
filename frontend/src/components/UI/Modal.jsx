import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-7 rounded-xl shadow-lg min-w-[300px] max-w-md border-2 border-blue-400">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 hover:bg-green-500 text-white px-4 py-2 rounded transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}
