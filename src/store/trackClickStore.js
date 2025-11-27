import { trackClickServices } from "@/services/trackClickServices";
import { create } from "zustand";

export const usetrackClickStore = create((set) => ({
  loading: false,
  error: null,
  success: null,
  track: async (data) => {
    try {
      set({ loading: true });
      const res = await trackClickServices.trackClick(data);

      console.log("add-click", res);

      set({ loading: false, success: res.success });
      return res;
    } catch (error) {
      set({
        error: error.response?.data?.message,
        loading: false,
      });
    }
  },
}));
