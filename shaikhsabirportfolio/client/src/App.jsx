import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingResume from "./pages/LandingResume";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingResume />} />
        <Route path="/resume" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route(s) */}
        <Route path="/admin" element={ <ProtectedRoute requireAdmin={true}> <AdminDashboard /> </ProtectedRoute> }/>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;