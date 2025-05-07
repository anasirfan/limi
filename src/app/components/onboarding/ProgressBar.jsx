"use client";
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  
  // Create an array of step indices
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="px-6 pb-6">
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#50C878]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-4 h-4 rounded-full ${
                step <= currentStep ? 'bg-[#50C878]' : 'bg-gray-600'
              } -mt-3 relative z-10 transition-colors duration-300`}
            />
            <span 
              className={`text-xs mt-1 ${
                step <= currentStep ? 'text-[#87CEAB]' : 'text-gray-500'
              } transition-colors duration-300`}
            >
              Step {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
