"use client";
import React from "react";
import { FaStore, FaBook, FaUserFriends, FaHandshake, FaUser } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNavBar() {
    const t = useTranslations("Profile.Navigation");
    const pathname = usePathname();

    // const isHomeOrVerify =
    //     pathname === "/" || pathname.startsWith("/verify");

    // if (pathname === "/" || pathname === "/book" || pathname === "/follow" || pathname === "/meet" || pathname === "/login" || pathname === "/register" || pathname === "/verify" || isHomeOrVerify)  return null;
    
    const isProfileActive = pathname.startsWith("/profile");

    const navItems = [
        { name: t("Shop"), icon: <FaStore />, href: "https://www.shunyawellness.com/", external: true },
        { name: t("Books"), icon: <FaBook />, href: "https://www.shunyawellness.com/search?q=books&options%5Bprefix%5D=last", external: true },
        { name: t("Follow"), icon: <FaUserFriends />, href: "https://www.instagram.com/vinita_rashinkar", external: true },
        { name: t("Meet"), icon: <FaHandshake />, href: "https://meet.vinitarashinkar.in/", external: true },
        { name: t("Profile"), icon: <FaUser />, href: "/profile", external: false },
    ];

    const handleExternalClick = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-[426px] mx-auto bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)] border-t border-orange-300 shadow-md flex justify-around py-3 z-50">
            {navItems.map((item) => {
                if (item.external) {
                    return (
                        <button
                            key={item.name}
                            onClick={() => handleExternalClick(item.href)}
                            className="flex flex-col items-center text-sm text-gray-500 hover:text-orange-500"
                        >
                            <span className="text-xl mb-1">{item.icon}</span>
                            {item.name}
                        </button>
                    );
                } else {
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center text-sm transition-all ${isProfileActive
                                ? "text-orange-700 font-bold"
                                : "text-gray-500 hover:text-orange-500"
                                }`}
                        >
                            <span className="text-xl mb-1">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                }
            })}
        </div>
    );
}

