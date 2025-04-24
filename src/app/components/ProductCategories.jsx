'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaLightbulb, FaMobileAlt, FaWifi, FaPalette, FaHome, FaBuilding, FaLeaf, FaRegLightbulb } from 'react-icons/fa';

const ProductCategories = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const tabsRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Categories data with subcategories and features
  const categories = [
    {
      id: 1,
      title: 'Modular Lighting Systems',
      subtitle: 'Transform Any Space with Flexible Lighting',
      description: 'Our modular systems allow you to create custom lighting arrangements that perfectly suit your space. Mix and match components to build your ideal setup.',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
      link: '/product-catalog?category=modular',
      subcategories: [
        { name: 'Wall Modules', icon: <FaHome className="text-[#50C878] text-xl" /> },
        { name: 'Ceiling Arrays', icon: <FaBuilding className="text-[#50C878] text-xl" /> },
        { name: 'Floor Accents', icon: <FaLeaf className="text-[#50C878] text-xl" /> }
      ],
      features: [
        { title: 'Tool-Free Installation', description: 'Snap-together design requires no special tools or skills' },
        { title: 'Expandable System', description: 'Start small and add components as your needs change' },
        { title: 'Energy Efficient', description: 'Uses 70% less energy than traditional lighting systems' }
      ],
      specs: [
        { label: 'Lumens', value: '800-1200 per module' },
        { label: 'Color Temp', value: '2700K-6500K adjustable' },
        { label: 'Lifespan', value: '50,000+ hours' }
      ]
    },
    {
      id: 2,
      title: 'Smart Controllers',
      subtitle: 'Intuitive Control at Your Fingertips',
      description: 'Our smart controllers give you unprecedented control over your lighting environment, from simple dimming to complex scene programming.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop',
      link: '/product-catalog?category=controllers',
      subcategories: [
        { name: 'Touch Panels', icon: <FaPalette className="text-[#50C878] text-xl" /> },
        { name: 'Mobile Apps', icon: <FaMobileAlt className="text-[#50C878] text-xl" /> },
        { name: 'Voice Control', icon: <FaWifi className="text-[#50C878] text-xl" /> }
      ],
      features: [
        { title: 'Scene Programming', description: 'Save and recall your favorite lighting scenes with one touch' },
        { title: 'Smart Home Integration', description: 'Works with major platforms including HomeKit, Alexa, and Google Home' },
        { title: 'Scheduling', description: 'Set your lights to automatically adjust throughout the day' }
      ],
      specs: [
        { label: 'Connectivity', value: 'WiFi, Bluetooth, Zigbee' },
        { label: 'Power', value: 'Wired or battery options' },
        { label: 'Range', value: 'Up to 100 feet' }
      ]
    },
    {
      id: 3,
      title: 'Ambient Solutions',
      subtitle: 'Create the Perfect Atmosphere',
      description: 'Our ambient lighting collection helps you set the perfect mood for any occasion, from energizing workspaces to creating relaxing living environments.',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop',
      link: '/product-catalog?category=ambient',
      subcategories: [
        { name: 'Indirect Lighting', icon: <FaRegLightbulb className="text-[#50C878] text-xl" /> },
        { name: 'Accent Fixtures', icon: <FaLightbulb className="text-[#50C878] text-xl" /> },
        { name: 'Light Panels', icon: <FaPalette className="text-[#50C878] text-xl" /> }
      ],
      features: [
        { title: 'Full Spectrum Control', description: 'Adjust color temperature from warm to cool white, plus full RGB' },
        { title: 'Circadian Rhythm Support', description: 'Lighting that adapts to your body\'s natural cycle throughout the day' },
        { title: 'Dynamic Effects', description: 'Create subtle movement and transitions for unique ambiance' }
      ],
      specs: [
        { label: 'Color Range', value: '16.7 million colors' },
        { label: 'Dimming', value: '0-100%, flicker-free' },
        { label: 'CRI', value: '95+ for accurate color rendering' }
      ]
    }
  ];

  useEffect(() => {
    // Check for mobile on mount and when window resizes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate heading and description
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      tabsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Animate cards with stagger
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate features with stagger
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [activeCategory]);

  // Handle category tab changes
  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    setHoveredFeature(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#2B2D2F] text-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Explore Our <span className="text-[#50C878]">Product Categories</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Discover our range of innovative lighting solutions designed to transform any space with perfect ambiance, intelligent control, and modular flexibility.
          </p>

          {/* Category tabs */}
          <div 
            ref={tabsRef}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mt-10"
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                className={`px-5 py-3 rounded-full transition-all duration-300 ${activeCategory === index 
                  ? 'bg-[#50C878] text-white font-medium' 
                  : 'bg-[#1e2022] text-gray-300 hover:bg-[#3a3d42]'}`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active category content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column - Main product image and details */}
          <div className="lg:col-span-7">
            <motion.div
              key={`image-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
              ref={el => cardsRef.current[0] = el}
            >
              <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                  src={categories[activeCategory].image}
                  alt={categories[activeCategory].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2022] via-[#1e2022]/70 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    {categories[activeCategory].title}
                  </h3>
                  <p className="text-xl text-[#87CEAB] mb-4">
                    {categories[activeCategory].subtitle}
                  </p>
                  <p className="text-gray-200 mb-6 max-w-xl">
                    {categories[activeCategory].description}
                  </p>
                  
                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {categories[activeCategory].subcategories.map((subcat, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2 bg-[#2B2D2F]/80 backdrop-blur-sm px-4 py-2 rounded-full"
                      >
                        {subcat.icon}
                        <span className="text-white">{subcat.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={categories[activeCategory].link}>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#50C878] hover:bg-[#3da861] text-white font-medium rounded-md transition-colors duration-300"
                    >
                      Explore {categories[activeCategory].title}
                      <FaArrowRight />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Features and specs */}
          <div className="lg:col-span-5">
            <motion.div 
              key={`details-${activeCategory}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e2022] rounded-xl p-6 md:p-8 shadow-xl h-full"
            >
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#50C878] flex items-center justify-center text-white">
                  <FaLightbulb />
                </span>
                <span>Key Features</span>
              </h4>
              
              {/* Features list */}
              <div className="space-y-4 mb-8">
                {categories[activeCategory].features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    ref={el => featuresRef.current[idx] = el}
                    onMouseEnter={() => setHoveredFeature(idx)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`p-4 rounded-lg transition-all duration-300 ${hoveredFeature === idx ? 'bg-[#3a3d42]' : 'bg-[#2B2D2F]'}`}
                  >
                    <h5 className="font-medium text-[#87CEAB] mb-1">{feature.title}</h5>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Technical specs */}
              <div>
                <h4 className="text-xl font-semibold mb-4">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  {categories[activeCategory].specs.map((spec, idx) => (
                    <div key={idx} className="">
                      <p className="text-gray-400 text-sm">{spec.label}</p>
                      <p className="text-white font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Additional CTA */}
              <div className="mt-8 pt-6 border-t border-[#3a3d42]">
                <Link href={`/product-catalog?category=${categories[activeCategory].title.toLowerCase().replace(' ', '-')}`}>
                  <span className="text-[#50C878] hover:text-[#87CEAB] flex items-center gap-2 transition-colors duration-300">
                    View all {categories[activeCategory].title.toLowerCase()}
                    <FaArrowRight className="text-sm" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
