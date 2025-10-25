import { axiosInstance } from "@/utils/axiosInstance";

export const authServices = {
  register: async (data) => {
    const res = await axiosInstance.post("/api/v1/user/register", data);
    return res.data;
  },
  verify: async (token) => {
    const res = await axiosInstance.get(`/api/v1/user/verify/${token}`);
    return res.data;
  },
  login: async (data) => {
    const res = await axiosInstance.post("/api/v1/user/login", data);
    return res.data;
  },
};
