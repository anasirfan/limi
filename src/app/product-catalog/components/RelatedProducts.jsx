'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { products } from '../../data/products';

export default function RelatedProducts({ currentProductId, category, limit = 3 }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Get products from the same category, excluding the current product
    const sameCategoryProducts = products.filter(
      product => product.category === category && product.id !== currentProductId
    );
    
    // If there are not enough products in the same category, add some featured products
    let related = [...sameCategoryProducts];
    if (related.length < limit) {
      const featuredProducts = products.filter(
        product => product.featured && product.id !== currentProductId && product.category !== category
      );
      related = [...related, ...featuredProducts].slice(0, limit);
    } else {
      related = related.slice(0, limit);
    }
    
    setRelatedProducts(related);
  }, [currentProductId, category, limit]);
  
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16 border-t border-gray-700 pt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white">Related Products</h2>
        <Link 
          href="/product-catalog" 
          className="flex items-center text-[#54BB74] hover:underline transition-all transform hover:translate-x-1"
        >
          View all <FaArrowRight className="ml-2" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map(product => (
          <Link 
            key={product.id} 
            href={`/product-catalog/${product.slug}`}
            className="group bg-[#1e1e1e] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#54BB74]/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-square">
              <Image
                src={product.thumbnail || '/images/products/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.new && (
                <span className="absolute top-2 right-2 bg-[#54BB74] text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            
            <div className="p-4">
              <span className="text-xs text-[#54BB74] font-medium">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-[#54BB74] transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {product.shortDescription}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-white">${product.price.toFixed(2)}</span>
                <span className="text-[#54BB74] text-sm group-hover:underline">View details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
