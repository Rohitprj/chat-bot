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
                className="absolute left-5 top-4 z-30 flex items-center gap-2 text-lg text-black cursor-pointer"
            >
                <span className="text-3xl"><IoArrowBack size={24} /></span> {back("button")}
            </button>
        </div>
    )
}