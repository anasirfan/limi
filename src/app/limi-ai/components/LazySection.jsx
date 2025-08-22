'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LazySection({ 
  children, 
  threshold = 0.1, 
  rootMargin = '100px',
  fallback = null 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={elementRef} className="min-h-screen">
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white/50">Loading section...</div>
          </div>
        )
      )}
    </div>
  );
}
