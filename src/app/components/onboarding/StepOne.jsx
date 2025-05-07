"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const categories = [
  {
    id: 'pendant',
    name: 'Pendant',
    image: '/images/onboarding/pendant.jpg',
    description: 'Elegant ceiling-mounted lights that hang down into the space.'
  },
  {
    id: 'wall',
    name: 'Wall',
    image: '/images/onboarding/wall.jpg',
    description: 'Space-saving lights that mount directly to your walls.'
  },
  {
    id: 'floor',
    name: 'Floor',
    image: '/images/onboarding/floor.jpg',
    description: 'Freestanding lights that add style and illumination to any room.'
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

export default function StepOne({ selection, onSelect, onNext }) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Which light are you drawn to?</h2>
        <p className="text-[#87CEAB] mb-6">Select the type of lighting that fits your space.</p>
      </motion.div>
      
      <div className="flex flex-col space-y-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            className={`flex overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
              selection === category.id 
                ? 'ring-4 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                : 'ring-2 ring-transparent hover:ring-[#87CEAB]'
            }`}
            onClick={() => onSelect(category.id)}
          >
            <div className="relative h-32 w-40 md:h-36 md:w-48 flex-shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2B2D2F] opacity-50"></div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                {selection === category.id && (
                  <div className="ml-3 bg-[#50C878] rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mt-1">{category.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants} className="pt-4">
        <button
          onClick={onNext}
          disabled={!hasSelection}
          className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
            hasSelection 
              ? 'bg-[#50C878] text-white hover:bg-[#3da861]' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Let's Go!
        </button>
      </motion.div>
    </motion.div>
  );
}
