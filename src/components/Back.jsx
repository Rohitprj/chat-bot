"use client"
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function Back() {
    const router = useRouter();
    const back = useTranslations("Back");


    return (
        <div>
            <button
                onClick={() => router.back()}
                className="absolute bg-white/30 py-1 px-3 rounded-3xl left-2 top-1 z-30 flex items-center gap-2 text-lg text-black cursor-pointer"
            >
                <span className="text-2xl"><IoArrowBack size={20} /></span> {back("button")}
            </button>
        </div>
    )
}