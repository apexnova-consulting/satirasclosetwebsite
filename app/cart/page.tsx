"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Sample cart data (replace with real data later)
const SAMPLE_CART = {
  items: [
    {
      id: "1",
      name: "Vintage Persian Rug",
      price: 1200,
      quantity: 1,
      image: "/images/products/furniture/rug-main.jpg"
    },
    {
      id: "2",
      name: "Antique Writing Desk",
      price: 850,
      quantity: 1,
      image: "/images/products/furniture/desk-main.jpg"
    }
  ],
  subtotal: 2050,
  shipping: 150,
  tax: 205,
  total: 2405
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(SAMPLE_CART);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cart.items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + cart.shipping + tax;
    
    setCart({
      ...cart,
      items: updatedItems,
      subtotal,
      tax,
      total
    });
  };

  const removeItem = (id: string) => {
    const updatedItems = cart.items.filter(item => item.id !== id);
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + cart.shipping + tax;
    
    setCart({
      ...cart,
      items: updatedItems,
      subtotal,
      tax,
      total
    });
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-playfair mb-8 text-center"
        >
          Your Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {cart.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border-islamic"
              >
                <div className="flex items-center space-x-6">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-playfair mb-2">{item.name}</h3>
                    <p className="text-gold font-medium">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {cart.items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => router.push("/")}
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary */}
          {cart.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 h-fit border-islamic"
            >
              <h2 className="text-2xl font-playfair mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${cart.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-playfair">
                    <span>Total</span>
                    <span className="text-gold text-xl">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/checkout")}
                className="w-full bg-gold hover:bg-gold/90 text-white py-4 rounded-md font-medium mt-8 transition-colors"
              >
                Proceed to Checkout
              </motion.button>

              <button
                onClick={() => router.push("/")}
                className="w-full text-center text-gray-600 hover:text-gray-900 mt-4 transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 