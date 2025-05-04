"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

function ProductShowcase() {
  // Refs for animations and DOM elements
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const productsRef = useRef([]);
  const productImagesRef = useRef([]);
  const productContentRef = useRef([]);
  const explodedViewRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselTrackRef = useRef(null);
  
  // State for interactive features
  const [activeProduct, setActiveProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showExplodedView, setShowExplodedView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isHorizontalView, setIsHorizontalView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);

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
      category: "App",
      features: [
        "User-friendly interface", 
        "Custom scene creation", 
        "Energy usage monitoring", 
        "Automatic firmware updates"
      ],
      benefits: [
        "Intuitive controls anyone can master in minutes",
        "Create the perfect ambiance for any occasion",
        "Track and optimize your lighting efficiency",
        "Always enjoy the latest features and improvements"
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
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Set initial states
    gsap.set(titleRef.current, { opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(productsRef.current, { 
      opacity: 0,
      y: 40,
      scale: 0.95
    });
    
    if (explodedViewRef.current) {
      gsap.set(explodedViewRef.current, { opacity: 0 });
      
      // Set initial positions for exploded view parts
      const explodedParts = explodedViewRef.current.querySelectorAll('.exploded-part');
      gsap.set(explodedParts, { 
        opacity: 0,
        scale: 0.8,
        y: 0 // Reset any Y position to animate from center
      });
    }

    // Create animation timeline with earlier trigger point
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%", // Start much earlier - almost as soon as the section enters viewport
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
        onEnter: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false)
      }
    });

    // Split title text for piano-key-like character animation
    if (titleRef.current) {
      const titleText = titleRef.current.innerText;
      titleRef.current.innerHTML = '';
      
      // Create spans for each character
      for (let i = 0; i < titleText.length; i++) {
        const span = document.createElement('span');
        span.className = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px) rotateX(-90deg)';
        span.style.transition = 'color 0.3s, transform 0.3s';
        span.textContent = titleText[i] === ' ' ? '\u00A0' : titleText[i];
        
        // Add hover effect for each letter
        span.addEventListener('mouseenter', () => {
          gsap.to(span, {
            y: -15,
            color: '#54BB74', // Limi's Eton green
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: true
          });
        });
        
        span.addEventListener('mouseleave', () => {
          gsap.to(span, {
            y: 0,
            color: '#ffffff',
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)',
            overwrite: true
          });
        });
        
        titleRef.current.appendChild(span);
      }
      
      const titleChars = titleRef.current.querySelectorAll('span');
      
      // Piano-key-like bouncing animation for title characters - faster and more immediate
      tl.staggerFromTo(titleChars, 
        0.6, // Faster duration
        { 
          opacity: 0, 
          y: 80, // More dramatic starting position
          rotationX: -120 // More extreme rotation
        }, 
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          ease: "elastic.out(0.6, 0.3)", // More pronounced elastic easing
          onComplete: function(i) {
            // Make sure titleChars[i] exists before animating it
            if (titleChars && titleChars[i]) {
              // Add a more pronounced bounce after the initial animation
              gsap.to(titleChars[i], {
                y: -15, // More noticeable bounce
                duration: 0.25,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                delay: 0.03 // Small delay for better visual effect
              });
            }
          },
          onCompleteParams: ["$i"] // Pass the index to onComplete
        }, 
        0.04 // Faster stagger time between each character
      )
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4, // Faster animation
        ease: "power2.out"
      }, "-=0.5") // Start earlier
      .staggerFromTo(productsRef.current,
        0.5, // Faster duration
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.5, // Faster animation
          ease: "back.out(1.7)"
        },
        0.08, // Faster stagger between products
        "-=0.4" // Start earlier
      );
    }

    // Create hover animations for product cards
    productsRef.current.forEach((card, index) => {
      const image = productImagesRef.current[index];
      const content = productContentRef.current[index];
      
      if (!card || !image || !content) return;
      
      // Create hover timeline for each card
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        }, 0)
        .to(content.querySelector('h3'), {
          color: "#54BB74",
          y: -5,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(card, {
          boxShadow: "0 10px 25px rgba(84, 187, 116, 0.3)",
          y: -10,
          duration: 0.5,
          ease: "power2.out"
        }, 0);
      
      // Add event listeners
      card.addEventListener('mouseenter', () => {
        hoverTl.play();
      });
      
      card.addEventListener('mouseleave', () => {
        hoverTl.reverse();
      });
      
      // Click event for mobile
      card.addEventListener('click', () => {
        if (isMobile) {
          setActiveProduct(activeProduct === products[index].id ? null : products[index].id);
        }
      });
    });

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, activeProduct, products]);
  
  // Effect for exploded view animation
  useEffect(() => {
    if (!explodedViewRef.current || !showExplodedView) return;
    
    // Animate the exploded view container
    gsap.to(explodedViewRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Get all exploded parts
    const explodedParts = explodedViewRef.current.querySelectorAll('.exploded-part');
    const basePart = explodedParts[0]; // Base
    const pendantPart = explodedParts[1]; // Pendant
    const hubPart = explodedParts[2]; // Hub
    const appPart = explodedParts[3]; // App
    
    // Staggered animation for parts - with better spacing to prevent overlap
    const partsTl = gsap.timeline({ delay: 0.3 });
    
    // Reset positions first
    gsap.set([basePart, pendantPart, hubPart, appPart], {
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: 0,
      rotation: 0
    });
    
    // Animate each part with staggered timing and better positioning
    partsTl
      // Base part - move down and slightly right
      .to(basePart, {
        opacity: 1,
        scale: 1,
        y: 120, // More space to prevent overlap
        x: 30, // Slight horizontal offset
        rotation: -5, // Slight rotation for better visibility
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      // Pendant part - keep in center but with slight rotation
      .to(pendantPart, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 5, // Slight rotation for better visibility
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      // Hub part - move up and slightly left
      .to(hubPart, {
        opacity: 1,
        scale: 1,
        y: -120, // More space to prevent overlap
        x: -30, // Slight horizontal offset
        rotation: -5, // Slight rotation for better visibility
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      // App part - move further up and right
      .to(appPart, {
        opacity: 1,
        scale: 1,
        y: -240, // Much more space to prevent overlap
        x: 40, // Horizontal offset
        rotation: 5, // Slight rotation for better visibility
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");
    
    // Add more interactive hover effects to parts
    explodedParts.forEach((part, index) => {
      // Create a more interactive hover effect
      part.addEventListener('mouseenter', () => {
        // Scale up the hovered part more dramatically
        gsap.to(part, {
          scale: 1.15,
          boxShadow: "0 15px 30px rgba(84, 187, 116, 0.6)",
          zIndex: 10, // Bring to front
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Add a glow effect
        part.style.filter = "drop-shadow(0 0 8px rgba(84, 187, 116, 0.8))";
        
        // Dim other parts to create focus
        explodedParts.forEach((otherPart, otherIndex) => {
          if (index !== otherIndex) {
            gsap.to(otherPart, {
              opacity: 0.6,
              scale: 0.95,
              duration: 0.3
            });
          }
        });
      });
      
      part.addEventListener('mouseleave', () => {
        // Return to normal
        gsap.to(part, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          zIndex: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Remove glow effect
        part.style.filter = "none";
        
        // Restore other parts
        explodedParts.forEach((otherPart) => {
          gsap.to(otherPart, {
            opacity: 1,
            scale: 1,
            duration: 0.3
          });
        });
      });
      
      // Add click interaction
      part.addEventListener('click', () => {
        // Get product info based on part index
        const productInfo = products[index];
        if (productInfo) {
          setActiveProduct(productInfo.id);
        }
      });
    });
    
    return () => {
      // Clean up event listeners
      explodedParts.forEach(part => {
        part.removeEventListener('mouseenter', () => {});
        part.removeEventListener('mouseleave', () => {});
        part.removeEventListener('click', () => {});
      });
    };
  }, [showExplodedView, products, setActiveProduct]);
  
  // Effect for horizontal carousel
  useEffect(() => {
    if (!carouselTrackRef.current || !isHorizontalView) return;
    
    // Reset carousel position when switching to horizontal view
    setCarouselPosition(0);
    
    gsap.to(carouselTrackRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Add scroll-based animation for carousel items
    productsRef.current.forEach((product, index) => {
      gsap.fromTo(product, 
        { 
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    });
  }, [isHorizontalView]);

  // Function to handle product card click
  const handleProductClick = (productId) => {
    if (isMobile) {
      setActiveProduct(activeProduct === productId ? null : productId);
    }
  };

  // Function to handle view toggle between grid and horizontal carousel
  const toggleView = () => {
    setIsHorizontalView(!isHorizontalView);
  };

  // Function to handle expanded view
  const handleExpandProduct = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
      // Reset image index when expanding a product
      setCurrentImageIndex(prev => ({
        ...prev,
        [productId]: 0
      }));
    }
  };

  // Function to navigate carousel
  const navigateCarousel = (direction) => {
    const containerWidth = carouselRef.current?.offsetWidth || 0;
    const trackWidth = carouselTrackRef.current?.scrollWidth || 0;
    const maxPosition = trackWidth - containerWidth;
    
    let newPosition;
    if (direction === 'next') {
      newPosition = Math.min(carouselPosition + containerWidth * 0.8, maxPosition);
    } else {
      newPosition = Math.max(carouselPosition - containerWidth * 0.8, 0);
    }
    
    setCarouselPosition(newPosition);
    
    gsap.to(carouselTrackRef.current, {
      x: -newPosition,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  // Function to change product image in gallery
  const changeProductImage = (productId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="product-showcase" 
      className="bg-[#292929] text-white py-20 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#54BB74] rounded-full filter blur-[100px] opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#54BB74] rounded-full filter blur-[120px] opacity-5 animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-center mb-4 relative inline-block"
          >
            A Lighting System Unlike Any Other
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#54BB74] rounded-full"></span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-center mt-6 max-w-3xl mx-auto text-gray-300"
          >
            Beautiful design meets intelligent tech in a modular platform.
          </p>
        </div>
        
        {/* View Toggle and Controls */}
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <div className="flex space-x-2">
            <button 
              onClick={toggleView}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${!isHorizontalView ? 'bg-[#54BB74] text-white' : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button 
              onClick={toggleView}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${isHorizontalView ? 'bg-[#54BB74] text-white' : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Slider
            </button>
          </div>
          
          <button 
            onClick={() => setShowExplodedView(!showExplodedView)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${showExplodedView ? 'bg-[#54BB74] text-white' : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {showExplodedView ? 'Hide' : 'Show'} Exploded View
          </button>
        </div>

        {/* Exploded View Section */}
        {showExplodedView && (
          <div 
            ref={explodedViewRef}
            className="bg-[#1a1a1a] rounded-xl p-6 mb-12 transform transition-all duration-500 opacity-0"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Modular System Exploded View</h3>
            <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-2xl mx-auto">
                  {/* Base Layer */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[80px] z-10 transition-all duration-1000 exploded-part">
                    <Image 
                      src="/images/products/product1/1.jpg" 
                      alt="Base" 
                      width={200} 
                      height={100}
                      className="object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                      <span className="bg-[#54BB74] text-white px-2 py-1 rounded text-xs">Base</span>
                    </div>
                  </div>
                  
                  {/* Pendant Layer */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[0px] z-20 transition-all duration-1000 exploded-part">
                    <Image 
                      src="/images/products/product2/1.jpg" 
                      alt="Pendant" 
                      width={180} 
                      height={180}
                      className="object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                      <span className="bg-[#54BB74] text-white px-2 py-1 rounded text-xs">Pendant</span>
                    </div>
                  </div>
                  
                  {/* Hub Layer */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80px] z-30 transition-all duration-1000 exploded-part">
                    <Image 
                      src="/images/products/product3/1.jpg" 
                      alt="Hub" 
                      width={160} 
                      height={160}
                      className="object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                      <span className="bg-[#54BB74] text-white px-2 py-1 rounded text-xs">Hub</span>
                    </div>
                  </div>
                  
                  {/* App Layer */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-160px] z-40 transition-all duration-1000 exploded-part">
                    <Image 
                      src="/images/products/product4/1.jpg" 
                      alt="App" 
                      width={140} 
                      height={140}
                      className="object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                      <span className="bg-[#54BB74] text-white px-2 py-1 rounded text-xs">App</span>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="65%" x2="50%" y2="50%" stroke="#54BB74" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="50%" y2="35%" stroke="#54BB74" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="35%" x2="50%" y2="20%" stroke="#54BB74" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
              LIMI's modular design allows each component to work seamlessly together, creating a lighting system that's both powerful and easy to customize.  
            </p>
          </div>
        )}
        
        {/* Product Display - Grid or Horizontal Carousel */}
        {isHorizontalView ? (
          // Horizontal Carousel View
          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-hidden"
            >
              <div 
                ref={carouselTrackRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselPosition}px)` }}
              >
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    ref={el => productsRef.current[index] = el}
                    className="flex-shrink-0 w-full md:w-[500px] p-4"
                  >
                    <div className={`bg-[#1e1e1e] rounded-xl overflow-hidden h-full transition-all duration-500 ${expandedProduct === product.id ? 'ring-2 ring-[#54BB74] transform scale-[1.02]' : ''}`}>
                      <div className="flex flex-col md:flex-row h-full">
                        {/* Product Image */}
                        <div 
                          ref={el => productImagesRef.current[index] = el}
                          className="relative md:w-1/2 h-64 md:h-auto overflow-hidden"
                        >
                          <Image
                            src={currentImageIndex[product.id] !== undefined ? 
                              product.galleryImages[currentImageIndex[product.id]] : 
                              product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover"
                            priority={index < 2}
                          />
                          <div className="absolute top-4 left-4 bg-[#54BB74] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {product.category}
                          </div>
                          
                          {/* Image gallery dots */}
                          {product.galleryImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                              {product.galleryImages.map((_, i) => (
                                <button 
                                  key={i} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    changeProductImage(product.id, i);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all ${currentImageIndex[product.id] === i ? 'bg-[#54BB74] w-4' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                                  aria-label={`View image ${i+1}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Product Content */}
                        <div 
                          ref={el => productContentRef.current[index] = el}
                          className="p-6 md:w-1/2 flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[#54BB74] text-sm font-medium mb-1">{product.tagline}</div>
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-400 mb-4">{product.description}</p>
                            
                            {/* Features list */}
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-[#54BB74] mb-2">Key Features:</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                {product.features.slice(0, expandedProduct === product.id ? 4 : 2).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <span className="mr-2 text-[#54BB74]">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpandProduct(product.id);
                            }}
                            className="mt-4 px-4 py-2 bg-transparent border border-[#54BB74] text-[#54BB74] rounded-lg hover:bg-[#54BB74] hover:text-white transition-all duration-300 text-sm self-start"
                          >
                            {expandedProduct === product.id ? 'Show Less' : 'Learn More'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Expanded View */}
                      {expandedProduct === product.id && (
                        <div className="p-6 pt-0 bg-[#1a1a1a] border-t border-gray-800">
                          <p className="text-gray-300 mb-4">{product.detailedDescription}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-[#54BB74] mb-2">Benefits:</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                {product.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2 text-[#54BB74] mt-1">✓</span>
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex justify-center items-center">
                              <Image 
                                src={product.galleryImages[product.galleryImages.length - 1]} 
                                alt={`${product.name} detail`}
                                width={200}
                                height={200}
                                className="object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <button 
              onClick={() => navigateCarousel('prev')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-[#1e1e1e] text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#54BB74] transition-colors duration-300"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => navigateCarousel('next')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-[#1e1e1e] text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#54BB74] transition-colors duration-300"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          // Grid View
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'} mt-10`}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                ref={el => productsRef.current[index] = el}
                className={`bg-[#1e1e1e] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer transform ${expandedProduct === product.id ? 'ring-2 ring-[#54BB74] scale-[1.02]' : ''}`}
                onClick={() => handleExpandProduct(product.id)}
              >
                <div 
                  ref={el => productImagesRef.current[index] = el}
                  className="relative h-64 overflow-hidden"
                >
                  <Image
                    src={currentImageIndex[product.id] !== undefined ? 
                      product.galleryImages[currentImageIndex[product.id]] : 
                      product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700"
                    priority={index < 2}
                  />
                  <div className="absolute top-4 left-4 bg-[#54BB74] text-white px-3 py-1 rounded-full text-sm font-medium transform transition-transform duration-300 hover:scale-110">
                    {product.category}
                  </div>
                  
                  {/* Image gallery dots */}
                  {product.galleryImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.galleryImages.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={(e) => {
                            e.stopPropagation();
                            changeProductImage(product.id, i);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${currentImageIndex[product.id] === i ? 'bg-[#54BB74] w-4' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                          aria-label={`View image ${i+1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-70"></div>
                </div>
                
                <div 
                  ref={el => productContentRef.current[index] = el}
                  className="p-6 relative"
                >
                  <div className="text-[#54BB74] text-sm font-medium mb-1">{product.tagline}</div>
                  <h3 className="text-xl font-bold mb-2 transition-all duration-300">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  {/* Features list - visible on active/hover */}
                  <div className={`transition-all duration-500 ${expandedProduct === product.id ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <h4 className="text-sm font-medium text-[#54BB74] mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1 mb-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="mr-2 text-[#54BB74]">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-gray-300 text-sm mb-4">{product.detailedDescription}</p>
                    
                    <button 
                      className="mt-2 px-4 py-2 bg-[#54BB74] text-white rounded-lg hover:bg-[#3a8351] transition-all duration-300 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Could link to product detail page
                        console.log(`View details for ${product.name}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                  
                  {!expandedProduct && (
                    <button 
                      className="mt-4 px-4 py-2 bg-transparent border border-[#54BB74] text-[#54BB74] rounded-lg hover:bg-[#54BB74] hover:text-white transition-all duration-300 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandProduct(product.id);
                      }}
                    >
                      Learn More
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default ProductShowcase;
