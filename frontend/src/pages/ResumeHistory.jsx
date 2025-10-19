import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Trash2, Plus, BarChart3, Calendar, ArrowLeft } from "lucide-react";
import { getUserResumes, deleteResume } from "../services/resume";
import PreviewModal from "../components/ResumePreview/PreviewModal";

export default function ResumeHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    fetchResumes();
  }, [location]);

  const fetchResumes = async () => {
    try {
      const data = await getUserResumes();
      setResumes(data.resumes || []);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(id);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (err) {
        console.error("Failed to delete resume:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] py-8">
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
                My Resumes
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Manage and download your professional resumes
              </p>
            </div>

            <button
              onClick={() => navigate('/resume-builder')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
              style={{ boxShadow: '0 0 25px rgba(109, 40, 217, 0.5)' }}
            >
              <Plus className="w-5 h-5" />
              Create New Resume
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-12 text-center"
          >
            <FileText className="w-24 h-24 text-violet-400 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-3">No Resumes Yet</h2>
            <p className="text-gray-400 mb-6">
              Start building your professional ATS-optimized resume now!
            </p>
            <button
              onClick={() => navigate('/resume-builder')}
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2"
              style={{ boxShadow: '0 0 25px rgba(109, 40, 217, 0.5)' }}
            >
              <Plus className="w-5 h-5" />
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, idx) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/50 transition-all group"
              >
                {/* Resume Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  
                  {resume.atsScore && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">{resume.atsScore.score}%</p>
                      <p className="text-xs text-gray-400">ATS Score</p>
                    </div>
                  )}
                </div>

                {/* Resume Title */}
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {resume.title || "Untitled Resume"}
                </h3>

                {/* Resume Meta */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                </div>

                {/* ATS Insights */}
                {resume.atsScore?.strengths && resume.atsScore.strengths.length > 0 && (
                  <div className="bg-white/5 border border-green-500/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-green-400" />
                      <p className="text-xs font-semibold text-green-400">Strengths</p>
                    </div>
                    <ul className="space-y-1">
                      {resume.atsScore.strengths.slice(0, 2).map((strength, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-1">
                          <span className="text-green-400">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setPreviewUrl(resume.fileUrl);
                      setShowPreview(true);
                    }}
                    className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-violet-500/20 hover:border-violet-500/50 rounded-lg p-3 transition-all group"
                  >
                    <Eye className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                    <span className="text-xs text-gray-400">Preview</span>
                  </button>

                  <button
                    onClick={() => window.open(resume.fileUrl, '_blank')}
                    className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-violet-500/20 hover:border-green-500/50 rounded-lg p-3 transition-all group"
                  >
                    <Download className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                    <span className="text-xs text-gray-400">Download</span>
                  </button>

                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-violet-500/20 hover:border-red-500/50 rounded-lg p-3 transition-all group"
                  >
                    <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                    <span className="text-xs text-gray-400">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        open={showPreview} 
        onClose={() => setShowPreview(false)} 
        fileUrl={previewUrl} 
      />
    </div>
  );
}
