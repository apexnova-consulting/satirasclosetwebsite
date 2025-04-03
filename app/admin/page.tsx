"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { LineChart, PieChart, BarChart } from "phosphor-react";

// Sample data for dashboard
const salesData = [
  { month: "Jan", sales: 4500 },
  { month: "Feb", sales: 5200 },
  { month: "Mar", sales: 4800 },
  { month: "Apr", sales: 6000 },
  { month: "May", sales: 5700 },
  { month: "Jun", sales: 6500 },
  { month: "Jul", sales: 7200 },
  { month: "Aug", sales: 7800 },
  { month: "Sep", sales: 8300 },
  { month: "Oct", sales: 8900 },
  { month: "Nov", sales: 9500 },
  { month: "Dec", sales: 11200 },
];

const categorySales = [
  { category: "Furniture", amount: 32500 },
  { category: "Clothing", amount: 18700 },
  { category: "Toys", amount: 9800 },
];

export default function AdminPage() {
  const router = useRouter();
  const session = useSession();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);

  useEffect(() => {
    // Fetch products and active auctions
    fetchProducts();
    fetchActiveAuctions();
  }, []);

  const fetchProducts = async () => {
    // Implement product fetching logic
    setProducts([]);
  };

  const fetchActiveAuctions = async () => {
    // Implement active auctions fetching logic
    setActiveAuctions([]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 space-y-6">
        {/* Sidebar content */}
      </aside>

      <div className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "products" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "auctions" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab("auctions")}
          >
            Auctions
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "orders" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "customers" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "settings" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {/* Tab content */}
        <div className="mt-6 space-y-6">
          {/* Products Tab */}
          {activeTab === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Create New Product
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
                    <p className="text-2xl font-bold text-indigo-600">{products.length}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Sales</h3>
                    <p className="text-2xl font-bold text-indigo-600">$100,000.00</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Sale Price</h3>
                    <p className="text-2xl font-bold text-indigo-600">$217.50</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-64">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option>All Categories</option>
                      <option>Furniture</option>
                      <option>Clothing</option>
                      <option>Toys</option>
                    </select>
                  </div>
                  <div>
                    <button className="text-gray-600 px-3 py-2 rounded-md hover:bg-gray-100">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">SKU</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded">
                            {/* Product image would go here */}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">Designer Silk Scarf</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">PRD-1002</td>
                      <td className="px-6 py-4 text-gray-500">Accessories</td>
                      <td className="px-6 py-4 text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Buy Now
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">$95.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr className="text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded">
                            {/* Product image would go here */}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">Antique Brass Lamp</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">PRD-1003</td>
                      <td className="px-6 py-4 text-gray-500">Furniture</td>
                      <td className="px-6 py-4 text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Both
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">$120.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr className="text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded">
                            {/* Product image would go here */}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">Hand-crafted Decorative Bowl</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">PRD-1004</td>
                      <td className="px-6 py-4 text-gray-500">Miscellaneous</td>
                      <td className="px-6 py-4 text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Auction
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">$55.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">127</span> products
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md bg-indigo-50 text-sm text-indigo-600">
                        1
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Auctions Tab */}
          {activeTab === "auctions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Auctions</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Create New Auction
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Auction Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Active Auctions</h3>
                    <p className="text-2xl font-bold text-indigo-600">27</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ending Today</h3>
                    <p className="text-2xl font-bold text-indigo-600">5</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Sale Price</h3>
                    <p className="text-2xl font-bold text-indigo-600">$217.50</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-64">
                      <input
                        type="text"
                        placeholder="Search auctions..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Ending Soon</option>
                      <option>Ended</option>
                      <option>Sold</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <button className="text-gray-600 px-3 py-2 rounded-md hover:bg-gray-100">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      <th className="px-6 py-3">Auction ID</th>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Starting Bid</th>
                      <th className="px-6 py-3">Current Bid</th>
                      <th className="px-6 py-3">Bids</th>
                      <th className="px-6 py-3">End Time</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activeAuctions.map((auction, index) => {
                      const now = new Date();
                      const endTime = new Date(auction.endTime);
                      const difference = endTime.getTime() - now.getTime();
                      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      
                      let timeLeft;
                      if (days > 0) {
                        timeLeft = `${days}d ${hours}h`;
                      } else {
                        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                        timeLeft = `${hours}h ${minutes}m`;
                      }
                      
                      return (
                        <tr key={auction.id} className="text-sm">
                          <td className="px-6 py-4 font-medium text-indigo-600">{auction.id}</td>
                          <td className="px-6 py-4 text-gray-900">{auction.product}</td>
                          <td className="px-6 py-4 text-gray-500">${(auction.currentBid * 0.8).toFixed(2)}</td>
                          <td className="px-6 py-4 text-gray-900">${auction.currentBid}</td>
                          <td className="px-6 py-4 text-gray-500">{auction.bidCount}</td>
                          <td className="px-6 py-4 text-gray-500">{timeLeft}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                            <button className="text-amber-600 hover:text-amber-900 mr-2">End</button>
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">27</span> auctions
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md bg-indigo-50 text-sm text-indigo-600">
                        1
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Placeholder for other tabs */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
              <p className="text-gray-600">Orders management interface would be implemented here.</p>
            </div>
          )}
          
          {activeTab === "customers" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Customers</h1>
              <p className="text-gray-600">Customer management interface would be implemented here.</p>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
              <p className="text-gray-600">Store settings interface would be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 