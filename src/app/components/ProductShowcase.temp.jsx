"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motion, AnimatePresence } from "framer-motion";

// Import subcomponents
import {
  FloatingCard,
  InteractiveDropdown,
  DropDownBox,
  ProductModal,
  AmbientBackground,
  LightGlow
} from './productShowcase/index';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MotionPathPlugin);
}

function ProductShowcase() {
  // Refs for animations and DOM elements
  const sectionRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const contentRef = useRef(null);
  
  // State for interactive features
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Organize products by category
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pendants', name: 'Wall Pendants' },
    { id: 'ceiling', name: 'Ceiling Pendants' },
    { id: 'table', name: 'Table Lamps' },
    { id: 'base', name: 'Base Units' },
    { id: 'hub', name: 'Control Hubs' }
  ];

  // State for dropdown management
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cardPositions, setCardPositions] = useState([]);
  
  // Refs for animation paths
  const pathsRef = useRef([]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    // Create smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true
    });

    // Setup scroll trigger for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      '.product-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.product-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: -0.4 }
    );

    // Create motion paths between cards
    if (pathsRef.current.length > 0) {
      pathsRef.current.forEach(path => {
        gsap.to('.path-dot', {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          },
          duration: 10,
          repeat: -1,
          ease: 'none'
        });
      });
    }

    return () => {
      smoother.kill();
      tl.kill();
    };
  }, []);

  // Generate random positions for cards
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    // Create random positions for each product card
    const positions = products.map((product, index) => {
      const angle = (index / products.length) * Math.PI * 2;
      const radius = Math.random() * 100 + 200;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = Math.random() * 10 - 5;
      
      return { x, y, rotation };
    });
    
    setCardPositions(positions);
    
    // Create paths between cards
    const paths = [];
    for (let i = 0; i < positions.length; i++) {
      const nextIndex = (i + 1) % positions.length;
      const startPos = positions[i];
      const endPos = positions[nextIndex];
      
      // Create a curved path between two points
      const controlX = (startPos.x + endPos.x) / 2 + (Math.random() * 100 - 50);
      const controlY = (startPos.y + endPos.y) / 2 + (Math.random() * 100 - 50);
      
      const path = `M${startPos.x},${startPos.y} Q${controlX},${controlY} ${endPos.x},${endPos.y}`;
      paths.push(path);
    }
    
    pathsRef.current = paths;
  }, [products]);

  // Handle card click
  const handleCardClick = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    if (openDropdown === categoryId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(categoryId);
      setActiveCategory(categoryId);
    }
  };

  // Filter products by category
  const getFilteredProducts = (categoryId) => {
    if (categoryId === 'all' || !categoryId) return products;
    
    return products.filter(product => {
      const category = product.category.toLowerCase();
      
      switch(categoryId) {
        case 'pendants':
          return category === 'pendants';
        case 'ceiling':
          return category === 'pendants';
        case 'table':
          return category === 'pendants';
        case 'base':
          return category === 'base';
        case 'hub':
          return category === 'hub';
        default:
          return true;
      }
    });
  };
  
  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Product data - defined once inside the component
  const products = [
    {
      id: 1,
      name: "The Smart Ceiling Mount",
      tagline: "Intelligent Power Base",
      description: "The foundation of your smart lighting system, connecting seamlessly to your existing fixtures.",
      detailedDescription: "Patented ceiling mount that supplies power/data and lets you swap fixtures with one click – the backbone of LIMI's plug-and-play design.",
      image: "/images/products/product1/1.jpg",
      galleryImages: [
        "/images/products/product1/1.jpg",
        "/images/products/product1/2.jpg",
        "/images/products/product1/3.jpg",
        "/images/products/product1/4.jpg"
      ],
      video: "/videos/product1-demo.mp4",
      lottieAnimation: "/animations/ceiling-mount.json",
      color: "#50C878", // Emerald
      category: "Base",
      features: [
        "No electrician needed for installation", 
        "Smart connectivity built-in", 
        "Universal compatibility with existing fixtures", 
        "Energy efficient design"
      ],
      benefits: [
        "Install in minutes with basic tools",
        "Connects to your smart home ecosystem",
        "Works with any standard ceiling junction box",
        "Reduces energy consumption by up to 30%"
      ],
      specs: [
        { name: "Dimensions", value: "120mm × 120mm × 35mm" },
        { name: "Weight", value: "250g" },
        { name: "Power Input", value: "100-240V AC" },
        { name: "Connectivity", value: "Wi-Fi, Bluetooth, Zigbee" },
        { name: "Compatibility", value: "Works with all LIMI pendants" }
      ],
      useCases: [
        { title: "Home Installation", description: "Easy DIY installation in any room" },
        { title: "Office Spaces", description: "Transform workspaces with modular lighting" },
        { title: "Retail Environments", description: "Easily change lighting for different displays" }
      ],
      storyboardImages: [
        "/images/storyboard/base-install.jpg",
        "/images/storyboard/base-connect.jpg",
        "/images/storyboard/base-complete.jpg"
      ]
    },
    {
      id: 2,
      name: "Interchangeable Designs",
      tagline: "Design-forward Pendants",
      description: "Beautiful pendants that can be swapped without tools or an electrician.",
      detailedDescription: "Premium lighting fixtures that click into the base with a simple twist. Change your lighting design as often as you change your mood – no tools required.",
      image: "/images/products/product2/1.jpg",
      galleryImages: [
        "/images/products/product2/1.jpg",
        "/images/products/product2/2.jpg",
        "/images/products/product2/3.jpg"
      ],
      video: "/videos/product2-demo.mp4",
      lottieAnimation: "/animations/pendant-swap.json",
      color: "#87CEAB", // Eton Blue
      category: "Pendants",
      features: [
        "Swap designs in seconds", 
        "Premium materials and finishes", 
        "Diverse style options", 
        "Instant transformation"
      ],
      benefits: [
        "Update your space without hiring professionals",
        "High-quality construction ensures longevity",
        "Choose from modern, classic, or custom designs",
        "Change your lighting to match seasons or occasions"
      ],
      specs: [
        { name: "Dimensions", value: "Various sizes available" },
        { name: "Weight", value: "150-500g depending on model" },
        { name: "Materials", value: "Aluminum, Glass, Ceramic, Wood" },
        { name: "Light Source", value: "LED, 2700K-6500K adjustable" },
        { name: "Lifespan", value: "50,000+ hours" }
      ],
      useCases: [
        { title: "Seasonal Changes", description: "Swap designs for different seasons" },
        { title: "Special Events", description: "Create the perfect ambiance for gatherings" },
        { title: "Mood Lighting", description: "Change the feel of your space instantly" }
      ],
      storyboardImages: [
        "/images/storyboard/pendant-select.jpg",
        "/images/storyboard/pendant-install.jpg",
        "/images/storyboard/pendant-complete.jpg"
      ]
    },
    {
      id: 3,
      name: "The Brain",
      tagline: "Central Control Hub",
      description: "Central hub that connects your lighting system to your smart home ecosystem.",
      detailedDescription: "The intelligent core of your LIMI system, connecting all your lights while enabling advanced features like scenes, schedules, and integration with other smart home platforms.",
      image: "/images/products/product3/1.jpg",
      galleryImages: [
        "/images/products/product3/1.jpg",
        "/images/products/product3/2.jpg",
        "/images/products/product3/3.jpg",
        "/images/products/product3/4.jpg"
      ],
      video: "/videos/product3-demo.mp4",
      lottieAnimation: "/animations/brain-hub.json",
      color: "#3a3d42", // Charleston Green shade
      category: "Hub",
      features: [
        "Seamless integration with major platforms", 
        "Voice control compatibility", 
        "Advanced scheduling", 
        "Secure remote access"
      ],
      benefits: [
        "Works with Amazon Alexa, Google Home, and Apple HomeKit",
        "Control your lights with simple voice commands",
        "Set your lights to match your daily routine",
        "Adjust your lighting from anywhere in the world"
      ],
      specs: [
        { name: "Dimensions", value: "100mm × 100mm × 25mm" },
        { name: "Weight", value: "150g" },
        { name: "Power", value: "5V DC, USB-C" },
        { name: "Connectivity", value: "Wi-Fi, Bluetooth, Zigbee, Thread" },
        { name: "Range", value: "Up to 50m indoors" }
      ],
      useCases: [
        { title: "Smart Home Integration", description: "Connect with your existing ecosystem" },
        { title: "Voice Control", description: "Hands-free lighting control" },
        { title: "Automated Schedules", description: "Set it and forget it convenience" }
      ],
      storyboardImages: [
        "/images/storyboard/hub-setup.jpg",
        "/images/storyboard/hub-connect.jpg",
        "/images/storyboard/hub-control.jpg"
      ]
    },
    {
      id: 4,
      name: "Your Control Center",
      tagline: "Intuitive Mobile App",
      description: "Intuitive app that puts complete lighting control at your fingertips.",
      detailedDescription: "The LIMI app transforms your smartphone into a lighting command center, offering personalized control over brightness, color, scenes, and schedules with an interface designed for simplicity.",
      image: "/images/products/product4/1.jpg",
      galleryImages: [
        "/images/products/product4/1.jpg",
        "/images/products/product4/2.jpg",
        "/images/products/product4/3.jpg",
        "/images/products/product4/4.jpg"
      ],
      video: "/videos/product4-demo.mp4",
      lottieAnimation: "/animations/app-demo.json",
      color: "#2B2D2F", // Charleston Green
      category: "App",
      features: [
        "Intuitive user interface", 
        "Personalized scenes and schedules", 
        "Remote access from anywhere", 
        "Voice assistant integration"
      ],
      benefits: [
        "Control all your lights from one app",
        "Create the perfect lighting for any occasion",
        "Adjust your lights even when you're away",
        "Use voice commands for hands-free control"
      ],
      specs: [
        { name: "Platforms", value: "iOS, Android" },
        { name: "Requirements", value: "iOS 13+ / Android 8+" },
        { name: "Languages", value: "English, Spanish, French, German, Japanese" },
        { name: "Cloud Storage", value: "Free for basic features, premium plan available" },
        { name: "Updates", value: "Regular feature and security updates" }
      ],
      useCases: [
        { title: "Daily Routines", description: "Automate your lighting schedule" },
        { title: "Energy Savings", description: "Monitor and optimize power usage" },
        { title: "Remote Management", description: "Control lights while traveling" }
      ],
      storyboardImages: [
        "/images/storyboard/app-setup.jpg",
        "/images/storyboard/app-control.jpg",
        "/images/storyboard/app-scenes.jpg"
      ]
    }
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-[#292929] overflow-hidden py-16 md:py-24">
      {/* Ambient background */}
      <AmbientBackground />
      
      {/* Smooth scroll wrapper */}
      <div ref={smoothWrapperRef} className="relative z-10">
        <div ref={contentRef} className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="product-title text-4xl md:text-5xl font-bold text-white mb-4">Premium Lighting Solutions</h2>
            <p className="product-subtitle text-xl text-[#54BB74] max-w-2xl mx-auto">
              Discover our collection of innovative pendant lighting designed for modern spaces
            </p>
          </div>
          
          {/* Category dropdowns */}
          <div className="max-w-4xl mx-auto mb-16">
            {categories.map(category => (
              <InteractiveDropdown
                key={category.id}
                title={category.name}
                isOpen={openDropdown === category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                {openDropdown === category.id && (
                  <div className="py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {getFilteredProducts(category.id).map(product => (
                        <DropDownBox 
                          key={product.id} 
                          product={product} 
                          onClose={() => setOpenDropdown(null)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </InteractiveDropdown>
            ))}
          </div>
          
          {/* Floating product cards */}
          <div className="relative h-[600px] md:h-[800px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Connection paths between cards */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                {pathsRef.current.map((path, index) => (
                  <g key={index}>
                    <path 
                      d={path} 
                      fill="none" 
                      stroke="rgba(84, 187, 116, 0.3)" 
                      strokeWidth="1" 
                      strokeDasharray="5,5" 
                    />
                    <circle className="path-dot" r="4" fill="#54BB74" />
                  </g>
                ))}
              </svg>
              
              {/* Product cards */}
              <div className="relative w-full h-full">
                <AnimatePresence>
                  {isLoaded && products.map((product, index) => {
                    const position = cardPositions[index] || { x: 0, y: 0, rotation: 0 };
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: position.x,
                          y: position.y,
                          rotate: position.rotation
                        }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.8,
                          type: 'spring',
                          damping: 15
                        }}
                        style={{ 
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <FloatingCard 
                          product={product}
                          index={index}
                          isActive={activeProduct === product.id}
                          onClick={() => handleCardClick(product)}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product modal */}
      <ProductModal 
        product={modalProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default ProductShowcase;
