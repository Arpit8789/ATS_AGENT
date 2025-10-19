import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  BarChart3,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  Bell,
  Target,
  Zap,
  Calendar,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const quickActions = [
    {
      icon: FileText,
      title: "Build Resume",
      desc: "Create ATS-optimized resume",
      gradient: "from-blue-500 to-violet-600",
      route: "/resume-builder"
    },
    {
      icon: Briefcase,
      title: "Find Jobs",
      desc: "Browse curated opportunities",
      gradient: "from-violet-500 to-fuchsia-600",
      route: "/job-search"
    },
    {
      icon: BarChart3,
      title: "ATS Score",
      desc: "Check resume score",
      gradient: "from-indigo-500 to-blue-600",
      route: "/ats-score"
    },
    {
      icon: Clock,
      title: "My Resumes",
      desc: "View & manage resumes",
      gradient: "from-cyan-500 to-blue-600",
      route: "/resume-history"
    }
  ];

  const stats = [
    { icon: FileText, label: "Total Resumes", value: "0", color: "text-blue-400", trend: "+0%", bg: "from-blue-500/20 to-cyan-500/20" },
    { icon: Award, label: "Avg ATS Score", value: "0%", color: "text-green-400", trend: "+0%", bg: "from-green-500/20 to-emerald-500/20" },
    { icon: Briefcase, label: "Job Applications", value: "0", color: "text-violet-400", trend: "+0%", bg: "from-violet-500/20 to-purple-500/20" },
    { icon: Clock, label: "Time Saved", value: "0h", color: "text-cyan-400", trend: "New", bg: "from-cyan-500/20 to-blue-500/20" }
  ];

  const trendingJobs = [
    { title: "Senior Software Engineer", company: "Google", type: "Full-time", salary: "₹25-35 LPA", posted: "2h ago", hot: true },
    { title: "Product Manager", company: "Amazon", type: "Full-time", salary: "₹30-45 LPA", posted: "5h ago", hot: true },
    { title: "Data Scientist", company: "Microsoft", type: "Remote", salary: "₹20-30 LPA", posted: "1d ago", hot: false },
    { title: "UI/UX Designer", company: "Figma", type: "Remote", salary: "₹15-25 LPA", posted: "2d ago", hot: false }
  ];

  const tips = [
    { icon: Target, title: "Optimize Your Resume", desc: "Use action verbs and quantify achievements", color: "text-blue-400" },
    { icon: Sparkles, title: "Match Keywords", desc: "Align your skills with job descriptions", color: "text-violet-400" },
    { icon: CheckCircle2, title: "Keep it Concise", desc: "1-2 pages maximum for best results", color: "text-green-400" }
  ];

  const notifications = [
    { icon: CheckCircle2, text: "Your resume was downloaded 3 times", time: "2h ago", type: "success" },
    { icon: AlertCircle, text: "New jobs matching your profile available", time: "5h ago", type: "info" },
    { icon: Sparkles, text: "Improve your ATS score with premium tips", time: "1d ago", type: "warning" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232]">
      {/* Circuit pattern overlay - FIXED POSITION */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px] z-0"></div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 md:mb-8 gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Your ATS Resume & Job Hunting Command Center
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative overflow-hidden bg-gradient-to-br ${stat.bg} backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6 hover:border-violet-500/50 transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`} />
                  <span className="text-xs text-green-400 font-semibold px-2 py-1 bg-green-500/20 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
                
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Left Column - Quick Actions & Jobs */}
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-violet-400" />
                  Quick Actions
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {quickActions.map((action, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(action.route)}
                      className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6 cursor-pointer hover:border-violet-500/50 transition-all group"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 className="text-sm md:text-lg font-bold text-white mb-1">{action.title}</h3>
                      <p className="text-xs md:text-sm text-gray-400 hidden md:block">{action.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trending Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6"
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-violet-400" />
                    Trending Jobs
                  </h2>
                  <button
                    onClick={() => navigate('/job-search')}
                    className="text-xs md:text-sm text-violet-400 hover:text-violet-300 transition flex items-center gap-1"
                  >
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {trendingJobs.map((job, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/jobs/${idx + 1}`)}
                      className="bg-white/5 border border-violet-500/10 rounded-xl p-3 md:p-4 hover:border-violet-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-sm md:text-base">{job.title}</h3>
                            {job.hot && (
                              <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                                🔥 HOT
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs md:text-sm mb-2">{job.company} • {job.type}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-green-400 font-semibold">{job.salary}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{job.posted}</span>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                          <Bookmark className="w-4 h-4 text-violet-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/resume-builder')}
                  className="w-full mt-4 border-2 border-dashed border-violet-500/30 rounded-xl p-3 md:p-4 hover:border-violet-500/60 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center justify-center gap-2 text-violet-400 group-hover:text-violet-300">
                    <Plus className="w-5 h-5" />
                    <span className="font-semibold text-sm md:text-base">Apply to Jobs with New Resume</span>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right Column - Tips, Notifications, Subscription */}
            <div className="lg:col-span-4 space-y-4 md:space-y-6">
              {/* Pro Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-4 md:p-6"
              >
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Pro Tips
                </h3>
                <div className="space-y-3">
                  {tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                      <tip.icon className={`w-5 h-5 ${tip.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">{tip.title}</h4>
                        <p className="text-gray-400 text-xs">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6"
              >
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-violet-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {notifications.map((notif, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <notif.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        notif.type === 'success' ? 'text-green-400' :
                        notif.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm mb-1">{notif.text}</p>
                        <p className="text-gray-500 text-xs">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Subscription Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-4 md:p-6"
              >
                <h3 className="text-white font-bold text-lg mb-3">Subscription</h3>
                <div className="mb-4">
                  <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">Free Plan</p>
                  <p className="text-sm text-gray-300">Upgrade for unlimited resumes</p>
                </div>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all"
                  style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
                >
                  Upgrade to Premium
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
