import { Inter, Playfair_Display } from 'next/font/google';
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Satira's Closet | Immersive Online Bidding Marketplace",
  description: "Shop, bid and purchase unique items at Satira's Closet. An interactive online marketplace for furniture, clothing, toys, accessories, and more.",
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
      <body className="bg-[#F8F7F4]">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="font-playfair text-2xl text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Satira&apos;s Closet
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/category/furniture" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Furniture
                </a>
                <a href="/category/clothing" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Clothing
                </a>
                <a href="/category/toys" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Toys
                </a>
                <a href="/category/accessories" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Accessories
                </a>
                <a href="/category/miscellaneous" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  Miscellaneous
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/wishlist" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
                <a href="/cart" className="text-[#2C3E50] hover:text-[#34495E] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </a>
                <a href="/auth/signin" className="bg-[#2C3E50] text-white px-4 py-2 rounded-md hover:bg-[#34495E] transition-colors">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          {children}
        </main>

        <footer className="bg-[#2C3E50] text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-playfair text-xl mb-4">About Us</h3>
                <p className="text-neutral-300">
                  Your premium destination for unique finds and exclusive auctions.
                </p>
              </div>
              <div>
                <h3 className="font-playfair text-xl mb-4">Categories</h3>
                <ul className="space-y-2 text-neutral-300">
                  <li><a href="/category/furniture" className="hover:text-white transition-colors">Furniture</a></li>
                  <li><a href="/category/clothing" className="hover:text-white transition-colors">Clothing</a></li>
                  <li><a href="/category/toys" className="hover:text-white transition-colors">Toys</a></li>
                  <li><a href="/category/accessories" className="hover:text-white transition-colors">Accessories</a></li>
                  <li><a href="/category/miscellaneous" className="hover:text-white transition-colors">Miscellaneous</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-playfair text-xl mb-4">Customer Service</h3>
                <ul className="space-y-2 text-neutral-300">
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Information</a></li>
                  <li><a href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-playfair text-xl mb-4">Connect With Us</h3>
                <div className="flex space-x-4 text-neutral-300">
                  <a href="#" className="hover:text-white transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-neutral-300">
              <p>&copy; {new Date().getFullYear()} Satira&apos;s Closet. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 