'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TeamMember from './TeamMember';
import { useTheme } from './ThemeContext';

// Team member data with Unsplash images in 1:1 ratio
const teamMembers = [
  {
    name: 'Umer Asif',
    title: 'CEO & Founder',
    fact: '15+ years in lighting design',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&h=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/umerasif',
    bio: 'With over 15 years in lighting design and technology, Umer founded LIMI to revolutionize smart lighting with modular solutions.',
    achievement: 'Founded LIMI in 2020 with a vision to create lighting that evolves with users'
  },
  {
    name: 'Karen Law',
    title: 'Chief Technology Officer',
    fact: 'IoT & Smart Home Expert',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/karenlaw',
    bio: 'Karen leads our R&D team, bringing her expertise in IoT and smart home technology to create our innovative lighting systems.',
    achievement: 'Developed LIMI proprietary modular, future-ready platform that merges style with intelligence'
  },
  {
    name: 'Shahrukh Ahmed',
    title: 'Chief Operations Officer',
    fact: 'Operations & Supply Chain Expert',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&h=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/shahrukhahmed',
    bio: 'Shahrukh oversees our global operations, ensuring seamless production and delivery of LIMI products to customers worldwide.',
    achievement: 'Established LIMI universal connector system and specially engineered mounting bracket'
  }
];

export default function TeamSection() {
  const teamRef = useRef(null);
  const carouselRef = useRef(null);
  const { colors } = useTheme();
  
  // State for carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  // Calculate card width for proper centering with adjacent cards visible
  const getCardWidth = () => {
    if (!carouselRef.current) return 0;
    // Main card takes 60% of the container width on desktop, 90% on mobile
    const isMobile = window.innerWidth < 768;
    return carouselRef.current.offsetWidth * (isMobile ? 0.9 : 0.6);
  };

  // Calculate scroll position for a given index
  const getScrollPosition = (index) => {
    if (!carouselRef.current) return 0;
    const cardWidth = getCardWidth();
    const containerWidth = carouselRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    
    // Calculate offset to center the card properly
    const offset = (containerWidth - cardWidth) / 2;
    
    // For mobile, we need to adjust the calculation to ensure proper centering
    // This ensures all slides (including middle ones) are centered correctly
    return (index * cardWidth) - offset + (isMobile ? 0 : 0);
  };

  // Handle mouse events for carousel dragging
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setAutoScrollEnabled(false);
  };

  const handleMouseUp = () => {
    if (!carouselRef.current || !isDragging) return;
    setIsDragging(false);
    
    // Snap to closest card
    const cardWidth = getCardWidth();
    const scrollPosition = carouselRef.current.scrollLeft;
    const containerWidth = carouselRef.current.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    const adjustedPosition = scrollPosition + offset;
    const newIndex = Math.round(adjustedPosition / cardWidth);
    const safeIndex = Math.min(Math.max(0, newIndex), teamMembers.length - 1);
    
    setActiveIndex(safeIndex);
    
    // Smooth scroll to the card
    carouselRef.current.scrollTo({
      left: getScrollPosition(safeIndex),
      behavior: 'smooth'
    });
    
    // Re-enable auto-scroll after a delay
    setTimeout(() => setAutoScrollEnabled(true), 5000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setAutoScrollEnabled(false);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].clientX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchEnd = () => {
    if (!carouselRef.current || !isDragging) return;
    setIsDragging(false);
    
    // Snap to closest card using the same logic as handleMouseUp
    const cardWidth = getCardWidth();
    const scrollPosition = carouselRef.current.scrollLeft;
    const containerWidth = carouselRef.current.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    const adjustedPosition = scrollPosition + offset;
    const newIndex = Math.round(adjustedPosition / cardWidth);
    const safeIndex = Math.min(Math.max(0, newIndex), teamMembers.length - 1);
    
    setActiveIndex(safeIndex);
    
    // Smooth scroll to the card
    carouselRef.current.scrollTo({
      left: getScrollPosition(safeIndex),
      behavior: 'smooth'
    });
    
    // Re-enable auto-scroll after a delay
    setTimeout(() => setAutoScrollEnabled(true), 5000);
  };
  
  // Handle navigation
  const navigateCarousel = (direction) => {
    if (!carouselRef.current) return;
    
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < teamMembers.length) {
      setActiveIndex(newIndex);
      carouselRef.current.scrollTo({
        left: getScrollPosition(newIndex),
        behavior: 'smooth'
      });
      setAutoScrollEnabled(false);
      setTimeout(() => setAutoScrollEnabled(true), 5000);
    }
  };
  
  // Auto-scroll effect
  useEffect(() => {
    if (!autoScrollEnabled) return;
    
    const interval = setInterval(() => {
      if (!isDragging && carouselRef.current) {
        const nextIndex = (activeIndex + 1) % teamMembers.length;
        setActiveIndex(nextIndex);
        carouselRef.current.scrollTo({
          left: getScrollPosition(nextIndex),
          behavior: 'smooth'
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isDragging, teamMembers.length, autoScrollEnabled]);
  
  // Initial scroll position
  useEffect(() => {
    if (carouselRef.current) {
      // Set initial scroll position to center the first card
      carouselRef.current.scrollLeft = getScrollPosition(activeIndex);
    }
  }, []);

  return (
    <section data-section="team" ref={teamRef} className="mb-20" aria-labelledby="team-section-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-8"
      >
        <h3 
          id="team-section-title"
          className="text-3xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          The People Behind the Light
        </h3>
        
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: `${colors.text}99` }}
        >
          We&apos;re a team of designers, engineers, and dreamers who believe light should be limitless.
        </p>
      </motion.div>
      
      {/* Carousel container */}
      <div className="relative max-w-4xl mx-auto px-10 mb-8" aria-label="Team members carousel">
        {/* Navigation arrows */}
        <motion.button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full"
          style={{ 
            backgroundColor: "#1e2022",
            color: colors.text,
            boxShadow: `0 0 0 1px ${colors.primary}30`
          }}
          onClick={() => navigateCarousel(-1)}
          whileHover={{ scale: 1.1, backgroundColor: colors.primary, color: "#FFFFFF" }}
          whileTap={{ scale: 0.95 }}
          disabled={activeIndex === 0}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: activeIndex === 0 ? 0.4 : 1 }}
          aria-label="Previous team member"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <motion.button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full"
          style={{ 
            backgroundColor: "#1e2022",
            color: colors.text,
            boxShadow: `0 0 0 1px ${colors.primary}30`
          }}
          onClick={() => navigateCarousel(1)}
          whileHover={{ scale: 1.1, backgroundColor: colors.primary, color: "#FFFFFF" }}
          whileTap={{ scale: 0.95 }}
          disabled={activeIndex === teamMembers.length - 1}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: activeIndex === teamMembers.length - 1 ? 0.4 : 1 }}
          aria-label="Next team member"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="overflow-x-scroll scrollbar-hide snap-x snap-mandatory flex gap-4 md:gap-6 py-4 px-2 md:px-4"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            scrollPaddingLeft: "5%",
            scrollPaddingRight: "5%",
            scrollBehavior: "smooth"
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Team members"
        >
          {/* Add a spacer at the beginning for proper centering */}
          <div className="flex-none w-[5%] md:w-[10%]"></div>
          
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="flex-none w-[90%] md:w-[60%] snap-center px-2 transition-all duration-300"
              style={{
                opacity: index === activeIndex ? 1 : 0.6,
                transform: index === activeIndex ? 'scale(1)' : 'scale(0.95)',
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${member.name}, ${member.title}`}
              aria-current={index === activeIndex ? "true" : "false"}
            >
              <TeamMember 
                member={member}
                index={index}
                isActive={index === activeIndex}
              />
            </div>
          ))}
          
          {/* Add a spacer at the end for proper centering */}
          <div className="flex-none w-[5%] md:w-[10%]"></div>
          
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Team member navigation">
          {teamMembers.map((member, index) => (
            <motion.button
              key={index}
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: index === activeIndex ? colors.primary : `${colors.text}40`,
                transition: "all 0.3s ease"
              }}
              onClick={() => {
                if (!carouselRef.current) return;
                setActiveIndex(index);
                carouselRef.current.scrollTo({
                  left: getScrollPosition(index),
                  behavior: "smooth"
                });
                setAutoScrollEnabled(false);
                setTimeout(() => setAutoScrollEnabled(true), 5000);
              }}
              whileHover={{ scale: 1.5 }}
              animate={{ 
                scale: index === activeIndex ? 1.5 : 1,
                opacity: index === activeIndex ? 1 : 0.6,
                boxShadow: index === activeIndex ? `0 0 10px ${colors.primary}80` : "none"
              }}
              aria-label={`Show ${member.name}`}
              aria-selected={index === activeIndex ? "true" : "false"}
              role="tab"
            />
          ))}
        </div>
      </div>
      
      <motion.p 
        className="text-sm text-center mt-4 max-w-xl mx-auto"
        style={{ color: `${colors.text}80` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Our team spans 5 countries, working around the clock to revolutionize lighting. Swipe or use the arrows to meet more team members.
      </motion.p>
    </section>
  );
}
