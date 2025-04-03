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
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <a href="/" className="text-gray-500 hover:text-indigo-600">Home</a>
          <span className="mx-2 text-gray-500">/</span>
          <a href={`/category/${product.category}`} className="text-gray-500 hover:text-indigo-600">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </a>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4 bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {product.isAuction ? (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-600">Current Bid:</span>
                  <span className="text-3xl font-bold text-indigo-600">${product.currentBid}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock size={20} className="mr-1" />
                  <span className="font-medium">{timeLeft}</span>
                  <span className="mx-2">•</span>
                  <span>{product.bidCount} bids placed</span>
                </div>
                
                <form onSubmit={handleBidSubmit} className="mb-4">
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className={`block w-full pl-7 pr-12 py-3 border ${
                          bidError ? 'border-red-500' : 'border-gray-300'
                        } rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Enter your bid"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-3 rounded-r-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                    >
                      Place Bid
                    </button>
                  </div>
                  {bidError && <p className="mt-2 text-red-500 text-sm">{bidError}</p>}
                  <p className="mt-2 text-sm text-gray-500">
                    Enter ${(product.currentBid + (product.minBidIncrement || 10)).toFixed(2)} or more
                  </p>
                </form>
                
                {product.price && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition mb-4"
                  >
                    Buy Now: ${product.price}
                  </button>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl font-bold text-green-600">${product.price}</span>
                </div>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition mb-4"
                >
                  Add to Cart
                </button>
              </div>
            )}
            
            <div className="flex space-x-4 mb-8">
              <button
                onClick={toggleWishlist}
                className={`flex items-center px-4 py-2 rounded-md border ${
                  isWishlisted 
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } transition`}
              >
                <Heart size={20} weight={isWishlisted ? "fill" : "regular"} className="mr-2" />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                className="flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                <Share size={20} className="mr-2" />
                Share
              </button>
            </div>
            
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Condition:</span>
                  <span className="text-gray-700">{product.condition}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Material:</span>
                  <span className="text-gray-700">{product.material}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Dimensions:</span>
                  <span className="text-gray-700">{product.dimensions}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Shipping:</span>
                  <span className="text-gray-700">{product.shipping}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Seller:</span>
                  <span className="text-gray-700">{product.seller}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {product.relatedProducts.map((related: any, index: number) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <a href={`/product/${related.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{related.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">${related.price}</span>
                      <span className="text-sm text-indigo-600">View Details</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
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