"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FiMic } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Back from "@/components/Back";
import { useTranslations } from "next-intl";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "@/store/chatStore";
import { LoadingDots } from "@/components/LoadingDots";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [nextLinkThreshold, setNextLinkThreshold] = useState(
    Math.floor(Math.random() * 6) + 5 // Random number between 5 and 10
  );

  const { chats, chatHistory, error, remainingFreeChats } = useChatStore();

  useEffect(() => {
    if (remainingFreeChats === 0) {
      console.log("Remaining Chats = ", remainingFreeChats);
      router.push("/register");
    }
  }, [remainingFreeChats]);

  const messageListRef = useRef(null);
  const textareaRef = useRef(null);
  const t = useTranslations("Chat");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await chatHistory();
        console.log(
          "Initial Chat history:::",
          JSON.stringify(history, null, 2)
        );

        if (history && history.length > 0) {
          const formattedMessages = history.flatMap((chat) => [
            { role: "user", content: chat.question },
            { role: "bot", content: chat.answer },
          ]);
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, [chatHistory]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || loading) return;

    const userMessage = { role: "user", content: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setChatCount((prev) => prev + 1); // increment chat count
    setLoading(true);
    try {
      const response = await chats(userMessage);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
      // Check if it's time to show the meeting link
      if (chatCount + 1 === nextLinkThreshold) {
        const randomLinkMessage = {
          role: "bot",
          content:
            "You can also join a live chat here: https://meet.vinitarashinkar.in/",
        };

        // Delay showing link to feel natural
        setTimeout(() => {
          setMessages((prev) => [...prev, randomLinkMessage]);
        }, 1000);

        // Reset threshold for next link trigger
        setChatCount(0);
        setNextLinkThreshold(Math.floor(Math.random() * 6) + 5); // new random between 5-10
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[426px] h-full bg-gradient-to-b from-[#FF88A51A] to-[#FFF6F2] overflow-hidden shadow-md max-w-full sm:rounded-none rounded-lg">
        {/* Back Button */}
        <Back />
        {messages.length === 0 && (
          <>
            {/* Background Image */}
            <div className="absolute bottom-60 inset-0 sm:w-[90%] mx-auto sm:bottom-72">
              <Image
                src="/bg.svg"
                fill
                priority
                alt="cosmicImage"
                className="object-contain px-5 sm:px-0 "
                style={{ filter: "hue-rotate(180deg)", opacity: 0.2 }}
              />
            </div>

            {/* Text Content (static bottom info) */}
            {messages.length === 0 && (
              <div className="absolute bottom-36 z-10 w-full flex flex-col items-center px-4 text-center text-[#3e3e42]">
                <p className="text-base">{t("chat")}</p>
                <p className="text-base leading-relaxed">
                  {t("chat1")}
                  <br /> {t("chat2")}
                  <br />
                  {t("chat3")}
                </p>
                <p className="mt-6 text-lg font-semibold">{t("chat4")}</p>
              </div>
            )}
          </>
        )}
        {/* Chat Message List */}
        <div
          ref={messageListRef}
          className="absolute top-14 bottom-38 overflow-y-auto w-full px-2 space-y-3"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg  ${
                  msg.role === "user"
                    ? " text-gray-400 bg-white p-4 w-auto"
                    : "w-full text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <LoadingDots />
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="absolute bottom-18 z-10 w-full px-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t("chat4")}
              onKeyDown={handleKeyDown}
              ref={textareaRef}
              className="flex-1 rounded-full bg-gray-50 h-14 px-3 py-3 pr-20 text-base border border-[#FF88A5] focus:outline-none w-full"
            />
            <div className="absolute right-0 top-0 flex items-center gap-4 pr-2 py-2 sm:py-4 h-full">
              <div>
                <FiMic size={24} className="text-black cursor-pointer" />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading || !newMessage.trim()}
                  className="bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                >
                  <IoSend
                    size={20}
                    className="text-white cursor-pointer ml-1"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Footer */}
        <div className="absolute bottom-0 z-20 mx-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
