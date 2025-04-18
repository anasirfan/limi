'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product, viewMode }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Grid view card
  if (viewMode === 'grid') {
    return (
      <div 
        className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.thumbnail || '/images/products/placeholder.jpg'}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {product.new && (
            <div className="absolute top-4 right-4 bg-[#54BB74] text-white text-sm font-bold px-3 py-1 rounded-full">
              New
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <span className="text-sm text-[#54BB74] font-medium">
              {product.category}
            </span>
            <h3 className="text-xl font-bold font-[Amenti] mt-1 text-white">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <Link 
            href={`/product-catalog/${product.slug}`}
            className="block w-full text-center bg-[#292929] border border-[#54BB74] text-[#54BB74] py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }
  
  // List view card
  return (
    <div 
      className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 md:h-auto md:w-1/3 overflow-hidden">
        <Image
          src={product.thumbnail || '/images/products/placeholder.jpg'}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {product.new && (
          <div className="absolute top-4 right-4 bg-[#54BB74] text-white text-sm font-bold px-3 py-1 rounded-full">
            New
          </div>
        )}
      </div>
      
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <span className="text-sm text-[#54BB74] font-medium">
              {product.category}
            </span>
            <h3 className="text-xl font-bold font-[Amenti] mt-1 text-white">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-300 mb-4">
            {product.shortDescription}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-gray-400">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Link 
          href={`/product-catalog/${product.slug}`}
          className="self-start bg-[#292929] border border-[#54BB74] text-[#54BB74] px-6 py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
