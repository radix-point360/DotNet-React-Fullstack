import { jwtDecode } from "jwt-decode";
import { tokenStore } from "../services/api";

const MS_ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const MS_NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

export function decodeAccessToken(token = tokenStore.getAccessToken()) {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(decoded) {
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 <= Date.now();
}

export function getUserRoles(decoded = decodeAccessToken()) {
  if (!decoded) return [];

  const rawRole = decoded.role ?? decoded[MS_ROLE_CLAIM] ?? [];
  return Array.isArray(rawRole) ? rawRole : [rawRole];
}

export function isAdmin() {
  const decoded = decodeAccessToken();
  if (!decoded || isTokenExpired(decoded)) return false;

  const roles = getUserRoles(decoded);
  return roles.some((r) => String(r).toLowerCase() === "admin");
}

export function getUserName() {
  const decoded = decodeAccessToken();
  if (!decoded || isTokenExpired(decoded)) return null;

  return decoded.name || decoded[MS_NAME_CLAIM] || decoded.email || null;
}