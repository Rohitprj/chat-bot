import { profileService } from "@/services/profileService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProfileStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            success: null,
            initialized: false,

            profileResponse: async () => {
                try {
                    set({ loading: true, error: null });
                    const res = await profileService.profileData();
                    set({
                        loading: false,
                        success: res?.success,
                        user: res?.user || null,
                        initialized: true,
                    });
                } catch (error) {
                    set({
                        error: error?.response?.data || "Failed to fetch profileData",
                        loading: false,
                        initialized: true,
                    });
                }
            },
        }),
        {
            name: "profile-store",
        }
    )
);
