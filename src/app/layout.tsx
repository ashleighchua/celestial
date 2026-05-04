import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Celestial - Your Personal Astrology & Personality Guide",
  description: "Discover yourself through Western Astrology, MBTI, Numerology, Chinese Zodiac, Human Design, Mayan Dreamspell, BaZi, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
