import React, { useState } from "react";
import Button from "../UI/Button";
import CopyToClipboardBtn from "./CopyToClipboardBtn";

// Example email generation logic, connect to backend or use props from parent/job details
export default function EmailTemplateGen({ user, job }) {
  const [email, setEmail] = useState("");

  const generateEmail = () => {
    // Replace with backend-powered template generation and pass user/job from props/context
    const text =
      `Subject: Application for ${job.title} at ${job.company}\n` +
      `\nHi ${job.contactEmail ? '' : 'Hiring Team'},\n\n` +
      `I am eager to apply for the position of ${job.title} at ${job.company}. ` +
      `My background in ${user.skills.join(', ')} and experience aligns well.\n` +
      `Please find my resume attached.\n\nThank you,\n${user.name}\n${user.email} | ${user.phone}`;
    setEmail(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mt-6">
      <h4 className="text-lg font-bold text-blue-600">Generate Cold Email</h4>
      <Button onClick={generateEmail}>Generate Email</Button>
      {email && (
        <>
          <textarea
            className="mt-3 w-full border p-2 text-sm rounded"
            rows={6}
            value={email}
            readOnly
          />
          <CopyToClipboardBtn text={email} />
        </>
      )}
    </div>
  );
}
