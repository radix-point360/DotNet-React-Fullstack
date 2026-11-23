import axios from "axios";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

};

const apiBaseUrl = (import.meta.env && import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       tokenStorage.clear();
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Queue concurrent 401 requests while a single refresh call is in progress
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, newAccessToken = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(newAccessToken);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic if the failed request was login or refresh itself
    const isAuthRoute =
      originalRequest?.url?.includes("/account/login") ||
      originalRequest?.url?.includes("/account/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) 
    {
      const accessToken = tokenStorage.getAccessToken();
      const refreshToken = tokenStorage.getRefreshToken();

      if (!accessToken || !refreshToken) {
        tokenStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

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
        // Use plain axios (not `api`) so this call doesn't re-trigger interceptors
        const { data } = await axios.post(`${apiBaseUrl}/account/refresh`, {
          accessToken,
          refreshToken,
        });

        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clear();
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;