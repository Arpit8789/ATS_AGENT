import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, Briefcase, DollarSign, TrendingUp, Clock } from "lucide-react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      icon: Users, 
      label: "Total Users", 
      value: stats?.stats.totalUsers || 0,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      icon: FileText, 
      label: "Resumes Created", 
      value: stats?.stats.totalResumes || 0,
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-500/20 to-purple-500/20"
    },
    { 
      icon: Briefcase, 
      label: "Jobs Posted", 
      value: stats?.stats.totalJobs || 0,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20"
    },
    { 
      icon: DollarSign, 
      label: "Total Revenue", 
      value: `₹${stats?.stats.totalRevenue || 0}`,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] p-6">
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with ATS Agent today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/50 transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>

              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-400" />
                Recent Users
              </h3>
              <span className="text-sm text-gray-400">{stats?.recentUsers?.length || 0} new</span>
            </div>

            <div className="space-y-3">
              {stats?.recentUsers?.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                    <span className="text-white font-bold">{user.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Resumes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Recent Resumes
              </h3>
              <span className="text-sm text-gray-400">{stats?.recentResumes?.length || 0} new</span>
            </div>

            <div className="space-y-3">
              {stats?.recentResumes?.map((resume, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{resume.title}</p>
                    <p className="text-gray-400 text-xs">{resume.user?.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-semibold text-sm">
                      {resume.atsScore?.score || 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
