import { chatServices } from "@/services/chatServices";
import { create } from "zustand";

export const useChatStore = create((set) => ({
  loading: false,
  error: null,
  chat: null,
  remainingFreeChats: null,
  numberOfQuestions: null,

  chats: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await chatServices.chatQuery({ question: data.content });

      // console.log("Zustand chat res", res);
      localStorage.setItem("guestId", res.guestId);

      const answer = res?.currentAnswer?.answer || "No response found.";
      const remaining = res?.remainingFreeChats ?? null;

      set({
        loading: false,
        chat: answer,
        remainingFreeChats: remaining,
      });

      return answer;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred.";

      // If 5 chat limit reached
      if (error.response?.status === 403) {
        set({
          loading: false,
          error: "Free chat limit reached. Please register or login.",
          chat: null,
          remainingFreeChats: 0,
        });
      } else {
        set({
          loading: false,
          error: message,
          chat: null,
        });
      }

      // console.log("Zustand error", JSON.stringify(error, null, 2));
    }
  },

  chatHistory: async () => {
    try {
      set({ loading: true, error: null });
      const res = await chatServices.chatHistory();
      const history = res?.history[0]?.chats || [];
      set({ numberOfQuestions: history.length });
      // console.log("HISTORYMess", JSON.stringify(history, null, 2));
      set({ loading: false });
      return history;
    } catch (error) {
      set({
        loading: false,
        error: "Failed to load chat history",
      });
    }
  },
}));
