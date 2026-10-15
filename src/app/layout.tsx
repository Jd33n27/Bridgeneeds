import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAAS — Music as a Service | Bridgeneeds",
  description: "Digital marketplace & infrastructure platform connecting music talent with artists, creators, agencies, and businesses globally. Discover, brief, hire, collaborate and pay music professionals.",
  keywords: ["Music as a Service", "MAAS", "Bridgeneeds", "Music Talent Marketplace", "Afrobeats Producers", "Mixing Engineers", "Songwriters", "Session Musicians"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0B0D] text-white selection:bg-[#B7F34A] selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
