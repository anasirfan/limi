import { motion } from 'framer-motion';
import Image from 'next/image';

export const BaseTypeDropdown = ({ config, onBaseTypeChange, setActiveStep, setOpenDropdown }) => {
  return (
    <div className="p-4">
      <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Base Type</h3>
      <div className="flex space-x-3">
        {['round', 'rectangular'].map((type) => (
          <motion.button
            key={type}
            className={`flex flex-col items-center ${config.baseType === type ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
            onClick={() => {
              onBaseTypeChange(type);
              setActiveStep('lightAmount');
              setOpenDropdown(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.baseType === type ? 'ring-2 ring-emerald-500' : ''}`}>
              <Image 
                src={`/images/configbase/${type}.png`}
                alt={`${type} base`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xs">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
