import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import api from "../../services/api";

export default function PaymentStats() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/admin/payments');
      setPayments(response.data.payments || []);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/payments/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch payment stats:', error);
    }
  };

  const statCards = [
    { 
      icon: DollarSign, 
      label: "Total Revenue", 
      value: `₹${stats?.totalRevenue || 0}`,
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: CheckCircle, 
      label: "Completed", 
      value: stats?.completedPayments || 0,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: XCircle, 
      label: "Failed", 
      value: stats?.failedPayments || 0,
      color: "from-red-500 to-pink-500"
    },
    { 
      icon: Clock, 
      label: "Pending", 
      value: stats?.pendingPayments || 0,
      color: "from-yellow-500 to-orange-500"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
            Payment Analytics
          </h1>
          <p className="text-gray-400">Track payments and revenue</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} bg-opacity-20 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-white" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Payments Table */}
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
                  <th className="text-left p-4 text-gray-300 font-semibold">Amount</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Date</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-violet-500/10 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {payment.user?.name?.[0] || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{payment.user?.name || "Unknown"}</p>
                          <p className="text-gray-400 text-xs">{payment.user?.email || "N/A"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-green-400 font-bold">₹{payment.amount}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : payment.status === 'failed'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-400 text-sm font-mono">
                      {payment.transactionId || "N/A"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && (
            <div className="text-center py-20">
              <DollarSign className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No payments recorded yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
