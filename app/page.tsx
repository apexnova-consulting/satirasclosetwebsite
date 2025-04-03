'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuctionCountdown from '@/components/auction/AuctionCountdown';

const categories = [
  {
    name: 'Furniture',
    href: '/category/furniture',
    image: '/images/categories/furniture.jpg',
    description: 'Elegant pieces for your home',
    color: '#D4B483',
  },
  {
    name: 'Clothing',
    href: '/category/clothing',
    image: '/images/categories/clothing.jpg',
    description: 'Timeless fashion pieces',
    color: '#8B9B8B',
  },
  {
    name: 'Toys',
    href: '/category/toys',
    image: '/images/categories/toys.jpg',
    description: 'Unique and educational toys',
    color: '#E6B89C',
  },
  {
    name: 'Accessories',
    href: '/category/accessories',
    image: '/images/categories/accessories.jpg',
    description: 'Complete your look',
    color: '#9CAFB7',
  },
  {
    name: 'Miscellaneous',
    href: '/category/miscellaneous',
    image: '/images/categories/misc.jpg',
    description: 'Discover unique treasures',
    color: '#B4A6AB',
  },
];

const featuredAuctions = [
  {
    id: 1,
    name: 'Vintage Persian Rug',
    image: '/images/auctions/persian-rug.jpg',
    currentBid: 299.99,
    endTime: new Date(Date.now() + 86400000), // 24 hours from now
    description: 'Authentic handwoven Persian rug with intricate geometric patterns'
  },
  {
    id: 2,
    name: 'Antique Writing Desk',
    image: '/images/auctions/writing-desk.jpg',
    currentBid: 599.99,
    endTime: new Date(Date.now() + 172800000), // 48 hours from now
    description: 'Victorian-era mahogany writing desk with brass hardware'
  },
  {
    id: 3,
    name: 'Designer Evening Gown',
    image: '/images/auctions/evening-gown.jpg',
    currentBid: 449.99,
    endTime: new Date(Date.now() + 259200000), // 72 hours from now
    description: 'Elegant silk evening gown with hand-beaded details'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const router = useRouter();

  const navigateToCategory = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-islamic">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury Shopping"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-playfair mb-6"
          >
            Welcome to Satira&apos;s Closet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Discover a curated collection of unique treasures in our luxurious boutique
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <h2 className="text-4xl font-playfair text-center mb-16">Explore Our Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigateToCategory(category.href)}
              >
                <div className="relative h-80 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                    style={{ backgroundColor: `${category.color}40` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-playfair mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-playfair text-center mb-16">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add featured products here */}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-playfair mb-6">Join Our Community</h2>
            <p className="mb-8 opacity-90">
              Subscribe to receive updates about new arrivals, special offers, and exclusive events.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="px-6 py-3 bg-gold hover:bg-gold/90 rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 