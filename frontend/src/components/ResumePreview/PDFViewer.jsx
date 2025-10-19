import React from "react";

export default function PDFViewer({ fileUrl }) {
  return (
    <div className="w-full h-[500px] bg-gray-100 rounded overflow-hidden border-2 border-blue-300">
      {fileUrl ? (
        <iframe
          src={fileUrl}
          title="Resume PDF"
          className="w-full h-full"
          frameBorder="0"
        />
      ) : (
        <div className="text-center text-blue-600 font-semibold pt-24 pb-24">
          No PDF available. Preview will be shown here.
        </div>
      )}
    </div>
  );
}
