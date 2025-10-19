import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[150px]">
      <svg className="animate-spin h-9 w-9 text-green-500" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
        />
      </svg>
    </div>
  );
}
