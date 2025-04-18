'use client';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === category.id
              ? 'bg-[#54BB74] text-white'
              : 'bg-[#292929] border border-[#54BB74] text-[#54BB74] hover:bg-[#54BB74] hover:text-white'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
