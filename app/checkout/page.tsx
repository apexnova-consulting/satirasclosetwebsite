"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Suspense } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Metadata } from 'next';

// Sample cart state - in a real app, this would come from a state management store like Zustand
const sampleCartItems = [
  {
    id: "f1",
    name: "Vintage Wooden Cabinet",
    price: 299,
    quantity: 1,
    image: "/images/products/cabinet.jpg",
    isAuction: false
  },
  {
    id: "a1",
    name: "Designer Silk Scarf",
    price: 95,
    quantity: 1,
    image: "/images/products/scarf.jpg",
    isAuction: false
  }
];

export const metadata: Metadata = {
  title: 'Checkout - Satira\'s Closet',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
} 