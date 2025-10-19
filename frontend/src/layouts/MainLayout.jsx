import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232]">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
