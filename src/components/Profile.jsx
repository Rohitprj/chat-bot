"use client";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { CiEdit, CiHeart } from "react-icons/ci";
import { BiBullseye } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ProfileScreen = () => {
    const router = useRouter();
    const t = useTranslations("Profile");

    return (
        <div className="h-full overflow-y-auto bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)]">

            {/* Header */}
            <div className="h-20 flex items-center justify-between px-4 bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white">
                <div className="flex items-center gap-3">
                    <span onClick={() => router.back()}><FaArrowLeft size={24} /></span>
                    <FiUser size={28} />
                    <h1 className="font-bold text-lg">{t("header")}</h1>
                </div>
                <CiEdit size={24} />
            </div>

            <div className="px-4 py-7">
                {/* User Info Card */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#FF88A5]">{t("Name.Spiritual Seeker")}</h2>
                        <p className="text-sm text-[#FF4500]">seeker@example.com</p>
                        <p className="text-sm text-gray-500 mt-1">{t("Name.Member since December 2024")}</p>
                    </div>
                </div>

                {/* Spiritual Journey Stats Card */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                    <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
                        <span className="mr-2">📅</span> {t("spiritualJourney")}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard label={t("stats.questionsAsked")} value="156" color="text-[#FF4500]" bgColor="bg-[#FFF1F0]" />
                        <StatCard label={t("stats.daysActive")} value="23" color="text-[#FF4500]" bgColor="bg-[#FFF1F0]" />
                        <StatCard label={t("stats.currentStreak")} value="12" color="text-[#FF4500]" bgColor="bg-[#FFF1F0]" />
                        <StatCard label={t("stats.hoursMeditated")} value="4.2" color="text-[#FF4500]" bgColor="bg-[#FFF1F0]" />
                    </div>
                </div>

                {/* Spiritual Goal Stats Card */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                    <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
                        <span className="mr-2"><BiBullseye size={24} /></span> {t("spiritualGoals")}
                    </h3>
                    <div className="grid grid-cols-1">
                        <ProgressCard label={t("progress.dailyMeditation")} progress={85} days={12} />
                        <ProgressCard label={t("progress.mantraPractice")} progress={60} days={7} />
                        <ProgressCard label={t("progress.spiritualReading")} progress={40} days={3} />
                    </div>
                </div>

                {/* Achievement */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                    <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
                        <span className="mr-2"><FaTrophy size={24} /></span> {t("achievement")}
                    </h3>
                    <AchievementCard title={t("achievements.firstSteps")} description={t("achievements.firstStepsDesc")} />
                    <AchievementCard title={t("achievements.consistentPractice")} description={t("achievements.consistentPracticeDesc")} />
                    <AchievementCard title={t("achievements.deepWisdom")} description={t("achievements.deepWisdomDesc")} />
                    <AchievementCard title={t("achievements.devotedSeeker")} description={t("achievements.devotedSeekerDesc")} isInactive />
                </div>

                {/* Favourite Topics */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                    <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
                        <span className="mr-2"><CiHeart size={24} /></span> {t("favouriteTopics")}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs font-semibold">
                        {["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"].map((key, i) => (
                            <h3
                                key={i}
                                className="inline bg-[#FFEBED] text-[#FF4500] px-3 sm:px-2 py-1 rounded-xl"
                            >
                                {t(`topics.${key}`)}
                            </h3>
                        ))}
                    </div>


                </div>

                {/* Footer Quote */}
                <div className="bg-[#FFF1F0] py-6 px-8 rounded-2xl shadow mb-20">
                    <p className="text-gray-600 italic">{t("footerQuote")}</p>
                    <h3 className="text-[#FF4500] text-lg mt-4">{t("footerAuthor")}</h3>
                </div>

            </div>
        </div>
    );
};

const StatCard = ({ label, value, color, bgColor }) => (
    <div className={`p-4 rounded-xl text-center ${bgColor} shadow-sm transition-transform hover:scale-[1.02]`}>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
);

const ProgressCard = ({ label, progress, days }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <span className="flex items-center text-[#FF4500] text-xs font-medium">
                <LuClock3 className="mr-1" size={14} /> {days} {label.includes("days") ? "" : "days"}
            </span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
            />
        </div>
        <p className="text-xs text-gray-500 mt-1">{progress}% {label.includes("complete") ? "" : "complete"}</p>
    </div>
);

const AchievementCard = ({ title, description, isInactive = false }) => (
    <div className={`flex items-center rounded-xl p-4 mb-3 shadow-sm ${isInactive ? "bg-gray-200 border border-gray-300" : "bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] border border-[#FF88A5]"}`}>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${isInactive ? "bg-gray-400 text-gray-700" : "bg-white text-[#FF88A5]"}`}>
            <FaTrophy size={18} />
        </div>
        <div>
            <p className={`text-sm font-semibold ${isInactive ? "text-gray-700" : "text-[#ffffff]"}`}>{title}</p>
            <p className={`text-xs ${isInactive ? "text-gray-900" : "text-white"}`}>{description}</p>
        </div>
    </div>
);

export default ProfileScreen;
