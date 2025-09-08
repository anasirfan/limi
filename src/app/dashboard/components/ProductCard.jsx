import React from "react";
import { FaBox } from "react-icons/fa";

const ProductCard = ({ item, onEdit, onDelete, categoryColor, categoryIcon }) => {
  return (
    <div className={`bg-gradient-to-br from-[#292929] to-[#333333] rounded-xl border border-[#3a3a3a] p-6 hover:border-${categoryColor}/50 transition-all duration-300 group hover:shadow-lg hover:shadow-${categoryColor}/10`}>
      {/* Product Icon */}
      <div className="flex items-center justify-center mb-4">
        {item.image ? (
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-${categoryColor}/20 to-${categoryColor}/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>
            <img
              src={item.image}
              alt={item.name}
              className={`relative w-16 h-16 object-cover rounded-xl border-2 border-[#3a3a3a] group-hover:border-${categoryColor}/50 transition-all duration-300 shadow-lg`}
            />
          </div>
        ) : (
          <div className={`w-16 h-16 bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-xl border-2 border-[#3a3a3a] flex items-center justify-center group-hover:border-${categoryColor}/50 transition-all duration-300`}>
            {item.media?.image?.url ? (
              <img
                src={item.media.image.url}
                alt={`${item.name} icon`}
                className="w-12 h-12 object-cover rounded-lg"
              />
            ) : (
              categoryIcon || <FaBox className={`text-2xl text-${categoryColor}`} />
            )}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="text-center mb-4">
        <h5 className={`text-lg font-bold text-white group-hover:text-${categoryColor} transition-colors mb-1`}>
          {item.name}
        </h5>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${categoryColor}/20 text-${categoryColor} border border-${categoryColor}/30`}>
          {item.isSystem ? `${item.systemType || 'Custom'} System` : 'Individual Pendant'}
        </span>
      </div>
      
      {/* Message Indicator */}
      <div className="mb-4">
        <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#3a3a3a]">
          <div className="flex items-center mb-1">
            <div className={`w-2 h-2 bg-${categoryColor} rounded-full mr-2`}></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Message</span>
          </div>
          <code className="text-sm text-gray-300 font-mono">{item.message}</code>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button 
          onClick={() => onEdit(item)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#333333] to-[#444444] hover:from-[#444444] hover:to-[#555555] text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(item)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
