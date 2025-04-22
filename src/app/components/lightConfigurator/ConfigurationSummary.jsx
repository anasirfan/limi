import { motion } from "framer-motion";
import { FaSave, FaShoppingCart } from "react-icons/fa";

const ConfigurationSummary = ({ totalPrice, lightType, lightAmount, cableColor, cableLength, pendants, isDarkMode, onSaveConfiguration, onAddToCart }) => {
  return (
    <motion.div 
      className={`w-full mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* Price Information */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-bold mb-3 font-['Amenti']">Your Selection</h3>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Price</p>
            <p className="text-3xl font-bold">€{totalPrice}</p>
          </div>
          <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Estimated delivery: 2-3 weeks</p>
            <p>Free shipping on orders over €500</p>
          </div>
        </div>
        
        {/* Configuration Summary */}
        <div className="md:w-2/3">
          <div className={`p-4 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            <h4 className="font-bold mb-2">Configuration Summary</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center gap-1">
                <span className="font-medium">Type:</span> 
                <span className="capitalize">{lightType}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Amount:</span> 
                <span>{lightAmount} pendant{lightAmount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Cable:</span> 
                <span className="capitalize">{cableColor}, {cableLength}</span>
              </div>
              {lightAmount === 1 && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Design:</span> 
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ 
                        backgroundImage: `url(/images/configOptions/${pendants[0]?.design === 'bumble' ? '1' : pendants[0]?.design === 'radial' ? '2' : pendants[0]?.design === 'fina' ? '3' : pendants[0]?.design === 'ico' ? '4' : '5'}.png)`,
                        backgroundSize: "cover"
                      }}
                    ></div>
                    <span className="capitalize">{pendants[0]?.design || 'bumble'}</span>
                  </div>
                </div>
              )}
            </div>
            
            {lightAmount > 1 && (
              <div className="mt-2">
                <p className="font-medium mb-1">Pendant Designs:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {pendants.map((pendant, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ 
                          backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : '5'}.png)`,
                          backgroundSize: "cover"
                        }}
                      ></div>
                      <span>Pendant {index + 1}: {pendant.design}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-3">
        <motion.button 
          onClick={onSaveConfiguration}
          className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSave /> Save Configuration
        </motion.button>
        <motion.button 
          onClick={onAddToCart}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConfigurationSummary;
