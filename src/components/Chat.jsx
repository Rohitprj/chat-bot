"use client";
import React, { useState } from "react";
import { FaStore, FaBook, FaUserFriends, FaHandshake, FaUser } from "react-icons/fa";
import ProfileScreen from "./Profile";
import { useTranslations } from "next-intl";

export default function VinitaApp() {
    const t = useTranslations("Profile.Navigation")
    const [activeTab, setActiveTab] = useState("Profile");

    const handleTabClick = (tabName) => {
        if (tabName === t("Shop")) {
            window.open("https://www.shunyawellness.com/", "_blank");
            return;
        }
        if (tabName === t("Meet")) {
            window.open("https://meet.vinitarashinkar.in/", "_blank");
            return;
        }
        if (tabName === t("Books")) {
            window.open("https://www.shunyawellness.com/search?q=books&options%5Bprefix%5D=last", "_blank");
            return;
        }
        if (tabName === t("Follow")) {
            window.open("https://www.instagram.com/vinita_rashinkar", "_blank");
            return;
        }

        setActiveTab(tabName);
    };

    const renderScreen = () => {
        switch (activeTab) {
            case "Profile":
                return <ProfileScreen />;
            default:
                return <ProfileScreen />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div
                className="w-full max-w-[428px] h-[927px]  overflow-hidden shadow-2xl relative "
                style={{ boxShadow: "0 0 40px rgba(0,0,0,0.3)" }}
            >
                {renderScreen()}

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)] border-t border-orange-300 shadow-md flex justify-around py-3 ">
                    {[
                        { name: t("Shop"), icon: <FaStore /> },
                        { name: t("Books"), icon: <FaBook /> },
                        { name: t("Follow"), icon: <FaUserFriends /> },
                        { name: t("Meet"), icon: <FaHandshake /> },
                        { name: t("Profile"), icon: <FaUser /> },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleTabClick(item.name)}
                            className={`flex flex-col items-center text-sm transition-all ${activeTab === item.name
                                ? "text-orange-700 font-bold"
                                : "text-gray-500 hover:text-orange-500"
                                }`}
                        >
                            <span className="text-xl mb-1">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
