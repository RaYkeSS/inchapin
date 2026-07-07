import { ReactNode } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import "~/styles/globals.scss";

const proximaNova = localFont({
  src: [
    {
      path: "../public/fonts/ProximaNova/ProximaNova-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ProximaNova/ProximaNova-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ProximaNova/ProximaNova-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ProximaNova/ProximaNova-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-proxima-nova",
});

export const metadata: Metadata = {
  title: "INCHAPIN",
  description: "Дом бизнес-класса для ценителей роскоши",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${proximaNova.variable}`}>
      <body>{children}</body>
    </html>
  );
}
