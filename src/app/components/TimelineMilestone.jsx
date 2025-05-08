'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TimelineMilestone({ milestone, isMobile }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  const {
    id,
    year,
    title,
    description,
    icon: Icon,
    position,
    color,
    image,
    highlight,
    isFuture
  } = milestone;
  
  // For mobile, all milestones are on the right side
  const effectivePosition = isMobile ? 'right' : position;
  
  // Highlight specific text in the description
  const renderHighlightedDescription = () => {
    if (!highlight) return description;
    
    const parts = description.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="font-medium" style={{ color }}>{highlight}</span>
        {parts[1]}
      </>
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className={`timeline-milestone mb-16 md:mb-24 flex items-center ${
        effectivePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
      data-position={effectivePosition}
    >
      {/* Content container */}
      <motion.div 
        className={`relative z-10 w-full md:w-5/12 p-5 rounded-lg ${
          isFuture ? 'bg-[#2B2D2F]/50 backdrop-blur-sm' : 'bg-[#2B2D2F]'
        } shadow-lg border border-[#3A3D42]`}
        whileHover={{ 
          y: -5,
          boxShadow: `0 10px 25px -5px ${color}40, 0 0 15px -3px ${color}30`,
          borderColor: color,
          transition: { duration: 0.3 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Year badge */}
        <div 
          className="absolute -top-3 px-3 py-1 rounded-full text-sm font-semibold"
          style={{ 
            backgroundColor: color,
            color: '#1F1F1F',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {year}
        </div>
        
        {/* Content */}
        <div className="mt-4">
          <div className="flex items-center mb-3">
            <div 
              className="mr-3 p-2 rounded-full"
              style={{ backgroundColor: `${color}30` }}
            >
              <i 
                className="w-5 h-5"
                style={{ color }}
              />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-4">
            {renderHighlightedDescription()}
          </p>
          
          {/* Image preview - expanded on click for mobile */}
          <div 
            className={`overflow-hidden rounded-md transition-all duration-300 ${
              isExpanded ? 'h-48 md:h-32 opacity-100' : 'h-0 opacity-0 md:h-32 md:opacity-100'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image || 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=800&h=600&auto=format&fit=crop'}
                alt={title}
                fill
                className="object-cover transition-transform duration-700"
                style={{ 
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  filter: isFuture ? 'blur(2px) brightness(0.8)' : 'none'
                }}
                sizes="(max-width: 768px) 100vw, 400px"
                priority={id < 4} // Prioritize loading the first few images
              />
              
              {/* Overlay for future milestones */}
              {isFuture && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <p className="text-white text-sm font-medium">Coming Soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile-only expand button */}
          <button 
            className="mt-2 text-sm text-[#50C878] flex items-center md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Hide image' : 'View image'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Particle effects on hover */}
        {isHovered && !isMobile && (
          <motion.div
            className="absolute -inset-1 z-0 pointer-events-none overflow-hidden"
            initial="hidden"
            animate="visible"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -10 - Math.random() * 20],
                  x: [0, (Math.random() - 0.5) * 30],
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  duration: 1.5 + Math.random() * 1
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
      
      {/* Timeline dot */}
      <div className="timeline-dot-container mx-auto md:mx-0 my-4 md:my-0 relative">
        <div 
          className="timeline-dot w-5 h-5 rounded-full border-2 z-20 relative"
          style={{ 
            backgroundColor: '#1F1F1F',
            borderColor: color
          }}
        >
          {/* Inner pulse animation */}
          <motion.div 
            className="absolute inset-1 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ 
              scale: isFuture ? [0.8, 1.2, 0.8] : [1, 1.3, 1],
              opacity: isFuture ? [0.5, 0.8, 0.5] : [0.8, 1, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: isFuture ? 2 : 3,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Connecting line to content */}
        <div 
          className={`hidden md:block absolute top-1/2 w-[calc(50vw/12)] h-px`}
          style={{ 
            backgroundColor: color,
            [effectivePosition === 'left' ? 'right' : 'left']: '100%',
            transform: 'translateY(-50%)'
          }}
        />
      </div>
      
      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}
