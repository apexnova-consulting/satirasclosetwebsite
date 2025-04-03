"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const categories = [
  { name: "Furniture", href: "/category/furniture" },
  { name: "Clothing", href: "/category/clothing" },
  { name: "Toys", href: "/category/toys" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Miscellaneous", href: "/category/miscellaneous" }
];

export default function Navigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="relative bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:justify-between items-center">
            <p className="hidden md:block">Free shipping on orders over $150</p>
            <div className="flex gap-6 text-xs uppercase tracking-wider">
              {session ? (
                <Link href="/account" className="hover:text-gold transition-colors">
                  My Account
                </Link>
              ) : (
                <Link href="/auth/signin" className="hover:text-gold transition-colors">
                  Sign In
                </Link>
              )}
              <Link href="/customer-service" className="hover:text-gold transition-colors">
                Customer Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-6">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-playfair text-center flex-1 lg:flex-none">
              Satira&apos;s Closet
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => {
                const isActive = pathname.startsWith(category.href);
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="relative group py-2"
                  >
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-black" : "text-gray-600"
                      } group-hover:text-black transition-colors uppercase tracking-wider`}
                    >
                      {category.name}
                    </span>
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black transform origin-left transition-transform duration-200 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      } group-hover:scale-x-100`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart size={20} />
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={20} />
              </Link>
              
              {session ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full">
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Orders
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => signOut()} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <User size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <motion.div
        initial={false}
        animate={{ height: isSearchOpen ? "auto" : 0, opacity: isSearchOpen ? 1 : 0 }}
        className="absolute w-full bg-white shadow-lg overflow-hidden z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 pl-12 text-lg border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
              autoFocus={isSearchOpen}
            />
            <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        className="lg:hidden overflow-hidden bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {categories.map((category) => {
              const isActive = pathname.startsWith(category.href);
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`text-lg ${
                    isActive ? "text-black font-medium" : "text-gray-600"
                  } hover:text-black transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </nav>
  );
} 