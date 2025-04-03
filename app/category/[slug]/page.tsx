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
      image: "/images/products/cabinet.jpg"
    },
    {
      id: "f2",
      name: "Mid-Century Modern Chair",
      price: 199,
      isAuction: false,
      currentBid: 0,
      image: "/images/products/chair.jpg"
    }
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, fetch products from your API
    setProducts(SAMPLE_PRODUCTS[category] || []);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                {product.isAuction ? (
                  <p className="text-indigo-600 font-medium">
                    Current Bid: ${product.currentBid}
                  </p>
                ) : (
                  <p className="text-indigo-600 font-medium">
                    Price: ${product.price}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 