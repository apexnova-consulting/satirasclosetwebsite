"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, User, SignOut, House } from "phosphor-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <motion.nav 
      className="bg-white shadow-md px-4 md:px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-indigo-800">Satira's Closet</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/category/furniture" className="text-gray-700 hover:text-indigo-600 transition">
            Furniture
          </Link>
          <Link href="/category/clothing" className="text-gray-700 hover:text-indigo-600 transition">
            Clothing
          </Link>
          <Link href="/category/toys" className="text-gray-700 hover:text-indigo-600 transition">
            Toys
          </Link>
          <Link href="/category/accessories" className="text-gray-700 hover:text-indigo-600 transition">
            Accessories
          </Link>
          <Link href="/category/miscellaneous" className="text-gray-700 hover:text-indigo-600 transition">
            Miscellaneous
          </Link>
        </div>
        
        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Link href="/wishlist" className="text-gray-700 hover:text-indigo-600">
            <Heart size={24} />
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-indigo-600">
            <ShoppingCart size={24} />
          </Link>
          
          {session ? (
            <div className="relative group">
              <button className="flex items-center space-x-1">
                <User size={24} />
                <span className="hidden md:inline">{session.user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-10 hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => signOut()} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <SignOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              href="/auth/signin" 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden mt-4 bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Link href="/category/furniture" className="block py-2 px-4 hover:bg-gray-100">
            Furniture
          </Link>
          <Link href="/category/clothing" className="block py-2 px-4 hover:bg-gray-100">
            Clothing
          </Link>
          <Link href="/category/toys" className="block py-2 px-4 hover:bg-gray-100">
            Toys
          </Link>
          <Link href="/category/accessories" className="block py-2 px-4 hover:bg-gray-100">
            Accessories
          </Link>
          <Link href="/category/miscellaneous" className="block py-2 px-4 hover:bg-gray-100">
            Miscellaneous
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
} 