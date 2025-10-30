"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { buildApi1Url, API_CONFIG } from '../../config/api.config';
import {
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaUserCircle,
  FaDownload,
} from "react-icons/fa";

// Import dashboard sections
import SavedConfigurations from "./dashboard/SavedConfigurations";
import OrderHistory from "./dashboard/OrderHistory";
import Favorites from "./dashboard/Favorites";
import Promotions from "./dashboard/Promotions";
import AccountSettings from "./dashboard/AccountSettings";

// Mock data for user dashboard
import {
  mockConfigurations,
  mockOrders,
  mockFavorites,
  mockPromotions,
} from "../data/mockData";
import { useSelector } from "react-redux";

export default function CustomerDashboard({ onLogout }) {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("configurations");
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  
  // Function to get user initials from username (e.g., 'suzair khan' -> 'SK')
  const getUserInitials = () => {
    const username = user?.user?.data?.username || '';
    
    if (username) {
      const nameParts = username.trim().split(/\s+/);
      if (nameParts.length >= 2) {
        // Get first letter of first and last name parts
        return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
      } else if (nameParts.length === 1 && nameParts[0]) {
        // If only one name part exists, use its first letter
        return nameParts[0].charAt(0).toUpperCase();
      }
    }
    // Default fallback
    return 'U';
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("limiToken");
        if (token) {
          const response = await fetch(
            buildApi1Url(API_CONFIG.ENDPOINTS.USER_PROFILE),
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            dispatch(updateUser(userData));
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [dispatch]);
  // Dashboard navigation items
  const navItems = [
    { id: "configurations", label: "Saved Configurations", icon: <FaCog /> },
    // { id: 'orders', label: 'Order History', icon: <FaShoppingCart /> },
    // { id: 'favorites', label: 'Favorites', icon: <FaHeart /> },
    // { id: 'promotions', label: 'Promotions', icon: <FaTag /> },
    { id: "account", label: "Account Settings", icon: <FaUser /> },
  ];

  const handleUserUpdate = (updatedUser) => {
    // Update the Redux store with the new user data
    dispatch(updateUser(updatedUser));
  };

  // Render the active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "configurations":
        return <SavedConfigurations configurations={mockConfigurations} />;
      case "orders":
        return <OrderHistory orders={mockOrders} />;
      case "favorites":
        return <Favorites favorites={mockFavorites} />;
      case "promotions":
        return <Promotions promotions={mockPromotions} />;
      case "account":
        return (
          <AccountSettings user={user.user} onUserUpdate={handleUserUpdate} />
        );
      default:
        return <SavedConfigurations configurations={mockConfigurations} />;
    }
  };

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#54BB74]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-[#1e1e1e] rounded-lg p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-emerald flex items-center justify-center">
              {user?.user?.data?.profilePicture?.url ? (
                <Image
                  src={user?.user?.data?.profilePicture?.url}
                  alt={user?.user?.data?.username || "User"}
                  fill
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold text-charleston-green">
                  {getUserInitials()}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {user.user.data.username}
              </h1>
              <p className="text-gray-400">
                {user.user.data.email || user.user.data.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="relative p-2 text-gray-400 hover:text-white">
              <FaBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#54BB74] rounded-full"></span>
            </button> */}

            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-[#292929] text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1"
        >
          <div className="bg-[#1e1e1e] rounded-lg p-4">
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-[#54BB74] text-white"
                          : "text-gray-300 hover:bg-[#292929]"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden sm:flex">
              <div className="mt-6 p-4 bg-[#292929] rounded-lg">
                <h3 className="text-white font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Contact our support team for assistance with your LIMI
                  products.
                </p>
                <Link
                  href="/support"
                  className="text-[#54BB74] text-sm hover:underline flex items-center gap-1"
                >
                  <span>Contact Support</span>
                  <FaDownload className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>

          {/* App Download Reminder */}
          <div className="hidden sm:flex">
            <div className="mt-6 bg-gradient-to-r from-[#292929] to-[#1e1e1e] rounded-lg p-4 border border-[#54BB74]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#54BB74]/20 p-2 rounded-full">
                  <FaDownload className="text-[#54BB74]" />
                </div>
                <h3 className="text-white font-semibold">LIMI Mobile App</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Get the full experience with our mobile app. Create new
                configurations and control your lighting.
              </p>
              <div className="flex gap-2">
                <Link
                  href="https://apps.apple.com/app/limi-lighting"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1 bg-[#292929] text-white text-sm py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  iOS
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.limi.lighting"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1 bg-[#292929] text-white text-sm py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  Android
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-3"
        >
          <div className="bg-[#1e1e1e] rounded-lg p-6">
            {renderSectionContent()}
          </div>
        </motion.div>
        <div className="sm:hidden flex">
          <div className="mt-6 bg-gradient-to-r  from-[#292929] to-[#1e1e1e] rounded-lg p-4 border border-[#54BB74]/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#54BB74]/20 p-2 rounded-full">
                <FaDownload className="text-[#54BB74]" />
              </div>
              <h3 className="text-white font-semibold">LIMI Mobile App</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Get the full experience with our mobile app. Create new
              configurations and control your lighting.
            </p>
            <div className="flex gap-2">
              <Link
                href="https://apps.apple.com/app/limi-lighting"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1 bg-[#292929] text-white text-sm py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                iOS
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.limi.lighting"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1 bg-[#292929] text-white text-sm py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                Android
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:hidden flex">
          <div className="p-4 bg-[#292929] border border-[#54BB74]/30 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-400 text-sm mb-3">
              Contact our support team for assistance with your LIMI products.
            </p>
            <Link
              href="/support"
              className="text-[#54BB74] text-sm hover:underline flex items-center gap-1"
            >
              <span>Contact Support</span>
              <FaDownload className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
