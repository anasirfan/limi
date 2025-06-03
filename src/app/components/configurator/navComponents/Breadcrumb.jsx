import { motion } from 'framer-motion';
import { FaHome, FaChevronRight } from 'react-icons/fa';

export const Breadcrumb = ({ 
  path = [], 
  onNavigate 
}) => {
  console.log(path);
  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {/* Always show home button first */}
    
      
      {path.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span><FaChevronRight size={12} /></span>}
          <motion.button
            onClick={() => onNavigate(item.id)}
            className={`px-1.5 py-0.5 rounded text-[10px] ${
              index === path.length - 1 
                ? 'text-emerald-500 font-medium' 
                : 'text-gray-300 hover:bg-gray-700/50'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           {/* <span><FaChevronRight size={12} /></span>  */}
            {item.name === 'icon-home' ? <FaHome size={12} /> : item.name}
          </motion.button>
        </div>
      ))}
    </div>
  );
};
