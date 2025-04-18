'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductNotFound() {
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[Amenti] text-[#54BB74] mb-6">
            Product Not Found
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We couldn't find the product you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          
          <Link 
            href="/product-catalog"
            className="inline-block bg-[#292929] border border-[#54BB74] text-[#54BB74] px-8 py-3 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-lg"
          >
            Return to Product Catalog
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
