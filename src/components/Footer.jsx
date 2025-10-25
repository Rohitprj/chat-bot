"use client";

import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Footer");

  const [language, setLanguage] = useState("en");
  const [languageImage, setLanguageImage] = useState("/english.png");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/locale=(\w+)/);
      const savedLanguage = match ? match[1] : "en";
      setLanguage(savedLanguage);
      setLanguageImage(savedLanguage === "hi" ? "/hindi.png" : "/english.png");
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setLanguageImage(selectedLanguage === "hi" ? "/hindi.png" : "/english.png");

    document.cookie = `locale=${selectedLanguage}; path=/`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <footer className="relative w-full mb-4">
      <div className="flex justify-between items-end px-6 sm:px-10 w-full text-base cursor-pointer h-10">
        {/* Language Selector */}
        <div
          data-swipe-ignore
          className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-3xl "
        >
          <div className="relative w-4 h-4">
            <Image
              src={languageImage}
              fill
              priority
              alt="Language flag"
              sizes="(max-width: 425px) 100vw, 425px"
              className="object-cover rounded-full"
            />
          </div>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={isPending}
            className="bg-transparent text-black text-base font-semibold focus:outline-none cursor-pointer pr-2 "
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        {/* Powered by Section */}
        <div className="flex items-center gap-3  rounded-3xl whitespace-nowrap h-full">
          <span className="text-base sm:text-base font-semibold text-black">
            {t("text")}
          </span>
          <div className="relative w-10 h-full bg-white/30 rounded-sm">
            <Image
              src="/0.png"
              alt="Powered by Icon"
              fill
              priority
              sizes="(max-width: 425px) 100vw, 425px"
              className="object-contain py-1"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
