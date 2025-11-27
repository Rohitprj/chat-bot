import {axiosInstance} from "@/utils/axiosInstance";

export const profileService = {
    profileData: async () => {
        const res = await axiosInstance.get(`/api/v1/user/profile`)
        return res?.data;

    }
}