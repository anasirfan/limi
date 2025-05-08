'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Stats data
const stats = [
  { label: 'Team members', value: '12' },
  { label: 'Countries', value: '5' },
  { label: 'Development', value: '24/7' },
  { label: 'Prototypes', value: '5' },
  { label: 'Patents pending', value: '8' }
];

export default function StatsSection() {
  const statsRef = useRef(null);
  const { colors, theme } = useTheme();
  const [hoveredStat, setHoveredStat] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  
  // Trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section data-section="stats" ref={statsRef} className="mb-20 py-12 relative">
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 -z-10 bg-[#1e2022] rounded-xl overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, ${colors.primary}15 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#50C878]10 to-transparent"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-6 py-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="stat-item text-center cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                delay: index * 0.1 
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              scale: 1.1,
              transition: { type: "spring", stiffness: 400 }
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <motion.div 
              className="relative"
              animate={{
                y: hoveredStat === index ? -5 : 0
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl md:text-5xl font-bold mb-2 relative"
                style={{ 
                  color: hoveredStat === index ? '#FFFFFF' : colors.primary,
                  textShadow: hoveredStat === index ? `0 0 15px ${colors.primary}` : 'none'
                }}
                animate={{
                  scale: hoveredStat === index ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
              >
                {/* Animated counter */}
                {animateStats ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CountUp value={stat.value} />
                  </motion.span>
                ) : (
                  <span>0</span>
                )}
                
                {/* Glowing dot for hover state */}
                {hoveredStat === index && (
                  <motion.span
                    className="absolute -top-1 -right-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.5, 1, 0.5], 
                      scale: [1, 1.5, 1],
                      boxShadow: [`0 0 5px ${colors.primary}`, `0 0 10px ${colors.primary}`, `0 0 5px ${colors.primary}`]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "loop" 
                    }}
                  />
                )}
              </motion.div>
              
              <div 
                className="transition-colors duration-300"
                style={{ 
                  color: hoveredStat === index ? colors.primary : `${colors.text}99`
                }}
              >
                {stat.label}
              </div>
            </motion.div>
            
            {/* Background glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full blur-xl -z-10"
              style={{ backgroundColor: colors.primary }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: hoveredStat === index ? 0.2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// CountUp animation component
function CountUp({ value }) {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);
  
  // Use framer-motion's useInView hook equivalent with intersection observer
  const observer = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useState(() => {
    if (typeof window === 'undefined') return;
    
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.5 });
    
    if (nodeRef.current) {
      observer.current.observe(nodeRef.current);
    }
    
    return () => {
      if (observer.current && nodeRef.current) {
        observer.current.unobserve(nodeRef.current);
      }
    };
  }, []);
  
  // Animate the count up when in view
  useState(() => {
    if (!isInView) return;
    
    let startValue = 0;
    const endValue = typeof value === 'number' ? value : 0;
    const duration = 2000;
    const increment = Math.ceil(endValue / (duration / 16)); // 60fps
    
    const timer = setInterval(() => {
      startValue += increment;
      
      if (startValue >= endValue) {
        setDisplayValue(endValue);
        clearInterval(timer);
      } else {
        setDisplayValue(startValue);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isInView, value]);
  
  return (
    <span ref={nodeRef}>
      {typeof value === 'number' ? displayValue : value}
    </span>
  );
}
