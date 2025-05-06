"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import ProductModal from './ProductModal';

const ProductCard = ({ product, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsModalOpen(true)}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        {/* Product Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={product.name} 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292929]/80 to-transparent" />
        </div>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-sm opacity-90 mb-3">{product.tagline}</p>
          
          <motion.div 
            className="flex items-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mr-2">View Details</span>
            <FaArrowRight size={12} />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal 
            product={product} 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCard;
