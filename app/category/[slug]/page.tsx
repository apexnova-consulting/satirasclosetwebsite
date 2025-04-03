"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Sample products - in a real app, these would come from an API
const SAMPLE_PRODUCTS = {
  furniture: [
    { id: "f1", name: "Vintage Wooden Cabinet", price: 299, isAuction: true, currentBid: 250
} 