import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Satira's Closet | Immersive Online Bidding Marketplace",
  description: "Shop, bid and purchase unique items at Satira's Closet. An interactive online marketplace for furniture, clothing, toys, accessories, and more.",
  keywords: ["auction", "online shop", "marketplace", "unique items", "bidding", "furniture", "clothing", "accessories"],
  authors: [{ name: "Satira's Closet" }],
  creator: "Satira's Closet",
  publisher: "Satira's Closet",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-montserrat flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 