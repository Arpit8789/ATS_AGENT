import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Briefcase, MapPin, Building2, DollarSign } from "lucide-react";
import api from "../../services/api";

export default function JobManagement() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobDescription: "",
    applyUrl: "",
    contactEmail: "",
    contactPhone: "",
    tags: "",
    jobType: "Full-time",
    experienceLevel: "Entry",
    salary: { min: "", max: "", currency: "INR" }
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/admin/jobs');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleChange = (key, value) => {
    if (key.startsWith('salary.')) {
      const salaryKey = key.split('.')[1];
      setForm(f => ({
        ...f,
        salary: { ...f.salary, [salaryKey]: value }
      }));
    } else {
      setForm(f => ({ ...f, [key]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const jobData = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        salary: {
          min: parseInt(form.salary.min) || 0,
          max: parseInt(form.salary.max) || 0,
          currency: form.salary.currency
        }
      };

      await api.post('/jobs/create', jobData);
      
      setShowForm(false);
      setForm({
        title: "",
        company: "",
        location: "",
        jobDescription: "",
        applyUrl: "",
        contactEmail: "",
        contactPhone: "",
        tags: "",
        jobType: "Full-time",
        experienceLevel: "Entry",
        salary: { min: "", max: "", currency: "INR" }
      });
      
      fetchJobs();
    } catch (error) {
      console.error('Failed to create job:', error);
      alert(error.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        fetchJobs();
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
              Job Management
            </h1>
            <p className="text-gray-400">Post and manage job listings</p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
            style={{ boxShadow: '0 0 25px rgba(109, 40, 217, 0.5)' }}
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {/* Job Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Post New Job</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Job Title *"
                  required
                  value={form.title}
                  onChange={e => handleChange("title", e.target.value)}
                />
                
                <input
                  type="text"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Company *"
                  required
                  value={form.company}
                  onChange={e => handleChange("company", e.target.value)}
                />

                <input
                  type="text"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Location"
                  value={form.location}
                  onChange={e => handleChange("location", e.target.value)}
                />

                <select
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  value={form.jobType}
                  onChange={e => handleChange("jobType", e.target.value)}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>

                <select
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  value={form.experienceLevel}
                  onChange={e => handleChange("experienceLevel", e.target.value)}
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior Level</option>
                  <option value="Lead">Lead</option>
                </select>

                <input
                  type="text"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={e => handleChange("tags", e.target.value)}
                />
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Min Salary"
                  value={form.salary.min}
                  onChange={e => handleChange("salary.min", e.target.value)}
                />
                
                <input
                  type="number"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Max Salary"
                  value={form.salary.max}
                  onChange={e => handleChange("salary.max", e.target.value)}
                />

                <select
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  value={form.salary.currency}
                  onChange={e => handleChange("salary.currency", e.target.value)}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <textarea
                className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition min-h-[120px]"
                placeholder="Job Description *"
                required
                value={form.jobDescription}
                onChange={e => handleChange("jobDescription", e.target.value)}
              />

              <input
                type="url"
                className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                placeholder="Application URL"
                value={form.applyUrl}
                onChange={e => handleChange("applyUrl", e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Contact Email"
                  value={form.contactEmail}
                  onChange={e => handleChange("contactEmail", e.target.value)}
                />

                <input
                  type="tel"
                  className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Contact Phone"
                  value={form.contactPhone}
                  onChange={e => handleChange("contactPhone", e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-white/10 border border-violet-500/30 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Building2 className="w-4 h-4 text-violet-400" />
                  {job.company}
                </div>
                
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
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                  {job.jobType}
                </span>
                <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">
                  {job.experienceLevel}
                </span>
              </div>

              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {job.jobDescription}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {job.applicants?.length || 0} applicants
                </span>
                <span className="text-gray-400">
                  {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && !showForm && (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">No jobs posted yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
