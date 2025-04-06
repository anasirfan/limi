// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import { FaUser, FaQrcode, FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';

// // Test customer profiles for development and exhibition
// const testCustomers = {
//   'test001': {
//     staffName: 'John from LIMI',
//     itemCodes: ['LIMI-001', 'LIMI-005', 'LIMI-012'],  // These will map to product images 1, 5, and 12
//     businessCardFront: '/images/businessCard/front1.jpg',
//     businessCardBack: '/images/businessCard/back1.jpg'
//   },
//   'test002': {
//     staffName: 'Sarah from LIMI',
//     itemCodes: ['LIMI-003', 'LIMI-007', 'LIMI-015', 'LIMI-018'],  // These will map to product images 3, 7, 15, and 18
//     businessCardFront: '/images/businessCard/front2.jpg',
//     businessCardBack: '/images/businessCard/back2.jpg'
//   }
// };

// // Product catalog mapping product IDs to details
// const productCatalog = {
//   'LIMI-001': {
//     name: 'LIMI Connect Hub',
//     description: 'Smart lighting control hub with wireless connectivity',
//     image: '/images/products/1.webp'
//   },
//   'LIMI-002': {
//     name: 'LIMI Modular Pendant',
//     description: 'Customizable pendant light with modular components',
//     image: '/images/products/2.jpg'
//   },
//   'LIMI-003': {
//     name: 'LIMI Adaptive',
//     description: 'Adaptive lighting system with automatic brightness control',
//     image: '/images/products/3.jpg'
//   },
//   'LIMI-004': {
//     name: 'LIMI Sense AI',
//     description: 'AI-powered lighting with occupancy and activity recognition',
//     image: '/images/products/4.jpg'
//   },
//   'LIMI-005': {
//     name: 'LIMI Modular+',
//     description: 'Extended flexibility with modular lighting components',
//     image: '/images/products/5.jpg'
//   },
//   'LIMI-006': {
//     name: 'LIMI Insight Dashboard',
//     description: 'Advanced analytics for lighting performance monitoring',
//     image: '/images/products/6.jpg'
//   },
//   'LIMI-007': {
//     name: 'LIMI Wall Panel',
//     description: 'Elegant wall-mounted lighting control panel',
//     image: '/images/products/7.jpg'
//   },
//   'LIMI-008': {
//     name: 'LIMI Track Light',
//     description: 'Adjustable track lighting system for retail spaces',
//     image: '/images/products/8.jpg'
//   },
//   'LIMI-009': {
//     name: 'LIMI Pendant Trio',
//     description: 'Set of three coordinated pendant lights',
//     image: '/images/products/9.jpg'
//   },
//   'LIMI-010': {
//     name: 'LIMI Floor Lamp',
//     description: 'Modern smart floor lamp with adjustable brightness',
//     image: '/images/products/10.png'
//   },
//   'LIMI-011': {
//     name: 'LIMI Outdoor',
//     description: 'Weather-resistant smart lighting for outdoor spaces',
//     image: '/images/products/11.jpg'
//   },
//   'LIMI-012': {
//     name: 'LIMI Strip Light',
//     description: 'Flexible LED strip lighting with RGB capabilities',
//     image: '/images/products/12.jpg'
//   },
//   'LIMI-013': {
//     name: 'LIMI Desk Lamp',
//     description: 'Ergonomic desk lamp with adjustable color temperature',
//     image: '/images/products/13.jpg'
//   },
//   'LIMI-014': {
//     name: 'LIMI Ceiling Panel',
//     description: 'Recessed ceiling panel with uniform light distribution',
//     image: '/images/products/14.jpg'
//   },
//   'LIMI-015': {
//     name: 'LIMI Spotlight',
//     description: 'Directional spotlight for accent lighting',
//     image: '/images/products/15.jpg'
//   },
//   'LIMI-016': {
//     name: 'LIMI Chandelier',
//     description: 'Contemporary chandelier with smart controls',
//     image: '/images/products/16.jpg'
//   },
//   'LIMI-017': {
//     name: 'LIMI Under Cabinet',
//     description: 'Low-profile lighting for kitchen and display cabinets',
//     image: '/images/products/17.jpg'
//   },
//   'LIMI-018': {
//     name: 'LIMI Bathroom',
//     description: 'Moisture-resistant lighting for bathroom environments',
//     image: '/images/products/18.jpg'
//   },
//   'LIMI-019': {
//     name: 'LIMI Downlight',
//     description: 'Recessed downlight with adjustable beam angle',
//     image: '/images/products/19.jpg'
//   },
//   'LIMI-020': {
//     name: 'LIMI Garden',
//     description: 'Solar-powered garden lighting with smart controls',
//     image: '/images/products/20.jpg'
//   }
// };

// // Default company information
// const defaultCompanyInfo = {
//   name: 'LIMI Lighting Ltd.',
//   description: 'Creating innovative lighting solutions for modern spaces',
//   founded: '2020',
//   headquarters: 'London, UK',
//   mission: 'To transform spaces through intelligent lighting that adapts to human needs while minimizing environmental impact',
//   vision: 'A world where lighting enhances wellbeing, productivity, and sustainability in every space',
//   website: 'www.limi-lighting.co.uk',
//   support: 'support@limi-lighting.co.uk'
// };

// export default function CustomerProfile() {
//   const params = useParams();
//   const customerId = params.id;
  
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchCustomerData() {
//       try {
//         setLoading(true);
        
//         // Check if we have a test customer first
//         if (testCustomers[customerId]) {
//           // Simulate API delay for testing
//           setTimeout(() => {
//             // Map item codes to product details from catalog
//             const customerProducts = testCustomers[customerId].itemCodes.map(code => {
//               // Get product ID from the catalog
//               return productCatalog[code] || {
//                 name: `Unknown Product (${code})`,
//                 description: 'Product information not available',
//                 image: null
//               };
//             });
            
//             // Combine test customer data with product information
//             setCustomer({
//               ...testCustomers[customerId],
//               products: customerProducts,
//               companyInfo: defaultCompanyInfo
//             });
//             setLoading(false);
//           }, 1500);
//           return;
//         }
        
//         // If not a test customer, fetch from API
//         const response = await fetch(`https://api.limitless-lighting.co.uk/client/get_customer_details/${customerId}`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch customer data');
//         }
        
//         const data = await response.json();
//         // Check if the response has the expected structure with data property
//         if (data && data.success && data.data) {
//           // Extract the actual customer data from the response
//           const customerData = data.data;
          
//           // Map item codes from API to product details from catalog
//           // If itemCode is a string, convert it to an array with a single item
//           const itemCodes = customerData.itemCodes || 
//                           (customerData.itemCode ? [customerData.itemCode] : []);
          
//           const customerProducts = itemCodes.map(code => {
//             // Get product ID from the catalog
//             return productCatalog[code] || {
//               name: `Unknown Product (${code})`,
//               description: 'Product information not available',
//               image: null
//             };
//           });
          
//           // Process images from the API response - backend will provide direct URLs
//           const businessCardFront = customerData.images?.frontCardImage?.url || null;
//           const businessCardBack = customerData.images?.backCardImage?.url || null;
          
//           // Combine API data with product information
//           setCustomer({
//             staffName: customerData.staffName,
//             itemCodes: itemCodes,
//             businessCardFront: businessCardFront,
//             businessCardBack: businessCardBack,
//             profileId: customerData.profileId,
//             // Format profile URL as /customer/[profileId]
//             profileUrl: customerData.profileUrl || `/customer/${customerData.profileId}`,
//             clientCompanyInfo: customerData.clientCompanyInfo,
//             notes: customerData.notes,
//             products: customerProducts,
//             companyInfo: defaultCompanyInfo
//           });
//         } else {
//           // If response doesn't have the expected structure, use the data directly
//           // This is a fallback for backward compatibility
//           const itemCodes = data.itemCodes || (data.itemCode ? [data.itemCode] : []);
//           const customerProducts = itemCodes.map(code => {
//             return productCatalog[code] || {
//               name: `Unknown Product (${code})`,
//               description: 'Product information not available',
//               image: null
//             };
//           });
          
//           setCustomer({
//             ...data,
//             itemCodes: itemCodes,
//             products: customerProducts,
//             companyInfo: defaultCompanyInfo
//           });
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching customer data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     }

//     if (customerId) {
//       fetchCustomerData();
//     }
//   }, [customerId]);

//   return (
//     <main className="bg-[#292929] text-white min-h-screen">
//       <Header />
      
//       <div className="pt-[100px] pb-16">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center min-h-[50vh]">
//             <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
//             <h2 className="text-2xl font-[Amenti] text-[#93cfa2] mb-2">Your profile is loading...</h2>
//             <p className="text-gray-300">Customizing your LIMI experience</p>
//           </div>
//         ) : error ? (
//           <div className="container mx-auto px-4 text-center">
//             <div className="bg-red-900/20 p-8 rounded-lg max-w-md mx-auto">
//               <h2 className="text-2xl font-[Amenti] text-red-400 mb-4">Error Loading Profile</h2>
//               <p className="text-gray-300 mb-4">{error}</p>
//               <p className="text-gray-400">Please check your customer ID or try again later.</p>
//             </div>
//           </div>
//         ) : customer ? (
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl">
//               {/* Profile Header */}
//               <div className="bg-gradient-to-r from-[#292929] to-[#54bb74]/30 p-6">
//                 <div className="mb-2 text-sm text-emerald-400 font-medium">Registered by</div>
//                 <h1 className="text-3xl font-bold font-[Amenti] text-[#93cfa2] mb-2">
//                   {customer.staffName || 'LIMI Staff'}
//                 </h1>
//                 <div className="flex items-center">
//                   <FaQrcode className="text-[#93cfa2] mr-2" />
//                   <span className="text-gray-300 font-mono">
//                     Customer ID: {customer.profileId || customerId}
//                   </span>
//                 </div>
//                 {customer.clientCompanyInfo && (
//                   <div className="mt-2 flex items-center">
//                     <FaBuilding className="text-[#93cfa2] mr-2" />
//                     <span className="text-gray-300">
//                       {customer.clientCompanyInfo}
//                     </span>
//                   </div>
//                 )}
//                 {customer.itemCodes && customer.itemCodes.length > 0 && (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {customer.itemCodes.map((code, index) => (
//                       <span key={index} className="bg-[#54bb74]/20 text-[#93cfa2] text-xs px-2 py-1 rounded-full">
//                         {code}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//                 {customer.notes && (
//                   <div className="mt-3 bg-[#292929]/50 p-2 rounded">
//                     <p className="text-gray-300 text-sm italic">Notes: {customer.notes}</p>
//                   </div>
//                 )}
//               </div>
              
//               {/* Business Card Images */}
//               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Front of Business Card */}
//                 <div className="bg-[#292929]/50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold font-[Amenti] text-[#93cfa2] mb-3">Business Card (Front)</h3>
//                   <div className="relative h-48 md:h-64 overflow-hidden rounded-lg shadow-lg">
//                     {customer.businessCardFront ? (
//                       <Image 
//                         src={customer.businessCardFront} 
//                         alt="Business Card Front" 
//                         fill
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         style={{ objectFit: 'cover' }}
//                         className="hover:scale-105 transition-transform duration-300"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
//                         <span>No image available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Back of Business Card */}
//                 <div className="bg-[#292929]/50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold font-[Amenti] text-[#93cfa2] mb-3">Business Card (Back)</h3>
//                   <div className="relative h-48 md:h-64 overflow-hidden rounded-lg shadow-lg">
//                     {customer.businessCardBack ? (
//                       <Image 
//                         src={customer.businessCardBack} 
//                         alt="Business Card Back" 
//                         fill
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         style={{ objectFit: 'cover' }}
//                         className="hover:scale-105 transition-transform duration-300"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
//                         <span>No image available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Profile Content */}
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Company Information */}
//                   <div className="bg-[#292929]/50 p-6 rounded-lg">
//                     <h2 className="text-xl font-semibold font-[Amenti] text-[#93cfa2] mb-4">About LIMI</h2>
                    
//                     <div className="space-y-4">
//                       <div className="flex items-start">
//                         <FaBuilding className="text-[#93cfa2] mt-1 mr-3" />
//                         <div>
//                           <p className="text-gray-400 text-sm">Company</p>
//                           <p className="text-white">{customer.companyInfo.name}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start">
//                         <FaEnvelope className="text-[#93cfa2] mt-1 mr-3" />
//                         <div>
//                           <p className="text-gray-400 text-sm">Support</p>
//                           <p className="text-white">{customer.companyInfo.support}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start">
//                         <FaPhone className="text-[#93cfa2] mt-1 mr-3" />
//                         <div>
//                           <p className="text-gray-400 text-sm">Contact</p>
//                           <p className="text-white">+44 20 7123 4567</p>
//                         </div>
//                       </div>
                      
//                       <div className="mt-4 pt-4 border-t border-gray-700">
//                         <p className="text-gray-300 italic">"{customer.companyInfo.description}"</p>
//                       </div>
                      
//                       {/* <div className="mt-4 pt-4 border-t border-gray-700">
//                         <h3 className="text-lg font-semibold text-[#93cfa2] mb-2">Exhibition Information</h3>
//                         <p className="text-white text-sm mb-2">Thank you for visiting our booth at the International Lighting Expo 2025!</p>
//                         <p className="text-gray-300 text-sm">Your registration has been confirmed, and we're excited to showcase our latest innovations in smart lighting solutions.</p>
//                       </div> */}
                      
//                       <div className="mt-4 pt-4 border-t border-gray-700">
//                         <h3 className="text-lg font-semibold text-[#93cfa2] mb-2">About LIMI Lighting</h3>
//                         <p className="text-gray-300 text-sm mb-2">LIMI Lighting is at the forefront of smart lighting innovation, combining cutting-edge technology with elegant design to transform spaces.</p>
//                         <p className="text-gray-300 text-sm">Founded in 2020, we've quickly established ourselves as industry leaders with our modular, energy-efficient lighting systems that adapt to your lifestyle.</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Product Information */}
//                   <div className="bg-[#292929]/50 p-6 rounded-lg">
//                     <h2 className="text-xl font-semibold font-[Amenti] text-[#93cfa2] mb-4">Selected Products</h2>
                    
//                     {customer.products && customer.products.length > 0 ? (
//                       <div className="space-y-6">
//                         {customer.products.map((product, index) => (
//                           <div key={index} className="border-b border-gray-700 pb-6 last:border-0">
//                             {product.image && (
//                               <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
//                                 <Image 
//                                   src={product.image}
//                                   alt={product.name}
//                                   fill
//                                   sizes="(max-width: 768px) 100vw, 50vw"
//                                   style={{ objectFit: 'cover' }}
//                                   className="hover:scale-105 transition-transform duration-300"
//                                 />
//                               </div>
//                             )}
//                             <p className="font-medium text-emerald-400 text-lg">{product.name}</p>
//                             {product.description && (
//                               <p className="text-gray-300 mt-1">{product.description}</p>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-400">No product information available</p>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Exhibition Information */}
//                 <div className="mt-6 bg-[#292929]/50 p-6 rounded-lg">
//                   <h2 className="text-xl font-semibold font-[Amenti] text-[#93cfa2] mb-4">Exhibition Information</h2>
//                   <p className="text-gray-300">Thank you for visiting our booth at the exhibition! We hope you enjoyed exploring our innovative lighting solutions. Your business card has been registered in our system, and we'll be in touch with you soon to discuss how LIMI can transform your space.</p>
//                 </div>
                
//                 {/* Call to Action */}
//                 <div className="mt-8 text-center">
//                   <p className="text-gray-400 mb-4">Thank you for your interest in LIMI products</p>
//                   <a href="https://limilighting.co.uk" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#54bb74] hover:bg-[#93cfa2] text-[#292929] font-bold py-3 px-6 rounded-full transition-colors duration-300">
//                     Visit Our Website
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="container mx-auto px-4 text-center">
//             <p className="text-gray-300">No customer data found</p>
//           </div>
//         )}
//       </div>
      
//       <Footer />
//     </main>
//   );
// }
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaQrcode, FaBuilding, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Test customer profiles for development and exhibition
const testCustomers = {
  'test001': {
    staffName: 'John from LIMI',
    customerName: 'Alex Chen',
    clientCompanyInfo: 'Bright Spaces Design'
  },
  'test002': {
    staffName: 'Sarah from LIMI',
    customerName: 'Michael Wong',
    clientCompanyInfo: 'Modern Living Interiors'
  }
};

export default function CustomerProfile() {
  const params = useParams();
  const customerId = params.id;
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);



  useEffect(() => {
    async function fetchCustomerData() {
      try {
        setLoading(true);
        
        // Check if we have a test customer first
        if (testCustomers[customerId]) {
          // Simulate API delay for testing
          setTimeout(() => {
            setCustomer({
              ...testCustomers[customerId]
            });
            setLoading(false);
          }, 1000);
          return;
        }
        
        // If not a test customer, fetch from API
        const response = await fetch(`https://api.limitless-lighting.co.uk/client/get_customer_details/${customerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        
        const data = await response.json();
        
        // Extract the customer data
        if (data && data.success && data.data) {
          const customerData = data.data;
          
          setCustomer({
            staffName: customerData.staffName,
            customerName: customerData.customerName,
            clientCompanyInfo: customerData.clientCompanyInfo,
            profileId: customerData.profileId
          });
        } else {
          // Fallback for backward compatibility
          setCustomer({
            staffName: data.staffName,
            customerName: data.customerName,
            clientCompanyInfo: data.clientCompanyInfo
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
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
            <h2 className="text-2xl font-[Amenti] text-[#93cfa2] mb-2">Your profile is loading...</h2>
            <p className="text-gray-300">Customizing your LIMI experience</p>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 text-center">
            <div className="bg-red-900/20 p-8 rounded-lg max-w-md mx-auto">
              <h2 className="text-2xl font-[Amenti] text-red-400 mb-4">Error Loading Profile</h2>
              <p className="text-gray-300 mb-4">{error}</p>
              <p className="text-gray-400">Please check your customer ID or try again later.</p>
            </div>
          </div>
        ) : customer ? (
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl">
              {/* Video Intro */}
              <div className="relative">
                <video 
                  ref={videoRef}
                  className="w-full h-auto" 
                  playsInline
                  controls
                  onError={() => {
                    console.error('Video failed to load');
                    setVideoError(true);
                  }}
                  poster="/images/video-poster.jpg"
                  preload="metadata"
                >
                  <source src="/videos/customerprofile_anim.mp4" type="video/mp4" />
                </video>
                
                {/* Video error fallback */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#292929]/90 p-4 text-center">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#54BB74] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-white text-lg font-[Amenti] mb-2">Video Unavailable</p>
                      <p className="text-gray-300 text-sm">Please check your connection or try again later.</p>
                    </div>
                  </div>
                )}
                

                

              </div>
              
              {/* Profile Header - Keep this section as requested */}
              <div className="bg-gradient-to-r from-[#292929] to-[#54bb74]/30 p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <div className="mb-2 text-sm text-emerald-400 font-medium">Registered by</div>
                    <h1 className="text-3xl font-bold font-[Amenti] text-[#93cfa2] mb-2">
                      {customer.staffName || 'LIMI Staff'}
                    </h1>
                    {/* {customer.clientCompanyInfo && (
                      <div className="flex items-center">
                        <FaBuilding className="text-[#93cfa2] mr-2" />
                        <span className="text-gray-300">
                          {customer.clientCompanyInfo}
                        </span>
                      </div>
                    )} */}
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right">
                    <h2 className="text-2xl font-[Amenti] text-[#93cfa2]">
                      {customer.clientCompanyInfo ? `Hi ${customer.clientCompanyInfo},` : 'Hello,'}
                    </h2>
                    <p className="text-lg text-white mt-2">Thanks for visiting us in Hong Kong!</p>
                  </div>
                </div>
              </div>
              
              {/* Placeholder Message */}
              <div className="px-8 py-6 text-center">
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-300">We're currently reviewing your details and preparing a tailored experience for you.</p>
                  <p className="text-gray-300">Please check back soon to see some exciting lighting solutions we'd love to share.</p>
                </div>
                
                <p className="text-gray-400 mb-6">In the meantime, feel free to explore more at:</p>
                
                <div className="mt-4">
                  <a 
                    href="https://limilighting.co.uk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-[#54bb74] hover:bg-[#93cfa2] text-[#292929] font-bold py-3 px-8 rounded-full transition-colors duration-300"
                  >
                    Visit Our Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-300">No customer data found</p>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
