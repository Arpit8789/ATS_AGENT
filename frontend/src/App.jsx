import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// User Pages
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeHistory from "./pages/ResumeHistory";
import JobSearch from "./pages/JobSearch";
import JobDetails from "./pages/JobDetails";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";

// Context Providers
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthProvider";
import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminProvider>
          <BrowserRouter>
            <Routes>
              {/* Main User Routes */}
              <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Protected User Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume-builder" 
                  element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume-history" 
                  element={
                    <ProtectedRoute>
                      <ResumeHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/job-search" 
                  element={
                    <ProtectedRoute>
                      <JobSearch />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/jobs/:jobId" 
                  element={
                    <ProtectedRoute>
                      <JobDetails />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Admin Routes */}
              <Route element={<AdminLayout />}>
                <Route 
                  path="/admin" 
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/jobs" 
                  element={
                    <AdminProtectedRoute>
                      <AdminJobs />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <AdminProtectedRoute>
                      <AdminUsers />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/payments" 
                  element={
                    <AdminProtectedRoute>
                      <AdminPayments />
                    </AdminProtectedRoute>
                  } 
                />
              </Route>
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </UserProvider>
    </AuthProvider>
  );
}
