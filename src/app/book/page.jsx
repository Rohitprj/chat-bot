// "use client";
// import Slider from "react-slick";
// import Image from "next/image";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Footer from "@/components/Footer";
// import { useTranslations } from "next-intl";
// import Back from "@/components/Back";
// import Button from "@/components/Button";

// export default function Page() {
//   const books = [
//     { id: 0, img: "/book/cosmic.png" },
//     { id: 1, img: "/book/tantra.jpg" },
//     { id: 2, img: "/book/chakras.jpg" },
//     { id: 3, img: "/book/chakrayantra.jpg" },
//     { id: 4, img: "/book/SKP03974.jpg" },
//   ];

//   const button = useTranslations("button");

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 100,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     customPaging: () => <div className="w-3 h-3 rounded-full bg-white"></div>,
//     dotsClass: "slick-dots custom-dots ",
//   };

//   return (
//     <main className="flex justify-center items-center min-h-screen bg-gray-200">
//       <div className="relative w-full max-w-[425px] min-h-screen  bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg overflow-hidden sm:rounded-none">
//         <div className="absolute -top-5 left-0 w-full h-[30%] z-0">
//           <Image
//             src="/reactangle.svg"
//             alt="decor"
//             fill
//             className="object-contain object-top"
//             priority
//             sizes="(max-width: 425px) 100vw, 425px"
//           />
//         </div>

//         {/* Back button */}
//         <Back />

//         {/* Background shadow images */}
//         <div className="absolute inset-x-0 top-[18%] flex justify-between opacity-50 z-0">
//           <Image
//             src="/bgoverlay1.png"
//             alt="bg1"
//             width={500}
//             height={450}
//             className="w-1/2 h-[400px] sm:h-[420px] object-cover"
//             priority
//           />
//           <Image
//             src="/bgoverlay2.png"
//             alt="bg2"
//             width={500}
//             height={450}
//             className="w-1/2 h-[400px] sm:h-[420px] object-cover"
//             priority
//           />
//         </div>

//         {/* Book Slider */}  
//         <div data-swipe-ignore className="absolute top-[16%] w-full px-6 sm:px-12 z-20" >
//           <Slider {...settings}>
//             {books.map((book, index) => (
//               <div key={book.id} className="px-2">
//                 <div
//                   className={`relative h-[430px] sm:h-[450px] overflow-hidden transition-transform duration-500 "}`}
//                 >
//                   <Image
//                     src={book.img}
//                     alt="Book Cover"
//                     fill
//                     draggable={false}
//                     onDragStart={(e) => e.preventDefault()}
//                     className="object-congtain "
//                     priority
//                     sizes="(max-width: 425px) 100vw, 425px "
//                   />
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-0 z-20 mx-auto w-full ">
//           <div className="mx-auto mb-5 ">
//             <Button link="https://www.shunyawellness.com/search?q=books&options%5Bprefix%5D=last"  name={button("books")} />
//           </div>
//           <div>
//             <Footer />
//           </div>
//         </div>

//         {/* Dots Customization */}
//         <style jsx global>{`
//           .custom-dots li button:before {
//             display: none;
//           }
//           .custom-dots li {
//             margin: 0 4px;
//           }
//           .custom-dots li.slick-active div {
//             background: linear-gradient(90deg, #ec4899, #f97316);
//           }
//           .custom-dots li div {
//             margin-top: 10px;
//             box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
//           }
//         `}</style>
//       </div>
//     </main>
//   );
// }

"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Back from "@/components/Back";
import Button from "@/components/Button";

export default function Page() {
  const books = [
    { id: 0, img: "/book/cosmic.png" },
    { id: 1, img: "/book/tantra.jpg" },
    { id: 2, img: "/book/chakras.jpg" },
    { id: 3, img: "/book/chakrayantra.jpg" },
    { id: 4, img: "/book/SKP03974.jpg" },
  ];

  const button = useTranslations("button");

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
      <div className="relative min-h-screen w-full max-w-[427px] bg-gradient-to-b from-[#DEEEE2] via-[#FFFFFF] to-[#F6EFE8] shadow-lg sm:rounded-none flex flex-col">

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

          <div className="absolute top-1 left-1 z-10">
            <Back />
          </div>
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
                  <div
                    className="absolute inset-x-0 top-[5%] bottom-[5%] md:top-[20%] md:bottom-[20%] flex justify-between  opacity-35"
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

                  <div className="relative w-full md:w-[90%] xl:w-full h-full flex justify-center items-center z-10">
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

        <div className="mt-10 mb-4 px-6">
          <Button
            link="https://www.shunyawellness.com/search?q=books&options%5Bprefix%5D=last"
            name={button("books")}
          />
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
