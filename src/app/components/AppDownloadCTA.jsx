'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaApple, 
  FaGooglePlay, 
  FaCubes, 
  FaMobileAlt, 
  FaLightbulb, 
  FaWifi,
  FaRegLightbulb,
  FaCheck,
  FaStar,
  FaGift,
  FaTimes,
  FaArrowRight,
  FaCamera,
  FaTools,
  FaLock,
  FaCog,
  FaMagic
} from 'react-icons/fa';
// No need for MD icons

export default function AppDownloadCTA({ 
  variant = 'default', // 'default', 'compact', 'inline', 'banner'
  ctaText = 'Configure in LIMI App',
  showQRCode = false,
  highlightFeature = null // 'ar', 'configurator', 'control'
}) {
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [showPromo, setShowPromo] = useState(false);
  const [countdown, setCountdown] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 });
  const [selectedFeature, setSelectedFeature] = useState(highlightFeature || 'ar');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // Define app store links (placeholders for now)
  const appStoreLink = "https://apps.apple.com/app/limi-lighting";
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.limi.lighting";

  // Handle user interaction with the component
  const handleInteraction = () => {
    setHasInteracted(true);
    setInteractionCount(prev => prev + 1);
    
    // Show promotion after 2 interactions
    if (interactionCount === 2 && !showPromo) {
      setTimeout(() => {
        setShowPromo(true);
      }, 1500);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Automatically show promo after 3 seconds if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  // Feature highlights with rich content
  const featureHighlights = {
    ar: {
      icon: <FaCubes className="text-3xl text-[#54BB74] mb-3" />,
      title: "Visualize in Your Space with AR",
      description: "See exactly how LIMI lighting will transform your space before you buy. Our advanced AR technology lets you place virtual products in your real environment with precise scaling and lighting effects.",
      benefits: [
        "Visualize products in your actual space",
        "Test different configurations and colors",
        "Share AR snapshots with friends and designers",
        "Make confident buying decisions"
      ],
      image: "/images/mobile-app/ar.png"
    },
    configurator: {
      icon: <FaCog className="text-3xl text-[#54BB74] mb-3" />,
      title: "Advanced Configuration Studio",
      description: "Our mobile app offers powerful configuration tools that go far beyond the web experience. Create custom scenes, design complex lighting arrangements, and fine-tune every aspect of your LIMI system.",
      benefits: [
        "Drag-and-drop interface for intuitive design",
        "Save unlimited lighting configurations",
        "Access exclusive app-only components",
        "Real-time preview of lighting effects"
      ],
      image: "/images/mobile-app/config.jpg"
    },
    control: {
      icon: <FaMobileAlt className="text-3xl text-[#54BB74] mb-3" />,
      title: "Smart Control Anywhere",
      description: "Take full control of your LIMI lighting system from anywhere in the world. Set schedules, create scenes, adjust colors and brightness, all from your smartphone or tablet.",
      benefits: [
        "Control lighting from anywhere in the world",
        "Create and schedule automated lighting scenes",
        "Voice control integration with smart assistants",
        "Energy usage monitoring and optimization"
      ],
      image: "/images/mobile-app/control.jpg"
    },
    exclusive: {
      icon: <FaGift className="text-3xl text-[#54BB74] mb-3" />,
      title: "Exclusive App Benefits",
      description: "Our mobile app users get access to special features, promotions, and content not available anywhere else. Join our community of LIMI enthusiasts for the ultimate lighting experience.",
      benefits: [
        "Early access to new product releases",
        "App-exclusive discounts and promotions",
        "Premium support and priority service",
        "Access to limited edition designs"
      ],
      image: "/images/mobile-app/exclusive.jpg"
    },
    design: {
      icon: <FaCog className="text-3xl text-[#54BB74] mb-3" />,
      title: "Design Your Perfect Lighting",
      description: "Become the artist of your space with our advanced configuration tools. Mix and match components to create your perfect lighting solution.",
      benefits: [
        "Interactive 3D configuration",
        "Real-time pricing and availability",
        "Save and compare multiple designs",
        "Professional design recommendations"
      ],
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop"
    }
  };
  
  // Testimonials from satisfied app users
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Interior Designer",
      quote: "The AR feature in the LIMI app has revolutionized how I present lighting options to clients. They can see exactly how the fixtures will look in their space before making a decision.",
      stars: 5
    },
    {
      name: "Michael T.",
      role: "Smart Home Enthusiast",
      quote: "I've tried many lighting control apps, but LIMI's is by far the most intuitive and powerful. The scene creation tools are incredible!",
      stars: 5
    },
    {
      name: "Elena R.",
      role: "Architect",
      quote: "The configuration capabilities in the app go far beyond what's possible on the website. I can create complex, custom lighting designs for my projects with ease.",
      stars: 4
    }
  ];
  
  // Special promotion details
  const promotion = {
    title: "Limited Time Offer",
    description: "Download the app now and get 15% off your first LIMI purchase. Plus, unlock 3 exclusive lighting scenes not available anywhere else!",
    code: "LIMI15APP",
    expires: "Offer ends soon!"
  };
  
  // Render different variants
  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#1e1e1e] p-4 rounded-lg">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">Get the LIMI App</h4>
          <p className="text-sm text-gray-400">Download for advanced features</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href={appStoreLink} 
            target="_blank"
            className="bg-[#292929] hover:bg-[#333] p-2 rounded-md transition-colors"
            aria-label="Download on App Store"
          >
            <FaApple className="text-white text-xl" />
          </Link>
          <Link 
            href={playStoreLink} 
            target="_blank"
            className="bg-[#292929] hover:bg-[#333] p-2 rounded-md transition-colors"
            aria-label="Get it on Google Play"
          >
            <FaGooglePlay className="text-white text-xl" />
          </Link>
        </div>
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <Link 
        href={appStoreLink}
        target="_blank"
        className="inline-flex items-center gap-2 text-[#54BB74] hover:underline"
      >
        <FaMobileAlt />
        <span>{ctaText}</span>
        <FaArrowRight className="text-xs" />
      </Link>
    );
  }
  
  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-[#292929] to-[#1e1e1e] rounded-lg overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white mb-4">
                Unlock the Full LIMI Experience
              </h2>
              <p className="text-gray-300 mb-6">
                Download the LIMI app for advanced configuration, AR visualization, and smart control of your lighting systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={appStoreLink}
                  target="_blank"
                  className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
                >
                  <FaApple className="text-xl" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Link>
                <Link 
                  href={playStoreLink}
                  target="_blank"
                  className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
                >
                  <FaGooglePlay className="text-xl" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Link>
                {showQRCode && (
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="flex items-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-4 py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
                  >
                    <FaQrcode />
                    <span>Show QR Code</span>
                  </button>
                )}
              </div>
              {showQR && (
                <div className="mt-4 p-4 bg-white inline-block rounded-md">
                  <Image 
                    src="/images/limi-app-qr.png" 
                    alt="LIMI App QR Code" 
                    width={120} 
                    height={120}
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <div className="relative h-[400px] w-[200px] mx-auto">
                <div className="absolute inset-0 bg-[#54BB74]/20 rounded-3xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1974&auto=format&fit=crop"
                  alt="LIMI App on smartphone"
                  fill
                  className="object-cover rounded-3xl p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant with interactive elements and sales content
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden mb-8" onClick={handleInteraction}>
      {/* Special Promotion Popup */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 max-w-md bg-gradient-to-r from-[#292929] to-[#1e1e1e] p-4 rounded-lg shadow-xl border border-[#54BB74]"
          >
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="bg-[#54BB74]/20 p-3 rounded-full">
                <FaGift className="text-[#54BB74] text-xl" />
              </div>
              
              <div>
                <h4 className="font-bold text-white text-lg">{promotion.title}</h4>
                <p className="text-sm text-gray-300 mb-2">{promotion.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#54BB74]/10 text-[#54BB74] px-2 py-1 rounded font-mono font-bold">
                    {promotion.code}
                  </span>
                  <span className="text-xs text-gray-400">{promotion.expires}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <span>{countdown.days}d</span>
                    <span>:</span>
                    <span>{countdown.hours}h</span>
                    <span>:</span>
                    <span>{countdown.minutes}m</span>
                    <span>:</span>
                    <span>{countdown.seconds}s</span>
                  </div>
                  <span className="text-xs">remaining</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Link 
                href={appStoreLink}
                target="_blank"
                className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors text-sm font-medium"
              >
                Download Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#292929] to-[#1e1e1e] p-6 border-b border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white">
              Elevate Your Lighting Experience
            </h2>
            <p className="text-gray-300 mt-2">
              Download the LIMI app for exclusive features and capabilities not available on the web
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href={appStoreLink}
              target="_blank"
              className="flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
            >
              <FaApple className="text-xl" />
              <span>App Store</span>
            </Link>
            <Link 
              href={playStoreLink}
              target="_blank"
              className="flex items-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-4 py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
            >
              <FaGooglePlay className="text-xl" />
              <span>Google Play</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced Tab Navigation with Visual Indicators */}
      <div className="flex border-b border-gray-700 relative overflow-hidden">
        {/* Animated Background Indicator */}
        <motion.div 
          className="absolute bottom-0 h-[2px] bg-[#54BB74]" 
          initial={false}
          animate={{
            left: activeTab === 'features' ? '0%' : activeTab === 'testimonials' ? '33.33%' : '66.66%',
            width: '33.33%'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        
        <button
          onClick={() => setActiveTab('features')}
          className={`px-4 py-3 font-medium flex items-center gap-2 flex-1 justify-center ${activeTab === 'features' 
            ? 'text-[#54BB74] border-b-2 border-transparent' 
            : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'features' ? 'bg-[#54BB74]/20' : ''}`}>
            <FaRegLightbulb className={activeTab === 'features' ? 'text-[#54BB74]' : ''} />
          </div>
          <span>Features</span>
        </button>
        
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-3 font-medium flex items-center gap-2 flex-1 justify-center ${activeTab === 'testimonials' 
            ? 'text-[#54BB74] border-b-2 border-transparent' 
            : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'testimonials' ? 'bg-[#54BB74]/20' : ''}`}>
            <FaStar className={activeTab === 'testimonials' ? 'text-[#54BB74]' : ''} />
          </div>
          <span>Testimonials</span>
        </button>
        
        <button
          onClick={() => setActiveTab('exclusive')}
          className={`px-4 py-3 font-medium flex items-center gap-2 flex-1 justify-center ${activeTab === 'exclusive' 
            ? 'text-[#54BB74] border-b-2 border-transparent' 
            : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'exclusive' ? 'bg-[#54BB74]/20' : ''}`}>
            <FaGift className={activeTab === 'exclusive' ? 'text-[#54BB74]' : ''} />
          </div>
          <span>Exclusive Offers</span>
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Features Tab */}
        {activeTab === 'features' && (
          <div>
            {/* Feature Selection */}
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.keys(featureHighlights).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedFeature(key)}
                  className={`px-3 py-2 rounded-md transition-colors ${selectedFeature === key 
                    ? 'bg-[#54BB74] text-white' 
                    : 'bg-[#292929] border border-[#54BB74] text-[#54BB74] hover:bg-[#54BB74] hover:text-white'}`}
                >
                  {featureHighlights[key].title.split(' ')[0]}
                </button>
              ))}
            </div>
            
            {/* Selected Feature Content */}
            <motion.div 
              key={selectedFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Feature Text Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {featureHighlights[selectedFeature].icon}
                  <h3 className="text-xl font-bold text-white">
                    {featureHighlights[selectedFeature].title}
                  </h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {featureHighlights[selectedFeature].description}
                </p>
                
                <div className="space-y-3">
                  {featureHighlights[selectedFeature].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 text-[#54BB74]">
                        <FaCheck />
                      </div>
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link 
                    href={appStoreLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#54BB74] text-white px-6 py-3 rounded-md hover:bg-[#48a064] transition-colors group"
                  >
                    <span>Get These Features</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* Feature Image */}
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <Image 
                  src={featureHighlights[selectedFeature].image}
                  alt={featureHighlights[selectedFeature].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-40"></div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              What Our Users Are Saying
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#292929] p-5 rounded-lg"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < testimonial.stars ? 'text-yellow-400' : 'text-gray-600'} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">Join thousands of satisfied users and transform your lighting experience today</p>
              <Link 
                href={appStoreLink}
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#54BB74] text-white px-6 py-3 rounded-md hover:bg-[#48a064] transition-colors"
              >
                <FaMobileAlt />
                <span>Download the LIMI App</span>
              </Link>
            </div>
          </div>
        )}
        
        {/* Exclusive Offers Tab */}
        {activeTab === 'exclusive' && (
          <div>
            <div className="bg-gradient-to-r from-[#292929] to-[#1e1e1e] p-6 rounded-lg border border-[#54BB74]/30 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#54BB74]/20 p-3 rounded-full">
                      <FaGift className="text-[#54BB74] text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {promotion.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {promotion.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="bg-[#54BB74]/10 text-[#54BB74] px-3 py-2 rounded font-mono font-bold text-lg">
                      {promotion.code}
                    </div>
                    
                    <div className="flex items-center gap-1 text-white bg-[#292929] px-3 py-2 rounded-md">
                      <div className="text-sm font-semibold">
                        <span>{countdown.days}d </span>
                        <span>{countdown.hours}h </span>
                        <span>{countdown.minutes}m </span>
                        <span>{countdown.seconds}s</span>
                      </div>
                      <span className="text-xs text-gray-400 ml-1">remaining</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link 
                      href={appStoreLink}
                      target="_blank"
                      className="flex items-center gap-2 bg-[#54BB74] text-white px-5 py-2 rounded-md hover:bg-[#48a064] transition-colors"
                    >
                      <FaApple className="text-xl" />
                      <span>App Store</span>
                    </Link>
                    <Link 
                      href={playStoreLink}
                      target="_blank"
                      className="flex items-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-5 py-2 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
                    >
                      <FaGooglePlay className="text-xl" />
                      <span>Google Play</span>
                    </Link>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                    <Image 
                      src="/images/mobile-app/promotion.jpg"
                      alt="Exclusive LIMI App Offer"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-0 right-0 bg-[#54BB74] text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                      EXCLUSIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                More App Exclusives
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#292929] p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#54BB74]/20 p-2 rounded-full mt-1">
                    <FaCamera className="text-[#54BB74]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Exclusive Scene Library</h4>
                    <p className="text-sm text-gray-400">Access over 50 professionally designed lighting scenes only available in the app</p>
                  </div>
                </div>
                
                <div className="bg-[#292929] p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#54BB74]/20 p-2 rounded-full mt-1">
                    <FaTools className="text-[#54BB74]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Priority Support</h4>
                    <p className="text-sm text-gray-400">App users get access to dedicated support channels with faster response times</p>
                  </div>
                </div>
                
                <div className="bg-[#292929] p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#54BB74]/20 p-2 rounded-full mt-1">
                    <FaLock className="text-[#54BB74]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Early Access</h4>
                    <p className="text-sm text-gray-400">Be the first to try new products and features before they're available to the public</p>
                  </div>
                </div>
                
                <div className="bg-[#292929] p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#54BB74]/20 p-2 rounded-full mt-1">
                    <FaGift className="text-[#54BB74]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Loyalty Rewards</h4>
                    <p className="text-sm text-gray-400">Earn points for every interaction in the app that can be redeemed for discounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* QR Code Section with Unsplash Image */}
      {showQRCode && (
        <div className="border-t border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold text-white mb-2">
              Scan to Download
            </h3>
            <p className="text-gray-400 mb-3">
              Use your phone's camera to scan this QR code and download the LIMI app directly
            </p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-[#292929] px-3 py-2 rounded-md">
                <FaCamera className="text-[#54BB74]" />
                <span className="text-sm text-gray-300">Point camera at code</span>
              </div>
              <div className="flex items-center gap-2 bg-[#292929] px-3 py-2 rounded-md">
                <FaArrowRight className="text-[#54BB74]" />
                <span className="text-sm text-gray-300">Tap notification</span>
              </div>
              <div className="flex items-center gap-2 bg-[#292929] px-3 py-2 rounded-md">
                <FaCheck className="text-[#54BB74]" />
                <span className="text-sm text-gray-300">Install app</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-[140px] h-[140px] bg-gradient-to-br from-[#54BB74] to-transparent opacity-30 rounded-lg animate-pulse"></div>
              <div className="bg-white p-4 rounded-lg relative z-10">
                <div className="relative w-[120px] h-[120px]">
                  <Image 
                    src="/images/mobile-app/scan.png" 
                    alt="LIMI App QR Code" 
                    width={120} 
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
