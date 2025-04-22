import { motion } from "framer-motion";

const LightAmountSelector = ({ amount, onAmountChange, isDarkMode }) => {
  const amounts = [1, 2, 3, 5, 10];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Amount</h3>
      <div className="flex flex-wrap gap-3">
        {amounts.map((num) => (
          <motion.div
            key={num}
            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${amount === num
              ? "bg-emerald-500 text-white shadow-lg"
              : isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAmountChange(num)}
            layout
          >
            {num}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LightAmountSelector;
