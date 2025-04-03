"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Calendar, Clock, Upload, X } from "@phosphor-icons/react";

export default function NewProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    listingType: "BUY_NOW",
  });

  // Rest of the component code...
} 