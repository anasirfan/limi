'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Background() {
  useEffect(() => {
    // Initialize UnicornStudio if not already loaded
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = function() {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <>
      {/* UnicornStudio Animation Background */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <div 
          data-us-project="Zo9EUimNU9eK9HEjh9bh" 
          className="w-full h-full min-w-[1440px] min-h-[900px]"
          style={{
            transform: 'scale(1.2)',
            filter: 'brightness(0.6) contrast(1.1)',
          }}
        />
      </div>

      {/* Dark overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0f0f23]/70" />
       */}
      {/* Additional atmospheric layers for depth */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 1000px 600px at 40% 50%, rgba(0,150,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          mixBlendMode: 'overlay'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 60% 30%, rgba(100,200,255,0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen'
        }}
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </>
  );
}
