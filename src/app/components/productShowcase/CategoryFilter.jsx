"use client";
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-[#54bb74] text-white'
                : 'bg-white text-[#292929] hover:bg-[#f3ebe2]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
