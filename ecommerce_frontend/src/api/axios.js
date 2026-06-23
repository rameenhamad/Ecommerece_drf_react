import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const BACKEND_URL =
  import.meta.env.production.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// IMAGE HELPER
export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path}`;
}

// ATTACH TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// REFRESH LOGIC
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        error.config._retry = true;

        try {
          const res = await axios.post(`${API_BASE}/user/refresh/`, {
            refresh,
          });

          localStorage.setItem("access_token", res.data.access);

          error.config.headers.Authorization = `Bearer ${res.data.access}`;

          return axios(error.config);
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
