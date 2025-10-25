"use client"
import Back from "@/components/Back";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
  const button = useTranslations("button");
  const t = useTranslations("Follow");

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-200 overflow-hidden">
      <div className="relative w-full max-w-[425px] min-h-screen bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg overflow-hidden sm:rounded-none">
        
        <div className="absolute -top-5 left-0 w-full h-[30%] z-0">
          <Image
            src="/reactangle.svg"
            alt="decor"
            fill
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain object-top"
            priority
          />
        </div>

        {/* Back Button */}
        <Back />

        <div className="flex flex-col gap-6">
          {/* Content Section */}
          <div className=" relative mt-16 z-1 flex flex-col items-center text-center text-[#4A4365] px-6 sm:px-10 space-y-5 overflow-y-auto mb-5">
            <p className="text-sm">
              <span className="font-bold ">{t("text")}</span> {t("text1")}
              <br /> {t("text2")}
            </p>
            <p className="text-sm ">{t("text3")}</p>
          </div>

          {/* Image Section */}
          <div className="relative mx-auto max-w-[86%] w-full transform  h-[235px] sm:h-[260px] rounded-2xl shadow-lg ">
            <Image
              src="/followImage.png"
              alt="Vinita Rashinkar"  
              fill
              className="object-cover rounded-2xl"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              priority
              sizes="(max-width: 425px) 100vw, 425px"
            />
          </div>
        </div>
        
        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          <div className="mx-auto mb-5">
            <Button link="https://www.instagram.com/vinita_rashinkar"  name={button("follow")} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}


// "use client";
// import Back from "@/components/Back";
// import Button from "@/components/Button";
// import Footer from "@/components/Footer";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// export default function Page() {
//   const button = useTranslations("button");
//   const t = useTranslations("Follow");

//   return (
//     <main className="flex justify-center bg-gray-200 min-h-screen">
//       <div className="relative w-full max-w-[425px] h-full bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg rounded-xl overflow-hidden flex flex-col">

//         {/* Top Decorative SVG */}
//         <div className="relative w-full h-[30vh] sm:h-[35vh]  flex justify-center">
//           <div className="absolute inset-0 -top-5 flex justify-center">
//             <Image
//               src="/reactangle.svg"
//               alt="decor"
//               fill
//               className="object-contain object-bottom"
//               priority
//               sizes="100vw"
//             />
//           </div>

//           {/* Back Button */}
//           <div className="absolute  left-1 z-10">
//             <Back />
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="relative -top-35 sm:-top-40 flex flex-col items-center  justify-center text-center text-[#4A4365] px-4 sm:px-8 space-y-4">
//           <p className="text-sm">
//             <span className="font-bold">{t("text")}</span> {t("text1")}
//             <br /> {t("text2")}
//           </p>
//           <p className="text-sm">{t("text3")}</p>

//           {/* Image Section */}
//           <div className="relative w-full h-[35vh] sm:h-[38vh] rounded-2xl shadow-lg mt-4">
//             <Image
//               src="/followImage.png"
//               alt="Vinita Rashinkar"
//               fill
//               className="object-cover rounded-2xl"
//               draggable={false}
//               onDragStart={(e) => e.preventDefault()}
//               priority
//               sizes="(max-width: 425px) 100vw, 425px"
//             />
//           </div>
//         </div>

//         {/* Footer + Button */}
//         <div className="flex flex-col items-center">
//           <Button
//             link="https://www.instagram.com/vinita_rashinkar"
//             name={button("follow")}
//           />
//           <div className="mt-2 w-full">
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

