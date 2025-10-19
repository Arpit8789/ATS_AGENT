import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, ExternalLink, Share2, Bookmark } from "lucide-react";
import { getJobById, applyToJob } from "../services/jobs";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const response = await getJobById(jobId);
      setJob(response.job);
    } catch (error) {
      console.error('Failed to fetch job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank');
    } else {
      setApplying(true);
      try {
        await applyToJob(jobId);
        alert('Application submitted successfully!');
      } catch (error) {
        console.error('Failed to apply:', error);
        alert('Failed to submit application');
      } finally {
        setApplying(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Job not found</h2>
          <button
            onClick={() => navigate('/job-search')}
            className="bg-gradient-to-r from-blue-500 to-violet-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232]">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px] z-0"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/job-search')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </motion.button>

          {/* Job Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 md:p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{job.title}</h1>
                <p className="text-xl text-gray-300 font-semibold mb-4">{job.company}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-violet-400" />
                    {job.location || "Remote"}
                  </div>
                  {job.salary && (job.salary.min || job.salary.max) && (
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <DollarSign className="w-5 h-5" />
                      {job.salary.currency} {job.salary.min}-{job.salary.max}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-5 h-5 text-violet-400" />
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase className="w-5 h-5 text-violet-400" />
                    {job.applicants?.length || 0} applicants
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-violet-500/20 transition">
                  <Bookmark className="w-5 h-5 text-violet-400" />
                </button>
                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-violet-500/20 transition">
                  <Share2 className="w-5 h-5 text-violet-400" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold">
                {job.jobType}
              </span>
              <span className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-semibold">
                {job.experienceLevel}
              </span>
              {job.tags?.map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
          </motion.div>

          {/* Apply Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-500/20 to-violet-500/20 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Ready to Apply?</h2>
            <p className="text-gray-300 mb-6">
              Take the next step in your career journey
            </p>
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)' }}
            >
              {applying ? 'Applying...' : 'Apply Now'}
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
