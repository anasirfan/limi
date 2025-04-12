'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ProductSpecifications({ specs }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="mb-8">
      <button 
        className="flex items-center justify-between w-full py-3 border-b border-gray-700 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-white">Technical Specifications</h3>
        {isExpanded ? <FaChevronUp className="text-[#54BB74]" /> : <FaChevronDown className="text-[#54BB74]" />}
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-gray-400 text-sm">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
