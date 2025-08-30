import { motion } from 'framer-motion';
import Image from 'next/image';

export const LightTypeDropdown = ({ config, onLightTypeChange, setActiveStep, setOpenDropdown, tourActive, onTourSelection }) => {
  return (
    <div 
      className=" max-sm:left-0 max-sm:w-full p-4"
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Light Type</h3>
      <div className="flex space-x-3">
        {['wall', 'ceiling', 'floor'].map((type) => {
          // Calculate aspect ratio: original is 1726x1296
          // For a width of 80px, height would be 60px to maintain ratio
          const aspectRatio = 1296 / 1726; // height/width
          const width = 80; // Set width to 80px
          const height = width * aspectRatio; // Calculate height to maintain aspect ratio
          
          return (
            <motion.button
              key={type}
              className={`rounded-lg overflow-hidden ${config.lightType === type ? 'ring-2 ring-emerald-500 ring-offset-1 ring-offset-gray-800' : 'hover:ring-1 hover:ring-gray-400'}`}
              onClick={() => {
                console.log(`🖱️ User clicked on light type: ${type}`);
                
                // If tour is active, call tour selection handler
                if (tourActive && onTourSelection) {
                  onTourSelection('lightType', type);
                }
                
                onLightTypeChange(type);
                // Don't automatically switch to next tab
                setOpenDropdown(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
                <Image 
                  src={`/images/configrenders/${type}.jpg`}
                  alt={`${type} light`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className={`text-center py-1 text-xs ${config.lightType === type ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
