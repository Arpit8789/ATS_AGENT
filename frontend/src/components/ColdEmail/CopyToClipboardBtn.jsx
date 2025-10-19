import React, { useState } from "react";

export default function CopyToClipboardBtn({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-green-500 text-white px-4 py-2 rounded mt-2 font-bold shadow transition hover:bg-green-600"
    >
      {copied ? "Copied!" : "Copy to Clipboard"}
    </button>
  );
}
