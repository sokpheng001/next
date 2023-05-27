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
    images: "https://api.escuelajs.co/api/v1/files/0ea6.png",
  },
  twitter: {
    title: "IsTock Product",
    description: "Welcome to IsTock",
    url: "https://istad.co/",
    images: "https://api.escuelajs.co/api/v1/files/0ea6.png",
  },
  description: "Shopping",
  keywords: "Shopping",
  author: "Sokpheng",
  robots: "index",
  canonical: "google.com",
};
// 
// export const metadata = {
//   title: "ISTAD - Home",
//   description: "This is my app",
//   images: "/images/alien.png",

//   openGraph: {
//     title: "ISTAD-HOME",
//     description: "This is my app",
//     url: "",
//     images: "/images/alien.png",
//   },
//   twitter: {
//     title: "My App",
//     description: "This is my app",
//     url: "https://myapp.com",
//     image: "https://myapp.com/og.png",
//   },
// };

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
