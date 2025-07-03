import type { Metadata } from "next";
import "./globals.css";
import { playfair, inter } from "./fonts";
import Header from "../components/layout/header";

export const metadata: Metadata = {
  title: "VibeWalls: AI-Powered Wallpapers",
  description: "Find the perfect wallpaper to match your mood and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-inter antialiased`}
      >
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
