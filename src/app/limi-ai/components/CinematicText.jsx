'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function CinematicText({ 
  text, 
  type = 'headline', // 'headline', 'subheadline', 'description'
  className = '',
  delay = 0,
  typewriter = false,
  glow = false 
}) {
  const textRef = useRef();
  const isInView = useInView(textRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && typewriter) {
      gsap.to(textRef.current, {
        duration: text.length * 0.05,
        text: text,
        ease: "none",
        delay: delay
      });
    }
  }, [isInView, text, delay, typewriter]);

  const getVariants = () => {
    switch (type) {
      case 'headline':
        return {
          hidden: { opacity: 0, y: 50, scale: 0.9 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration: 1.2, 
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      case 'subheadline':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: 0.8, 
              delay: delay + 0.3,
              ease: "easeOut"
            }
          }
        };
      case 'description':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6, 
              delay: delay + 0.6,
              ease: "easeOut"
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.6, delay: delay }
          }
        };
    }
  };

  return (
    <motion.div
      ref={textRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={`${className} ${glow ? 'text-glow' : ''}`}
    >
      {typewriter ? '' : text}
      
      {/* Cursor for typewriter effect */}
      {typewriter && isInView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-[#54bb74] ml-1"
        />
      )}
    </motion.div>
  );
}
