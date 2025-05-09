'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Partner logos
const partners = [
  { name: 'TechStars', logo: '/images/partners/techstars.svg' },
  { name: 'Smart Home Alliance', logo: '/images/partners/sha.svg' },
  { name: 'Design Institute', logo: '/images/partners/design-institute.svg' }
];

export default function PartnersSection() {
  const { colors, theme } = useTheme();
  const partnersRef = useRef(null);
  
  return (
    <section data-section="partners" ref={partnersRef} className="mb-16 md:mb-24 text-center">
      <motion.p 
        className="mb-3 md:mb-6"
        style={{ color: `${colors.text}80` }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Supported by
      </motion.p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
        {partners.map((partner, index) => (
          <motion.div 
            key={index} 
            className="cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.1,
              filter: 'brightness(1.2)',
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              opacity: 0.7,
              filter: theme === 'dark' ? 'brightness(1.5)' : 'none'
            }}
          >
            <div className="h-12 flex items-center justify-center">
              {/* Partner logo */}
              <div 
                className="font-medium text-lg"
                style={{ color: theme === 'light' ? '#555555' : '#DDDDDD' }}
              >
                {partner.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
