import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userData) {
    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
