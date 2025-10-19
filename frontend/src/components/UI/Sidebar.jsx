import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ admin = false }) {
  const location = useLocation();
  const routes = admin
    ? [
        { name: "Dashboard", path: "/admin" },
        { name: "Manage Jobs", path: "/admin/jobs" },
        { name: "User Stats", path: "/admin/users" },
        { name: "Payments", path: "/admin/payments" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Resume Builder", path: "/resume-builder" },
        { name: "Jobs", path: "/job-search" },
        { name: "My Resumes", path: "/resume-history" },
      ];
  return (
    <aside className="bg-blue-900 text-white min-h-screen w-48 fixed top-0 left-0 flex flex-col pt-16 shadow-lg">
      {routes.map((r) => (
        <Link
          key={r.path}
          className={`px-5 py-3 font-semibold transition-all rounded hover:bg-green-500 ${
            location.pathname === r.path ? "bg-green-400 text-blue-900" : ""
          }`}
          to={r.path}
        >
          {r.name}
        </Link>
      ))}
    </aside>
  );
}
