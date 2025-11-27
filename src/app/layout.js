import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import SwipeNavigator from "@/components/Swiper";

import HomePage from "@/app/page";
import BookPage from "@/app/book/page";
import FollowPage from "@/app/follow/page";
import MeetPage from "@/app/meet/page";
import ChatPage from "@/app/chat/page";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://askvinitasri.com"),
  title: "Ask VinitaSri",
  // title: "Ask VinitaSri | Spiritual Guide & Healer",
  description: "Your gateway to answers guided by the ancient wisdom of Sri Vidya and Shakti. VinitaSri will respond to questions about practice, purpose, healing, transformation, or any step on your spiritual path.",
  manifest: "/manifest.webmenifest",

  openGraph: {
    title: 'Ask VinitaSri',
    description: 'Your gateway to answers guided by the ancient wisdom of Sri Vidya and Shakti. VinitaSri will respond to questions about practice, purpose, healing, transformation, or any step on your spiritual path.',
    url: 'https://www.askvinitasri.com',
    siteName: 'Ask VinitaSri',
    images: [
      {
        url: 'https://askvinitasri.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vinita Sri - Shri Yantra',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Details of Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Ask VinitaSri',
    description: 'Your gateway to answers guided by the ancient wisdom of Sri Vidya and Shakti. VinitaSri will respond to questions about practice, purpose, healing, transformation, or any step on your spiritual path.',
    images: ['/og-image.png'],
  },
  
  appleWebApp: {
    capable: true,
    title: 'Ask VinitaSri',
    description: 'Your gateway to answers guided by the ancient wisdom of Sri Vidya and Shakti. VinitaSri will respond to questions about practice, purpose, healing, transformation, or any step on your spiritual path.',
    statusBarStyle: 'black-translucent',
  },
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
        <ToastContainer
          position="top-center"
          autoClose={2000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
