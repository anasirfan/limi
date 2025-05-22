"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlay, FiPause } from "react-icons/fi";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  
  // Unsplash fallback images for lighting products
  const unsplashFallbacks = [
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000",
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1000",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000",
    "https://images.unsplash.com/photo-1507149677524-25f85f4c0347?q=80&w=1000"
  ];
  
  // Get a deterministic image based on product id
  const getUnsplashImage = (offset = 0) => {
    if (!product) return unsplashFallbacks[0];
    const index = ((product.id + offset - 1) % unsplashFallbacks.length);
    return unsplashFallbacks[index];
  };
  
  // Sample video URL (replace with actual product videos when available)
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32809-large.mp4";
  
  // Toggle video playback
  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  // Stop video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isOpen]);
  
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0  flex items-center justify-center z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-75" style={{ backdropFilter: 'blur(5px)' }}></div>
          
          {/* Modal Container */}
          <motion.div 
            className="relative bg-[#2B2D2F] w-[90%] max-w-4xl rounded-xl shadow-2xl overflow-auto z-[9999]"
            style={{ maxHeight: 'min(85vh, 800px)', height: 'auto', marginTop: '4rem' }}
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-3 z-10">
              <button 
                onClick={onClose}
                className="p-1 text-[#292929] bg-white rounded-full hover:bg-[#54BB74] hover:text-white transition-colors duration-300 shadow-md"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-[#292929]'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'gallery' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-[#292929]'}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  Gallery
                </button>
                {/* <button
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'video' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-[#292929]'}`}
                  onClick={() => setActiveTab('video')}
                >
                  Video
                </button> */}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative rounded-lg overflow-hidden" style={{ height: 'min(50vh, 350px)' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="h-full w-full"
                    >
                      <Image 
                        src={product.image || getUnsplashImage()}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </motion.div>
                    
                    {/* Floating product name overlay */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#292929] to-transparent p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-1">{product.name}</h2>
                      <p className="text-xl text-white opacity-80">{product.tagline}</p>
                    </motion.div>
                  </div>
                  
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-white mb-8 text-lg leading-relaxed">{product.description || "Beautiful smart lighting designed to transform your space with minimal effort. Our modular system allows for endless customization to fit your unique style."}</p>
                      
                      <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                      <ul className="mb-8 space-y-3">
                        {product.features ? (
                          product.features.map((feature, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                            >
                              <span className="text-[#54BB74] text-xl mr-3">•</span>
                              <span className="text-white text-lg">{feature}</span>
                            </motion.li>
                          ))
                        ) : (
                          // Fallback features if none are provided
                          [
                            "Smart connectivity built-in",
                            "Premium materials and finishes",
                            "Easy installation with no special tools",
                            "Energy efficient design"
                          ].map((feature, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                            >
                              <span className="text-[#54BB74] text-xl mr-3">•</span>
                              <span className="text-white text-lg">{feature}</span>
                            </motion.li>
                          ))
                        )}
                      </ul>
                      
                      <motion.button 
                        className="bg-[#54BB74] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#48a064] transition-colors duration-300 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Configure Your Light
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              )}
              
              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div>
                  {/* Determine grid columns based on screen size and image count */}
                  {(() => {
                    // Get gallery images or use fallbacks
                    const hasGallery = product.galleryImages && product.galleryImages.length > 0;
                    const galleryImages = hasGallery ? product.galleryImages : [
                      getUnsplashImage(0),
                      getUnsplashImage(1),
                      getUnsplashImage(2),
                      getUnsplashImage(3),
                      getUnsplashImage(4),
                      getUnsplashImage(5)
                    ];
                    
                    // Determine grid columns for desktop based on image count
                    let desktopGridClass = "md:grid-cols-3";
                    if (galleryImages.length <= 4) {
                      desktopGridClass = "md:grid-cols-2";
                    }
                    
                    return (
                      <motion.div 
                        className={`grid grid-cols-1 ${desktopGridClass} gap-6`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Map through gallery images */}
                        {galleryImages.slice(0, 6).map((imageSrc, index) => (
                          <motion.div 
                            key={index} 
                            className="relative h-64 rounded-xl overflow-hidden"
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.05 * index,
                              hover: { duration: 0.3 }
                            }}
                          >
                            <Image 
                              src={imageSrc}
                              alt={`${product.name} - Image ${index + 1}`}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-xl"
                            />
                            
                            {/* Hover overlay */}
                            <motion.div 
                              className="absolute inset-0 bg-[#292929] bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
                              whileHover={{ backgroundColor: 'rgba(41, 41, 41, 0.3)' }}
                            >
                              <motion.div 
                                className="bg-[#54BB74] p-3 rounded-full opacity-0 scale-50 transform"
                                whileHover={{ opacity: 1, scale: 1 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    );
                  })()}
                </div>
              )}
              
              {/* Video Tab */}
              {activeTab === 'video' && (
                <motion.div 
                  className="relative rounded-xl overflow-hidden aspect-video"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <video 
                    ref={videoRef}
                    src={product.video || videoUrl}
                    className="w-full h-full object-cover"
                    onClick={toggleVideo}
                    loop
                    poster={product.image || getUnsplashImage()}
                  />
                  
                  {/* Video controls overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 flex items-center justify-center cursor-pointer"
                    whileHover={{ opacity: 0.7 }}
                    onClick={toggleVideo}
                  >
                    <motion.div 
                      className="bg-[#54BB74] p-6 rounded-full shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isVideoPlaying ? (
                        <FiPause className="text-white" size={32} />
                      ) : (
                        <FiPlay className="text-white" size={32} />
                      )}
                    </motion.div>
                    
                    {/* Video title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-2xl font-bold">{product.name}</h3>
                      <p className="text-white opacity-80">{product.tagline}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
