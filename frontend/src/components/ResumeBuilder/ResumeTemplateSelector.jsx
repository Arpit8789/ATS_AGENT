import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const templates = [
  { 
    id: "template1", 
    label: "Classic Professional", 
    desc: "Clean and traditional",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    id: "template2", 
    label: "Modern Creative", 
    desc: "Bold and contemporary",
    color: "from-violet-500 to-fuchsia-500"
  },
  { 
    id: "template3", 
    label: "Minimalist Elite", 
    desc: "Simple and elegant",
    color: "from-indigo-500 to-purple-500"
  }
];

export default function ResumeTemplateSelector({ selected, setSelected }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected(template.id)}
          className={`relative cursor-pointer rounded-2xl p-6 transition-all ${
            selected === template.id
              ? 'border-2 border-violet-500 bg-white/10'
              : 'border-2 border-violet-500/20 bg-white/5 hover:border-violet-500/50'
          }`}
        >
          {/* Template Preview */}
          <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center overflow-hidden relative`}>
            {/* Mock Document */}
            <div className="bg-white/90 w-36 h-40 rounded-lg shadow-xl p-3 space-y-2">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-1 mt-3">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>

            {/* Selected Badge */}
            {selected === template.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 bg-green-500 rounded-full p-1"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>

          {/* Template Info */}
          <h3 className="text-white font-bold text-lg mb-1">{template.label}</h3>
          <p className="text-gray-400 text-sm">{template.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
