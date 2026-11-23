import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api, { tokenStorage } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
          
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      debugger;
      const response = await api.post(`${API_BASE_URL}/account/login`, {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      if (!accessToken) {
        throw new Error("No access token received from server.");
      }

      tokenStorage.setTokens(accessToken, refreshToken);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border rounded-lg p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Sign In</h1>

        {error && (
          <div className="p-3 text-sm rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Email / Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full text-gray-950 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full text-gray-950 border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      <Link to="/" className="text-blue-600 hover:underline"> Back to Resume </Link>
      </form>
    </div>
  );
}