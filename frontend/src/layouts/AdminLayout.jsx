import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232]">
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content - No Navbar, Full Width */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
