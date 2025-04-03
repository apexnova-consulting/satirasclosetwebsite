"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Clock, Heart, Share } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currentBid: number;
  minBidIncrement: number;
  bidCount: number;
  isAuction: boolean;
  endTime: string;
  category: string;
  images: string[];
  condition?: string;
  material?: string;
  dimensions?: string;
  shipping?: string;
  seller?: string;
  relatedProducts?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  details: string[];
}

interface ProductsMap {
  [key: string]: Product;
}

// Sample product data - in a real app, this would come from an API
const SAMPLE_PRODUCTS: ProductsMap = {
  "f1": {
    id: "f1",
    name: "Vintage Wooden Cabinet",
    description: "Beautiful vintage wooden cabinet in excellent condition",
    price: 299,
    currentBid: 250,
    minBidIncrement: 10,
    bidCount: 5,
    isAuction: true,
    endTime: "2024-05-01T00:00:00Z",
    category: "furniture",
    images: [
      "/images/products/cabinet-1.jpg",
      "/images/products/cabinet-2.jpg",
      "/images/products/cabinet-3.jpg",
      "/images/products/cabinet-4.jpg"
    ],
    details: [
      "Material: 100% hand-spun wool",
      "Size: 8' x 10'",
      "Origin: Isfahan, Iran",
      "Age: Approximately 75 years",
      "Condition: Excellent vintage condition"
    ]
  }
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const session = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(SAMPLE_PRODUCTS[id] || null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product?.isAuction || !product?.endTime) return;
    
    const updateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(product.endTime);
      const difference = endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft("Auction ended");
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    
    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [product]);

  useEffect(() => {
    if (product) {
      setBidAmount((product.currentBid + (product.minBidIncrement || 10)).toString());
    }
  }, [product]);
  
  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (!product) return;
    
    // Simple validation
    const bid = parseFloat(bidAmount);
    if (isNaN(bid)) {
      setBidError("Please enter a valid amount");
      return;
    }
    
    if (bid <= product.currentBid) {
      setBidError("Your bid must be higher than the current bid");
      return;
    }
    
    if (bid < product.currentBid + (product.minBidIncrement || 10)) {
      setBidError(`Minimum bid increment is $${product.minBidIncrement || 10}`);
      return;
    }
    
    // In a real app, this would be an API call to place the bid
    alert(`Your bid of $${bid} has been placed!`);
    setBidError("");
  };
  
  const handleBuyNow = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Navigate to checkout
    router.push(`/checkout/buy/${id}`);
  };
  
  const toggleWishlist = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsWishlisted(!isWishlisted);
  };
  
  const handleAddToCart = () => {
    // Implement cart functionality
    console.log("Added to cart:", { ...product, quantity });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.back()} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-lg overflow-hidden border-islamic"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-playfair mb-4">{product.name}</h1>
              <p className="text-2xl text-gold font-playfair">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-playfair">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-gold">•</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gold hover:bg-gold/90 text-white py-4 rounded-md font-medium transition-colors"
              >
                Add to Cart
              </motion.button>

              <button
                onClick={() => router.back()}
                className="w-full text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to {product.category}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to your account to continue with this action.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <a
                href="/auth/signin"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
              >
                Sign In
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 