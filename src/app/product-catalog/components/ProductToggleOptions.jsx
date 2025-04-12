'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ProductToggleOptions({ options, selectedOptions, onOptionChange }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="mb-8">
      <button 
        className="flex items-center justify-between w-full py-3 border-b border-gray-700 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-white">Additional Options</h3>
        {isExpanded ? <FaChevronUp className="text-[#54BB74]" /> : <FaChevronDown className="text-[#54BB74]" />}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {options.map((option) => (
            <div key={option.name} className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-lg">
              <div>
                <h4 className="font-medium text-white">{option.name}</h4>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={selectedOptions[option.name] || false}
                  onChange={(e) => onOptionChange(option.name, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54BB74]"></div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
