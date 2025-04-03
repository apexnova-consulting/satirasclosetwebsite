import { Inter, Playfair_Display } from 'next/font/google';
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "Satira's Closet | Luxury Shopping Experience",
  description: "Discover unique treasures at Satira's Closet - Your destination for luxury furniture, clothing, toys, and accessories.",
  keywords: ["auction", "online shop", "marketplace", "unique items", "bidding", "furniture", "clothing", "accessories"],
  authors: [{ name: "Satira's Closet" }],
  creator: "Satira's Closet",
  publisher: "Satira's Closet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FDFBF7] font-inter">
        <Providers>
          {/* Islamic-inspired geometric pattern overlay */}
          <div className="fixed inset-0 bg-pattern opacity-5 pointer-events-none" />
          
          <Navigation />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
        </Providers>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 