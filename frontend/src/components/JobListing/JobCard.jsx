import React from "react";

export default function JobCard({ job, onApply, onShowDetails }) {
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-sm p-4 flex flex-col gap-1">
      <div className="text-blue-800 font-bold text-lg">{job.title}</div>
      <div className="text-blue-600 font-semibold">{job.company}</div>
      <div className="text-green-600 font-medium text-sm">{job.location}</div>
      <div className="text-gray-700 text-sm truncate">{job.jobDescription}</div>
      <div className="flex gap-3 mt-3 justify-end">
        <button
          onClick={() => onShowDetails(job)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
        >
          View Details
        </button>
        <button
          onClick={() => onApply(job)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 font-semibold transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
