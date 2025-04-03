import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart, User } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Furniture", href: "/category/furniture" },
  { name: "Clothing", href: "/category/clothing" },
  { name: "Toys", href: "/category/toys" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Miscellaneous", href: "/category/miscellaneous" },
];

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>Free shipping on orders over $150</p>
            <div className="flex gap-4">
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

      {/* Main Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <Link href="/" className="text-3xl font-playfair font-bold text-primary">
              Satira&apos;s Closet
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <Link href="/wishlist" className="text-gray-600 hover:text-primary transition-colors">
                <Heart size={24} weight="light" />
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-primary transition-colors">
                <ShoppingCart size={24} weight="light" />
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-primary transition-colors">
                <User size={24} weight="light" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center py-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "px-6 py-2 text-gray-600 hover:text-primary transition-colors relative group",
                  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
                  "after:bg-primary after:scale-x-0 after:transition-transform after:duration-300",
                  "hover:after:scale-x-100"
                )}
              >
                <motion.span
                  initial={false}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.name}
                </motion.span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
} 