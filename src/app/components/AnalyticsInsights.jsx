"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChartLine, FaLightbulb, FaRegLightbulb, FaRocket, FaGlobeAsia, FaLeaf, FaHandshake, FaArrowLeft, FaArrowRight, FaChartBar, FaChartPie } from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnalyticsInsights = ({ userType }) => {
  // Return null if user is not a distributor or if userType is not set yet
  // if (userType !== null && userType !== 'distributor') {
  //   return null;
  // }

  // Refs for animation targets
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const innovationsRef = useRef(null);
  const pipelineRef = useRef(null);
  const counterRefs = useRef([]);
  const carouselRef = useRef(null);
  const dividerRef = useRef(null);
  const badgeRef = useRef(null);
  
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
      title: "Trend Prediction & Adaptation",
      value: 42,
      suffix: "%",
      description: "Leverage real-time data to forecast design trends and adjust inventory or displays ahead of market shifts.",
      icon: <FaChartLine className="text-3xl" />,
    },
    {
      title: "Stock & Demand Optimisation",
      value: 350,
      suffix: "+",
      description: "Use usage and engagement data to fine-tune stock levels, reduce overstock, and ensure high-demand items are always available.",
      icon: <FaLightbulb className="text-3xl" />,
    },
    {
      title: "Performance-Driven Product Development",
      value: 24,
      suffix: "+",
      description: "Identify which styles, colours, and features resonate most to guide future design and production decisions.",
      icon: <FaRegLightbulb className="text-3xl" />,
    },
  ];

  // Latest innovations data
  const innovations = [
    {
      status: "Innovation",
      title: "Breaking New Boundaries",
      description: "Discover how our latest lighting innovations are setting new standards in design and functionality.",
      icon: <FaLightbulb />,
      color: brandColors.coolAccent,
      image: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      status: "Exhibition",
      title: "On the Global Stage",
      description: "LIMI's recent exhibition at the Hong Kong International Lighting Fair showcased our cutting-edge products to a global audience.",
      icon: <FaGlobeAsia />,
      color: brandColors.primary,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      status: "Initiative",
      title: "Sustainability Milestones",
      description: "We're proud to announce a new initiative that reduces our carbon footprint while enhancing product longevity.",
      icon: <FaLeaf />,
      color: "#4CAF50", // Green
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    },
    {
      status: "Launch",
      title: "Product Launches",
      description: "We've unveiled our newest product, The Limitless System, which promises to revolutionize your lighting experience.",
      icon: <FaRocket />,
      color: brandColors.accent,
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      status: "Partnership",
      title: "Industry Partnerships",
      description: "LIMI partners with Inspired Lighting to bring new smart lighting solutions to the global market.",
      icon: <FaHandshake />,
      color: "#9C27B0", // Purple
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  // Product pipeline data
  const productPipeline = [
    {
      stage: "In Production",
      product: "LIMI Connect Hub",
      description: "The central brain of the system—seamlessly controls all LIMI lighting products for effortless, unified management.",
      availability: "Step 1: Foundation Setup",
      progress: 90,
      image: "/images/limi-connect.jpg",
    },
    {
      stage: "In Production",
      product: "LIMI App",
      description: "The heart of the LIMI ecosystem—designed for total control, effortless setup, and ready to grow with every new feature and product release.",
      availability: "Step 2: Intuitive Control",
      progress: 95,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      stage: "Testing Phase",
      product: "LIMI Adaptive",
      description: "Smart lighting with enhanced automation, responding to movement, time of day, and environment for intuitive everyday use.",
      availability: "Step 3: Smart Automation",
      progress: 65,
      image: "https://images.unsplash.com/photo-1563099045-dd7d9aebaa49?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      stage: "Development",
      product: "LIMI Sense AI",
      description: "An AI-powered lighting engine that learns your preferences to create personalised moods and effortless ambience.",
      availability: "Step 4: AI Intelligence",
      progress: 40,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      stage: "Concept Stage",
      product: "LIMI Modular+",
      description: "Even faster reconfiguration and extended design flexibility with next-gen modular components.",
      availability: "Step 5: Extended Flexibility",
      progress: 25,
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      stage: "Planning",
      product: "LIMI Insight Dashboard",
      description: "A smart backend for retailers and distributors—track performance, trends, and optimise inventory.",
      availability: "Step 6: Advanced Analytics",
      progress: 15,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  // Animation setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Animate header elements
    const ctx = gsap.context(() => {
      // Animate the divider
      gsap.fromTo(
        dividerRef.current,
        { 
          width: "0%",
          opacity: 0
        },
        { 
          width: "100%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the badge
      gsap.fromTo(
        badgeRef.current,
        { 
          scale: 0,
          opacity: 0,
          rotation: -45
        },
        { 
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the heading
      gsap.fromTo(
        headingRef.current,
        { 
          y: 30,
          opacity: 0
        },
        { 
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

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
    });

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
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-[#292929] to-[#1a1a1a] relative overflow-hidden"
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

      <style jsx global>{`
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

        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Prevent text selection during drag */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>

      {/* Interactive Divider */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div 
          ref={dividerRef}
          className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#54bb74] to-transparent opacity-0"
        />
      </div>

      {/* Header Section with Badge and Title */}
      <div className="container mx-auto px-4 md:px-8 mb-12 md:mb-16">
        <div className="flex flex-col items-center justify-center">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="bg-[#54bb74] rounded-full p-4 mb-4 shadow-lg"
          >
            <div className="bg-[#292929] rounded-full p-3">
              <FaChartBar className="text-[#54bb74] text-3xl" />
            </div>
          </div>
          
          {/* Title */}
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            <span className="text-white">Analytics & </span>
            <span className="text-[#54bb74]">Insights</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/70 text-center max-w-2xl mx-auto text-base md:text-lg">
            Gain valuable insights into your lighting performance and usage patterns to optimize your experience and energy efficiency.
          </p>
        </div>
      </div>

      {/* Key Market Insights */}
      <div className="mb-20" ref={statsRef}>
        <h3 className="text-2xl font-bold mb-8 text-center">
          <span style={{ color: brandColors.primary }}>Key Market Insights</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-20 max-sm:mx-8">
          {marketInsights.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card bg-[#292929]/50 rounded-lg p-8 transition-transform hover:transform hover:scale-105"
              style={{ 
                boxShadow: `0 4px 20px rgba(84, 187, 116, 0.2), 0 0 0 1px rgba(84, 187, 116, 0.1)`,
                transform: 'translateZ(10px)',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: brandColors.primary + '30' }}>
                  {stat.icon}
                </div>
                <h4 className="text-xl text-white font-semibold">{stat.title}</h4>
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
        <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2 text-center">
          <span style={{ color: brandColors.primary }}>On the Horizon</span>
      
        </h3>
        <p className="text-white/70  text-center max-w-2xl mx-auto text-base md:text-lg">
        Stay tuned for the latest innovations, exhibitions, and achievements driving LIMI forward.
          </p>
          </div>
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
            className="flex overflow-x-auto md:mx-12 pb-6 gap-6 cursor-grab active:cursor-grabbing select-none no-scrollbar no-select"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {innovations.map((item, index) => (
              <div 
                key={index} 
                className="innovation-card flex-shrink-0 w-full md:w-96 bg-[#292929]/50 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105 select-none"
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
                  <h4 className="text-lg font-bold mb-2 text-emerald-400">{item.title}</h4>
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
          <span style={{ color: brandColors.primary }}>The LIMI Road Ahead</span>
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
                {/* <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">Development Progress</span>
                    <span className="text-sm font-medium text-white">{product.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="progress-bar h-2.5 rounded-full" 
                      style={{ backgroundColor: brandColors.primary, width: "0%" }}
                    ></div>
                  </div>
                </div> */}
                <p className="text-sm text-gray-400 mt-4">{product.availability}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsInsights;
