import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/providers/AnimationProvider";
import Scene from "@/components/canvas/Scene";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soneesh Kothagundla | Portfolio",
  description: "Researcher | Advocate | Innovator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <AnimationProvider>
          <Scene />
          <Navbar />
          {children}
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
