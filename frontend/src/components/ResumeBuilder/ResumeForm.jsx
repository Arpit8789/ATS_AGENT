import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Sparkles, Save, ArrowLeft, Edit, CheckCircle } from "lucide-react"; // Added Edit and CheckCircle
import ResumeInputFields from "./ResumeInputFields";
import ResumeTemplateSelector from "./ResumeTemplateSelector";
import { createResume } from "../../services/resume";

export default function ResumeForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: []
  });
  const [template, setTemplate] = useState("template1");
  const [jd, setJD] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const data = { 
        title: `${fields.name}'s Resume`,
        templateId: template, 
        sectionData: fields, 
        jdApplied: jd 
      };
      
      await createResume(data);
      
      // Success - redirect to resume history
      navigate("/resume-history", { 
        state: { message: "Resume created successfully!" } 
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create resume");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-600 bg-clip-text text-transparent mb-2">
              Build Your ATS Resume
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Create professional, ATS-optimized resumes in minutes
            </p>
          </div>
          
          <Sparkles className="hidden md:block w-12 h-12 text-violet-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: step * 0.1 }}
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold transition-all ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              {step}
            </motion.div>
            {step < 3 && (
              <div className={`w-8 md:w-16 h-1 mx-2 rounded transition-all ${
                currentStep > step ? 'bg-gradient-to-r from-blue-500 to-violet-600' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Template Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-violet-400" />
              Choose Your Template
            </h2>
            
            <ResumeTemplateSelector selected={template} setSelected={setTemplate} />
            
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="mt-8 w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-4 rounded-xl transition-all"
              style={{ boxShadow: '0 0 25px rgba(109, 40, 217, 0.5)' }}
            >
              Next: Fill Details →
            </button>
          </motion.div>
        )}

        {/* Step 2: Fill Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Fill Your Details</h2>
            
            <ResumeInputFields fields={fields} setFields={setFields} />
            
            <div className="mt-6">
              <label className="text-white font-semibold mb-2 block">
                Job Description (Optional)
              </label>
              <textarea
                className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition min-h-[120px]"
                placeholder="Paste the job description here to optimize your resume for ATS..."
                value={jd}
                onChange={e => setJD(e.target.value)}
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-white/10 border border-violet-500/30 text-white font-bold py-4 rounded-xl hover:bg-white/20 transition-all"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold py-4 rounded-xl transition-all"
                style={{ boxShadow: '0 0 25px rgba(109, 40, 217, 0.5)' }}
              >
                Next: Review →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review & Save */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Review Your Resume</h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Summary Preview */}
            <div className="bg-white/5 border border-violet-500/10 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">{fields.name || "Your Name"}</h3>
              <p className="text-gray-300 mb-2">{fields.email} • {fields.phone}</p>
              
              {fields.education.length > 0 && (
                <div className="mt-4">
                  <p className="text-violet-400 font-semibold mb-2">Education</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {fields.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {fields.skills.length > 0 && (
                <div className="mt-4">
                  <p className="text-violet-400 font-semibold mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {fields.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex-1 bg-white/10 border border-violet-500/30 text-white font-bold py-4 rounded-xl hover:bg-white/20 transition-all"
              >
                ← Edit
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Resume
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
