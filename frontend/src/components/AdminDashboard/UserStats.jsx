import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, TrendingUp, Mail, Calendar, Trash2 } from "lucide-react";
import api from "../../services/api";

export default function UserStats() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleToggleVerification = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/users/${userId}/status`, {
        isVerified: !currentStatus
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const stats = {
    total: users.length,
    verified: users.filter(u => u.isVerified).length,
    unverified: users.filter(u => !u.isVerified).length,
    premium: users.filter(u => u.subscription?.isActive).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-gray-400">Manage registered users and their accounts</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: "Total Users", value: stats.total, color: "from-blue-500 to-cyan-500" },
            { icon: UserCheck, label: "Verified", value: stats.verified, color: "from-green-500 to-emerald-500" },
            { icon: UserX, label: "Unverified", value: stats.unverified, color: "from-red-500 to-pink-500" },
            { icon: TrendingUp, label: "Premium", value: stats.premium, color: "from-violet-500 to-purple-500" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} bg-opacity-20 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-violet-500/20">
                  <th className="text-left p-4 text-gray-300 font-semibold">User</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Email</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Phone</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Subscription</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Joined</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-violet-500/10 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                          <span className="text-white font-bold">{user.name[0]}</span>
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Mail className="w-4 h-4 text-violet-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300 text-sm">{user.phone || "N/A"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVerification(user._id, user.isVerified)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isVerified
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Unverified"}
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.subscription?.isActive
                          ? "bg-violet-500/20 text-violet-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {user.subscription?.plan || "Free"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No users found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
