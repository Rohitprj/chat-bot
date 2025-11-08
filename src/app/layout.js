import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import SwipeNavigator from "@/components/Swiper";

import HomePage from "@/app/page";
import BookPage from "@/app/book/page";
import FollowPage from "@/app/follow/page";
import MeetPage from "@/app/meet/page";
import ChatPage from "@/app/chat/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ask VinitaSri",
  description: "Created by Asha-Tech",
  manifest: "/manifest.webmenifest",
};

export default function RootLayout({ children }) {
  const childrenMap = {
    "/": <HomePage />,
    "/book": <BookPage />,
    "/follow": <FollowPage />,
    "/meet": <MeetPage />,
    "/chat": <ChatPage />,
  };


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <SwipeNavigator childrenMap={childrenMap}>{children}</SwipeNavigator>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
