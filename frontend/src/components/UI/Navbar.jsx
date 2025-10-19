import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, User, LogOut, LayoutDashboard, FileText, Briefcase, Settings, ChevronDown, Bell } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Failed to parse user data:", e);
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
    navigate("/");
  };

  const guestLinks = [
    { name: "Features", path: "/#features" },
    { name: "Pricing", path: "/#pricing" }
  ];

  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Build Resume", path: "/resume-builder", icon: FileText },
    { name: "Find Jobs", path: "/job-search", icon: Briefcase }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#0f0f1e]/98 via-[#16213e]/98 to-[#1a1a2e]/98 backdrop-blur-3xl shadow-2xl border-b border-violet-500/20">
        {/* Top glow effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"></div>
        
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Far Left */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
                ATS Agent
              </span>
            </Link>

            {/* Desktop Navigation - Far Right */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoggedIn ? (
                /* Guest Navigation */
                <>
                  {guestLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.path}
                      className="text-gray-300 hover:text-white transition-all font-bold text-base px-5 py-2.5 rounded-xl hover:bg-white/10"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-all font-bold text-base px-5 py-2.5 rounded-xl hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="relative group ml-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-black text-base px-8 py-3.5 rounded-2xl transition-all shadow-2xl">
                      Get Started
                    </div>
                  </Link>
                </>
              ) : (
                /* Logged In Navigation */
                <>
                  {userLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-bold text-base px-4 py-2.5 rounded-xl hover:bg-white/10 group"
                    >
                      <link.icon className="w-5 h-5 group-hover:text-violet-400 transition-colors" />
                      {link.name}
                    </Link>
                  ))}

                  {/* Notifications */}
                  <button className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group">
                    <Bell className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative ml-2">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-3 bg-gradient-to-r from-violet-500/10 to-blue-500/10 hover:from-violet-500/20 hover:to-blue-500/20 border border-violet-500/40 hover:border-violet-500/60 rounded-2xl px-4 py-2.5 transition-all shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-black text-sm leading-tight">{user?.name?.split(' ')[0] || "User"}</p>
                        <p className="text-gray-400 text-xs">View Profile</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-[#0f0f1e]/98 to-[#1a1a2e]/98 backdrop-blur-3xl border border-violet-500/30 rounded-3xl shadow-2xl overflow-hidden"
                          style={{ boxShadow: '0 10px 40px rgba(109, 40, 217, 0.4)' }}
                        >
                          <div className="p-6 border-b border-violet-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-black text-lg">{user?.name}</p>
                                <p className="text-gray-400 text-xs">{user?.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                                <p className="text-white font-bold text-sm">0</p>
                                <p className="text-gray-400 text-xs">Resumes</p>
                              </div>
                              <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                                <p className="text-white font-bold text-sm">0</p>
                                <p className="text-gray-400 text-xs">Jobs</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3">
                            <Link
                              to="/dashboard"
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-gray-300 hover:text-white group"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <LayoutDashboard className="w-5 h-5 group-hover:text-violet-400 transition-colors" />
                              <span className="font-bold">Dashboard</span>
                            </Link>
                            <Link
                              to="/settings"
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-gray-300 hover:text-white group"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <Settings className="w-5 h-5 group-hover:text-violet-400 transition-colors" />
                              <span className="font-bold">Settings</span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-gray-300 hover:text-red-400 group"
                            >
                              <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                              <span className="font-bold">Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
            >
              {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-5 border-t border-violet-500/10 mt-2 pt-4"
              >
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    {guestLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.path}
                        className="px-5 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all font-bold"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                    <Link
                      to="/login"
                      className="px-5 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-blue-500 to-violet-600 text-white font-black px-5 py-3 rounded-xl text-center transition-all shadow-lg mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="px-5 py-4 bg-white/5 rounded-xl mb-2">
                      <p className="text-white font-black text-base">{user?.name}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{user?.email}</p>
                    </div>
                    
                    {userLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all font-bold"
                        onClick={() => setIsOpen(false)}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    ))}
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-all font-bold"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>
      </nav>
    </>
  );
}
