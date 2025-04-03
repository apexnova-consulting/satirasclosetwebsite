"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, User } from "lucide-react";
import { useState } from "react";

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

  return (
    <nav className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gold text-white text-center py-2 text-sm">
        Free shipping on orders over $150
      </div>

      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-playfair">
            Satira&apos;s Closet
          </Link>

          {/* Search Bar */}
          <div className="relative hidden md:block flex-grow max-w-md mx-12">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={24} />
          </button>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gold transition-colors"
            >
              <Heart size={24} />
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gold transition-colors"
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gold transition-colors"
            >
              <User size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Search (Expandable) */}
        <motion.div
          initial={false}
          animate={{ height: isSearchOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-center space-x-8 py-4 overflow-x-auto">
            {categories.map((category) => {
              const isActive = pathname.startsWith(category.href);
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="relative group"
                >
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-gold" : "text-gray-600"
                    } group-hover:text-gold transition-colors`}
                  >
                    {category.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 