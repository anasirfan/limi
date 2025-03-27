"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChartLine, FaLightbulb, FaRegLightbulb, FaRocket, FaTrophy, FaBoxOpen, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnalyticsInsights = () => {
  // Refs for animation targets
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const innovationsRef = useRef(null);
  const pipelineRef = useRef(null);
  const counterRefs = useRef([]);
  const carouselRef = useRef(null);
  
  // State for custom cursor
  const [isDragging, setIsDragging] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Brand colors based on guidelines
  const brandColors = {
    primary: "#54bb74", // Emerald/Eton Blue
    secondary: "#292929", // Charleston Green
    accent: "#FF6B6B", // Warm accent
    coolAccent: "#4ECDC4", // Cool accent
    dark: "#292929", // Dark shade
    light: "#FFFFFF", // White
  };

  // Market insights data
  const marketInsights = [
    {
      title: "Market Growth",
      value: 42,
      suffix: "%",
      description: "Smart lighting adoption increased in the last year",
      icon: <FaChartLine className="text-3xl" />,
    },
    {
      title: "Projected Demand",
      value: 350,
      suffix: "+",
      description: "Year when modular smart lighting is expected to dominate residential & commercial spaces",
      icon: <FaLightbulb className="text-3xl" />,
    },
    {
      title: "Distributor Network",
      value: 24,
      suffix: "+",
      description: "Distributors onboarded in the last 6 months",
      icon: <FaRegLightbulb className="text-3xl" />,
    },
  ];

  // Latest innovations data
  const innovations = [
    {
      status: "Ongoing",
      title: "Smart Lighting Configurator",
      description: "New interactive tool for customized lighting solutions",
      icon: <FaLightbulb />,
      color: brandColors.coolAccent,
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      status: "Launched",
      title: "LIMI Modular Pendant",
      description: "Our latest pendant with enhanced modularity",
      icon: <FaRocket />,
      color: brandColors.primary,
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      status: "Recognition",
      title: "Featured in Lighting Magazine",
      description: "Acknowledged as an emerging smart lighting brand",
      icon: <FaTrophy />,
      color: "#FFC107", // Gold
      image: "https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      status: "Coming Soon",
      title: "New Color Variants",
      description: "Expanding our product lineup to meet user preferences",
      icon: <FaBoxOpen />,
      color: brandColors.accent,
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      status: "Partnership",
      title: "Smart Home Integration",
      description: "New partnerships with leading smart home platforms",
      icon: <FaRocket />,
      color: "#9C27B0", // Purple
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      status: "Research",
      title: "Energy Efficiency Study",
      description: "Research showing 40% energy savings with LIMI lighting",
      icon: <FaLightbulb />,
      color: "#2196F3", // Blue
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  // Product pipeline data
  const productPipeline = [
    {
      stage: "In Production",
      product: "LIMI Connect Hub",
      description: "Central control unit for all LIMI lighting products",
      availability: "Available for pre-orders",
      progress: 90,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      stage: "Testing Phase",
      product: "LIMI Adaptive",
      description: "Smart lighting with enhanced automation features",
      availability: "Coming Q3 2025",
      progress: 65,
      image: "https://images.unsplash.com/photo-1563099045-dd7d9aebaa49?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      stage: "Concept Stage",
      product: "LIMI AI",
      description: "AI-driven adaptive lighting that learns user preferences",
      availability: "Planned for 2026",
      progress: 30,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  // Animation setup
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Counter animation function
    const animateCounters = () => {
      marketInsights.forEach((stat, index) => {
        const counterElement = counterRefs.current[index];
        if (!counterElement) return;

        // Start from a higher value for large numbers (like 250)
        let startValue = stat.value > 100 ? Math.floor(stat.value * 0.7) : 0;
        const endValue = stat.value;
        const duration = stat.value > 100 ? 1.5 : 2.5; // Faster duration for larger values
        
        // Faster counting for larger numbers
        const stepTime = duration * 1000 / (endValue - startValue);
        
        let counter = setInterval(() => {
          startValue += 1;
          counterElement.textContent = startValue + (stat.suffix || "");
          
          if (startValue >= endValue) {
            clearInterval(counter);
            counterElement.textContent = endValue + (stat.suffix || "");
          }
        }, stepTime);
      });
    };

    // GSAP animations
    const setupAnimations = () => {
      // Main section fade in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        }
      );

      // Stats cards animation
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-card'),
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            onEnter: animateCounters,
          }
        }
      );

      // Innovations ticker animation
      gsap.fromTo(
        innovationsRef.current.querySelectorAll('.innovation-card'),
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: innovationsRef.current,
            start: "top 70%",
          }
        }
      );

      // Pipeline animation
      gsap.fromTo(
        pipelineRef.current.querySelectorAll('.pipeline-card'),
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: "top 70%",
          }
        }
      );

      // Progress bar animations
      pipelineRef.current.querySelectorAll('.progress-bar').forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { width: 0 },
          { 
            width: `${productPipeline[index].progress}%`, 
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
            }
          }
        );
      });
    };

    // Initialize animations
    setupAnimations();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Custom cursor handlers
  const handleMouseMove = (e) => {
    if (!isMobile) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Handle drag scrolling
      if (isDragging && carouselRef.current) {
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        carouselRef.current.scrollLeft = scrollLeft - walk;
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowCursor(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowCursor(false);
      setIsDragging(false);
    }
  };

  const handleMouseDown = (e) => {
    if (!isMobile && carouselRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
      // Change cursor style
      carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    if (!isMobile && carouselRef.current) {
      setIsDragging(false);
      // Change cursor style back
      carouselRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section 
      id="analytics-insights"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#292929] to-[#1a1a1a] text-white overflow-hidden"
    >
      {/* Custom cursor */}
      {showCursor && !isMobile && (
        <div 
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{ 
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`,
            opacity: showCursor ? 1 : 0
          }}
        >
          <div className={`flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 ${isDragging ? 'scale-90' : 'scale-100'}`}>
            <div className="flex items-center gap-3 text-white">
              <FaArrowLeft />
              <span className="text-sm font-medium">DRAG</span>
              <FaArrowRight />
            </div>
          </div>
        </div>
      )}

      {/* Add keyframe animations for pulse effects */}
      {/* <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 1.5s infinite;
        }
      `}</style> */}

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Analytics & Business Insights</span>
            <span 
              className="absolute bottom-0 left-0 w-full h-3" 
              style={{ backgroundColor: `${brandColors.primary}40`, transform: 'translateY(4px)' }}
            ></span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover how LIMI is transforming the lighting industry with innovative smart solutions and market-leading growth.
          </p>
        </div>

        {/* Key Market Insights */}
        <div className="mb-20" ref={statsRef}>
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span style={{ color: brandColors.primary }}>Key Market Insights</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketInsights.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card bg-[#292929]/50 rounded-lg p-8 border-l-4 transition-transform hover:transform hover:scale-105"
                style={{ borderColor: brandColors.primary }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${brandColors.primary}30` }}>
                    {stat.icon}
                  </div>
                  <h4 className="text-xl font-semibold">{stat.title}</h4>
                </div>
                <div className="mb-4">
                  <span 
                    ref={el => counterRefs.current[index] = el} 
                    className="text-4xl font-bold" 
                    style={{ color: brandColors.primary }}
                  >
                    0{stat.suffix}
                  </span>
                </div>
                <p className="text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Innovations */}
        <div className="mb-20" ref={innovationsRef}>
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span style={{ color: brandColors.primary }}>Our Latest Innovations & Achievements</span>
          </h3>
          {/* Mobile swipe indicator */}
          <div className="md:hidden flex justify-center items-center mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm animate-pulse">
              <FaArrowLeft className="text-white/70 animate-pulse-slow" />
              <span className="text-white/90">Swipe</span>
              <FaArrowRight className="text-white/70 animate-pulse-slow" />
            </div>
          </div>
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-6 gap-6 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <style jsx>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                div::-webkit-scrollbar {
                  display: none;
                }
                
                /* Prevent text selection during drag */
                div {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
              `}</style>
              {innovations.map((item, index) => (
                <div 
                  key={index} 
                  className="innovation-card flex-shrink-0 w-full md:w-80 bg-[#292929]/50 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105 select-none"
                >
                  <div className="relative h-48">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform hover:scale-110 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292929] to-transparent"></div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: item.color, color: '#292929' }}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient overlays for horizontal scroll indication */}
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#292929] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#292929] to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Product Pipeline */}
        <div ref={pipelineRef}>
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span style={{ color: brandColors.primary }}>Current & Future Product Pipeline</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productPipeline.map((product, index) => (
              <div 
                key={index} 
                className="pipeline-card bg-[#292929]/50 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image 
                    src={product.image} 
                    alt={product.product}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292929] to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {product.stage}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2" style={{ color: brandColors.primary }}>{product.product}</h4>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Development Progress</span>
                      <span className="text-sm font-medium">{product.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="progress-bar h-2.5 rounded-full" 
                        style={{ backgroundColor: brandColors.primary, width: "0%" }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">{product.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsInsights;
