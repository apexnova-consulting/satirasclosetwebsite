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
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200',
    description: 'Timeless pieces for your home',
    color: 'bg-stone-100'
  },
  {
    name: 'Clothing',
    href: '/category/clothing',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200',
    description: 'Curated fashion essentials',
    color: 'bg-neutral-100'
  },
  {
    name: 'Toys',
    href: '/category/toys',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200',
    description: 'Educational and engaging',
    color: 'bg-zinc-100'
  },
  {
    name: 'Accessories',
    href: '/category/accessories',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200',
    description: 'Complete your look',
    color: 'bg-gray-100'
  },
  {
    name: 'Miscellaneous',
    href: '/category/miscellaneous',
    image: 'https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?q=80&w=1200',
    description: 'Unique treasures',
    color: 'bg-slate-100'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Vintage Persian Rug',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800',
    category: 'Furniture'
  },
  {
    id: '2',
    name: 'Handcrafted Ceramic Vase',
    price: 189,
    image: 'https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?q=80&w=800',
    category: 'Accessories'
  },
  {
    id: '3',
    name: 'Silk Evening Gown',
    price: 899,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800',
    category: 'Clothing'
  },
  {
    id: '4',
    name: 'Wooden Educational Puzzle',
    price: 45,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800',
    category: 'Toys'
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
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600"
          alt="Luxury shopping experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair mb-6">
            Welcome to Satira&apos;s Closet
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover a curated collection of unique treasures in our luxurious boutique
          </p>
          <Link
            href="/category/new-arrivals"
            className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
          >
            Explore New Arrivals
          </Link>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair text-center mb-12"
          >
            Explore Our Collections
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.href} className="group block relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-playfair mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked selections from our latest collection</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <p className="text-lg">${product.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-playfair mb-6">Stay Connected</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to receive updates on new arrivals, special offers and other discount information.
            </p>
            <form className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors md:min-w-[300px]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-black hover:bg-neutral-200 transition-colors uppercase tracking-wider text-sm"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 