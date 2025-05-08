'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerticalNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Define emerald color from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  // Only show nav after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 200 && 
            scrollPosition < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items with icons
  const navItems = [
    { 
      id: 'hero', 
      label: 'Home', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      id: 'product-showcase', 
      label: 'Products', 
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' 
    },
    { 
      id: 'how-it-works', 
      label: 'How It Works', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z' 
    },
    { 
      id: 'configurator', 
      label: 'Configurator', 
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' 
    },
    { 
      id: 'our-story', 
      label: 'Our Story', 
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
    },
    { 
      id: 'timeline', 
      label: 'Timeline', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7zM3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z' 
    }
  ];
  
  // Scroll to section function
  const scrollToSection = (id) => {
    let targetElement;
    
    // Special case for hero section which might not have an ID
    if (id === 'hero') {
      targetElement = document.querySelector('main > div:first-of-type');
    } else {
      // Special case for How It Works section
      if (id === 'how-it-works') {
        targetElement = document.querySelector('.HowItWorks');
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
          return;
        }
      }
      
      // Try to find by ID first
      targetElement = document.getElementById(id);
      
      // If not found by ID, try data-section attribute (used in some components)
      if (!targetElement) {
        targetElement = document.querySelector(`section[data-section="${id}"]`);
      }
      
      // If still not found, try to find by component name
      if (!targetElement) {
        const sectionMap = {
          'product-showcase': 'ProductShowcase',
          'configurator': 'InteractiveConfigurator',
          'our-story': 'OurStory',
          'timeline': 'Timeline'
        };
        
        if (sectionMap[id]) {
          targetElement = document.querySelector(`.${sectionMap[id]}`);
        }
      }
    }
    
    // If element found, scroll to it
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 p-3 rounded-full"
            style={{ 
              backgroundColor: charlestonGreen,
              boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
            }}
          >
            {navItems.map(item => (
              <motion.button
                key={item.id}
                className="relative flex items-center justify-center w-10 h-10 rounded-full"
                style={{ 
                  backgroundColor: activeSection === item.id ? emerald : 'transparent',
                  color: activeSection === item.id ? '#FFFFFF' : `${textColor}80`
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: activeSection === item.id ? emerald : `${emerald}20`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Navigate to ${item.label} section`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-2 px-3 py-1 rounded whitespace-nowrap text-sm font-medium pointer-events-none"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ 
                    backgroundColor: charlestonGreen,
                    color: textColor,
                    boxShadow: `0 2px 10px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
                  }}
                >
                  {item.label}
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
