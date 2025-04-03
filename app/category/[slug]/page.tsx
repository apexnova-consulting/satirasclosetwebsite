"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  isAuction: boolean;
  currentBid: number;
  image: string;
  description: string;
}

interface ProductsByCategory {
  [key: string]: Product[];
}

// Sample data - in a real app, this would come from an API
const SAMPLE_PRODUCTS: ProductsByCategory = {
  furniture: [
    {
      id: "f1",
      name: "Vintage Wooden Cabinet",
      price: 299,
      isAuction: true,
      currentBid: 250,
      image: "/images/products/cabinet.jpg",
      description: "Hand-crafted wooden cabinet with intricate carvings"
    },
    {
      id: "f2",
      name: "Mid-Century Modern Chair",
      price: 199,
      isAuction: false,
      currentBid: 0,
      image: "/images/products/chair.jpg",
      description: "Comfortable mid-century modern chair"
    }
  ],
  clothing: [
    {
      id: "c1",
      name: "Silk Evening Gown",
      price: 850,
      isAuction: false,
      currentBid: 0,
      image: "/images/products/clothing/gown.jpg",
      description: "Elegant silk evening gown with Islamic-inspired embroidery"
    }
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // In a real app, fetch products from your API
    setProducts(SAMPLE_PRODUCTS[category] || []);

    // Simulate walking into the department
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Transition Effect */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`fixed inset-0 z-50 bg-primary ${!isTransitioning && "pointer-events-none"}`}
      />

      {/* Category Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-islamic">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/images/categories/${category}.jpg`}
            alt={category}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-playfair mb-4 capitalize">{category}</h1>
          <p className="text-xl opacity-90">Discover our curated collection</p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-playfair">${product.price}</span>
                      <button className="px-4 py-2 bg-gold hover:bg-gold/90 rounded transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 