import React from "react";

export default function JobFilters({ filters, onChange }) {
  return (
    <div className="flex gap-2 mb-5 flex-wrap items-end">
      <input
        type="text"
        className="border border-blue-200 p-2 rounded"
        placeholder="Role, Company, Keyword"
        value={filters.keywords}
        onChange={e => onChange("keywords", e.target.value)}
      />
      <input
        type="text"
        className="border border-blue-200 p-2 rounded"
        placeholder="Location"
        value={filters.location}
        onChange={e => onChange("location", e.target.value)}
      />
      <input
        type="text"
        className="border border-green-200 p-2 rounded"
        placeholder="Tags (comma separated)"
        value={filters.tags}
        onChange={e => onChange("tags", e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition"
        onClick={() => onChange("clear")}
      >
        Clear
      </button>
    </div>
  );
}
