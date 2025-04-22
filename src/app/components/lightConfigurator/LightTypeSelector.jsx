import { motion } from "framer-motion";
import Image from "next/image";

const LightTypeSelector = ({ selectedType, onTypeChange, isDarkMode }) => {
  const types = [
    { id: "wall", name: "Wall Light", icon: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300" },
    { id: "ceiling", name: "Ceiling Light", icon: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=300" },
    { id: "floor", name: "Floor Light", icon: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300" },
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Type</h3>
      <div className="flex space-x-4">
        {types.map((type) => (
          <motion.div
            key={type.id}
            className={`relative cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeChange(type.id)}
          >
            <div className={`w-20 h-20 rounded-lg overflow-hidden relative ${selectedType === type.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
              <Image
                src={type.icon}
                alt={type.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm mt-2">{type.name}</p>
            {selectedType === type.id && (
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full"
                layoutId="activeTypeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LightTypeSelector;
