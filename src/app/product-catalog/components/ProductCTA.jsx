'use client';

import Link from 'next/link';
import { FaDownload, FaCog, FaMobileAlt, FaCubes } from 'react-icons/fa';
import AppDownloadCTA from '../../components/AppDownloadCTA';

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
          <span>Open Web Configurator</span>
        </Link>
        
        <button 
          onClick={() => alert('Data sheet download will be implemented with backend integration')}
          className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] py-3 px-6 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-center"
        >
          <FaDownload />
          <span>Download Data Sheet</span>
        </button>
      </div>

      {/* App CTAs - Enhanced with more compelling messaging */}
      <div className="mt-6 p-5 bg-gradient-to-r from-[#1e1e1e] to-[#292929] rounded-lg border border-[#54BB74]/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#54BB74]/20 p-2 rounded-full">
            <FaMobileAlt className="text-[#54BB74] text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            {product.category === 'Chandeliers' || product.category === 'Pendants' ? 
              'See How This Looks in Your Space' : 
              'Unlock Advanced Features'}
          </h3>
        </div>
        
        <p className="text-gray-300 mb-4 text-sm">
          {product.category === 'Chandeliers' || product.category === 'Pendants' ? 
            `Use the LIMI app to visualize this ${product.category.toLowerCase().slice(0, -1)} in your actual space with our advanced AR technology.` : 
            `The LIMI app offers powerful configuration and control options for your ${product.name} that aren't available on the web.`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="https://apps.apple.com/app/limi-lighting"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 bg-[#54BB74] text-white py-3 px-4 rounded-md hover:bg-[#48a064] transition-colors text-center group"
          >
            <FaMobileAlt className="group-hover:scale-110 transition-transform" />
            <span>iOS App</span>
          </Link>
          
          <Link 
            href="https://play.google.com/store/apps/details?id=com.limi.lighting"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] py-3 px-4 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-center group"
          >
            <FaMobileAlt className="group-hover:scale-110 transition-transform" />
            <span>Android App</span>
          </Link>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaCubes className="text-[#54BB74]" />
            <span className="text-sm text-gray-300">
              {product.category === 'Chandeliers' || product.category === 'Pendants' ? 
                'AR Visualization' : 'Advanced Configuration'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCog className="text-[#54BB74]" />
            <span className="text-sm text-gray-300">
              {product.category === 'Chandeliers' || product.category === 'Pendants' ? 
                'Smart Control' : 'Real-time Preview'}
            </span>
          </div>
        </div>
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
