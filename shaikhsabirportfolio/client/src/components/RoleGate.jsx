import { useAuth } from "../context/AuthContext";

export default function RoleGate({ allowedRoles = [], children, fallback = null }) {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) return fallback;

  const hasPermission = allowedRoles.some((role) => roles.includes(String(role).toLowerCase()));

  return hasPermission ? children : fallback;
}