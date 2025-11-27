"use client";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPencilAlt,
} from "react-icons/fa";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const button = useTranslations("button");
  const t = useTranslations("Login");

  const { login, loading, error, success } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email });

      if (res?.ok) {
        toast.success(res.message || "Login Successful ", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res.message || "Login Failed ");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (success) {
      router.push("/chat");
    }
  }, [success]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="relative h-screen w-full max-w-[425px] bg-gradient-to-b from-[#fce3da] via-[#f8f1ff] to-[#efe0fc] shadow-lg flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 sm:px-10">
          <p className="text-gray-600 text-center text-lg sm:text-xl md:text-xl mb-10">
            {t("text")} <br /> {t("text1")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full max-w-sm"
          >
            {/* Email Input */}
            <div className="relative flex items-center bg-white/80 rounded-full py-3 px-5 border-2 border-[#FF88A5]">
              <FaEnvelope
                size={20}
                className="text-gray-500 absolute left-5 sm:static sm:mr-2"
              />
              <input
                type="email"
                placeholder={t("placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-gray-700 text-sm sm:text-base pl-10 pr-1 sm:pl-0"
                required
              />
              <FaPencilAlt
                size={20}
                className="text-gray-500 absolute right-5 sm:static cursor-pointer"
              />
            </div>

            <div className="text-center text-gray-600 text-md">
              {t("noAccount")}
              <Link
                href="/register" 
                className="font-bold text-lg text-[#FF88A5] hover:text-[#fc7aa0] hover:underline ml-2"
              >
                {t("signUpLink")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-8 py-3 text-white font-semibold text-base rounded-full bg-gradient-to-r from-pink-300 to-orange-300 hover:opacity-90 transition-all cursor-pointer"
            >
              {loading ? "Loading..." : button("submit")}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
