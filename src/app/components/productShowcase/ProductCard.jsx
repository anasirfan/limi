"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useModal } from '../context/ModalContext';

const ProductCard = ({ product, className = '', isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openModal } = useModal();
  
  // Refs for animations
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  
  // Handle card expansion toggle
  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevent opening modal
    
    // On mobile, open the modal instead of expanding
    if (isMobile) {
      openModal(product);
    } else {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Handle collapse button click
  const handleCollapse = (e) => {
    e.stopPropagation(); // Prevent opening modal
    setIsExpanded(false);
  };
  
  // Handle card click - open modal only if not clicking expand button
  const handleCardClick = () => {
    if (!isExpanded) {
      openModal(product);
    }
  };

  // Fallback image from Unsplash if product image is not available
  const unsplashFallbacks = [
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000",
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1000",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000",
    "https://images.unsplash.com/photo-1507149677524-25f85f4c0347?q=80&w=1000"
  ];
  
  const getUnsplashImage = () => {
    const index = (product.id - 1) % unsplashFallbacks.length;
    return unsplashFallbacks[index];
  };
  
  const imageSrc = product.image || getUnsplashImage();

  return (
    <div 
      ref={cardRef}
      className={`relative w-full h-full ${className} ${isExpanded ? 'z-20' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <motion.div
        className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isExpanded ? 'bg-[#2B2D2F]' : ''}`}
        whileHover={{
          y: -5,
          filter: 'brightness(0.85) contrast(1.1)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
      >
        {/* Product Image */}
        <div className="absolute inset-0 overflow-hidden brightness-110 contrast-110">
          <Image 
            src={imageSrc} 
            alt={product.name} 
            fill
            
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292929]/60 to-transparent" />
        </div>

        {/* Product Info - Only show when not expanded */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-sm opacity-90 mb-3">{product.tagline}</p>
            
            {/* Expand Button */}
            <motion.button 
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-800"
              onClick={toggleExpand}
              whileHover={{ scale: 1.1, backgroundColor: '#50C878', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <FaPlus size={12} />
            </motion.button>
          </div>
        )}
        
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              ref={contentRef}
              className="absolute bottom-0 left-0 right-0 bg-[#2B2D2F] p-4 rounded-b-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
              <p className="text-white text-sm mb-4">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <motion.button
                  className="text-[#50C878] text-sm font-semibold flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(product);
                  }}
                  whileHover={{ x: 3 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <span className="mr-2">View Full Details</span>
                  <FaArrowRight size={10} />
                </motion.button>
                
                <motion.button 
                  className="text-[#50C878] p-2 rounded-full bg-white/10"
                  onClick={handleCollapse}
                  whileHover={{ scale: 1.1, backgroundColor: '#50C878', color: 'white' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaMinus size={12} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductCard;
