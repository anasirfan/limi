"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiChevronRight, FiChevronLeft, FiX, FiPlay } from "react-icons/fi";
import { FaRegLightbulb, FaTools, FaMagic, FaVideo, FaInfoCircle, FaRegImages } from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ProductShowcase() {
  // Refs for animations and DOM elements
  const sectionRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const blobsRef = useRef({});
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalBackgroundRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const storyboardRef = useRef(null);
  const videoRefs = useRef({});
  const lottieRefs = useRef({});
  const explodedViewRef = useRef(null);
  const productsRef = useRef([]);
  const productImagesRef = useRef({});
  const productContentRef = useRef({});
  
  // State for interactive features
  const [activeProduct, setActiveProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalTab, setModalTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState({});
  const [storyboardStep, setStoryboardStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeStoryProduct, setActiveStoryProduct] = useState(1);
  const [isHorizontalView, setIsHorizontalView] = useState(false);
  const [showExplodedView, setShowExplodedView] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);

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
      ],
      specs: [
        { name: "Platforms", value: "iOS 14+, Android 10+" },
        { name: "Languages", value: "English, Spanish, French, German, Japanese" },
        { name: "Cloud Storage", value: "Secure, encrypted user data" },
        { name: "Updates", value: "Automatic, monthly feature additions" },
        { name: "Support", value: "24/7 in-app chat and email" }
      ],
      useCases: [
        { title: "Remote Control", description: "Manage your lighting from anywhere" },
        { title: "Scene Creation", description: "Perfect lighting for every occasion" },
        { title: "Energy Insights", description: "Monitor and optimize usage" }
      ],
      storyboardImages: [
        "/images/storyboard/app-install.jpg",
        "/images/storyboard/app-setup.jpg",
        "/images/storyboard/app-control.jpg"
      ]
    }
  ];

  // Custom cursor functionality
  const updateCursorPosition = useCallback((e) => {
    if (!cursorRef.current) return;
    
    const { clientX, clientY } = e;
    gsap.to(cursorRef.current, {
      x: clientX,
      y: clientY,
      duration: isDragging ? 0.5 : 0.2,
      ease: isDragging ? "power2.out" : "power1.out"
    });
  }, [isDragging]);
  
  // Handle cursor text and variant changes
  const handleCursorEnter = useCallback((text, variant) => {
    setCursorText(text);
    setCursorVariant(variant);
  }, []);
  
  const handleCursorLeave = useCallback(() => {
    setCursorText('');
    setCursorVariant('default');
  }, []);
  
  // Handle modal open/close
  const openModal = useCallback((product) => {
    setModalProduct(product);
    setModalOpen(true);
    setModalTab('overview');
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeModal = useCallback(() => {
    const tl = gsap.timeline();
    tl.to(modalContentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(modalBackgroundRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setModalOpen(false);
        setModalProduct(null);
        document.body.style.overflow = '';
      }
    }, "-=0.1");
  }, []);
  
  // Handle image change in carousel
  const changeImage = useCallback((productId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: index
    }));
  }, []);
  
  // Handle video playback
  const toggleVideo = useCallback((productId) => {
    setIsVideoPlaying(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    
    const videoElement = videoRefs.current[productId];
    if (videoElement) {
      if (!isVideoPlaying[productId]) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }, [isVideoPlaying]);
  
  // Handle storyboard navigation
  const navigateStoryboard = useCallback((direction) => {
    if (direction === 'next') {
      setStoryboardStep(prev => Math.min(prev + 1, 2));
    } else {
      setStoryboardStep(prev => Math.max(prev - 1, 0));
    }
  }, []);
  
  // Handle product card click
  const handleProductClick = useCallback((productId) => {
    if (isMobile) {
      setActiveProduct(activeProduct === productId ? null : productId);
    } else {
      const product = products.find(p => p.id === productId);
      if (product) openModal(product);
    }
  }, [isMobile, activeProduct, openModal, products]);
  
  // Handle tab change in modal
  const changeModalTab = useCallback((tab) => {
    setModalTab(tab);
  }, []);
  
  // Handle storyboard product change
  const changeStoryProduct = useCallback((productId) => {
    setActiveStoryProduct(productId);
    setStoryboardStep(0);
  }, []);
  
  // Function to handle expanded view
  const handleExpandProduct = useCallback((productId) => {
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
  }, [expandedProduct]);

  // Function to handle view toggle between grid and horizontal carousel
  const toggleView = useCallback(() => {
    setIsHorizontalView(!isHorizontalView);
  }, [isHorizontalView]);

  // Function to navigate carousel
  const navigateCarousel = useCallback((direction) => {
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
  }, [carouselPosition]);

  // Function to change product image in gallery
  const changeProductImage = useCallback((productId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: index
    }));
  }, []);
  
  // Exploded view animation
  const setupExplodedView = useCallback(() => {
    if (!explodedViewRef.current) return;
    
    const basePart = explodedViewRef.current.querySelector('.base-part');
    const pendantPart = explodedViewRef.current.querySelector('.pendant-part');
    const hubPart = explodedViewRef.current.querySelector('.hub-part');
    const appPart = explodedViewRef.current.querySelector('.app-part');
    
    const explodedParts = [basePart, pendantPart, hubPart, appPart];
    
    // Reset initial state
    gsap.set(explodedParts, {
      opacity: 0,
      scale: 0.8,
      y: 0,
      x: 0,
      rotation: 0
    });
    
    // Create timeline for exploded view animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: explodedViewRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });
    
    tl
      // Base part - stays in place but scales up
      .to(basePart, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      // Pendant part - move up
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
      if (!part) return;
      
      part.addEventListener('mouseenter', () => {
        gsap.to(part, {
          scale: 1.1,
          filter: 'brightness(1.1)',
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Add subtle pulse glow effect
        gsap.to(part, {
          boxShadow: `0 0 20px 5px ${index === 0 ? '#50C878' : index === 1 ? '#87CEAB' : index === 2 ? '#3a3d42' : '#4169E1'}80`,
          duration: 0.3
        });
      });
      
      part.addEventListener('mouseleave', () => {
        gsap.to(part, {
          scale: 1,
          filter: 'brightness(1)',
          boxShadow: 'none',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);
  
  // Set up the exploded view when it becomes visible
  useEffect(() => {
    if (showExplodedView) {
      setupExplodedView();
    }
  }, [showExplodedView, setupExplodedView]);
  
  // Initialize responsive behavior
  useEffect(() => {
    // Check for mobile and tablet on mount and when window resizes
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', updateCursorPosition);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [updateCursorPosition]);

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Store all animations and ScrollTriggers for cleanup
    const animations = [];
    const scrollTriggers = [];
    
    // Create animated blob backgrounds
    Object.values(blobsRef.current).forEach((blob) => {
      if (!blob) return;
      
      const blobAnimation = gsap.to(blob, {
        x: `random(-50, 50, 5)`,
        y: `random(-50, 50, 5)`,
        scale: `random(0.8, 1.2, 0.05)`,
        borderRadius: `random(40%, 60%, 5%)`,
        duration: `random(20, 40, 5)`,
        repeat: -1,
        repeatRefresh: true,
        ease: 'sine.inOut'
      });
      
      animations.push(blobAnimation);
    });
    
    // Animate title with standard GSAP animation
    if (titleRef.current) {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      titleTl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
      
      animations.push(titleTl);
      scrollTriggers.push(titleTl.scrollTrigger);
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      const subtitleTl = gsap.timeline({
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      subtitleTl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      animations.push(subtitleTl);
      scrollTriggers.push(subtitleTl.scrollTrigger);
    }
    
    // Manual touch/mouse drag handling for carousel instead of Draggable
    if (carouselTrackRef.current && carouselRef.current) {
      const track = carouselTrackRef.current;
      let startX = 0;
      let scrollLeft = 0;
      let isDragging = false;
      
      const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        setIsDragging(true);
        setCursorVariant('grabbing');
      };
      
      const handleMouseUp = () => {
        isDragging = false;
        setIsDragging(false);
        setCursorVariant('grab');
      };
      
      const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        const newPosition = scrollLeft - walk;
        setCarouselPosition(Math.max(0, newPosition));
        gsap.to(track, {
          x: -Math.max(0, newPosition),
          duration: 0.5,
          ease: 'power2.out'
        });
      };
      
      track.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Clean up
      return () => {
        track.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
    
    // Set up storyboard pinning and animation
    if (storyboardRef.current) {
      const storyboardTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyboardRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          pin: true,
          pinSpacing: true
        }
      });
      
      scrollTriggers.push(storyboardTl.scrollTrigger);
    }
    
    // Animate product cards with 3D hover effect
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // Create card entrance animation
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      cardTl.from(card, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        rotationY: 5,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1
      });
      
      animations.push(cardTl);
      scrollTriggers.push(cardTl.scrollTrigger);
    });
    
    // Clean up all animations and ScrollTriggers on unmount
    return () => {
      animations.forEach(anim => anim?.kill());
      scrollTriggers.forEach(trigger => trigger?.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // 3D tilt effect for product cards
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;
    
    const cleanupFunctions = [];
    
    cards.forEach((card) => {
      if (!card) return;
      
      // Mouse move handler for 3D tilt effect
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the card
        const y = e.clientY - rect.top; // y position within the card
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15; // Divide by a value to control the tilt amount
        const rotateY = (centerX - x) / 15;
        
        // Apply the rotation
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Parallax effect for card content
        const cardImage = card.querySelector('.card-image');
        const cardContent = card.querySelector('.card-content');
        const cardOverlay = card.querySelector('.card-overlay');
        
        if (cardImage) {
          gsap.to(cardImage, {
            x: (x - centerX) / 20,
            y: (y - centerY) / 20,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
        
        if (cardContent) {
          gsap.to(cardContent, {
            x: (x - centerX) / 30,
            y: (y - centerY) / 30,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      };
      
      // Reset on mouse leave
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)'
        });
        
        const cardImage = card.querySelector('.card-image');
        const cardContent = card.querySelector('.card-content');
        
        if (cardImage) {
          gsap.to(cardImage, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)'
          });
        }
        
        if (cardContent) {
          gsap.to(cardContent, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      };
      
            // Add event listeners
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
            
            // Clean up
            cleanupFunctions.push(() => {
              card.removeEventListener('mousemove', handleMouseMove);
              card.removeEventListener('mouseleave', handleMouseLeave);
            });
          });
          
          // Clean up event listeners on unmount
          return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
          };
        }, []);
      
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
          if (productsRef.current.length) {
            productsRef.current.forEach((product, index) => {
              if (!product) return;
              
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
          }
        }, [isHorizontalView]);
      
        return (
          <section 
            ref={sectionRef}
            id="product-showcase" 
            className="bg-[#F2F0E6] text-[#2B2D2F] py-20 min-h-screen relative overflow-hidden"
          >
            {/* Custom cursor for interactive elements */}
            <motion.div 
              ref={cursorRef}
              className="fixed w-12 h-12 pointer-events-none z-50 flex items-center justify-center hidden md:flex"
              variants={{
                default: { scale: 1 },
                grab: { scale: 1.2 },
                grabbing: { scale: 0.9 },
                video: { scale: 1.5 },
                expand: { scale: 1.4 }
              }}
              animate={cursorVariant}
              style={{ left: -50, top: -50 }}
            >
              <motion.div 
                className="w-full h-full rounded-full bg-[#50C878] opacity-30"
                animate={{ scale: cursorVariant === 'default' ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.span 
                ref={cursorTextRef} 
                className="absolute text-xs font-medium text-white whitespace-nowrap"
              >
                {cursorText}
              </motion.span>
            </motion.div>
      
            {/* Main content wrapper */}
            <div className="main-wrapper">
                {/* Animated background elements - organic shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    ref={el => blobsRef.current.blob1 = el} 
                    className="absolute top-20 left-10 w-[40vw] h-[40vh] bg-[#50C878] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] filter blur-[100px] opacity-10"
                  ></div>
                  <div 
                    ref={el => blobsRef.current.blob2 = el} 
                    className="absolute bottom-20 right-10 w-[45vw] h-[50vh] bg-[#87CEAB] rounded-[50%_50%_40%_60%/40%_60%_50%_40%] filter blur-[120px] opacity-8"
                  ></div>
                  
                  {/* Curved separator */}
                  <div className="absolute left-0 right-0 h-24 bottom-0 overflow-hidden">
                    <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                        className="fill-[#2B2D2F] opacity-5"
                      ></path>
                    </svg>
                  </div>
                  
                  {/* Flowing lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M0,100 Q300,150 600,100 T1200,100" 
                      fill="none" 
                      stroke="#50C878" 
                      strokeWidth="1"
                      className="animate-flow-slow"
                    />
                    <path 
                      d="M0,200 Q300,100 600,200 T1200,200" 
                      fill="none" 
                      stroke="#87CEAB" 
                      strokeWidth="1"
                      className="animate-flow"
                    />
                  </svg>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                  {/* Section Header with modern styling */}
                  <div className="mb-16 relative">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#50C878] rounded-full opacity-5 blur-xl"></div>
                    <h2 
                      ref={titleRef}
                      className="text-4xl md:text-6xl font-bold text-center mb-6 relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#2B2D2F] to-[#3a3d42] px-4"
                    >
                      Discover Our <span className="text-[#50C878]">Ecosystem</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#50C878] to-[#87CEAB] rounded-full mx-auto mb-6"></div>
                    <p 
                      ref={subtitleRef}
                      className="text-lg md:text-2xl text-center max-w-3xl mx-auto text-[#2B2D2F] font-light"
                    >
                      Beautiful design meets intelligent tech in a modular platform that transforms with you
                    </p>
                  </div>
              
                  {/* View Toggle and Controls */}
                  <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
                    <div className="flex space-x-2">
                      <button 
                        onClick={toggleView}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${!isHorizontalView ? 'bg-[#50C878] text-white' : 'bg-[#F2F0E6] text-[#2B2D2F] hover:bg-[#87CEAB] hover:text-white'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Grid
                      </button>
                      <button 
                        onClick={toggleView}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${isHorizontalView ? 'bg-[#50C878] text-white' : 'bg-[#F2F0E6] text-[#2B2D2F] hover:bg-[#87CEAB] hover:text-white'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Slider
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setShowExplodedView(!showExplodedView)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${showExplodedView ? 'bg-[#50C878] text-white' : 'bg-[#F2F0E6] text-[#2B2D2F] hover:bg-[#87CEAB] hover:text-white'}`}
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
                      className="bg-white rounded-xl shadow-lg p-6 mb-12 transform transition-all duration-500"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-center">Modular System Exploded View</h3>
                      <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full max-w-2xl mx-auto">
                            {/* Base Layer */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[80px] z-10 transition-all duration-1000 base-part">
                              <Image 
                                src="/images/products/product1/1.jpg" 
                                alt="Base" 
                                width={200} 
                                height={100}
                                className="object-contain rounded-lg shadow-lg"
                              />
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                                <span className="bg-[#50C878] text-white px-2 py-1 rounded text-xs">Base</span>
                              </div>
                            </div>
                            
                            {/* Pendant Layer */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[0px] z-20 transition-all duration-1000 pendant-part">
                              <Image 
                                src="/images/products/product2/1.jpg" 
                                alt="Pendant" 
                                width={180} 
                                height={180}
                                className="object-contain rounded-lg shadow-lg"
                              />
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                                <span className="bg-[#87CEAB] text-white px-2 py-1 rounded text-xs">Pendant</span>
                              </div>
                            </div>
                            
                            {/* Hub Layer */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80px] z-30 transition-all duration-1000 hub-part">
                              <Image 
                                src="/images/products/product3/1.jpg" 
                                alt="Hub" 
                                width={160} 
                                height={160}
                                className="object-contain rounded-lg shadow-lg"
                              />
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                                <span className="bg-[#3a3d42] text-white px-2 py-1 rounded text-xs">Hub</span>
                              </div>
                            </div>
                            
                            {/* App Layer */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-160px] z-40 transition-all duration-1000 app-part">
                              <Image 
                                src="/images/products/product4/1.jpg" 
                                alt="App" 
                                width={140} 
                                height={140}
                                className="object-contain rounded-lg shadow-lg"
                              />
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                                <span className="bg-[#2B2D2F] text-white px-2 py-1 rounded text-xs">App</span>
                              </div>
                            </div>
                            
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
                              <line x1="50%" y1="65%" x2="50%" y2="50%" stroke="#50C878" strokeWidth="2" strokeDasharray="5,5" />
                              <line x1="50%" y1="50%" x2="50%" y2="35%" stroke="#50C878" strokeWidth="2" strokeDasharray="5,5" />
                              <line x1="50%" y1="35%" x2="50%" y2="20%" stroke="#50C878" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
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
                              <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-500 ${expandedProduct === product.id ? 'ring-2 ring-[#50C878] transform scale-[1.02]' : ''}`}>
                                <div className="flex flex-col md:flex-row h-full">
                                  {/* Product Image */}
                                  <div 
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
                                    <div className="absolute top-4 left-4 bg-[#50C878] text-white px-3 py-1 rounded-full text-sm font-medium">
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
                                            className={`w-2 h-2 rounded-full transition-all ${currentImageIndex[product.id] === i ? 'bg-[#50C878] w-4' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                                            aria-label={`View image ${i+1}`}
                                          />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Product Content */}
                                  <div 
                                    className="p-6 md:w-1/2 flex flex-col justify-between"
                                  >
                                    <div>
                                      <div className="text-[#50C878] text-sm font-medium mb-1">{product.tagline}</div>
                                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                      <p className="text-gray-600 mb-4">{product.description}</p>
                                      
                                      {/* Features list */}
                                      <div className="mt-4">
                                        <h4 className="text-sm font-medium text-[#50C878] mb-2">Key Features:</h4>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                          {product.features.slice(0, expandedProduct === product.id ? 4 : 2).map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                              <span className="mr-2 text-[#50C878]">•</span>
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
                                      className="mt-4 px-4 py-2 bg-transparent border border-[#50C878] text-[#50C878] rounded-lg hover:bg-[#50C878] hover:text-white transition-all duration-300 text-sm self-start"
                                    >
                                      {expandedProduct === product.id ? 'Show Less' : 'Learn More'}
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Expanded View */}
                                {expandedProduct === product.id && (
                                  <div className="p-6 pt-0 bg-[#f9f9f9] border-t border-gray-200">
                                    <p className="text-gray-700 mb-4">{product.detailedDescription}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-sm font-medium text-[#50C878] mb-2">Benefits:</h4>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                          {product.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start">
                                              <span className="mr-2 text-[#50C878] mt-1">✓</span>
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
                                    
                                    <button 
                                      onClick={() => openModal(product)}
                                      className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                                    >
                                      View Full Details
                                    </button>
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
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white text-[#2B2D2F] p-2 rounded-full shadow-lg z-10 hover:bg-[#50C878] hover:text-white transition-colors duration-300"
                        aria-label="Previous slide"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      
                      <button 
                        onClick={() => navigateCarousel('next')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white text-[#2B2D2F] p-2 rounded-full shadow-lg z-10 hover:bg-[#50C878] hover:text-white transition-colors duration-300"
                        aria-label="Next slide"
                      >
                        <FiChevronRight size={24} />
                      </button>
                    </div>
                  ) : (
                    // Grid View
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                      <div 
                        key={product.id}
                        ref={el => cardsRef.current[index] = el}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="relative overflow-hidden h-48 card-image">
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div 
                            className="absolute inset-0 opacity-20" 
                            style={{ background: `linear-gradient(45deg, ${product.color}88, transparent)` }}
                          ></div>
                          <div className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-2 py-1 rounded-full">
                            {product.category}
                          </div>
                        </div>
                        
                        <div className="p-6 card-content">
                          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                          <p className="text-sm text-[#50C878] font-medium mb-3">{product.tagline}</p>
                          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                          
                          <div className="space-y-2">
                            {product.features.slice(0, 2).map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <div className="text-[#50C878] mr-2 mt-0.5">
                                  <FiPlus size={14} />
                                </div>
                                <p className="text-sm text-gray-700">{feature}</p>
                              </div>
                            ))}
                          </div>
                          
                          <button 
                            className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center group-hover:from-[#3a9c5a] group-hover:to-[#6bae8a]"
                            onClick={() => handleProductClick(product.id)}
                          >
                            Learn More
                            <FiChevronRight className="ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Modal */}
            <AnimatePresence>
              {modalOpen && modalProduct && (
                <motion.div 
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    ref={modalBackgroundRef}
                    className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
                    onClick={closeModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    ref={modalContentRef}
                    className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Close button */}
                    <button 
                      className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-300"
                      onClick={closeModal}
                      onMouseEnter={() => handleCursorEnter('Close', 'default')}
                      onMouseLeave={handleCursorLeave}
                    >
                      <FiX size={20} className="text-gray-800" />
                    </button>
                    
                    {/* Product Header */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={currentImageIndex[modalProduct.id] !== undefined ? 
                          modalProduct.galleryImages[currentImageIndex[modalProduct.id]] : 
                          modalProduct.image}
                        alt={modalProduct.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                        <div className="mb-1 inline-block px-2 py-1 bg-[#50C878] text-white text-xs font-medium rounded">
                          {modalProduct.category}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold">{modalProduct.name}</h2>
                        <p className="text-sm md:text-base font-medium text-gray-200 mb-2">{modalProduct.tagline}</p>
                      </div>
                      
                      {/* Navigation dots for gallery */}
                      {modalProduct.galleryImages.length > 1 && (
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          {modalProduct.galleryImages.map((_, i) => (
                            <button 
                              key={i} 
                              onClick={() => changeImage(modalProduct.id, i)}
                              className={`w-2 h-2 rounded-full transition-all ${currentImageIndex[modalProduct.id] === i ? 'bg-[#50C878] w-4' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                              aria-label={`View image ${i+1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 px-6 pt-4">
                      <button 
                        onClick={() => changeModalTab('overview')}
                        className={`pb-3 px-4 font-medium text-sm transition-all duration-300 ${modalTab === 'overview' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        Overview
                      </button>
                      <button 
                        onClick={() => changeModalTab('specs')}
                        className={`pb-3 px-4 font-medium text-sm transition-all duration-300 ${modalTab === 'specs' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        Specifications
                      </button>
                      <button 
                        onClick={() => changeModalTab('benefits')}
                        className={`pb-3 px-4 font-medium text-sm transition-all duration-300 ${modalTab === 'benefits' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        Benefits
                      </button>
                      <button 
                        onClick={() => changeModalTab('visual')}
                        className={`pb-3 px-4 font-medium text-sm transition-all duration-300 ${modalTab === 'visual' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        Visual
                      </button>
                    </div>
                    
                    <div className="p-6 max-h-[calc(90vh-60px-57px)] overflow-y-auto">
                      {/* Overview Tab */}
                      {modalTab === 'overview' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-700">{modalProduct.detailedDescription}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {modalProduct.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <div className="text-[#50C878] mr-2 mt-1">
                                    <FiPlus size={14} />
                                  </div>
                                  <p className="text-gray-700">{feature}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Use Cases</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {modalProduct.useCases.map((useCase, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-1">{useCase.title}</h4>
                                  <p className="text-sm text-gray-600">{useCase.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Specs Tab */}
                      {modalTab === 'specs' && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            {modalProduct.specs.map((spec, i) => (
                              <div key={i} className={`flex items-start p-3 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <div className="w-1/3 font-medium text-gray-700">{spec.name}</div>
                                <div className="w-2/3 text-gray-600">{spec.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Benefits Tab */}
                      {modalTab === 'benefits' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold mb-4">Benefits & Advantages</h3>
                          <div className="grid grid-cols-1 gap-4">
                            {modalProduct.benefits.map((benefit, i) => (
                              <div key={i} className="bg-gray-50 p-4 rounded-lg flex items-start">
                                <div className="bg-[#50C878] rounded-full p-2 text-white mr-4">
                                  <span className="text-lg font-bold">{i + 1}</span>
                                </div>
                                <div>
                                  <p className="text-gray-700">{benefit}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Visual Tab */}
                      {modalTab === 'visual' && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Product Video</h3>
                              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                {modalProduct.video ? (
                                  <>
                                    <video
                                      ref={el => videoRefs.current[modalProduct.id] = el}
                                      src={modalProduct.video}
                                      className="w-full h-full object-cover"
                                      poster={modalProduct.image}
                                      loop
                                    />
                                    <button
                                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-300"
                                      onClick={() => toggleVideo(modalProduct.id)}
                                    >
                                      {isVideoPlaying[modalProduct.id] ? (
                                        <div className="w-16 h-16 rounded-full bg-[#50C878] flex items-center justify-center">
                                          <FiX size={24} className="text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-16 h-16 rounded-full bg-[#50C878] flex items-center justify-center">
                                          <FiPlay size={24} className="text-white ml-1" />
                                        </div>
                                      )}
                                    </button>
                                  </>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Video coming soon
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Interactive Demo</h3>
                              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                {modalProduct.lottieAnimation ? (
                                  <Lottie
                                    animationData={modalProduct.lottieAnimation}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                  />
                                ) : (
                                  <div className="text-gray-400">
                                    Interactive demo coming soon
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Installation Process</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {modalProduct.storyboardImages.map((image, i) => (
                                <div key={i} className="relative overflow-hidden rounded-lg aspect-video bg-gray-200">
                                  <Image 
                                    src={image} 
                                    alt={`Installation step ${i+1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-all duration-300">
                                    <span className="bg-white text-black text-sm font-medium px-2 py-1 rounded">
                                      Step {i+1}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
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
              @keyframes flow {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: 50; }
              }
              .animate-flow {
                stroke-dasharray: 5;
                animation: flow 15s linear infinite;
              }
              .animate-flow-slow {
                stroke-dasharray: 10;
                animation: flow 20s linear infinite;
              }
            `}</style>
          </section>
        );
      }
      
      export default ProductShowcase;