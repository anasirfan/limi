import { motion } from 'framer-motion';
import { FaLightbulb, FaCubes, FaTimes } from 'react-icons/fa';

export const ConfigurationTypeSelector = ({ 
  onSelectType, 
  onClose,
  selectedLocation
}) => {
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="p-4 rounded-xl bg-black/90 sm:backdrop-blur-md shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-white">
            Configure Location {selectedLocation + 1}
          </h4>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
          >
            <FaTimes size={10} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex gap-3 justify-center">
          <motion.button
            onClick={() => onSelectType('pendant')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors w-32"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLightbulb size={24} className="text-emerald-500" />
            <span className="text-white text-sm">Select Pendant</span>
          </motion.button>
          
          <motion.button
            onClick={() => onSelectType('system')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors w-32"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCubes size={24} className="text-emerald-500" />
            <span className="text-white text-sm">Select System</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
