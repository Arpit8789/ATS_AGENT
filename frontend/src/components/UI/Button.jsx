import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, type = "button", variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg hover:shadow-violet-500/50",
    secondary: "bg-white/10 hover:bg-white/20 border border-violet-500/30 hover:border-violet-500/60 text-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/50",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-red-500/50"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${variants[variant]} ${className}`}
      style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.3)' }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
