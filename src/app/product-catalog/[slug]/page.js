'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getProductBySlug } from '../../data/products';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductSpecifications from '../components/ProductSpecifications';
import ProductToggleOptions from '../components/ProductToggleOptions';
import ProductCTA from '../components/ProductCTA';
import ProductNotFound from '../components/ProductNotFound';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (params.slug) {
      const productData = getProductBySlug(params.slug);
      setProduct(productData);
      
      // Initialize selected options
      if (productData && productData.toggleOptions) {
        const initialOptions = {};
        productData.toggleOptions.forEach(option => {
          initialOptions[option.name] = option.defaultValue;
        });
        setSelectedOptions(initialOptions);
      }
      
      setLoading(false);
    }
  }, [params.slug]);
  
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };
  
  if (loading) {
    return (
      <main className="bg-[#292929] text-white min-h-screen">
        <Header />
        <div className="pt-[120px] pb-16 flex justify-center items-center">
          <div className="animate-pulse text-2xl text-[#54BB74]">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <div className="mb-6 text-sm text-gray-400">
            <Link href="/product-catalog" className="hover:text-[#54BB74] transition-colors">
              Product Catalog
            </Link>
            <span className="mx-2">/</span>
            <Link 
              href={`/product-catalog?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[#54BB74] transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#54BB74]">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product images */}
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
            
            {/* Product details */}
            <div>
              <div className="mb-6">
                <span className="text-sm text-[#54BB74] font-medium">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold font-[Amenti] mt-1 text-white">
                  {product.name}
                </h1>
                {product.new && (
                  <span className="inline-block mt-2 bg-[#54BB74] text-white text-sm font-bold px-3 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-8">
                {product.fullDescription}
              </p>
              
              {/* Product specifications */}
              <ProductSpecifications specs={product.specs} />
              
              {/* Toggle options */}
              {product.toggleOptions && product.toggleOptions.length > 0 && (
                <ProductToggleOptions 
                  options={product.toggleOptions}
                  selectedOptions={selectedOptions}
                  onOptionChange={handleOptionChange}
                />
              )}
              
              {/* Call to action buttons */}
              <ProductCTA product={product} selectedOptions={selectedOptions} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
