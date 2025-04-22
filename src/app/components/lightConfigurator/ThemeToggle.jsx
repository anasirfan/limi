import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <motion.button
      className={`fixed top-24 right-4 z-50 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-indigo-600" />}
    </motion.button>
  );
};

export default ThemeToggle;
