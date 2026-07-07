import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "../public/assets/fonts/jetbrains-mono/jetbrains-mono-variable.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 800", // variable font
});

export const metadata: Metadata = {
  title: "FX | Exchange Rates",
  description: "FX | Exchange Rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${jetbrainsMono.variable} h-full antialiased bg-neutral-900`}
      >
        <body className=" min-h-full flex flex-col font-mono ">{children}</body>
      </html>
    </ClerkProvider>
  );
}
