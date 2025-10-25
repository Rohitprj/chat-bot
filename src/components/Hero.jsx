"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Footer from "./Footer";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Hero() {
  const t = useTranslations("HomePage");
  const tbutton = useTranslations("button");
  const router = useRouter();
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-[425px] h-full bg-[#F6EFE8] shadow-lg overflow-hidden flex items-end">
        <div
          onClick={() => router.push("/chat")}
          className="absolute right-4 top-2"
        >
          <IoChatbubbleOutline
            size={36}
            className="text-orange-500 cursor-pointer bg-white/70 rounded-xl"
          />
        </div>
        <div className="absolute top-8 sm:top-8 left-0 w-full h-[43%]  sm:h-[46%]   opacity-10">
          <Image
            src="/bg.svg"
            alt="Background"
            fill
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain object-top"
          />
        </div>

        <div className="absolute bottom-0 w-full h-[539px] sm:h-[462px] transform translate-x-4 scale-115 sm:scale-130 z-10">
          <Image
            src="/vinita.png"
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
        <div className=" mb-36 w-full flex flex-col gap-6 items-center text-center px-4 z-20 ">
          <div className="">
            <img src="/nameText.png" className="w-60 mb-2" />
            <p className="text-gray-800 text-md font-semibold">
              {t("about")} <br /> {t("about1")}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          {/* Back */}
          <div className="mx-auto mb-5">
            <Button link="/book" name={tbutton("explore")} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
