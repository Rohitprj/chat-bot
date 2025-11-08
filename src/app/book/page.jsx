"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const books = [
    { id: 0, img: "/book/cosmic.png" },
    { id: 1, img: "/book/tantra.jpg" },
    { id: 2, img: "/book/chakras.jpg" },
    { id: 3, img: "/book/chakrayantra.jpg" },
    { id: 4, img: "/book/SKP03974.jpg" },
    { id: 5, img: "/book/Sacred sound.webp" },
    { id: 6, img: "/book/sri vidya 1.webp" },
  ];

  const b = useTranslations("button");
  const commonBtn = "px-3 py-1 sm:pb-1.5  flex justify-center items-center max-w-36 text-sm sm:text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-300 to-orange-300 hover:scale-105 transition cursor-pointer";

  const pageBtn = "px-4 py-1 sm:pb-2 font-bold whitespace-nowrap flex justify-center items-center text-base text-white rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 shadow-lg shadow-orange-300/50 scale-105 cursor-pointer hover:scale-115 transition";
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    customPaging: () => <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white"></div>,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="relative min-h-screen w-full max-w-[425px] bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg sm:rounded-none flex flex-col ">

        <div className="relative w-full h-[18vh] flex items-center justify-center">
          <div className="absolute inset-0 bottom-[-35%] h-[30vh] flex items-center justify-center">
            <Image
              src="/reactangle.svg"
              alt="decor"
              fill
              className="object-contain "
              priority
              sizes="100vw"
            />
          </div>

          <div className="absolute top-[60%] lg:top-14 left-1/2 transform -translate-1/2 z-10">
            <Link href="/chat">
              <div className="px-2 py-2 flex justify-center items-center w-full max-w-24 mx-auto text-sm sm:text-xs font-semibold text-white rounded-full bg-gradient-to-r from-pink-300 to-orange-300 shadow-md cursor-pointer hover:scale-105 transition">
                {b("chat")}
              </div>
            </Link>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[22%] bottom-[28%] md:top-[22%]  md:bottom-[22%] lg:top-[20%] lg:bottom-[26%] flex justify-between  opacity-35"
          style={{ zIndex: 0 }}
        >
          <Image
            src="/bgoverlay1.png"
            alt="bg1"
            width={500}
            height={400}
            className="w-1/2 h-full object-cover"
            priority
          />
          <Image
            src="/bgoverlay2.png"
            alt="bg2"
            width={500}
            height={400}
            className="w-1/2 h-full object-cover"
            priority
          />
        </div>


        {/* Book Slider Section */}
        <div data-swipe-ignore className="relative z-10 w-full">
          <Slider {...settings}>
            {books.map((book) => (
              <div key={book.id}>
                <div
                  className="relative w-full h-[58vh] md:h-[65vh] lg:h-[58vh] flex items-center justify-center "
                  style={{ position: "relative" }}
                >

                  <div className="relative w-full md:w-[90%] xl:w-full h-full z-10">
                    <Image
                      src={book.img}
                      alt="Book Cover"
                      fill
                      draggable={false}
                      className="object-contain  drop-shadow-lg"
                      priority
                      sizes="(max-width: 1024px) 100vw, 425px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex justify-center items-center gap-1 ">
          <div className="mt-10 mb-4 px-1">
            <Link
              href="/follow"
            >
              <button
                className={commonBtn}              >
                {b("follow")}
              </button>
            </Link>
          </div>
          <Link href="https://www.shunyawellness.com/search?q=books&options%5Bprefix%5D=last" target="_blank" className="mt-10 mb-4 px-1">
            <button className={pageBtn}>
              {b("books")}
            </button>
          </Link>
          <div className="mt-10 mb-4 px-1">
            <Link
              href="/meet"
            >
              <button
                className={commonBtn}>
                {b("meet")}
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>

        <style jsx global>{`
          .custom-dots li button:before {
            display: none;
          }
          .custom-dots li {
            margin: 0 4px;
          }
          .custom-dots li.slick-active div {
            background: linear-gradient(90deg, #ec4899, #f97316);
          }
          .custom-dots li div {
            margin-top: 10px;
            box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </main>
  );
}
