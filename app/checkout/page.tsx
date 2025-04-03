"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

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

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  useEffect(() => {
    // Calculate total
    const calculatedTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotal(calculatedTotal);
  }, [cartItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    const newErrors = {
      firstName: formData.firstName ? "" : "First name is required",
      lastName: formData.lastName ? "" : "Last name is required",
      email: formData.email ? "" : "Email is required",
      phone: formData.phone ? "" : "Phone is required",
      address: formData.address ? "" : "Address is required",
      city: formData.city ? "" : "City is required",
      state: formData.state ? "" : "State is required",
      zip: formData.zip ? "" : "ZIP is required",
      country: formData.country ? "" : "Country is required"
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setLoading(false);
      return;
    }

    // Handle form submission
    // This is a placeholder and should be replaced with actual form submission logic
    console.log("Form submitted:", formData);

    // Simulate successful payment
    await handlePayment();
  };

  const handlePayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirect to thank you page
    router.push("/checkout/thank-you");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.zip ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                    )}
                  </div>
                </form>
              </div>
              
              <div className="md:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} {formData.zip}</p>
                <p>{formData.country}</p>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="UAE">United Arab Emirates</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Secure Payment:</span> Your payment information will be handled securely via Stripe.
                    </p>
                    <div className="flex space-x-2">
                      <Image src="/images/payment/visa.svg" alt="Visa" width={40} height={30} />
                      <Image src="/images/payment/mastercard.svg" alt="Mastercard" width={40} height={30} />
                      <Image src="/images/payment/amex.svg" alt="American Express" width={40} height={30} />
                      <Image src="/images/payment/discover.svg" alt="Discover" width={40} height={30} />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className={`w-full bg-indigo-600 text-white py-3 rounded-md font-semibold ${
                      loading || cartItems.length === 0 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'hover:bg-indigo-700'
                    } transition`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 