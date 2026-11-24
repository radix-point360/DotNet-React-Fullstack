import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Attaches hidden metadata (location, obtained from useLocation()) to the navigation event without cluttering the URL with query parameters like ?redirect=/dashboard
    return <Navigate to="/" state={{ from: location }} replace />; 
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
