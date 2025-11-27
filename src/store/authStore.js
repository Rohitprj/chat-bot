import { authServices } from "@/services/authServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set,get) => ({
      user: null,
      token: null,
      isLoggedIn: () => !!get().token,  
      loading: false,
      error: null,
      success: null,
      register: async (data) => {
        try {
          set({ loading: true });
          const res = await authServices.register(data);
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
          // console.log("Zustand Verify", res);
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
          set({ loading: true, error: null, success: null });
          const res = await authServices.login(data);
          localStorage.setItem("token", res.token);

          set({
            user: res.user,
            token: res.token,
            loading: false,
            success: res.success,
          });
          return { ok: res.success, message: res.message || "Login successful" };

        } catch (error) {
          const errMsg = error.response?.data?.message || "Login failed";
          set({ error: errMsg, loading: false });
          return { ok: false, message: errMsg };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
