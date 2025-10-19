import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0e14] via-[#0f0f1e] to-[#000000] text-white pt-16 pb-8 border-t border-violet-500/20">
      {/* Top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(109,40,217,0.03)_1px,_transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Branding Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-violet-600 to-purple-600 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                ATS Agent
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Build ATS-optimized resumes and land your dream job with AI-powered tools.
            </p>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold">
              <Heart className="w-4 h-4" />
              <span>Made for dream careers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Features", path: "/#features" },
                { name: "Pricing", path: "/#pricing" },
                { name: "Resume Builder", path: "/resume-builder" },
                { name: "Job Search", path: "/job-search" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Github, href: "https://github.com", name: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={social.name}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-white/5 border border-violet-500/20 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/50 transition-all group-hover:scale-110">
                    <social.icon className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="w-full bg-white/5 border border-violet-500/20 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-violet-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} <span className="text-violet-400 font-semibold">ATS Agent</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
