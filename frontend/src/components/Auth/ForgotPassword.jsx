import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { forgotPassword, verifyResetOTP, resetPassword } from "../../services/auth";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await verifyResetOTP(email, otp);
      if (response.success) {
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(email, otp, newPassword);
      if (response.success) {
        navigate("/login", { 
          state: { 
            message: "Password reset successful! Please login." 
          } 
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 w-full max-w-md border-2 border-violet-500/30 shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(109, 40, 217, 0.3)' }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          {step === 1 && "Enter your email to receive OTP"}
          {step === 2 && `Code sent to ${email}`}
          {step === 3 && "Enter your new password"}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>

            <input
              type="text"
              className="w-full bg-white/10 border border-violet-500/30 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="000000"
              maxLength={6}
              required
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-gray-400 hover:text-white text-sm transition"
            >
              ← Back
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                placeholder="New Password"
                required
                minLength={6}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-violet-400 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                placeholder="Confirm Password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
