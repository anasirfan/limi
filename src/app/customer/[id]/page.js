'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SlideCarousel from '../../components/SlideCarousel';
import { FaBuilding } from 'react-icons/fa';
import { selectSlides } from '../../redux/slices/slidesSlice';

// PresentationHeader component to display dynamic titles from slides
const PresentationHeader = ({ customerName }) => {
  const slides = useSelector(selectSlides);
  const [presentationTitle, setPresentationTitle] = useState('Presentation');
  const [presentationSubtitle, setPresentationSubtitle] = useState(`Interactive presentation for ${customerName}`);
  
  // Load presentation settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('presentationSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.title) setPresentationTitle(settings.title);
        if (settings.subtitle) {
          // Replace {customerName} placeholder with actual customer name
          const subtitle = settings.subtitle.replace('{customerName}', customerName);
          setPresentationSubtitle(subtitle);
        }
      }
    } catch (error) {
      console.error('Error loading presentation settings:', error);
    }
  }, [customerName]);
  
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 text-white">{presentationTitle}</h2>
      <p className="text-gray-300 mb-8">{presentationSubtitle}</p>
    </div>
  );
};

// Test customer profiles for development and exhibition
const testCustomers = {
  'test001': {
    staffName: 'John from LIMI',
    customerName: 'Alex Chen',
    clientCompanyInfo: 'Bright Spaces Design',
    itemCodes: ['LIMI-001', 'LIMI-005', 'LIMI-012'],
    businessCardFront: '/images/businessCard/front1.jpg',
    businessCardBack: '/images/businessCard/back1.jpg',
    companyInfo: {
      name: 'LIMI Lighting Ltd.',
      description: 'Creating innovative lighting solutions for modern spaces',
      founded: '2020',
      headquarters: 'London, UK',
      mission: 'To transform spaces through intelligent lighting that adapts to human needs while minimizing environmental impact',
      vision: 'A world where lighting enhances wellbeing, productivity, and sustainability in every space',
      website: 'www.limi-lighting.co.uk',
      support: 'support@limi-lighting.co.uk'
    }
  },
  'test002': {
    staffName: 'Sarah from LIMI',
    customerName: 'Michael Wong',
    clientCompanyInfo: 'Modern Living Interiors',
    itemCodes: ['LIMI-003', 'LIMI-007', 'LIMI-015', 'LIMI-018'],
    businessCardFront: '/images/businessCard/front2.jpg',
    businessCardBack: '/images/businessCard/back2.jpg',
    companyInfo: {
      name: 'LIMI Lighting Ltd.',
      description: 'Creating innovative lighting solutions for modern spaces',
      founded: '2020',
      headquarters: 'London, UK',
      mission: 'To transform spaces through intelligent lighting that adapts to human needs while minimizing environmental impact',
      vision: 'A world where lighting enhances wellbeing, productivity, and sustainability in every space',
      website: 'www.limi-lighting.co.uk',
      support: 'support@limi-lighting.co.uk'
    }
  }
};

// Product catalog mapping product IDs to details
const productCatalog = {
  'LIMI-001': {
    name: 'LIMI Connect Hub',
    description: 'Smart lighting control hub with wireless connectivity',
    image: '/images/products/product1.jpg',
    price: '£149.99'
  },
  'LIMI-003': {
    name: 'LIMI Spectrum Panel',
    description: 'Color-changing LED panel with customizable scenes',
    image: '/images/products/product3.jpg',
    price: '£89.99'
  },
  'LIMI-005': {
    name: 'LIMI Motion Sensor',
    description: 'Advanced motion detection for automated lighting',
    image: '/images/products/product5.jpg',
    price: '£39.99'
  },
  'LIMI-007': {
    name: 'LIMI Ambient Strip',
    description: 'Flexible LED strip for indirect lighting applications',
    image: '/images/products/product7.jpg',
    price: '£29.99'
  },
  'LIMI-012': {
    name: 'LIMI Daylight Dome',
    description: 'Natural light simulation ceiling fixture',
    image: '/images/products/product12.jpg',
    price: '£199.99'
  },
  'LIMI-015': {
    name: 'LIMI Voice Controller',
    description: 'Voice-activated lighting control module',
    image: '/images/products/product15.jpg',
    price: '£59.99'
  },
  'LIMI-018': {
    name: 'LIMI Outdoor Spotlight',
    description: 'Weather-resistant smart spotlight for gardens',
    image: '/images/products/product18.jpg',
    price: '£79.99'
  }
};

export default function CustomerProfile() {
  const params = useParams();
  const customerId = params.id;
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default fallback data to use when API calls fail
  const fallbackData = {
    staffName: 'LIMI Representative',
    customerName: 'Guest User',
    clientCompanyInfo: 'Your Company',
    itemCodes: ['LIMI-001', 'LIMI-007'],
    companyInfo: {
      name: 'LIMI Lighting Ltd.',
      description: 'Creating innovative lighting solutions for modern spaces',
      founded: '2020',
      headquarters: 'London, UK',
      mission: 'To transform spaces through intelligent lighting that adapts to human needs while minimizing environmental impact',
      vision: 'A world where lighting enhances wellbeing, productivity, and sustainability in every space',
      website: 'www.limi-lighting.co.uk',
      support: 'support@limi-lighting.co.uk'
    }
  };

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        setLoading(true);
        setError(null);
        
        // Check if we have a test customer first
        if (testCustomers[customerId]) {
          // Simulate API delay for testing
          setTimeout(() => {
            const customerData = testCustomers[customerId];
            
            // Map product codes to actual product data
            const products = customerData.itemCodes?.map(code => {
              return productCatalog[code] ? {
                ...productCatalog[code],
                code
              } : null;
            }).filter(Boolean) || [];
            
            setCustomer({
              ...customerData,
              products
            });
            
            setLoading(false);
          }, 1000);
          return;
        }
        
        try {
          // If not a test customer, fetch from API
          const response = await fetch(`/api/customers/${customerId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch customer data');
          }
          
          const data = await response.json();
          
          // Process the data and add products
          const itemCodes = data.itemCodes || [];
          const products = itemCodes.map(code => {
            return productCatalog[code] ? {
              ...productCatalog[code],
              code
            } : null;
          }).filter(Boolean);
          
          setCustomer({
            ...data,
            products
          });
          setLoading(false);
        } catch (apiError) {
          console.warn('API fetch failed, using fallback data:', apiError);
          
          // Create fallback customer data with the requested ID
          const fallbackCustomer = {
            ...fallbackData,
            id: customerId,
            // Map product codes to actual product data for fallback
            products: fallbackData.itemCodes.map(code => {
              return productCatalog[code] ? {
                ...productCatalog[code],
                code
              } : null;
            }).filter(Boolean)
          };
          
          setCustomer(fallbackCustomer);
          setLoading(false);
          // We don't set error state here since we're providing fallback UI
        }
      } catch (err) {
        console.error('Error in fetchCustomerData:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[100px] pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-[#93cfa2] mb-2">Your profile is loading...</h2>
            <p className="text-gray-300">Customizing your LIMI experience</p>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Error notification */}
              <div className="bg-red-900/20 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Profile</h2>
                <p className="text-gray-300 mb-4">{error}</p>
                <p className="text-gray-400 mb-2">We're showing you a limited version of the customer profile.</p>
                <p className="text-gray-400">Please check your customer ID or try again later for the full experience.</p>
              </div>
              
              {/* Slide Presentation Section - Still available in error state */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl p-6 mb-8">
                <h2 className="text-3xl font-bold mb-6 text-white">Presentation</h2>
                <p className="text-gray-300 mb-8">Interactive slide presentation</p>
                
                {/* Slide Editor */}
                <div className="bg-[#292929] p-4 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4 text-white">Slide Editor</h3>
                  <SlideEditor />
                </div>
                
                {/* Live Preview */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-white">Live Preview</h3>
                  <div className="bg-black rounded-lg overflow-hidden">
                    <SlideCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : customer ? (
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Customer Welcome */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl mb-8">
                <div className="bg-gradient-to-r from-[#292929] to-[#54bb74]/30 p-6">
                  <h1 className="text-3xl font-bold mb-2 text-[#93cfa2]">
                    Welcome, {customer.customerName || 'Valued Customer'}
                  </h1>
                  <p className="text-gray-300 mb-4">Your LIMI representative: {customer.staffName}</p>
                  
                  {customer.clientCompanyInfo && (
                    <div className="flex items-center mt-2">
                      <FaBuilding className="text-[#93cfa2] mr-2" />
                      <span className="text-gray-300">
                        {customer.clientCompanyInfo}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Slide Presentation Section */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl p-6 mb-8">
                <PresentationHeader customerName={customer.staffName} />
                
                {/* Slide Carousel */}
                <div className="bg-black rounded-lg overflow-hidden">
                  <SlideCarousel />
                </div>
              </div>
              
              {/* Product Showcase */}
              {/* {customer.products && customer.products.length > 0 && (
                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl p-6 mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-white">Selected Products</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customer.products.map((product, index) => (
                      <div key={index} className="bg-[#292929] p-4 rounded-lg">
                        {product.image && (
                          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                            <Image 
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: 'cover' }}
                              className="hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="font-medium text-emerald-400 text-lg">{product.name}</h3>
                        {product.description && (
                          <p className="text-gray-300 mt-1">{product.description}</p>
                        )}
                        {product.price && (
                          <p className="text-white font-bold mt-2">{product.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
              
              {/* Company Information */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-[#292929] to-[#54bb74]/30 p-6">
                  <h2 className="text-2xl font-bold text-[#93cfa2] mb-2">About LIMI</h2>
                  <p className="text-gray-300">{customer.companyInfo.description}</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#93cfa2] mb-3">Our Mission</h3>
                    <p className="text-gray-300">{customer.companyInfo.mission}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#93cfa2] mb-3">Our Vision</h3>
                    <p className="text-gray-300">{customer.companyInfo.vision}</p>
                  </div>
                  <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-[#93cfa2]">Founded</h4>
                        <p className="text-gray-300">{customer.companyInfo.founded}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#93cfa2]">Headquarters</h4>
                        <p className="text-gray-300">{customer.companyInfo.headquarters}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#93cfa2]">Website</h4>
                        <p className="text-gray-300">{customer.companyInfo.website}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#93cfa2]">Support</h4>
                        <p className="text-gray-300">{customer.companyInfo.support}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      <Footer />
    </main>
  );
}