import { axiosInstance } from "@/utils/axiosInstance";

export const chatServices = {
  chatQuery: async (data) => {
    const res = await axiosInstance.post("/api/v1/chat/query", data);
    return res.data;
  },
  chatHistory: async () => {
    const res = await axiosInstance.get("/api/v1/chat/history");
    return res.data;
  },
};
