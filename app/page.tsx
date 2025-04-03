'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AuctionCountdown from '@/components/auction/AuctionCountdown';

const categories = [
  {
    name: 'Furniture',
    image: '/images/categories/furniture.jpg',
    description: 'Timeless pieces for your home',
    href: '/category/furniture'
  },
  {
    name: 'Clothing',
    image: '/images/categories/clothing.jpg',
    description: 'Curated fashion finds',
    href: '/category/clothing'
  },
  {
    name: 'Toys',
    image: '/images/categories/toys.jpg',
    description: 'Unique collectibles and playthings',
    href: '/category/toys'
  },
  {
    name: 'Accessories',
    image: '/images/categories/accessories.jpg',
    description: 'Complete your look',
    href: '/category/accessories'
  },
  {
    name: 'Miscellaneous',
    image: '/images/categories/misc.jpg',
    description: 'One-of-a-kind treasures',
    href: '/category/miscellaneous'
  }
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

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Luxury interior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-7xl mb-6"
          >
            Welcome to Satira&apos;s Closet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Your premium destination for unique finds and exclusive auctions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/category/all"
              className="bg-white text-[#2C3E50] px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#2C3E50] hover:text-white transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-playfair text-center mb-12"
          >
            Browse Categories
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={item}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <Link href={category.href}>
                  <div className="relative h-80">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <h3 className="text-2xl font-playfair mb-2">{category.name}</h3>
                      <p className="text-center text-neutral-200">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Auctions Section */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-playfair text-center mb-12"
          >
            Live Auctions
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredAuctions.map((auction) => (
              <motion.div
                key={auction.id}
                variants={item}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={auction.image}
                    alt={auction.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair mb-2">{auction.name}</h3>
                  <p className="text-neutral-600 mb-4">{auction.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-neutral-500">Current Bid</p>
                      <p className="text-2xl font-semibold text-[#2C3E50]">
                        ${auction.currentBid.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Time Left</p>
                      <AuctionCountdown endTime={auction.endTime} />
                    </div>
                  </div>
                  <Link
                    href={`/auction/${auction.id}`}
                    className="block w-full text-center bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#34495E] transition-colors"
                  >
                    Place Bid
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2C3E50] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-playfair mb-4"
            >
              Stay Updated
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 mb-8"
            >
              Subscribe to our newsletter for exclusive updates on new arrivals and upcoming auctions.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-black flex-grow max-w-md"
              />
              <button
                type="submit"
                className="bg-white text-[#2C3E50] px-8 py-2 rounded-md font-semibold hover:bg-neutral-100 transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
} 