'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products, categories, getProductsByCategory } from '../data/products';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  useEffect(() => {
    setFilteredProducts(getProductsByCategory(selectedCategory));
  }, [selectedCategory]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-[Amenti] text-[#54BB74] mb-4">
              Product Catalog
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Explore our innovative lighting solutions designed to transform any space with intelligent, 
              customizable lighting experiences.
            </p>
          </div>
          
          {/* Category filters and view toggle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleViewMode}
                className="bg-[#292929] border border-[#54BB74] text-[#54BB74] px-4 py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>
          
          {/* Products display */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No products found in this category.</p>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'flex flex-col space-y-6'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
