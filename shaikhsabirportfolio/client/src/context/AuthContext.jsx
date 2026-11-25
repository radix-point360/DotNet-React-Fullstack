import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api, { tokenStore } from "../services/api";

const AuthContext = createContext(null);

const MS_ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const MS_NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

function parseToken(token) {
  if (!token) return { isAuthenticated: false, user: null, roles: [], isAdmin: false };
  try {
    const decoded = jwtDecode(token);
    const rawRole = decoded.role ?? decoded[MS_ROLE_CLAIM] ?? [];
    const roles = (Array.isArray(rawRole) ? rawRole : [rawRole]).map((r) => String(r).toLowerCase());
    
    return {
      isAuthenticated: true,
      user: decoded.name || decoded[MS_NAME_CLAIM] || decoded.email || null,
      roles,
      isAdmin: roles.includes("admin"),
    };
  } catch {
    return { isAuthenticated: false, user: null, roles: [], isAdmin: false };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => parseToken(null));
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {tokenStore.subscribe((newToken) => setAuth(parseToken(newToken)));

    // Restore session silently on page reload using the HttpOnly refresh cookie
    api
      .post("/account/refresh")
      .then(({ data }) => {
        tokenStore.setAccessToken(data.accessToken);
      })
      .catch(() => {
        tokenStore.clear();
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  const login = useCallback((accessToken) => {
    tokenStore.setAccessToken(accessToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/account/revoke");
    } finally {
      tokenStore.clear();
    }
  }, []);

  // Wait for initial cookie check before rendering ProtectedRoute so it doesn't flash /login
  if (initializing) return null;

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>.");
  return ctx;
}