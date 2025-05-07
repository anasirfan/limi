"use client";
import { motion } from 'framer-motion';

export default function ConfiguratorHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
      <motion.div 
        className="bg-[#292929] rounded-lg p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-12 bg-[#50C878]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#50C878]">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path d="M20 7L12 3L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 7L12 11L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 11L12 15L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 15L12 19L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Multiple Styles</h3>
        <p className="text-gray-400">Choose from pendant, wall, table, and floor light styles.</p>
      </motion.div>
      
      <motion.div 
        className="bg-[#292929] rounded-lg p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-12 bg-[#50C878]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#50C878]">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Save & Share</h3>
        <p className="text-gray-400">Save your designs and share them with friends and family.</p>
      </motion.div>
      
      <motion.div 
        className="bg-[#292929] rounded-lg p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-12 bg-[#50C878]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#50C878]">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Instant Preview</h3>
        <p className="text-gray-400">See changes in real-time as you customize your light.</p>
      </motion.div>
    </div>
  );
}
