"use client";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("Follow");
  const b = useTranslations("button");
  const commonBtn = "px-3 py-1 sm:pb-1.5  flex justify-center items-center max-w-36 text-sm sm:text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-300 to-orange-300 hover:scale-105 transition cursor-pointer";

  const pageBtn = "px-4 py-1 sm:pb-2 font-bold whitespace-nowrap flex justify-center items-center text-base text-white rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 shadow-lg shadow-orange-300/50 scale-105 cursor-pointer hover:scale-115 transition";


  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-[425px] min-h-screen bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg sm:rounded-none flex flex-col justify-between">

        <div className="absolute top-0 left-0 w-full h-[35%] z-0 opacity-90">
          <Image
            src="/reactangle.svg"
            alt="Background Decor"
            fill
            className="object-cover object-top pointer-events-none select-none"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex justify-center mt-5 sm:mt-6">
          <Link href="/chat">
            <div className="px-2 py-2 flex justify-center items-center w-full max-w-24 mx-auto text-sm sm:text-xs font-semibold text-white rounded-full bg-gradient-to-r from-pink-300 to-orange-300 shadow-md cursor-pointer hover:scale-105 transition">
              {b("chat")}
            </div>
          </Link>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-[#4A4365] px-6 sm:px-8 flex-grow space-y-4 py-3 sm:py-2">
          <p className="text-base sm:text-base leading-relaxed">
            <span className="font-bold">{t("text")}</span> {t("text1")}
            <br /> {t("text2")}
          </p>
          <p className="text-sm sm:text-sm">{t("text3")}</p>

          <div className="relative w-full max-w-[340px] h-[250px] sm:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src="/followImage.png"
              alt="Vinita Rashinkar"
              fill
              className="object-cover rounded-2xl pointer-events-none select-none"
              priority
              sizes="(max-width: 425px) 90vw, (max-width: 768px) 80vw, 360px"
            />
          </div>
        </div>

        <div className="relative z-10 flex justify-center items-center gap-3 pb-24 sm:pb-24">
          <Link href="/book">
            <button className={commonBtn}>
              {b("books")}
            </button>
          </Link>
          <Link
            href="https://www.instagram.com/vinita_rashinkar"
            target="_blank"
          >
            <button className={pageBtn}>
              {b("follow")}
            </button>
          </Link>
          <Link href="/meet">
            <button className={commonBtn}>
              {b("meet")}
            </button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
