"use client";
import { motion } from 'framer-motion';

const aesthetics = [
  {
    id: 'aesthetic',
    name: 'Aesthetic',
    description: 'Curated, Instagram-worthy lighting with a focus on visual appeal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines and contemporary design for today\'s living spaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Raw, utilitarian design with exposed elements and sturdy materials.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M20 7L12 3L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 7L12 11L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 11L12 15L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 15L12 19L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simplified, essential design that eliminates excess and focuses on function.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function StepThree({ selection, onSelect, onNext, onPrevious }) {
  const hasSelection = !!selection;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Which aesthetic suits you?</h2>
        <p className="text-[#87CEAB] mb-6">Select a design style that resonates with your taste.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aesthetics.map((aesthetic) => (
          <motion.div
            key={aesthetic.id}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
              selection === aesthetic.id 
                ? 'border-2 border-[#50C878] bg-[#50C878]/10' 
                : 'border-2 border-gray-700 bg-[#2B2D2F] hover:border-[#87CEAB]'
            }`}
            onClick={() => onSelect(aesthetic.id)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-5 flex items-start">
              <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center ${
                selection === aesthetic.id 
                  ? 'bg-[#50C878]/20 text-[#50C878]' 
                  : 'bg-gray-700/50 text-gray-300'
              }`}>
                {aesthetic.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">{aesthetic.name}</h3>
                <p className="text-gray-300 text-sm">{aesthetic.description}</p>
              </div>
              
              {selection === aesthetic.id && (
                <div className="absolute top-4 right-4 bg-[#50C878] rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
        <button
          onClick={onPrevious}
          className="w-1/3 py-4 rounded-lg font-medium text-lg transition-all duration-300 bg-gray-700 text-white hover:bg-gray-600"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!hasSelection}
          className={`w-2/3 py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
            hasSelection 
              ? 'bg-[#50C878] text-white hover:bg-[#3da861]' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}
