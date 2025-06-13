'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaShoppingCart, 
  FaHeart, 
  FaTag, 
  FaHistory,
  FaBell,
  FaDownload
} from 'react-icons/fa';

// Import dashboard sections
import SavedConfigurations from './dashboard/SavedConfigurations';
import OrderHistory from './dashboard/OrderHistory';
import Favorites from './dashboard/Favorites';
import Promotions from './dashboard/Promotions';
import AccountSettings from './dashboard/AccountSettings';

// Mock data for user dashboard
import { mockConfigurations, mockOrders, mockFavorites, mockPromotions } from '../data/mockData';
import { useSelector } from 'react-redux';

const defaultUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  avatar: null,
};

export default function CustomerDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('configurations');
  const user = useSelector((state) => state.user);
  console.log(user);
  // Dashboard navigation items
  const navItems = [
    { id: 'configurations', label: 'Saved Configurations', icon: <FaCog /> },
    // { id: 'orders', label: 'Order History', icon: <FaShoppingCart /> },
    // { id: 'favorites', label: 'Favorites', icon: <FaHeart /> },
    // { id: 'promotions', label: 'Promotions', icon: <FaTag /> },
    { id: 'account', label: 'Account Settings', icon: <FaUser /> },
  ];
  console.log(user);
  // Render the active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'configurations':
        return <SavedConfigurations configurations={mockConfigurations} />;
      case 'orders':
        return <OrderHistory orders={mockOrders} />;
      case 'favorites':
        return <Favorites favorites={mockFavorites} />;
      case 'promotions':
        return <Promotions promotions={mockPromotions} />;
      case 'account':
        return <AccountSettings user={user.user} />;
      default:
        return <SavedConfigurations configurations={mockConfigurations} />;
    }
  };
  
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
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src={user.user.data.profilePicture.url || `https://ui-avatars.com/api/?name=${user.user.data.name}&background=54BB74&color=fff`}
                alt={user.user.data.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, {user.user.data.name}</h1>
              <p className="text-gray-400">{user.user.data.email || user.user.data.phone}</p>
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
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#54BB74] text-white'
                          : 'text-gray-300 hover:bg-[#292929]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-6 p-4 bg-[#292929] rounded-lg">
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
          
          {/* App Download Reminder */}
          <div className="mt-6 bg-gradient-to-r from-[#292929] to-[#1e1e1e] rounded-lg p-4 border border-[#54BB74]/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#54BB74]/20 p-2 rounded-full">
                <FaDownload className="text-[#54BB74]" />
              </div>
              <h3 className="text-white font-semibold">LIMI Mobile App</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Get the full experience with our mobile app. Create new configurations and control your lighting.
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
      </div>
    </div>
  );
}
