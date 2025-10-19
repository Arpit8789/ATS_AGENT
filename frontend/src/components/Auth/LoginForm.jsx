import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { loginUser } from "../../services/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const user = await loginUser({ email, password });
      
      // Check if user is admin
      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] px-4">
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 w-full max-w-md border-2 border-violet-500/30 shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(109, 40, 217, 0.3)' }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">Login to continue</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
            <input
              type="email"
              className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="Email Address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="Password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-violet-400 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300 transition">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
            style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Admin Login Hint */}
        <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-400 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin users will be redirected to admin panel</span>
          </div>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold transition">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
