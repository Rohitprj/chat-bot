"use client"
import Back from "@/components/Back";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
  const button = useTranslations("button");
  const t = useTranslations("Meet");
  return (
    <main className="flex justify-center items-center h-screen bg-gray-200 overflow-hidden">
      <div className="relative w-full max-w-[425px] h-full bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg overflow-hidden sm:rounded-none">
        <div className="absolute -top-5 left-0 w-full h-[30%] z-0">
          <Image
            src="/reactangle.svg"
            alt="decor"
            fill
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain object-top"
            priority
            sizes="(max-width: 768px) 100vw, 425px"
          />
        </div>

        {/* Back Button */}
        <Back />

        {/* Content Section */}
        <div className="absolute top-[8%] z-20 flex flex-col items-center text-center text-[#4A4365] px-6 sm:px-8 space-y-5 overflow-y-auto">
          <p className="text-xl sm:text-2xl font-semibold">{t("heading")}</p>
          <p className="text-sm sm:text-base leading-relaxed">{t("text")}</p>

          {/* Image Section */}
          <div className="relative w-full h-[310px] sm:h-[290px] rounded-2xl shadow-lg">
            <Image
              src="/meet.png"
              alt="Vinita Meet"
              fill
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="object-cover rounded-2xl"
              priority
              sizes="(max-width: 425px) 90vw, (max-width: 768px) 80vw, 360px"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          <div className=" mx-auto mb-5">
            <Button link="https://meet.vinitarashinkar.in/" name={button("meet")} />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
