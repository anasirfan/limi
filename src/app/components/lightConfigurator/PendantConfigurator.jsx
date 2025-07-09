import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import LightDesignSelector from "./LightDesignSelector";

const PendantConfigurator = ({ pendants, updatePendantDesign, isDarkMode }) => {
  const [expandedPendant, setExpandedPendant] = useState(null);
  
  // Toggle pendant expansion
  const togglePendant = (index) => {
    setExpandedPendant(expandedPendant === index ? null : index);
  };
  
  return (
    <motion.div 
      className="mt-6 pt-4 border-t border-charleston-green-light text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold font-['Amenti']">Individual Pendant Configuration</h3>
        
        {/* Total pendants info */}
        <div className="text-xs text-gray-400">
          {pendants.length} pendant{pendants.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Scrollable pendant list with collapsible sections */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {pendants.map((pendant, index) => {
          const isExpanded = expandedPendant === index;
          
          return (
            <motion.div 
              key={index} 
              className="rounded-lg overflow-hidden bg-charleston-green-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }} // Reduced delay for faster rendering
            >
              {/* Pendant header - always visible and clickable */}
              <div 
                className={`p-3 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all ${isExpanded ? 'bg-charleston-green-light' : ''}`}
                onClick={() => togglePendant(index)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex-shrink-0" 
                    style={{ 
                      backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : pendant.design === 'piko' ? '5' : '1'}.png)`,
                      backgroundSize: "cover"
                    }}
                  ></div>
                  <h4 className="font-medium text-emerald-light">Pendant {index + 1}</h4>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm capitalize text-eton-blue">{pendant?.design || 'bumble'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-xs text-emerald" />
                  </motion.div>
                </div>
              </div>
              
              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2">
                      <LightDesignSelector 
                        selectedDesign={pendant?.design || 'bumble'} 
                        onDesignChange={(designId) => updatePendantDesign(designId, index)}
                        pendantIndex={index}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PendantConfigurator;
