'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning, colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <></>
    // <motion.button 
    //   className="fixed top-6 right-6 z-50 p-3 rounded-full"
    //   style={{ 
    //     backgroundColor: theme === 'light' ? '#F2F0E6' : '#1e2022',
    //     boxShadow: isHovered 
    //       ? `0 0 0 2px ${colors.primary}40, 0 4px 16px rgba(0,0,0,0.2)` 
    //       : '0 2px 10px rgba(0,0,0,0.1)',
    //     border: `1px solid ${isHovered ? colors.primary : 'transparent'}`
    //   }}
    //   onClick={toggleTheme}
    //   disabled={isTransitioning}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    //   whileHover={{ scale: 1.1 }}
    //   whileTap={{ scale: 0.9 }}
    //   transition={{ type: "spring", stiffness: 400, damping: 15 }}
    // >
    //   <motion.div
    //     initial={false}
    //     animate={{ rotate: theme === 'light' ? 0 : 180 }}
    //     transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
    //   >
    //     {theme === 'light' ? (
    //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2B2D2F">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    //       </svg>
    //     ) : (
    //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#F2F0E6">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    //       </svg>
    //     )}
    //   </motion.div>
      
    //   {/* Ripple effect on click */}
    //   {isTransitioning && (
    //     <motion.div
    //       className="absolute inset-0 rounded-full pointer-events-none"
    //       initial={{ scale: 0, opacity: 1 }}
    //       animate={{ scale: 4, opacity: 0 }}
    //       transition={{ duration: 0.8 }}
    //       style={{ 
    //         backgroundColor: colors.primary,
    //         zIndex: -1
    //       }}
    //     />
    //   )}
    // </motion.button>
  );
}
