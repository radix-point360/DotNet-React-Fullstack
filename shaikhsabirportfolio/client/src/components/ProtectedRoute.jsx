import { Navigate, useLocation } from "react-router-dom";
import { tokenStorage } from "../services/api";
import { decodeAccessToken, getUserRoles, isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();
  const token = tokenStorage.getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();
  const decoded = decodeAccessToken();

  if (!token || !decoded) {
    tokenStorage.clear();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If access token is expired AND there is no refresh token, force login
  if (isTokenExpired(decoded) && !refreshToken) {
    tokenStorage.clear();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin) {
    const roles = getUserRoles(decoded);
    const hasAdminRole = roles.some((r) => String(r).toLowerCase() === "admin");
    if (!hasAdminRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}