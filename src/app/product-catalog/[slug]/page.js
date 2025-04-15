'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getProductBySlug } from '../../data/products';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductSpecifications from '../components/ProductSpecifications';
import ProductToggleOptions from '../components/ProductToggleOptions';
import ProductCTA from '../components/ProductCTA';
import ProductNotFound from '../components/ProductNotFound';
import RelatedProducts from '../components/RelatedProducts';
import BeTheArtistSection from '../components/BeTheArtistSection';
import AppDownloadCTA from '../../components/AppDownloadCTA';
// import Product360View from '../components/Product360View'; // Commented out for future implementation

// Content component that uses useParams
function ProductDetailContent() {
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
      <div className="pt-[120px] pb-16 flex justify-center items-center">
        <div className="animate-pulse text-2xl text-[#54BB74]">Loading...</div>
      </div>
    );
  }
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  return (
    <div className="pt-[120px] pb-16">
      <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-sm text-gray-400"
          >
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
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
              
              {/* 360 View - Commented out for future implementation */}
              {/* <Product360View productModel="/models/product.glb" productName={product.name} /> */}
            </motion.div>
            
            {/* Product details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:sticky md:top-[120px] self-start"
            >
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
            </motion.div>
          </div>
          
          {/* Be the Artist Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BeTheArtistSection />
          </motion.div>
          
          {/* App Download CTA - Contextually relevant to the product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="my-12"
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white">
                {product.category === 'Chandeliers' ? 'See This Chandelier in Your Space' : 
                 product.category === 'Pendants' ? 'Visualize This Pendant in Your Home' :
                 product.category === 'Bases' ? 'Design Your Perfect Lighting System' :
                 product.category === 'Ball System' ? 'Configure Advanced Lighting Scenes' :
                 'Experience the Full Potential of LIMI Lighting'}
              </h2>
              <p className="text-gray-300 mt-2 max-w-3xl">
                {product.category === 'Chandeliers' ? 'Our mobile app lets you visualize exactly how this chandelier will look in your space using advanced AR technology.' :
                 product.category === 'Pendants' ? 'Use our AR tools to see this pendant in your actual space and experiment with different heights and placements.' :
                 product.category === 'Bases' ? 'The LIMI app offers advanced configuration tools to design your perfect lighting system starting with this base.' :
                 product.category === 'Ball System' ? 'Take full control of your Ball System with our mobile app\'s advanced scene creation and scheduling features.' :
                 'Download the LIMI app to unlock the full potential of your lighting with AR visualization, advanced configuration, and smart control.'}
              </p>
            </div>
            
            <AppDownloadCTA 
              variant="default" 
              highlightFeature={
                product.category === 'Chandeliers' || product.category === 'Pendants' ? 'ar' : 
                product.category === 'Bases' || product.category === 'Universal Attachments' ? 'configurator' :
                product.category === 'Ball System' || product.category === 'Bar System' ? 'control' :
                'exclusive'
              } 
              showQRCode={true} 
            />
          </motion.div>
          
          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RelatedProducts 
              currentProductId={product.id} 
              category={product.category} 
              limit={3} 
            />
          </motion.div>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function ProductDetail() {
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <Suspense fallback={
        <div className="pt-[120px] pb-16 container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse text-2xl text-[#54BB74]">Loading product details...</div>
          </div>
        </div>
      }>
        <ProductDetailContent />
      </Suspense>
      
      <Footer />
    </main>
  );
}
