'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaDownload, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function OrderConfirmation({ orderId, formData }) {
  const { shipping } = formData;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-[#2B2D2F] rounded-lg p-6 md:p-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="w-20 h-20 bg-[#50C878]/20 rounded-full flex items-center justify-center mx-auto mb-6"
        variants={itemVariants}
      >
        <FaCheck className="text-[#50C878]" size={32} />
      </motion.div>
      
      <motion.h2 
        className="text-3xl text-white font-bold mb-4 font-[Amenti]"
        variants={itemVariants}
      >
        Thank You For Your Order!
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-8"
        variants={itemVariants}
      >
        Your order has been received and is now being processed.
      </motion.p>
      
      <motion.div 
        className="bg-[#1e1e1e] rounded-lg p-6 mb-8 inline-block mx-auto"
        variants={itemVariants}
      >
        <div className="text-left">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Order Number:</span>
            <span className="text-white font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Date:</span>
            <span className="text-white">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Email:</span>
            <span className="text-white">{shipping.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Shipping Method:</span>
            <span className="text-white">
              {shipping.shippingMethod === 'express' ? 'Express' : 'Standard'}
            </span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <h3 className="text-xl text-white mb-4">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <div className="w-10 h-10 bg-[#3a3d42] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#50C878] font-medium">1</span>
            </div>
            <h4 className="text-white font-medium mb-2">Order Processing</h4>
            <p className="text-gray-400 text-sm">
              We're preparing your items for shipment
            </p>
          </div>
          
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <div className="w-10 h-10 bg-[#3a3d42] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#50C878] font-medium">2</span>
            </div>
            <h4 className="text-white font-medium mb-2">Order Shipped</h4>
            <p className="text-gray-400 text-sm">
              You'll receive a shipping confirmation email with tracking info
            </p>
          </div>
          
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <div className="w-10 h-10 bg-[#3a3d42] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#50C878] font-medium">3</span>
            </div>
            <h4 className="text-white font-medium mb-2">Delivery</h4>
            <p className="text-gray-400 text-sm">
              Your premium LIMI products will arrive at your doorstep
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <button className="flex items-center gap-2 bg-[#3a3d42] text-white px-6 py-3 rounded-md hover:bg-[#2B2D2F] transition-colors mx-auto">
          <FaDownload size={14} />
          Download Receipt
        </button>
      </motion.div>
      
      <motion.div 
        className="space-y-4"
        variants={itemVariants}
      >
        <Link 
          href="/product-catalog" 
          className="flex items-center gap-2 bg-[#50C878] text-[#2B2D2F] px-8 py-3 rounded-md hover:bg-[#3da861] transition-colors font-medium mx-auto w-fit"
        >
          Continue Shopping
          <FaArrowRight size={14} />
        </Link>
        
        <div className="flex justify-center">
          <Image 
            src="/images/svgLogos/__Logo_Icon_Inverted.svg" 
            alt="LIMI Logo" 
            width={40} 
            height={40} 
            className="opacity-30"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
