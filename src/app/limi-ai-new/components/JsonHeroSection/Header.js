'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const navigation = [
    { text: "Pricing", href: "#" },
    { text: "Resources", href: "#", dropdown: true, isOpen: isResourcesOpen, setIsOpen: setIsResourcesOpen },
    { text: "Community", href: "#", dropdown: true, isOpen: isCommunityOpen, setIsOpen: setIsCommunityOpen },
    { text: "Download", href: "#" }
  ];

  return (
    <motion.header 
      className="absolute top-0 left-0 right-0 z-50 px-4 md:px-15 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-white font-bold text-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          LIMI AI
        </motion.div>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item, index) => (
            <div key={index} className="relative">
              {item.dropdown ? (
                <motion.button
                  className="text-white text-base hover:text-[#FF5733] transition-colors duration-200 flex items-center"
                  onClick={() => item.setIsOpen(!item.isOpen)}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.text}
                  <motion.svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: item.isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
              ) : (
                <motion.a
                  href={item.href}
                  className="text-white text-base hover:text-[#FF5733] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.text}
                </motion.a>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Star Us Button */}
          <motion.button
            className="hidden md:flex items-center text-white hover:opacity-80 transition-opacity duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Star Us
          </motion.button>

          {/* Sign In Button */}
          <motion.button
            className="hidden md:block text-white border border-white px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SIGN IN
          </motion.button>

          {/* Sign Up Button */}
          <motion.button
            className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-[#FF5733] hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SIGN UP
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
