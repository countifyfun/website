import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";

import { Inter, Roboto } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://countify.fun"),
  title: {
    default: "Countify",
    template: "%s — Countify",
  },
  description: "Your dream Discord counting bot.",
  twitter: {
    card: "summary_large_image",
    creator: "@ToastedDev",
    creatorId: "1145171094556426240",
  },
  openGraph: {
    type: "website",
    url: "/",
    images: [
      {
        url: "https://countify.fun/og.jpg",
      },
    ],
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#fde047",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, roboto.variable)}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
