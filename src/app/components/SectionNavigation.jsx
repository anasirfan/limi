'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SectionNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [sections, setSections] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  // Detect sections and handle scroll events
  useEffect(() => {
    // Find all main sections in the page
    const detectSections = () => {
      // Look for main components in the page
      const mainComponents = [
        { id: 'hero', label: 'Home', selector: '#hero, .HeroSection', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'products', label: 'Products', selector: '#products, .ProductShowcase', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
        { id: 'how-it-works', label: 'How It Works', selector: '#how-it-works, .HowItWorks', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'configurator', label: 'Configurator', selector: '#configurator, .InteractiveConfigurator', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
        { id: 'our-story', label: 'Our Story', selector: '#our-story, .OurStory', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { id: 'timeline', label: 'Timeline', selector: '#timeline, .TimelineAchievements', icon: 'M13 16.75a.75.75 0 01-.75-.75V4.56l-3.32 3.29a.75.75 0 11-1.06-1.06l4.59-4.5a.75.75 0 011.06 0l4.59 4.5a.75.75 0 01-1.06 1.06l-3.32-3.29V16a.75.75 0 01-.75.75h.02zm-5.5-3.5a.75.75 0 01.75.75v2.25h9.5v-2.25a.75.75 0 011.5 0v3a.75.75 0 01-.75.75h-11a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75z' }
      ];
      
      // Filter to only include sections that exist on the page
      const foundSections = mainComponents.filter(section => {
        const element = document.querySelector(section.selector);
        return element !== null;
      });
      
      setSections(foundSections);
    };
    
    // Wait for components to render
    setTimeout(detectSections, 1000);
    
    // Handle scroll to determine active section and visibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / scrollHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollPosition > 300);
      
      // Find the active section based on scroll position
      sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionHeight = rect.height;
          
          if (scrollPosition >= sectionTop - 200 && 
              scrollPosition < sectionTop + sectionHeight - 200) {
            setActiveSection(section.id);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  // Scroll to section function
  const scrollToSection = (id) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const element = document.querySelector(section.selector);
      if (element) {
        // Special handling for How It Works section
        if (id === 'how-it-works') {
            
          // Find the specific HowItWorks component
          const howItWorksElement = document.querySelector('#products');
          if (howItWorksElement) {
            
            window.scrollTo({
              top: howItWorksElement.offsetTop + 1800,
              behavior: 'smooth'
            });
            return;
          }
        }
        
        // Default scrolling for other sections
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && sections.length > 0 && (
        <motion.div
          className={`fixed z-50 ${isMobile ? 'bottom-6 left-[2%]' : 'right-4 top-1/3 -translate-y-1/2'}`}
          style={{
            width: isMobile ? 'auto' : 'auto',
            margin: isMobile ? '0 auto' : '0'
          }}
          initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scroll progress indicator - only visible on desktop */}
          <div className="absolute right-0 top-0 bottom-0 w-1 rounded-full bg-gray-700 -translate-y-[5%] translate-x-[20px] h-[110%] hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full rounded-full" 
              style={{ 
                backgroundColor: emerald,
                height: `${scrollProgress}%`,
                transition: 'height 0.1s ease-out'
              }}
            />
          </div>
          
          {/* Mobile progress bar - horizontal at bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-gray-700 translate-y-[20px] md:hidden w-full">
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full" 
              style={{ 
                backgroundColor: emerald,
                width: `${scrollProgress}%`,
                transition: 'width 0.1s ease-out'
              }}
            />
          </div>
          
          <motion.div
            className={`p-3 rounded-full flex items-center ${isMobile ? 'flex-row gap-3' : 'flex-col gap-4'}`}
            style={{ 
              backgroundColor: charlestonGreen,
              boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
            }}
          >
            {/* Navigation items */}
            <div className={`flex ${isMobile ? 'flex-row gap-2' : 'flex-col gap-6'}`}>
              {sections.map((section) => (
                <div key={section.id} className="relative group">
                  <motion.button
                    className={`rounded-full flex items-center justify-center transition-all duration-300 ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}
                    style={{
                      backgroundColor: activeSection === section.id ? emerald : 'transparent',
                      color: activeSection === section.id ? '#FFFFFF' : `${textColor}80`
                    }}
                    onClick={() => scrollToSection(section.id)}
                    aria-label={`Navigate to ${section.label} section`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: window.innerWidth >= 768 ? 20 : 0, x: window.innerWidth >= 768 ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: 0.1 * sections.indexOf(section) 
                    }}
                   
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
                    </svg>
                    
                  
                  </motion.button>
                  
                  {/* Tooltip - different positioning for mobile/desktop */}
                  <motion.div 
                    className={`absolute pointer-events-none ${isMobile ? 'bottom-full mb-2 ' : 'right-full mr-3 top-1/2 -translate-y-1/2'}`}
                    initial={{ opacity: 0, y: isMobile ? 10 : 0, x: isMobile ? 0 : 10 }}
                    whileHover={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="py-1 px-3 rounded whitespace-nowrap shadow-lg text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      style={{ 
                        backgroundColor: charlestonGreen,
                        color: textColor,
                        boxShadow: `0 2px 10px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
                      }}
                    >
                      {section.label}
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
