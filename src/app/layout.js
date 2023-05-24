import NavigateCompunent from "@/component/NavigateComponent";
import "./globals.css";

import Head from "next/head";
import {Inter } from "next/font/google";
import NavigateButton from "@/component/NavigateButton";
import FooterComponent from "@/component/FooterComponent";
import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hey!, SoPi - Home Page",
  description: "Shopping",
  keywords: "SoPi Shopping",
  author: "Sokpheng",
  robots: "index",
  canonical: "google.com",
  openGraph: {
    image:
      "https://th.bing.com/th/id/R.5ee1fa25b0bf51a1163197eb2b9319ff?rik=QCJQB3HvmcE1aw&pid=ImgRaw&r=0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="" sizes="any" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <NavigateCompunent />
          <NavigateButton />
          {children}
          <FooterComponent />
        </Suspense>
      </body>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
      ></Script>
    </html>
  );
}
