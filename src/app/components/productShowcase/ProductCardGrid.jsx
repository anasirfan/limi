"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlobBackground from './BlobBackground';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProductCardGrid = ({ products }) => {
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);
  
  // Initialize GSAP animations
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Clear any existing animations
    const ctx = gsap.context(() => {
      // Row 1 animation
      if (row1Ref.current) {
        gsap.from(row1Ref.current.children, {
          opacity: 0,
          y: 100,
          duration: 0.8,
          scrollTrigger: {
            trigger: row1Ref.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none none',
            // markers: true, // For debugging
          }
        });
      }
      
      // Row 2 animation
      if (row2Ref.current) {
        gsap.from(row2Ref.current.children, {
          opacity: 0,
          y: 100,
          stagger: 0.2,
          duration: 0.5,
          scrollTrigger: {
            trigger: row2Ref.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none none',
          }
        });
      }
      
      // Row 3 animation
      if (row3Ref.current) {
        gsap.from(row3Ref.current.children, {
          opacity: 0,
          y: 100,
          stagger: 0.2,
          duration: 0.5,
          scrollTrigger: {
            trigger: row3Ref.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none none',
          }
        });
      }
      
      // Row 4 animation
      if (row4Ref.current) {
        gsap.from(row4Ref.current.children, {
          opacity: 0,
          y: 100,
          stagger: 0.2,
          duration: 0.5,
          scrollTrigger: {
            trigger: row4Ref.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none none',
          }
        });
      }
    }, containerRef);
    
    // Cleanup function
    return () => {
      ctx.revert(); // This will clean up all GSAP animations created in this context
    };
  }, [products.length]);

  // Group products by their grid position
  const getProductsByPosition = () => {
    const row1 = products.filter(p => p.gridPosition === 'row1');
    const row2 = products.filter(p => p.gridPosition.startsWith('row2'));
    const row3 = products.filter(p => p.gridPosition.startsWith('row3'));
    const row4 = products.filter(p => p.gridPosition.startsWith('row4'));
    
    return { row1, row2, row3, row4 };
  };
  
  const { row1, row2, row3, row4 } = getProductsByPosition();

  return (
    <div className="w-full py-6 relative" ref={containerRef}>
      {/* Blob Background SVGs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] opacity-20 blur-xl">
          <BlobBackground color="#50C878" seed={1} />
        </div>
        <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] opacity-15 blur-xl">
          <BlobBackground color="#87CEAB" seed={2} />
        </div>
        <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] opacity-10 blur-xl">
          <BlobBackground color="#50C878" seed={3} />
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-[#292929] text-lg">No products available.</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6 relative z-10">
          {/* Row 1: One full-width product */}
          {row1.length > 0 && (
            <div 
              ref={row1Ref}
              className="w-full h-[300px] md:h-[400px] relative"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <ProductCard 
                  product={row1[0]} 
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
          
          {/* Row 2: Two products with 3:2 ratio */}
          {row2.length > 0 && (
            <div ref={row2Ref} className="w-full flex flex-col md:flex-row gap-6 h-[500px] md:h-[300px]">
              <div className="w-full md:w-[60%] h-[250px] md:h-full relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row2.find(p => p.gridPosition === 'row2-1') || row2[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-[40%] h-[250px] md:h-full relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row2.find(p => p.gridPosition === 'row2-2') || row2[1] || row2[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Row 3: Two products with 2:3 ratio */}
          {row3.length > 0 && (
            <div ref={row3Ref} className="w-full flex flex-col md:flex-row gap-6 h-[500px] md:h-[300px]">
              <div className="w-full md:w-[40%] h-[250px] md:h-full relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row3.find(p => p.gridPosition === 'row3-1') || row3[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-[60%] h-[250px] md:h-full relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row3.find(p => p.gridPosition === 'row3-2') || row3[1] || row3[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Row 4: Three products with 1:2:1 ratio */}
          {row4.length > 0 && (
            <div ref={row4Ref} className="w-full flex flex-col md:flex-row gap-6 h-[750px] md:h-[250px]">
              <div className="w-full md:w-[25%] h-[250px] relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-1') || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-[50%] h-[250px] relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-2') || row4[1] || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-[25%] h-[250px] relative">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-3') || row4[2] || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCardGrid;
