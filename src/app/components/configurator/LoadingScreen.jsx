"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isVisible }) => {
  // Debug loading screen visibility changes
  useEffect(() => {
    console.log('🎬 LoadingScreen - isVisible changed:', isVisible);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Spinning loader */}
            <div className="w-12 h-12 border-3 border-gray-600 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium font-['Amenti']">Loading pendant...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
