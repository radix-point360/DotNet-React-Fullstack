import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { tokenStorage } from "../services/api";
import { decodeAccessToken, getUserRoles, getUserName } from "../utils/auth";

const AuthContext = createContext(null);

function buildAuthState() {
  const token = tokenStorage.getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();
  const decoded = decodeAccessToken();

  if (!token || !decoded) {
    return { isAuthenticated: false, user: null, roles: [], isAdmin: false };
  }

  const isExpired = decoded.exp && decoded.exp * 1000 <= Date.now();
  if (isExpired && !refreshToken) {
    tokenStorage.clear();
    return { isAuthenticated: false, user: null, roles: [], isAdmin: false };
  }

  const roles = getUserRoles(decoded).map((r) => String(r).toLowerCase());
  return {
    isAuthenticated: true,
    user: getUserName(),
    roles,
    isAdmin: roles.includes("admin"),
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => buildAuthState());

  //All three functions are wrapped in useCallback with [] dependencies so their references never change. 
 //This prevents child components that consume useAuth() from re-rendering unnecessarily, 
//and allows syncAuth to be safely used inside useEffect.
  const syncAuth = useCallback(() => {
    setAuth(buildAuthState());
  }, []);

  const login = useCallback((accessToken, refreshToken) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    setAuth(buildAuthState());
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setAuth({ isAuthenticated: false, user: null, roles: [], isAdmin: false });
  }, []);

  // Keep multiple browser tabs in sync when localStorage changes
  //The browser's "storage" event fires automatically in other open tabs whenever localStorage changes. 
  //If a user logs out in Tab A, Tab B detects the change via syncAuth and immediately updates its UI to logged-out too. 
  // The return () => ... cleans up the listener if AuthProvider unmounts.
  useEffect(() => {
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [syncAuth]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>.");
  }
  return context;
}