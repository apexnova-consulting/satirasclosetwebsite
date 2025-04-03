import { Inter, Playfair_Display } from 'next/font/google';
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

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
          
          <Header />
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-primary text-white mt-20">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-playfair text-xl mb-4">About Us</h3>
                  <p className="text-sm opacity-80">
                    Satira&apos;s Closet offers a unique shopping experience with carefully curated items and Islamic-inspired elegance.
                  </p>
                </div>
                <div>
                  <h3 className="font-playfair text-xl mb-4">Customer Service</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/contact" className="hover:text-gold transition-colors">Contact Us</a></li>
                    <li><a href="/shipping" className="hover:text-gold transition-colors">Shipping Information</a></li>
                    <li><a href="/returns" className="hover:text-gold transition-colors">Returns & Exchanges</a></li>
                    <li><a href="/faq" className="hover:text-gold transition-colors">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-playfair text-xl mb-4">Categories</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/category/furniture" className="hover:text-gold transition-colors">Furniture</a></li>
                    <li><a href="/category/clothing" className="hover:text-gold transition-colors">Clothing</a></li>
                    <li><a href="/category/toys" className="hover:text-gold transition-colors">Toys</a></li>
                    <li><a href="/category/accessories" className="hover:text-gold transition-colors">Accessories</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-playfair text-xl mb-4">Newsletter</h3>
                  <p className="text-sm mb-4 opacity-80">
                    Subscribe to receive updates about new arrivals and special offers.
                  </p>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="px-3 py-2 rounded bg-white/10 text-white placeholder:text-white/60 flex-1"
                    />
                    <button className="px-4 py-2 bg-gold hover:bg-gold/90 rounded transition-colors">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-80">
                <p>&copy; {new Date().getFullYear()} Satira&apos;s Closet. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 