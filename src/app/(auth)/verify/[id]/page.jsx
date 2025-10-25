"use client";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Page() {
  const button = useTranslations("button");
  const t = useTranslations("register.Confirm");
  const params = useParams();
  const token = params.id;
  const { verify, loading, error, success } = useAuthStore();
  console.log("Token1", params.id);
  const handleVerify = async () => {
    await verify(token);
    if (success) {
      router.push("/login");
    }
  };
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-[425px] h-full bg-[linear-gradient(to_bottom,_#fce3da_30%,_#f8f1ff_90%,_#efe0fc_100%)] flex flex-col justify-between">
        {/* Back */}
        <Back />

        {/* Content */}
        <div className="relative bottom-20 flex flex-col items-center justify-center text-center flex-1 px-4 sm:px-8">
          <p className="text-gray-700 text-md sm:text-xl leading-relaxed  px-4  py-8">
            {t("ConfirmEmail")}
            <br /> {t("ConfirmEmail1")}
          </p>
          <div className="mx-auto mt-20" onClick={handleVerify}>
            <Button link="/login" name={button("continue")} />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
