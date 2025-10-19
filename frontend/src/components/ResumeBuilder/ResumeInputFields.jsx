import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, GraduationCap, Code, FolderGit, Award, Star, Plus, X } from "lucide-react";

export default function ResumeInputFields({ fields, setFields }) {
  const handleFieldChange = (field, value) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const handleAddArrayItem = (field, item) => {
    if (!item.trim()) return;
    setFields(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), item.trim()]
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFields(prev => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-violet-400" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
            <input
              type="text"
              className="w-full bg-white/10 border border-violet-500/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="Full Name *"
              required
              value={fields.name}
              onChange={e => handleFieldChange("name", e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
            <input
              type="email"
              className="w-full bg-white/10 border border-violet-500/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="Email *"
              required
              value={fields.email}
              onChange={e => handleFieldChange("email", e.target.value)}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-violet-400" />
            <input
              type="tel"
              className="w-full bg-white/10 border border-violet-500/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              placeholder="Phone *"
              required
              value={fields.phone}
              onChange={e => handleFieldChange("phone", e.target.value)}
            />
          </div>
        </div>

        <textarea
          className="w-full bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition min-h-[100px]"
          placeholder="Professional Summary (Optional)"
          value={fields.summary}
          onChange={e => handleFieldChange("summary", e.target.value)}
        />
      </div>

      {/* Education */}
      <MultiInputField
        icon={GraduationCap}
        label="Education"
        items={fields.education}
        onAdd={item => handleAddArrayItem("education", item)}
        onRemove={idx => handleRemoveArrayItem("education", idx)}
        placeholder="e.g., B.Tech in Computer Science, IIT Delhi (2020-2024)"
      />

      {/* Experience */}
      <MultiInputField
        icon={Briefcase}
        label="Work Experience"
        items={fields.experience}
        onAdd={item => handleAddArrayItem("experience", item)}
        onRemove={idx => handleRemoveArrayItem("experience", idx)}
        placeholder="e.g., Software Engineer at Google (2024-Present)"
      />

      {/* Skills */}
      <MultiInputField
        icon={Code}
        label="Skills"
        items={fields.skills}
        onAdd={item => handleAddArrayItem("skills", item)}
        onRemove={idx => handleRemoveArrayItem("skills", idx)}
        placeholder="e.g., JavaScript, React, Node.js"
        showTags
      />

      {/* Projects */}
      <MultiInputField
        icon={FolderGit}
        label="Projects"
        items={fields.projects}
        onAdd={item => handleAddArrayItem("projects", item)}
        onRemove={idx => handleRemoveArrayItem("projects", idx)}
        placeholder="e.g., E-commerce Platform - Built with MERN stack"
      />

      {/* Certifications */}
      <MultiInputField
        icon={Award}
        label="Certifications"
        items={fields.certifications}
        onAdd={item => handleAddArrayItem("certifications", item)}
        onRemove={idx => handleRemoveArrayItem("certifications", idx)}
        placeholder="e.g., AWS Certified Solutions Architect"
      />

      {/* Achievements */}
      <MultiInputField
        icon={Star}
        label="Achievements"
        items={fields.achievements}
        onAdd={item => handleAddArrayItem("achievements", item)}
        onRemove={idx => handleRemoveArrayItem("achievements", idx)}
        placeholder="e.g., Winner of Smart India Hackathon 2024"
      />
    </div>
  );
}

// Reusable multi-input field component
function MultiInputField({ icon: Icon, label, items, onAdd, onRemove, placeholder, showTags }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Icon className="w-5 h-5 text-violet-400" />
        {label}
      </h3>
      
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 bg-white/10 border border-violet-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-xl text-white font-bold transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {items && items.length > 0 && (
        <div className={showTags ? "flex flex-wrap gap-2" : "space-y-2"}>
          {items.map((item, idx) => (
            showTags ? (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full flex items-center gap-2 text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="hover:text-red-400 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-violet-500/20 rounded-lg p-3 flex items-start justify-between group hover:border-violet-500/40 transition"
              >
                <p className="text-gray-300 text-sm flex-1">{item}</p>
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="text-gray-500 hover:text-red-400 transition ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          ))}
        </div>
      )}
    </motion.div>
  );
}
