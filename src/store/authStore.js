import { authServices } from "@/services/authServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      success: null,
      register: async (data) => {
        try {
          set({ loading: true });
          const res = await authServices.register(data);
          console.log("Zustand Response", res);
          set({ loading: false, success: res.success });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Registration Failed",
            loading: false,
          });
        }
      },
      verify: async (token) => {
        try {
          set({ loading: true });
          const res = await authServices.verify(token);
          console.log("Zustand Verify", res);
          set({ loading: false, success: res.success });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Email verification Failed",
            loading: false,
          });
        }
      },
      login: async (data) => {
        try {
          set({ loading: true });
          const res = await authServices.login(data);
          console.log("Zustand Login", res);
          localStorage.setItem("token", res.token);
          set({
            user: res.user,
            token: res.token,
            loading: false,
            success: res.success,
          });
        } catch (error) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
