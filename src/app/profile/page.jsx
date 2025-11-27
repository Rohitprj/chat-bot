// "use client";
// import { FaArrowLeft, FaTrophy } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";
// import { CiEdit, CiHeart } from "react-icons/ci";
// import { BiBullseye } from "react-icons/bi";
// import { LuClock3 } from "react-icons/lu";
// import { useTranslations } from "next-intl";
// import BottomNavBar from "@/components/BottomNavBar";
// import { useAuthStore } from "@/store/authStore";
// import { useEffect } from "react";
// import { useProfileStore } from "@/store/profileStore";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   const { profileResponse, user } = useProfileStore();
//   const { token } = useAuthStore();
//   const t = useTranslations("Profile");
//   const router = useRouter();

//   useEffect(() => {
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         await profileResponse();
//       } catch (err) {
//         console.error("Profile fetch failed:", err);
//       }
//     };

//     fetchProfile();
//   }, [token, router]);


//   const todayDate = new Date();
//   const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;
//   const daysActive = updatedAt
//     ? Math.floor((todayDate - updatedAt) / (1000 * 60 * 60 * 24))
//     : 0;
//   const timeDiff = todayDate - updatedAt;

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-IN");
//   };

//   const goToChat = useCallback(() => router.push("/chat"), [router]);


//   return (
//     <div className="min-h-screen bg-white flex justify-center items-center">
//       <div className="h-full max-w-[426px] overflow-y-auto bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)]">
//         {/* Header */}
//         <div className="h-20 flex items-center justify-between px-4 bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white">
//           <div className="flex items-center gap-3 ">
//             <span onClick={goToChat}>
//               <FaArrowLeft size={24} className="cursor-pointer" />
//             </span>
//             <FiUser size={28} />
//             <h1 className="font-bold text-lg">{t("header")}</h1>
//           </div>
//           <CiEdit size={24} />
//         </div>

//         <div className="px-4 py-7">
//           {/* User Info Card */}
//           <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex items-center">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white flex items-center justify-center mr-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="32"
//                 height="32"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                 <circle cx="12" cy="7" r="4" />
//               </svg>
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold text-[#FF88A5]">
//                 {user?.name}
//               </h2>
//               <p className="text-sm text-[#FF4500]">{user?.email}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {t("Name.join")} {formatDate(user?.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Spiritual Journey Stats Card */}
//           <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
//             <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
//               <span className="mr-2">📅</span> {t("spiritualJourney")}
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <StatCard
//                 label={t("stats.questionsAsked")}
//                 value={user?.queAsked || 0}
//                 color="text-[#FF4500]"
//                 bgColor="bg-[#FFF1F0]"
//               />
//               <StatCard
//                 label={t("stats.daysActive")}
//                 value={daysActive}
//                 color="text-[#FF4500]"
//                 bgColor="bg-[#FFF1F0]"
//               />
//               <StatCard
//                 label={t("stats.currentStreak")}
//                 value="12"
//                 color="text-[#FF4500]"
//                 bgColor="bg-[#FFF1F0]"
//               />
//               <StatCard
//                 label={t("stats.hoursMeditated")}
//                 value="4.2"
//                 color="text-[#FF4500]"
//                 bgColor="bg-[#FFF1F0]"
//               />
//             </div>
//           </div>

//           {/* Spiritual Goal Stats Card */}
//           <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
//             <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
//               <span className="mr-2">
//                 <BiBullseye size={24} />
//               </span>{" "}
//               {t("spiritualGoals")}
//             </h3>
//             <div className="grid grid-cols-1">
//               <ProgressCard
//                 label={t("progress.dailyMeditation")}
//                 progress={85}
//                 days={12}
//               />
//               <ProgressCard
//                 label={t("progress.mantraPractice")}
//                 progress={60}
//                 days={7}
//               />
//               <ProgressCard
//                 label={t("progress.spiritualReading")}
//                 progress={40}
//                 days={3}
//               />
//             </div>
//           </div>

//           {/* Achievement */}
//           <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
//             <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
//               <span className="mr-2">
//                 <FaTrophy size={24} />
//               </span>{" "}
//               {t("achievement")}
//             </h3>
//             <AchievementCard
//               title={t("achievements.firstSteps")}
//               description={t("achievements.firstStepsDesc")}
//             />
//             <AchievementCard
//               title={t("achievements.consistentPractice")}
//               description={t("achievements.consistentPracticeDesc")}
//             />
//             <AchievementCard
//               title={t("achievements.deepWisdom")}
//               description={t("achievements.deepWisdomDesc")}
//             />
//             <AchievementCard
//               title={t("achievements.devotedSeeker")}
//               description={t("achievements.devotedSeekerDesc")}
//               isInactive
//             />
//           </div>

//           {/* Favourite Topics */}
//           <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
//             <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
//               <span className="mr-2">
//                 <CiHeart size={24} />
//               </span>{" "}
//               {t("favouriteTopics")}
//             </h3>
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs font-semibold">
//               {["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"].map(
//                 (key, i) => (
//                   <div
//                     key={i}
//                   >
//                     <h1 className="px-2 py-1 bg-[#FFEBED] text-[#FF4500] rounded-xl">{t(`topics.${key}`)}</h1>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Footer Quote */}
//           <div className="bg-[#FFF1F0] py-6 px-8 rounded-2xl shadow mb-20">
//             <p className="text-gray-600 italic">{t("footerQuote")}</p>
//             <h3 className="text-[#FF4500] text-lg mt-4">{t("footerAuthor")}</h3>
//           </div>
//         </div>
//       </div>
//       <BottomNavBar />
//     </div>
//   );
// }

"use client";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { CiEdit, CiHeart } from "react-icons/ci";
import { BiBullseye } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import { useTranslations } from "next-intl";
import BottomNavBar from "@/components/BottomNavBar";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useCallback } from "react";
import { useProfileStore } from "@/store/profileStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const { profileResponse, user, loading, initialized } = useProfileStore();
  const { token } = useAuthStore();
  const t = useTranslations("Profile");
  const router = useRouter();

  useEffect(() => {
    if (!token) return; 

    const fetchProfile = async () => {
      try {
        await profileResponse();
      } catch (err) {
        if (err?.response?.status === 401) {
          router.push("/login");
        }
      }
    };

    fetchProfile();
  }, [token, profileResponse]);


  const todayDate = new Date();
  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;

  const daysActive = updatedAt
    ? Math.floor((todayDate - updatedAt) / (1000 * 60 * 60 * 24))
    : 0;

  const formatDate = (d) => {
    if (!d) return "N/A";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-IN");
  };

  const goToChat = useCallback(() => router.push("/chat"), [router]);

  if (!initialized || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="h-full max-w-[426px] overflow-y-auto bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)]">
        <div className="h-20 flex items-center justify-between px-4 bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white">
          <div className="flex items-center gap-3 ">
            <span onClick={goToChat}>
              <FaArrowLeft size={24} className="cursor-pointer" />
            </span>
            <FiUser size={28} />
            <h1 className="font-bold text-lg">{t("header")}</h1>
          </div>
          <CiEdit size={24} />
        </div>

        <div className="px-4 py-7">
          {/* User Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] text-white flex items-center justify-center mr-4">
              <FiUser size={28} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#FF88A5]">{user?.name}</h2>
              <p className="text-sm text-[#FF4500]">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("Name.join")} {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
              <span className="mr-2">📅</span> {t("spiritualJourney")}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label={t("stats.questionsAsked")}
                value={user?.queAsked || 0}
                color="text-[#FF4500]"
                bgColor="bg-[#FFF1F0]"
              />
              <StatCard
                label={t("stats.daysActive")}
                value={daysActive || 0}
                color="text-[#FF4500]"
                bgColor="bg-[#FFF1F0]"
              />
              <StatCard
                label={t("stats.currentStreak")}
                value={daysActive || 0}
                color="text-[#FF4500]"
                bgColor="bg-[#FFF1F0]"
              />
              <StatCard
                label={t("stats.hoursMeditated")}
                value="4.2"
                color="text-[#FF4500]"
                bgColor="bg-[#FFF1F0]"
              />
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
              <BiBullseye size={24} className="mr-2" /> {t("spiritualGoals")}
            </h3>

            <ProgressCard label={t("progress.dailyMeditation")} progress={85} days={12} />
            <ProgressCard label={t("progress.mantraPractice")} progress={60} days={7} />
            <ProgressCard label={t("progress.spiritualReading")} progress={40} days={3} />
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
              <FaTrophy size={24} className="mr-2" /> {t("achievement")}
            </h3>

            <AchievementCard title={t("achievements.firstSteps")} description={t("achievements.firstStepsDesc")} />
            <AchievementCard title={t("achievements.consistentPractice")} description={t("achievements.consistentPracticeDesc")} />
            <AchievementCard title={t("achievements.deepWisdom")} description={t("achievements.deepWisdomDesc")} />
            <AchievementCard title={t("achievements.devotedSeeker")} description={t("achievements.devotedSeekerDesc")} isInactive />
          </div>

          {/* Favourite Topics */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-lg font-semibold text-[#FF88A5] mb-4 flex items-center">
              <CiHeart size={24} className="mr-2" /> {t("favouriteTopics")}
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs font-semibold">
              {["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"].map((key, i) => (
                <h1 key={i} className="px-2 py-1 bg-[#FFEBED] text-[#FF4500] rounded-xl">
                  {t(`topics.${key}`)}
                </h1>
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

      <BottomNavBar />
    </div>
  );
}




const StatCard = ({ label, value, color, bgColor }) => (
  <div
    className={`p-4 rounded-xl text-center ${bgColor} shadow-sm transition-transform hover:scale-[1.02]`}
  >
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </div>
);

const ProgressCard = ({ label, progress, days }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <span className="flex items-center text-[#FF4500] text-xs font-medium">
        <LuClock3 className="mr-1" size={14} /> {days}{" "}
        {label.includes("days") ? "" : "days"}
      </span>
    </div>
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p className="text-xs text-gray-500 mt-1">
      {progress}% {label.includes("complete") ? "" : "complete"}
    </p>
  </div>
);

const AchievementCard = ({ title, description, isInactive = false }) => (
  <div
    className={`flex items-center rounded-xl p-4 mb-3 shadow-sm ${isInactive
      ? "bg-gray-200 border border-gray-300"
      : "bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] border border-[#FF88A5]"
      }`}
  >
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${isInactive ? "bg-gray-400 text-gray-700" : "bg-white text-[#FF88A5]"
        }`}
    >
      <FaTrophy size={18} />
    </div>
    <div>
      <p
        className={`text-sm font-semibold ${isInactive ? "text-gray-700" : "text-[#ffffff]"
          }`}
      >
        {title}
      </p>
      <p className={`text-xs ${isInactive ? "text-gray-900" : "text-white"}`}>
        {description}
      </p>
    </div>
  </div>
);



