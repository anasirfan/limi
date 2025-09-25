"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Hero = ({ variant = "glassmorphism" }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    setMounted(true);
    
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Assembly images array with labels
  const assemblyImages = [
    { src: "/assemblyImages/sens1.png", label: "Camera" },
    { src: "/assemblyImages/sens2.png", label: "Motion Sensor" },
    { src: "/assemblyImages/sens3.png", label: "Temperature" },
    { src: "/assemblyImages/sens4.png", label: "Speaker" },
  
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % assemblyImages.length
      );
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [assemblyImages.length]);

  // Variant configurations
  const variants = {
    glassmorphism: {
      overlay: "bg-black/20 backdrop-blur-sm",
      contentBg: "bg-white/10 backdrop-blur-md border border-white/20",
      textColor: "text-white",
      gradient: "from-transparent via-black/30 to-black/60"
    },
    darkOverlay: {
      overlay: "bg-gradient-to-b from-black/40 via-black/60 to-black/80",
      contentBg: "bg-black/40 backdrop-blur-sm",
      textColor: "text-white",
      gradient: "from-transparent to-black/70"
    },
    redAccent: {
      overlay: "bg-gradient-to-br from-red-900/30 via-black/50 to-black/80",
      contentBg: "bg-black/30 backdrop-blur-lg border border-red-500/20",
      textColor: "text-white",
      gradient: "from-red-900/20 via-black/40 to-black/80"
    }
  };

  const currentVariant = variants[variant] || variants.glassmorphism;

  if (!mounted) return null;

  return (
    <motion.section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ opacity }}
    >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          poster="/api/placeholder/1920/1080" // Fallback poster
        >
          <source src="/limiai/step2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${currentVariant.gradient}`} />
      </motion.div>


      {/* Hero Content - Left Bottom */}
      <motion.div
        className="absolute bottom-32 left-0 px-4 sm:px-0 sm:left-8 z-20 max-w-sm"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: videoLoaded ? 1 : 0, x: videoLoaded ? 0 : -50 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="p-0 sm:p-6 ">
          <motion.h1
            className="text-3xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            LIMI
            <span className="ml-2" style={{ color: '#19b576' }}>
              AI
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/90 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Revolutionary smart room control powered <br/> by AI. Transform spaces into intelligent<br/> environments.
          </motion.p>
          
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link href="/configurator">
              <motion.button
                className="bg-[#19b576] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="text-xs" />
                Experience Demo
              </motion.button>
            </Link>
            
            <Link href="/features">
              <motion.button
                className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold text-sm backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <FaArrowRight className="text-xs" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Assembly Images Carousel */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: videoLoaded ? 1 : 0, y: videoLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {/* Desktop View - 3 images side by side */}
          <div className="hidden sm:flex">
            {[0, 1, 2].map((position) => {
              const imageIndex = (currentImageIndex + position) % assemblyImages.length;
              const currentImage = assemblyImages[imageIndex];
              return (
                <motion.div
                  key={position}
                  className="flex flex-col items-center mr-4"
                  initial={{ x: position * 140 }}
                  animate={{ 
                    x: 0,
                    scale: position === 1 ? 1.1 : 0.9,
                    opacity: position === 1 ? 1 : 0.7
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden shadow-lg mb-2">
                    <Image
                      src={currentImage.src}
                      alt={currentImage.label}
                      fill
                      className="object-cover"
                    />
                    {/* Image overlay with subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Image Label */}
                  <motion.span
                    className="text-xs text-white/90 font-medium text-center"
                    animate={{
                      opacity: position === 1 ? 1 : 0.6,
                      scale: position === 1 ? 1 : 0.9
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {currentImage.label}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile View - Three images with center focus */}
          <div className="sm:hidden flex flex-col items-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[0, 1, 2].map((position) => {
                const imageIndex = (currentImageIndex + position) % assemblyImages.length;
                const currentImage = assemblyImages[imageIndex];
                const isCenter = position === 1;
                
                return (
                  <motion.div
                    key={position}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.6,
                      scale: isCenter ? 1 : 0.7,
                      y: isCenter ? 0 : 10
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className={`relative rounded-lg overflow-hidden shadow-lg mb-2 ${
                      isCenter ? 'w-32 h-20' : 'w-20 h-12'
                    }`}>
                      <Image
                        src={currentImage.src}
                        alt={currentImage.label}
                        fill
                        className="object-cover"
                      />
                      {/* Image overlay with subtle gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    
                    {/* Image Label - only show for center image */}
                    {isCenter && (
                      <span className="text-xs text-white font-medium text-center">
                        {currentImage.label}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {assemblyImages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-[#54bb74] scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

    </motion.section>
  );
};

export default Hero;
                     