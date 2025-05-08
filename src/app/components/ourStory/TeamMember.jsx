'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function TeamMember({ member, index, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const { colors, theme } = useTheme();
  
  // Particle effect for hover state
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const particleItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -20, -40],
      x: (i) => [0, (i % 2 === 0 ? 15 : -15) * Math.random(), (i % 2 === 0 ? 30 : -30) * Math.random()],
      transition: { 
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        duration: 2 + Math.random() * 1
      }
    }
  };
  
  return (
    <motion.div 
      className="team-member relative h-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'grayscale(0%)' : 'grayscale(40%)',
      }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle effects */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 z-0 pointer-events-none"
          variants={particleVariants}
          initial="hidden"
          animate="visible"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: colors.primary,
                top: '50%',
                left: '50%',
                opacity: 0
              }}
              custom={i}
              variants={particleItemVariants}
            />
          ))}
        </motion.div>
      )}
      
      <motion.div 
        className="rounded-lg overflow-hidden cursor-pointer relative z-10 h-full flex flex-col"
        style={{ 
          backgroundColor: '#1F1F1F', // Darker Charleston Green for card background
          borderColor: isHovered || isActive ? colors.primary : '#3A3D42',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: (isHovered || isActive) ? `0 10px 25px -5px ${colors.primary}40, 0 0 15px -3px ${colors.primary}30` : '0 4px 12px rgba(0,0,0,0.2)'
        }}
        whileHover={{ 
          y: -5,
          transition: { type: "spring", stiffness: 300 }
        }}
        onClick={() => setShowAchievement(true)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image 
            src={member.image || `/images/team/placeholder.jpg`}
            alt={member.name}
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/10 z-10"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
        
        <div className="p-4 flex flex-col h-full">
          <div className="flex flex-col gap-1 mb-3 mt-2">
            <h4 className="text-xl font-bold leading-tight" style={{ color: colors.text }}>{member.name}</h4>
            <p className="text-sm" style={{ color: colors.primary }}>{member.title}</p>
            
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <p className="text-xs" style={{ color: `${colors.text}99` }}>{member.fact}</p>
            </div>
          </div>
          
          <p 
            className="text-xs mb-3 flex-grow"
            style={{ color: `${colors.text}90` }}
          >
            {member.bio}
          </p>
          
          <div className="flex justify-between items-center mt-auto pt-2 border-t" style={{ borderColor: `${colors.text}15` }}>
            <motion.div 
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: colors.primary }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>View Achievement</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
            
            {member.linkedin && (
              <motion.a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary
                }}
                onClick={(e) => e.stopPropagation()}
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: colors.primary,
                  color: '#FFFFFF'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Achievement modal */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAchievement(false)}
          >
            <motion.div 
              className="relative w-full max-w-md bg-[#1F1F1F] rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                onClick={() => setShowAchievement(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: colors.text }}>{member.name}</h4>
                    <p className="text-sm" style={{ color: colors.primary }}>{member.title}</p>
                  </div>
                </div>
                
                <div 
                  className="mb-6 p-4 rounded-lg"
                  style={{ backgroundColor: `${colors.primary}10` }}
                >
                  <h5 
                    className="text-sm font-medium mb-2"
                    style={{ color: colors.primary }}
                  >
                    Key Achievement
                  </h5>
                  <p 
                    className="text-sm"
                    style={{ color: colors.text }}
                  >
                    {member.achievement}
                  </p>
                </div>
                
                <motion.button
                  className="w-full py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: '#FFFFFF'
                  }}
                  onClick={() => setShowAchievement(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
