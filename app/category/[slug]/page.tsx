"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Sample products - in a real app, these would come from an API
const SAMPLE_PRODUCTS = {
  furniture: [
    { id: "f1", name: "Vintage Wooden Cabinet", price: 299, isAuction: true, currentBid: 250 }
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // In a real app, fetch products from your API
    setProducts(SAMPLE_PRODUCTS[category] || []);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative h-64">
                <Image
                  src={`/images/products/${product.id}.jpg`}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                {product.isAuction && (
                  <p className="text-blue-600">Current Bid: ${product.currentBid}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 