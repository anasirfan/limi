import { motion } from 'framer-motion';
import Image from 'next/image';

export const ConfigurationTypeDropdown = ({ step, config, onConfigurationTypeChange, setActiveStep, setOpenDropdown }) => {
  return (
    <div className="p-4">
      <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">{step.label}</h3>
      <div className="flex space-x-3">
        {['pendant', 'system'].map((type) => {
          // Determine the correct image path based on light type
          let imagePath = '';
          
          // For ceiling lights, we need lightAmount_baseType_systemType.png
          if (config.lightType === 'ceiling') {
            // Default to 1 light if not set
            const lightAmount = config.baseType === 'rectangular' ? 3 : 1;
            // Default to round base if not set
            const baseType = config.baseType || 'round';
            imagePath = `/images/configtype/${config.lightType}/${lightAmount}_${baseType}_${type}.png`;
          } 
          // For floor and wall lights, we need lightAmount_systemType.png
          else {
            // Default to appropriate light amount based on type
            const lightAmount = config.lightType === 'wall' ? 1 : 3;
            imagePath = `/images/configtype/${config.lightType}/${lightAmount}_${type}.png`;
          }
          
          return (
            <motion.button
              key={type}
              className={`flex flex-col items-center ${config.configurationType === type ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
              onClick={() => {
                onConfigurationTypeChange(type);
                setActiveStep('lightAmount');
                setOpenDropdown(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.configurationType === type ? 'ring-2 ring-emerald-500' : ''}`}>
                <Image 
                  src={imagePath}
                  alt={`${type} configuration`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-xs mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
