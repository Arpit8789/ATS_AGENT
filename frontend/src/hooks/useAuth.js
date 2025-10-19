import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// Usage: const { isAuthenticated, setIsAuthenticated } = useAuth();
export default function useAuth() {
  return useContext(AuthContext);
}
