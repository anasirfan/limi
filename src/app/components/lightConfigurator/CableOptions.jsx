import { motion } from "framer-motion";

const CableOptions = ({ selectedCableColor, selectedCableLength, onCableChange, isDarkMode }) => {
  const cableColors = [
    { id: "black", name: "Black" },
    { id: "white", name: "White" }
  ];
  
  const cableLengths = [
    { id: "2mm", name: "2mm" },
    { id: "3mm", name: "3mm" },
    { id: "5mm", name: "5mm" }
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Cable Options</h3>
      
      {/* Cable Color Selection */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Color</h4>
        <div className="flex space-x-3">
          {cableColors.map((color) => (
            <motion.div
              key={color.id}
              className={`cursor-pointer p-2 rounded-lg ${selectedCableColor === color.id 
                ? isDarkMode ? 'bg-gray-700 ring-2 ring-emerald-500' : 'bg-gray-100 ring-2 ring-emerald-500'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(color.id, selectedCableLength)}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-5 h-5 rounded-full ${color.id === 'black' ? 'bg-black' : 'bg-white border border-gray-300'}`}
                ></div>
                <span>{color.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Cable Length Selection */}
      <div>
        <h4 className="text-sm font-medium mb-2">Length</h4>
        <div className="flex space-x-3">
          {cableLengths.map((length) => (
            <motion.div
              key={length.id}
              className={`cursor-pointer py-2 px-4 rounded-lg ${selectedCableLength === length.id 
                ? isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(selectedCableColor, length.id)}
            >
              {length.name}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Configuration */}
      <div className={`mt-3 p-2 rounded text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <p>Selected: {selectedCableColor.charAt(0).toUpperCase() + selectedCableColor.slice(1)} cable, {selectedCableLength} length</p>
      </div>
    </motion.div>
  );
};

export default CableOptions;
