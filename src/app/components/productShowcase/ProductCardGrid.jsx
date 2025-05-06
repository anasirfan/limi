"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductCardGrid = ({ products }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

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
    <div className="w-full py-6">
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-[#292929] text-lg">No products available.</p>
        </div>
      ) : (
        <motion.div
          className="w-full flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Row 1: One full-width product */}
          {row1.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="w-full h-[300px] md:h-[400px] relative"
            >
              <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                <ProductCard 
                  product={row1[0]} 
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          )}
          
          {/* Row 2: Two products with 3:2 ratio */}
          {row2.length > 0 && (
            <div className="w-full flex flex-col md:flex-row gap-6 h-[500px] md:h-[300px]">
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[60%] h-[250px] md:h-full relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row2.find(p => p.gridPosition === 'row2-1') || row2[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[40%] h-[250px] md:h-full relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row2.find(p => p.gridPosition === 'row2-2') || row2[1] || row2[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Row 3: Two products with 2:3 ratio */}
          {row3.length > 0 && (
            <div className="w-full flex flex-col md:flex-row gap-6 h-[500px] md:h-[300px]">
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[40%] h-[250px] md:h-full relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row3.find(p => p.gridPosition === 'row3-1') || row3[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[60%] h-[250px] md:h-full relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row3.find(p => p.gridPosition === 'row3-2') || row3[1] || row3[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Row 4: Three products with 1:2:1 ratio */}
          {row4.length > 0 && (
            <div className="w-full flex flex-col md:flex-row gap-6 h-[750px] md:h-[250px]">
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[25%] h-[250px] relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-1') || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[50%] h-[250px] relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-2') || row4[1] || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-[25%] h-[250px] relative"
              >
                <div className="absolute inset-0 border-4 border-[#54BB74] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={row4.find(p => p.gridPosition === 'row4-3') || row4[2] || row4[0]} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProductCardGrid;
