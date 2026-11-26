import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, initializing } = useAuth();

if (initializing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-sm text-gray-400">Checking session...</span>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
