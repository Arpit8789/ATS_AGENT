import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Briefcase, Sparkles, Zap, Target, Shield, ArrowRight } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";

// Typewriter effect
function Typewriter({ words, speed = 110 }) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    let timeout;
    if (idx < words.length) {
      timeout = setTimeout(() => {
        setText(text + words[idx]);
        setIdx(idx + 1);
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [text, idx, words, speed]);
  return <span>{text}</span>;
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen lg:h-screen bg-gradient-to-tr from-[#0a0e14] via-[#18182c] to-[#1a1232] flex items-center justify-center overflow-x-hidden px-3 md:px-6 py-6 lg:py-0">

      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Layout: Left Panel + Center Hero + Right Panel */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center lg:h-full py-6 lg:py-0">

        {/* LEFT PANEL - Features (CLICKABLE - Navigate to Login) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-5"
        >
          {[
            { icon: Zap, title: "AI-Powered", desc: "Smart resume optimization" },
            { icon: Target, title: "Job Matching", desc: "Find relevant opportunities" },
            { icon: Shield, title: "ATS Ready", desc: "Beat tracking systems" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05, x: 8 }}
              className="p-6 rounded-3xl bg-white/5 border border-violet-500/20 backdrop-blur-md cursor-pointer transition-all hover:border-violet-500/50"
            >
              <item.icon className="w-12 h-12 text-violet-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CENTER PANEL - Hero with Animation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 rounded-3xl px-6 md:px-10 py-8 md:py-12 bg-white/5 shadow-glow border-2 border-[#4f46e5]/30 backdrop-blur-xl"
        >
          {/* Lottie Animation - Bigger and Better Positioned */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Player 
                autoplay 
                loop 
                src="https://assets3.lottiefiles.com/packages/lf20_V9t630.json"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
              />
              {/* Glow effect behind animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 rounded-full blur-2xl opacity-30 -z-10"></div>
            </motion.div>
          </div>

          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight select-none bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-4">
            <Typewriter words={"AI Resume Builder + Job Finder".split("")} />
          </h1>
          
          <div className="flex justify-center mb-5">
            <span className="text-xs md:text-sm uppercase tracking-widest text-violet-400 bg-white/10 border px-4 py-2 rounded-lg border-violet-500/70 backdrop-blur">
              Next-Gen. Modern. Intelligent.
            </span>
          </div>

          <p className="text-center text-base md:text-lg text-gray-300 mb-8 px-2 leading-relaxed">
            Auto-optimize your resume, match with jobs instantly, and get AI-powered career insights—all in one platform.
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/resume-builder" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white border border-blue-500/20 hover:shadow-2xl transition-all"
                style={{ boxShadow: '0 0 30px 5px rgba(109,40,217,0.4)' }}
              >
                <FileText className="w-5 h-5" />
                Build Resume
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link to="/job-search" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, backgroundColor: '#312e81' }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg rounded-full bg-white/10 text-white font-bold border border-indigo-600/30 backdrop-blur hover:bg-white/20 transition-all"
              >
                <Briefcase className="w-5 h-5" />
                Find Jobs
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <div className="flex justify-center text-sm md:text-base">
            <Link to="/register" className="text-violet-300 hover:text-white transition flex items-center gap-1">
              <span>New here?</span>
              <span className="font-semibold">Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* RIGHT PANEL - Key Benefits (CLICKABLE - Navigate to Login) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-5"
        >
          <div 
            onClick={() => navigate('/login')}
            className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/30 backdrop-blur-md cursor-pointer transition-all hover:border-blue-500/60 hover:scale-105"
          >
            <h3 className="text-white font-bold text-lg mb-2">🚀 Fast & Efficient</h3>
            <p className="text-gray-400 text-sm">Generate professional resumes in minutes</p>
          </div>
          <div 
            onClick={() => navigate('/login')}
            className="p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 backdrop-blur-md cursor-pointer transition-all hover:border-violet-500/60 hover:scale-105"
          >
            <h3 className="text-white font-bold text-lg mb-2">🎯 High Success Rate</h3>
            <p className="text-gray-400 text-sm">ATS-optimized templates approved by recruiters</p>
          </div>
          <div 
            onClick={() => navigate('/login')}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 backdrop-blur-md cursor-pointer transition-all hover:border-indigo-500/60 hover:scale-105"
          >
            <h3 className="text-white font-bold text-lg mb-2">💡 AI-Driven Insights</h3>
            <p className="text-gray-400 text-sm">Real-time feedback and career recommendations</p>
          </div>
        </motion.div>

        {/* MOBILE ONLY - Features shown below hero */}
        <div className="lg:hidden col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            { icon: Zap, title: "AI-Powered", desc: "Smart resume optimization" },
            { icon: Target, title: "Job Matching", desc: "Find relevant opportunities" },
            { icon: Shield, title: "ATS Ready", desc: "Beat tracking systems" },
            { icon: Sparkles, title: "Fast & Efficient", desc: "Generate resumes in minutes" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              onClick={() => navigate('/login')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              className="p-4 rounded-2xl bg-white/5 border border-violet-500/20 backdrop-blur-md cursor-pointer hover:border-violet-500/50 transition-all"
            >
              <item.icon className="w-8 h-8 text-violet-400 mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating AI Chat */}
      <motion.div 
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-600 text-white font-semibold shadow-2xl text-sm md:text-base hover:shadow-fuchsia-500/50 transition-all">
          <Sparkles className="w-5 h-5 animate-pulse" />
          AI Help
        </button>
      </motion.div>
    </main>
  );
}
