import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-6xl font-extrabold text-blue-700 mb-3">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
