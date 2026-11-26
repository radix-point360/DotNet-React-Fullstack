import { useEffect, useState } from "react";
import api from "../services/api";

export default function ApiStatusBadge() {
  const [healthy, setHealthy] = useState(false);
  const [time, setTime] = useState(45);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
    }, []);

  useEffect(() => {
    api
      .get("/health/db")
      .then(() => setHealthy(true))
      .catch(() => setHealthy(false));
  }, []);

  if (healthy === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span
        className={`h-2 w-2 rounded-full ${
          healthy ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {healthy ? "" : "Waking up the backend server. Hang tight until the dot turns green! (" + time + ")" }
    </span>
  );    
}