"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("HomePage");
  const tbutton = useTranslations("button");
  const p = useTranslations("Footer");
  return (
    <main className="relative flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-[425px] h-screen bg-[#F6EFE8] shadow-lg overflow-hidden flex items-end">

        <Link
          href="https://www.shunyawellness.com"
          target="_blank"
          className="absolute z-40 top-1 right-1 flex items-center gap-1 px-2 py-1 rounded-full"
        >
          <span className="text-sm sm:text-base font-semibold text-gray-400">
            {p("text")}
          </span>
          <div className="relative w-8 h-8">
            <Image
              src="/0.png"
              alt="Powered by Icon"
              fill
              priority
              sizes="(max-width: 425px) 100vw, 425px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="absolute top-[6%] sm:top-[6%] left-0 w-full h-[45%]  sm:h-[44%] opacity-80">
          <Image
            src="/bgnew.jpeg"
            alt="Background"
            fill
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain object-top"
          />
        </div>

        <div className="absolute bottom-0 w-full h-[66%] sm:h-[462px] transform translate-x-4 scale-115 sm:scale-130 z-10">
          <Image
            src="/vinita.webp"
            alt="Vinita Rashinkar"
            fill
            className="object-contain"
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            sizes="(max-width: 425px) 100vw, 425px"
          />
        </div>

        {/* Content section */}
        <div className=" mb-[36%] sm:mb-[36%] w-full flex flex-col gap-6 items-center text-center px-4 z-20 ">
          <div className="">
            <img src="/nameText.png" className="w-60 mb-2" />
            <p className="text-gray-800 text-md font-semibold">
              {t("about")} <br /> {t("about1")}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          {/* Back */}
          <div className="mx-auto mb-[4%]">
            <Button link="/chat" name={tbutton("chat")} />
          </div>
          <div >
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
