import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PreviewModal({ open, onClose, fileUrl }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 bg-white/10 backdrop-blur-xl border border-violet-500/30 rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Resume Preview</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="w-full h-[70vh] bg-gray-900 rounded-xl overflow-hidden">
            {fileUrl ? (
              <iframe
                src={fileUrl}
                title="Resume PDF Preview"
                className="w-full h-full"
                frameBorder="0"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No preview available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
