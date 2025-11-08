// import { BASE_URL } from "@/constants/baseUrl";
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// utils/axiosInstance.js
import { BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const guestId =
      typeof window !== "undefined" ? localStorage.getItem("guestId") : null;
    if (guestId) {
      config.headers["x-guest-id"] = guestId;
    }
  }
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // 🔹 Save guestId from backend (first-time guest session)
    const guestId = response.headers["x-guest-id"];
    // console.log("GUEST_ID=", guestId);
    if (guestId && typeof window !== "undefined") {
      localStorage.setItem("guestId", guestId);
    }
    return response;
  },
  (error) => {
    // 🔹 Handle guest limit message globally
    if (error.response?.status === 403) {
      console.warn("Guest limit reached:", error.response.data.message);
      // Optional: You could trigger a global toast or redirect to login
    }
    return Promise.reject(error);
  }
);
