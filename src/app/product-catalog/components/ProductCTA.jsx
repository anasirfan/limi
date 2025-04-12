'use client';

import Link from 'next/link';
import { FaDownload, FaCog } from 'react-icons/fa';

export default function ProductCTA({ product, selectedOptions }) {
  // Calculate if any options are selected
  const hasSelectedOptions = Object.values(selectedOptions).some(value => value === true);
  
  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href={`/configurator?product=${product.slug}${hasSelectedOptions ? '&options=' + encodeURIComponent(JSON.stringify(selectedOptions)) : ''}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] py-3 px-6 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-center"
        >
          <FaCog />
          <span>Open Configurator</span>
        </Link>
        
        <button 
          onClick={() => alert('Data sheet download will be implemented with backend integration')}
          className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] py-3 px-6 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-center"
        >
          <FaDownload />
          <span>Download Data Sheet</span>
        </button>
      </div>
      
      {/* Price information */}
      <div className="mt-6 p-4 bg-[#1e1e1e] rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Base Price:</span>
          <span className="text-xl font-semibold text-white">${product.price.toFixed(2)}</span>
        </div>
        
        {/* Show selected options with additional cost (mock) */}
        {Object.entries(selectedOptions).map(([option, isSelected]) => {
          if (isSelected) {
            // Mock additional cost for options (10% of base price)
            const additionalCost = product.price * 0.1;
            return (
              <div key={option} className="flex justify-between items-center mt-2">
                <span className="text-gray-300">{option}:</span>
                <span className="text-white">+${additionalCost.toFixed(2)}</span>
              </div>
            );
          }
          return null;
        })}
        
        {/* Total price with options */}
        {hasSelectedOptions && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <span className="text-gray-300">Estimated Total:</span>
            <span className="text-2xl font-bold text-[#54BB74]">
              ${(product.price + (Object.values(selectedOptions).filter(Boolean).length * product.price * 0.1)).toFixed(2)}
            </span>
          </div>
        )}
      </div>
      
      {/* Availability */}
      <div className="mt-4">
        <span className="text-sm text-gray-400">Availability: </span>
        {product.inStock ? (
          <span className="text-green-500">In Stock</span>
        ) : (
          <span className="text-red-500">Out of Stock</span>
        )}
      </div>
    </div>
  );
}
