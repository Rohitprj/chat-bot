import { axiosInstance } from "@/utils/axiosInstance";

export const trackClickServices = {
  trackClick: async (data) => {
    const res = await axiosInstance.post("/api/v1/clicks/add-click", data);
    return res.data;
  },
};
