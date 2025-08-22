// client/src/api.js
import axios from "axios";

// Base URL from .env
const API = import.meta.env.VITE_API_URL; // for Vite
// const API = process.env.REACT_APP_API_URL; // for CRA

const api = axios.create({
  baseURL: API,
  withCredentials: true, // allows cookies if you use auth
});

// Optional: Interceptors for logging / auth headers
api.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
    // Example: Add token if stored
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
