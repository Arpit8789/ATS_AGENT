import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Briefcase, Users, CreditCard, BarChart3, Settings, LogOut } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Manage Jobs", path: "/admin/jobs", icon: Briefcase },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 }
];

export default function AdminSidebar() {
  const location = useLocation();
  
  return (
    <aside className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] text-white min-h-screen w-64 fixed top-0 left-0 flex flex-col pt-20 shadow-2xl z-40 border-r border-violet-500/20">
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent">
          Admin Panel
        </h2>
        <p className="text-gray-400 text-xs mt-1">Manage ATS Agent</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path}>
              <motion.div
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-4 pb-6 space-y-2">
        <Link to="/admin/settings">
          <motion.div
            whileHover={{ x: 8 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </motion.div>
        </Link>
        
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
