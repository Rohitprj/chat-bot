"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Button({ link, name }) {
  const pathname = usePathname();

  const isHomeOrVerify =
    pathname === "/" || pathname.startsWith("/verify");

  return (
    <div className="flex justify-center">
      <Link
        href={link}
        {...(!isHomeOrVerify && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        <button
          type="submit"
          className="px-8 py-3 max-w-36 whitespace-nowrap flex justify-center items-center text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-300 to-orange-300 mx-auto cursor-pointer"
        >
          {name}
        </button>
      </Link>
    </div>
  );
}
