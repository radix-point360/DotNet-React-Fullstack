import axios from "axios";

// Stored strictly in RAM — cleared automatically if tab closes, never accessible via localStorage
let inMemoryAccessToken = null;
let onAuthChangeCallback = null;

export const tokenStore = {
  getAccessToken: () => inMemoryAccessToken,
  setAccessToken: (token) => {
    inMemoryAccessToken = token;
    if (onAuthChangeCallback) onAuthChangeCallback(token);
  },
  clear: () => {
    inMemoryAccessToken = null;
    if (onAuthChangeCallback) onAuthChangeCallback(null);
  },
  subscribe: (cb) => {
    onAuthChangeCallback = cb;
  },
};

const apiBaseUrl = ((import.meta.env && import.meta.env.VITE_API_BASE_URL)).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Sends HttpOnly refresh_token cookie automatically
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, newToken = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(newToken);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = originalRequest?.url?.includes("/account/login") || originalRequest?.url?.includes("/account/refresh");

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Browser sends HttpOnly cookie automatically because withCredentials is true
        const { data } = await axios.post(
          `${apiBaseUrl}/account/refresh`,
          {},
          { withCredentials: true }
        );

        tokenStore.setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStore.clear();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;