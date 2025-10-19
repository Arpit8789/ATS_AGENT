import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle } from "lucide-react";
import { registerUser, verifyRegistrationOTP, resendOTP, loginUser } from "../../services/auth";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await registerUser({ name, phone, email, password });
      if (response.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await verifyRegistrationOTP(email, otp);
      if (response.success) {
        // Auto-login after successful verification
        await loginUser({ email, password });
        
        // Show success message
        setSuccess("Registration successful! Redirecting to dashboard...");
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setResendLoading(true);
    try {
      const response = await resendOTP(email);
      if (response.success) {
        setSuccess("New OTP sent successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 w-full max-w-md border-2 border-violet-500/30 shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(109, 40, 217, 0.3)' }}
      >
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">Join ATS Agent today</p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
                <input
                  type="text"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
                <input
                  type="tel"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

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

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/10 border border-violet-500/30 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Password (min 6 chars)"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
              >
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">Already have an account? </span>
              <a href="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition">
                Login
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              We sent a code to {email}
            </p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full bg-white/10 border border-violet-500/30 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                placeholder="000000"
                maxLength={6}
                required
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || loading}
                className="w-full text-violet-400 hover:text-violet-300 text-sm transition disabled:opacity-50"
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={loading}
                className="w-full text-gray-400 hover:text-white text-sm transition disabled:opacity-50"
              >
                ← Back to registration
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
