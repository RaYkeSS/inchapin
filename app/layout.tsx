import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SITE_NAME, SITE_URL } from "~/config/site";

import { Header } from "~/components/layout/header";
import { ScrollbarProvider } from "~/components/ui/scrollbar";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни. Квартиры от 65 до 356 м² с чистовой отделкой в закрытой охраняемой территории.",
  keywords: [
    "недвижимость",
    "квартиры бизнес-класса",
    "INCHAPIN",
    "дом бизнес-класса",
    "квартиры с отделкой",
    "закрытая территория",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    description:
      "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни. Квартиры от 65 до 356 м².",
    images: [
      {
        url: "/images/hero-pc.webp",
        width: 1760,
        height: 600,
        alt: "INCHAPIN - Дом бизнес-класса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    description:
      "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни.",
    images: ["/images/hero-pc.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: ReactNode;
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${proximaNova.variable}`}>
      <body>
        <Header />
        <ScrollbarProvider>
          <main className="container">
            {children}
            {modal}
          </main>
        </ScrollbarProvider>
      </body>
    </html>
  );
}
