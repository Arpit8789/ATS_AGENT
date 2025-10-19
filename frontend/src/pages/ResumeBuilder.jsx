import React from "react";
import ResumeForm from "../components/ResumeBuilder/ResumeForm";

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e14] via-[#18182c] to-[#1a1232] py-8">
      {/* Circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(45,228,255,0.04)_1px,_rgba(0,0,0,0.85)_1px)] [background-size:20px_20px]" />
      
      <ResumeForm />
    </div>
  );
}
