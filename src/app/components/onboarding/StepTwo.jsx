"use client";
import { motion } from 'framer-motion';

const styles = [
  {
    id: 'coolLux',
    name: 'Cool Lux',
    description: 'Sleek, modern lighting with cool tones and minimalist design.',
    color: '#50C878'
  },
  {
    id: 'dreamGlow',
    name: 'DreamGlow',
    description: 'Soft, ambient lighting with warm hues for a cozy atmosphere.',
    color: '#87CEAB'
  },
  {
    id: 'shadowHue',
    name: 'ShadowHue',
    description: 'Dramatic lighting with bold contrasts and striking silhouettes.',
    color: '#3da861'
  },
  {
    id: 'zenFlow',
    name: 'ZenFlow',
    description: 'Balanced, harmonious lighting inspired by natural elements.',
    color: '#6ab890'
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

export default function StepTwo({ selection, onSelect, onNext, onPrevious }) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Choose your vibe</h2>
        <p className="text-[#87CEAB] mb-6">Select a style that matches your aesthetic preferences.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((style) => (
          <motion.div
            key={style.id}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selection === style.id 
                ? 'ring-4 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                : 'ring-2 ring-transparent hover:ring-[#87CEAB]'
            }`}
            onClick={() => onSelect(style.id)}
            style={{
              background: `linear-gradient(135deg, #2B2D2F 0%, #3a3d42 100%)`,
            }}
          >
            <div className="p-6 relative z-10">
              <div 
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-xl"
                style={{ backgroundColor: style.color }}
              ></div>
              
              <div 
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${style.color}20`,
                  boxShadow: selection === style.id ? `0 0 20px ${style.color}80` : 'none'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: style.color }}
                ></div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{style.name}</h3>
              <p className="text-gray-300">{style.description}</p>
              
              {selection === style.id && (
                <div className="absolute top-4 right-4 bg-[#50C878] rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div 
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: style.color }}
            ></div>
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
