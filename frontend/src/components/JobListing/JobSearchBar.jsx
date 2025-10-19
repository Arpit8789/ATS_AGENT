import React from "react";

export default function JobSearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex mb-6">
      <input
        type="text"
        className="border border-blue-300 rounded-l p-2 flex-1"
        placeholder="Search jobs by title, company…"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch()}
      />
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white px-5 rounded-r"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}
