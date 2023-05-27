import NavigateCompunent from "@/component/NavigateComponent";
import "./globals.css";

import {Inter } from "next/font/google";
import NavigateButton from "@/component/NavigateButton";
import FooterComponent from "@/component/FooterComponent";
import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home page - IsTock",
  openGraph: {
    description: "Welcome to IsTock",
    url: "https://istad.co/",
    images: "https://api.escuelajs.co/api/v1/files/a629.png",
  },
  twitter: {
    title: "IsTock Product",
    description: "Welcome to IsTock",
    url: "https://istad.co/",
    images: "https://api.escuelajs.co/api/v1/files/a629.png",
  },
  description: "Shopping",
  keywords: "Shopping",
  author: "Sokpheng",
  robots: "index",
  canonical: "google.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <NavigateCompunent />
          <NavigateButton />
          {children}
          <FooterComponent />
        </Suspense>
      </body>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></Script>
    </html>
  );
}
