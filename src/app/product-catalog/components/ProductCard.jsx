'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, viewMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  
  // Check if product is in favorites
  const isFavorite = favorites.some(item => item.id === product.id);
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };
  
  // Handle toggle favorites
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  
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
            <span className="text-sm text-emerald font-medium">
              {product.category}
            </span>
            <h3 className="text-xl font-bold font-[Amenti] mt-1 text-white">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-charleston-green border border-emerald text-emerald py-2 rounded-md hover:bg-emerald hover:text-charleston-green transition-colors"
            >
              <FaShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-md border ${isFavorite ? 'bg-emerald/10 border-emerald' : 'bg-charleston-green border-emerald/50'} transition-colors`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <FaHeart className="text-emerald" size={16} />
              ) : (
                <FaRegHeart className="text-emerald" size={16} />
              )}
            </button>
          </div>
          
          <Link 
            href={`/product-catalog/${product.slug}`}
            className="block w-full text-center bg-charleston-green border border-emerald text-emerald py-2 rounded-md hover:bg-emerald hover:text-charleston-green transition-colors"
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
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-charleston-green border border-emerald text-emerald px-4 py-2 rounded-md hover:bg-emerald hover:text-charleston-green transition-colors"
          >
            <FaShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-md border ${isFavorite ? 'bg-emerald/10 border-emerald' : 'bg-charleston-green border-emerald/50'} transition-colors`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart className="text-emerald" size={16} />
            ) : (
              <FaRegHeart className="text-emerald" size={16} />
            )}
          </button>
          
          <Link 
            href={`/product-catalog/${product.slug}`}
            className="self-start bg-charleston-green border border-emerald text-emerald px-6 py-2 rounded-md hover:bg-emerald hover:text-charleston-green transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
