'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { categories } from '../data/products';
import { selectProductsByCategory } from '../redux/slices/productsSlice';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import AppDownloadCTA from '../components/AppDownloadCTA';

// Content component that uses useSearchParams
function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Get products from Redux store
  const productsFromRedux = useSelector(state => 
    selectProductsByCategory(state, selectedCategory)
  );
  
  // Fix for infinite loop - only update filtered products when dependencies actually change
  useEffect(() => {
    // Avoid unnecessary state updates if the arrays are the same
    if (JSON.stringify(productsFromRedux) !== JSON.stringify(filteredProducts)) {
      setFilteredProducts(productsFromRedux);
    }
  }, [selectedCategory, productsFromRedux]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  return (
    <div>
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-[Amenti] text-[#54BB74] mb-4">
              Product Catalog
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Discover the Limitless Lighting System — a modular, future-ready platform that merges style and intelligence. 
              With swappable components and a unique mounting system, update your lighting effortlessly — no rewiring, no tools, no downtime.
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
          
          {/* App Download CTA - Strategically placed for maximum impact */}
          <div className="mt-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white mb-6">
              Take Your Lighting Experience Further
            </h2>
            <AppDownloadCTA 
              variant="default" 
              showQRCode={true}
              highlightFeature={selectedCategory === 'all' ? 'ar' : 
                selectedCategory === 'bases' ? 'configurator' : 
                selectedCategory === 'ball-system' ? 'control' : 
                selectedCategory === 'bar-system' ? 'exclusive' : 'ar'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function ProductCatalog() {
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <Suspense fallback={
        <div className="pt-[120px] pb-16 container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse text-2xl text-[#54BB74]">Loading product catalog...</div>
          </div>
        </div>
      }>
        <ProductCatalogContent />
      </Suspense>
      
      <Footer />
    </main>
  );
}
