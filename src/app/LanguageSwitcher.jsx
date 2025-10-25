// "use client";

// import Image from "next/image";
// import { useState, useEffect, useTransition } from "react";
// import { useRouter } from "next/navigation";

// export default function Footer() {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const [language, setLanguage] = useState("en");
//   const [languageImage, setLanguageImage] = useState("/english.png");

//   useEffect(() => {
//     if (typeof document !== "undefined") {
//       const match = document.cookie.match(/locale=(\w+)/);
//       const savedLanguage = match ? match[1] : "en";
//       setLanguage(savedLanguage);
//       setLanguageImage(savedLanguage === "hi" ? "/hindi.png" : "/english.png");
//     }
//   }, []);

//   const handleLanguageChange = (e) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
//     setLanguageImage(selectedLanguage === "hi" ? "/hindi.png" : "/english.png");

//     document.cookie = `locale=${selectedLanguage}; path=/`;

//     startTransition(() => {
//       router.refresh();
//     });
//   };

//   return (
//     <div className="flex flex-col absolute bottom-6 gap-4 w-full px-6">
//       <div className="flex gap-8 w-full justify-between items-center text-sm text-gray-400">
//         <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-3xl">
//           <div className="relative w-8 h-6">
//             <Image
//               src={languageImage}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
//               priority
//               className="object-contain"
//               alt="Language flag"
//             />
//           </div>
//           <select
//             value={language}
//             onChange={handleLanguageChange}
//             disabled={isPending}
//             className="bg-transparent text-black text-xl focus:outline-none cursor-pointer"
//           >
//             <option className="bg-gray-800 text-black" value="en">
//               English
//             </option>
//             <option className="bg-gray-800 text-black" value="hi">
//               हिंदी
//             </option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-3xl">
//           <span className="text-sm font-semibold text-black">powered by</span>
//           <div className="relative w-10 h-8">
//             <Image
//               src="/0.png"
//               alt="Powered by Icon"
//               fill
//               priority
//               className="object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
