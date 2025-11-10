// "use client";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import { FiMic } from "react-icons/fi";
// import { useEffect, useRef, useState } from "react";
// import { useTranslations } from "next-intl";
// import { IoSend } from "react-icons/io5";
// import { useChatStore } from "@/store/chatStore";
// import { LoadingDots } from "@/components/LoadingDots";
// import { useRouter } from "next/navigation";
// import BottomNavBar from "@/components/BottomNavBar";

// export default function ChatPage() {
//   const router = useRouter();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chatCount, setChatCount] = useState(0);
//   const [nextLinkThreshold, setNextLinkThreshold] = useState(
//     Math.floor(Math.random() * 6) + 5
//   );

//   const { chats, chatHistory, error, remainingFreeChats } = useChatStore();

//   useEffect(() => {
//     if (remainingFreeChats === 0) {
//       console.log("Remaining Chats = ", remainingFreeChats);
//       router.push("/register");
//     }
//   }, [remainingFreeChats, router]);

//   const messageListRef = useRef(null);
//   const textareaRef = useRef(null);
//   const t = useTranslations("Chat");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await chatHistory();
//         // console.log(
//         //     "Initial Chat history:::",
//         //     JSON.stringify(history, null, 2)
//         // );

//         if (history && history.length > 0) {
//           const formattedMessages = history.flatMap((chat) => [
//             { role: "user", content: chat.question },
//             { role: "bot", content: chat.answer },
//           ]);
//           setMessages(formattedMessages);
//         }
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     fetchHistory();
//   }, [chatHistory]);

//   useEffect(() => {
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || loading) return;

//     const userMessage = { role: "user", content: newMessage };
//     setMessages((prev) => [...prev, userMessage]);
//     setNewMessage("");
//     setChatCount((prev) => prev + 1);
//     setLoading(true);
//     try {
//       const response = await chats(userMessage);
//       setMessages((prev) => [...prev, { role: "bot", content: response }]);
//       if (chatCount + 1 === nextLinkThreshold) {
//         const randomLinkMessage = {
//           role: "bot",
//           content:
//             "You can also join a live chat here: https://meet.vinitarashinkar.in/",
//         };

//         setTimeout(() => {
//           setMessages((prev) => [...prev, randomLinkMessage]);
//         }, 1000);

//         setChatCount(0);
//         setNextLinkThreshold(Math.floor(Math.random() * 6) + 5); // new random between 5-10
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           role: "bot",
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSendMessage();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // const [editingIndex, setEditingIndex] = useState(null);
//   // const [editedMessage, setEditedMessage] = useState("");

//   return (
//     <div className="min-h-screen bg-white flex justify-center items-center">
//       <div className="relative w-[426px] h-screen bg-gradient-to-b from-[#FF88A51A] to-[#FFF6F2]">
//         <div className="mt-2 sm:mt-3 relative justify-between z-20">
//           <Footer />
//         </div>

//         {messages.length === 0 && (
//           <>
//             <div className="absolute bottom-60 lg:bottom-54 inset-0 sm:w-[70%] lg:w-[66%] mx-auto sm:bottom-68">
//               <Image
//                 src="/bg.svg"
//                 fill
//                 priority
//                 alt="cosmicImage"
//                 className="object-contain px-10 sm:px-0 "
//                 style={{ filter: "hue-rotate(180deg)", opacity: 0.2 }}
//               />
//             </div>

//             {messages.length === 0 && (
//               <div className="absolute bottom-[25%] sm:bottom-[26%]  z-10 w-full flex flex-col items-center px-4 text-center text-[#3e3e42]">
//                 <p className="text-base">{t("chat")}</p>
//                 <p className="text-base leading-relaxed">
//                   {t("chat1")}
//                   <br /> {t("chat2")}
//                   <br />
//                   {t("chat3")}
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//         {/* Chat Message List */}
//         <div
//           ref={messageListRef}
//           className="absolute top-14 bottom-38 overflow-y-auto w-full space-y-3"
//         >
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`rounded-lg whitespace-pre-wrap break-words overflow-hidden ${
//                   msg.role === "user"
//                     ? "text-gray-400 bg-white p-2 mr-4 w-auto max-w-[80%]"
//                     : "text-gray-800 px-5 py-2 w-full"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start ml-4">
//               <LoadingDots />
//             </div>
//           )}
//         </div>

//         <div className="absolute bottom-20 z-10 w-full px-4">
//           <form onSubmit={handleSubmit} className="relative">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder={t("chat4")}
//               onKeyDown={handleKeyDown}
//               ref={textareaRef}
//               className="flex-1 rounded-full bg-gray-50 h-full px-3 py-3 pr-23 text-base border border-[#FF88A5] focus:outline-none w-full"
//             />
//             <div className="absolute right-0 top-0 flex items-center gap-4 pr-2 py-2 sm:py-4 h-full">
//               <div>
//                 <FiMic size={24} className="text-black cursor-pointer" />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading || !newMessage.trim()}
//                   className="bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] h-10 w-10 rounded-full flex items-center justify-center shadow-md"
//                 >
//                   <IoSend
//                     size={20}
//                     className="text-white cursor-pointer ml-1"
//                   />
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <BottomNavBar />
//     </div>
//   );
// }

"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FiMic } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "@/store/chatStore";
import { LoadingDots } from "@/components/LoadingDots";
import { useRouter } from "next/navigation";
import BottomNavBar from "@/components/BottomNavBar";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const { chats, chatHistory, remainingFreeChats } = useChatStore();
  const messageListRef = useRef(null);
  const t = useTranslations("Chat");

  // 🧩 Setup speech recognition once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = "en-US";

        recog.onstart = () => setListening(true);
        recog.onend = () => setListening(false);
        recog.onerror = (e) => {
          console.error("Speech recognition error:", e);
          setListening(false);
        };

        recog.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setNewMessage(transcript);
          // auto send after recognition
          setTimeout(() => handleSendMessage(transcript), 500);
        };

        setRecognition(recog);
      }
    }
  }, []);

  // 📜 Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await chatHistory();
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

  // 👇 Scroll to bottom when new messages
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 🎤 Start/stop mic
  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) recognition.stop();
    else recognition.start();
  };

  // 🧠 Send message (manual or from mic)
  const handleSendMessage = async (customMessage) => {
    const messageToSend = customMessage || newMessage;
    if (!messageToSend.trim() || loading) return;

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setLoading(true);

    try {
      const response = await chats(userMessage);
      const botMessage = { role: "bot", content: response };
      setMessages((prev) => [...prev, botMessage]);

      // 🗣️ Speak the bot’s response
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(response);
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = "hi-IN";
      synth.speak(utter);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
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

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="relative w-[426px] h-screen bg-gradient-to-b from-[#FF88A51A] to-[#FFF6F2]">
        <div className="mt-2 sm:mt-3 relative justify-between z-20">
          <Footer />
        </div>

        {/* Message List */}
        <div
          ref={messageListRef}
          className="absolute top-14 bottom-38 overflow-y-auto w-full space-y-3"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg whitespace-pre-wrap break-words overflow-hidden ${
                  msg.role === "user"
                    ? "text-gray-400 bg-white p-2 mr-4 w-auto max-w-[80%]"
                    : "text-gray-800 px-5 py-2 w-full"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start ml-4">
              <LoadingDots />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-20 z-10 w-full px-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t("chat4")}
              className="flex-1 rounded-full bg-gray-50 h-full px-3 py-3 pr-23 text-base border border-[#FF88A5] focus:outline-none w-full"
            />
            <div className="absolute right-0 top-0 flex items-center gap-4 pr-2 py-2 sm:py-4 h-full">
              <div onClick={handleMicClick}>
                <FiMic
                  size={24}
                  className={`cursor-pointer ${
                    listening ? "text-red-500 animate-pulse" : "text-black"
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className="bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] h-10 w-10 rounded-full flex items-center justify-center shadow-md"
              >
                <IoSend size={20} className="text-white cursor-pointer ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
