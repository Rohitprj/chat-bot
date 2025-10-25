"use client";

import { useState, useEffect } from "react";
import { FiMic } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Back from "@/components/Back";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Chatagain");
  const c = useTranslations("Chat");
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([
      { sender: "user", text: t("user") },
      { sender: "bot", text: t("bot") },
    ]);
  }, [t]);

  const handleSend = (e) => {
    e.preventDefault();
    router.push("/register");
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-[425px] h-full bg-[#FF88A51A] flex flex-col justify-between py-6">
        {/* Back */}
        <Back />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-2 mt-11 px-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] py-2 px-4 mb-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-white/70 text-gray-800 shadow"
                    : "bg-transparent text-black"
                } whitespace-pre-line`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="absolute bottom-18 z-10 w-full px-4">
          <form onSubmit={handleSend} className=" flex items-center w-full ">
            <input
              type="text"
              placeholder={c("chat3")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-full bg-gray-50 h-14 px-3 py-3 pr-20 text-base border border-[#FF88A5] focus:outline-none"
            />
            <div className="absolute right-0 flex items-center gap-4 pr-6 py-2 sm:py-4 h-full">
              <div>
                <FiMic size={24} className="text-black cursor-pointer" />
              </div>
              <div>
                <button
                  type="submit"
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
        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          <Footer />
        </div>
      </div>
    </main>
  );
}
