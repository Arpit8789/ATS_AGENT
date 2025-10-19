import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, DollarSign, Clock, ExternalLink, Bookmark, Filter, X, TrendingUp } from "lucide-react";
import { getAllJobs, searchJobs } from "../services/jobs";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experienceLevel: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.jobs || []);
      setFilteredJobs(response.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      location: "",
      jobType: "",
      experienceLevel: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232]">
      {/* Circuit pattern overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px] z-0"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              {filteredJobs.length} opportunities waiting for you
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title, company, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-xl border border-violet-500/30 rounded-2xl pl-12 pr-32 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm md:text-base"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold px-4 py-2 rounded-xl transition-all text-sm"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Location"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                    <select
                      value={filters.jobType}
                      onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                      className="bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition text-sm"
                    >
                      <option value="">All Job Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                    <select
                      value={filters.experienceLevel}
                      onChange={(e) => setFilters({...filters, experienceLevel: e.target.value})}
                      className="bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition text-sm"
                    >
                      <option value="">All Levels</option>
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                      <option value="Lead">Lead</option>
                    </select>
                    <button
                      onClick={clearFilters}
                      className="bg-white/10 border border-violet-500/30 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Briefcase className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-white text-xl font-bold mb-2">No jobs found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredJobs.map((job, idx) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 md:p-6 hover:border-violet-500/50 transition-all group cursor-pointer"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-violet-400 transition">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-semibold">{job.company}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add bookmark logic
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Bookmark className="w-4 h-4 text-violet-400" />
                    </button>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      {job.location || "Remote"}
                    </div>
                    {job.salary && (job.salary.min || job.salary.max) && (
                      <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {job.salary.currency} {job.salary.min}-{job.salary.max}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Clock className="w-4 h-4" />
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {job.jobDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      {job.jobType}
                    </span>
                    <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">
                      {job.experienceLevel}
                    </span>
                    {job.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Apply Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/jobs/${job._id}`);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
