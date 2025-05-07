"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

// Import icons for micro-interactions
import { FiSettings, FiZap, FiSmartphone, FiSliders, FiPlay, FiPause, FiArrowLeft, FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Carousel Component for Learn More Details
const DetailCarousel = ({ step, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = step.carousel;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };
  
  const currentItem = carouselItems[currentIndex];
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-50 text-white bg-[#54BB74] rounded-full p-2"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        
        {/* Title bar */}
        <div className="bg-[#54BB74] text-white p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            {step.id}
          </div>
          <h3 className="text-xl font-bold">{step.title} - {currentItem.title}</h3>
        </div>
        
        {/* Carousel content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Media container */}
              <div className="w-full aspect-video relative">
                {currentItem.type === "video" ? (
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src={currentItem.media} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={currentItem.media} 
                    alt={currentItem.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Description */}
              <div className="p-6">
                <h4 className="text-2xl font-bold text-white mb-2">{currentItem.title}</h4>
                <p className="text-white/80 text-lg">{currentItem.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#54BB74]/80 text-white rounded-full p-3 z-10"
            onClick={prevSlide}
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#54BB74]/80 text-white rounded-full p-3 z-10"
            onClick={nextSlide}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center p-4 gap-2">
          {carouselItems.map((_, index) => (
            <button 
              key={index} 
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#54BB74]' : 'bg-white/30'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        
        {/* Back button */}
        <div className="border-t border-white/10 p-4 flex justify-center">
          <button 
            className="flex items-center text-white/70 hover:text-white gap-2"
            onClick={onClose}
          >
            <FiArrowLeft size={16} />
            <span>Back to overview</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HowItWorks() {
  // References for GSAP animations
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const stepsRef = useRef([]);
  
  // State for carousel
  const [activeStep, setActiveStep] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  
  // Handle Learn More button click
  const handleLearnMore = (step) => {
    setActiveStep(step);
    setShowCarousel(true);
  };
  
  // Close carousel
  const closeCarousel = () => {
    setShowCarousel(false);
  };

  // Enhanced steps data with visual assets, storytelling elements, and carousel content
  const steps = [
    {
      id: 1,
      title: "Install the Base",
      description: "Mount the smart base on your ceiling with a simple twist – no re-wiring or electrician needed.",
      story: "Traditional lighting installations require complex wiring and professional help. LIMI changes everything with a simple twist-and-lock mechanism that works with your existing fixtures.",
      icon: FiSettings,
      color: "#54BB74",
      video: "https://static.videezy.com/system/resources/previews/000/044/479/original/light-bulb-illuminating-a-dark-room.mp4",
      tip: "The base connects to your existing light socket in seconds, no tools required.",
      carousel: [
        {
          title: "Twist & Lock Mechanism",
          description: "Our patented twist-lock system secures the base to any standard light socket in seconds.",
          media: "https://static.videezy.com/system/resources/previews/000/044/479/original/light-bulb-illuminating-a-dark-room.mp4",
          type: "video"
        },
        {
          title: "No Tools Required",
          description: "The ergonomic design allows for easy installation without any special tools or skills.",
          media: "https://static.videezy.com/system/resources/previews/000/044/479/original/light-bulb-illuminating-a-dark-room.mp4",
          type: "video"
        },
        {
          title: "Universal Compatibility",
          description: "Works with all standard E26/E27 light sockets found in most homes and offices.",
          media: "https://static.videezy.com/system/resources/previews/000/044/479/original/light-bulb-illuminating-a-dark-room.mp4",
          type: "video"
        }
      ]
    },
    {
      id: 2,
      title: "Attach a Pendant",
      description: "Simply snap in your chosen light module with our magnetic connector system.",
      story: "Changing your lighting style used to mean calling an electrician. With LIMI's magnetic connection system, you can swap designs in seconds without any technical knowledge.",
      icon: FiZap,
      color: "#54BB74",
      video: "https://static.videezy.com/system/resources/previews/000/021/642/original/LIGHT-BULB-TURN-ON-WARM-LIGHT.mp4",
      tip: "Our pendants connect magnetically and can be swapped anytime – even when powered on!",
      carousel: [
        {
          title: "Magnetic Connection",
          description: "Strong neodymium magnets create a secure connection that's easy to attach and detach.",
          media: "https://static.videezy.com/system/resources/previews/000/021/642/original/LIGHT-BULB-TURN-ON-WARM-LIGHT.mp4",
          type: "video"
        },
        {
          title: "Hot-Swappable Design",
          description: "Change pendants even when the system is powered on with our safe connection technology.",
          media: "https://static.videezy.com/system/resources/previews/000/021/642/original/LIGHT-BULB-TURN-ON-WARM-LIGHT.mp4",
          type: "video"
        },
        {
          title: "Designer Collection",
          description: "Choose from dozens of designer pendants that can be swapped in seconds.",
          media: "https://static.videezy.com/system/resources/previews/000/021/642/original/LIGHT-BULB-TURN-ON-WARM-LIGHT.mp4",
          type: "video"
        }
      ]
    },
    {
      id: 3,
      title: "Connect & Setup",
      description: "Open the LIMI app and scan the QR code on your base for instant wireless pairing.",
      story: "Smart home setup is often frustrating with complex networks and passwords. LIMI simplifies everything with a quick QR scan that instantly connects your light to your home network.",
      icon: FiSmartphone,
      color: "#54BB74",
      video: "https://static.videezy.com/system/resources/previews/000/038/893/original/Smart_House_Phone.mp4",
      tip: "The app guides you through setup in under 60 seconds with no technical knowledge required.",
      carousel: [
        {
          title: "QR Code Pairing",
          description: "Simply scan the unique QR code on your LIMI base to instantly pair with the app.",
          media: "https://static.videezy.com/system/resources/previews/000/038/893/original/Smart_House_Phone.mp4",
          type: "video"
        },
        {
          title: "Guided Setup",
          description: "Our step-by-step setup wizard makes configuration simple for everyone.",
          media: "https://static.videezy.com/system/resources/previews/000/038/893/original/Smart_House_Phone.mp4",
          type: "video"
        },
        {
          title: "Smart Home Integration",
          description: "Seamlessly connects with popular smart home systems like HomeKit, Alexa, and Google Home.",
          media: "https://static.videezy.com/system/resources/previews/000/038/893/original/Smart_House_Phone.mp4",
          type: "video"
        }
      ]
    },
    {
      id: 4,
      title: "Personalize & Enjoy",
      description: "Adjust brightness, color, and create custom lighting scenes that match your mood.",
      story: "Lighting should adapt to your life, not the other way around. LIMI learns your preferences over time and automatically adjusts to create the perfect atmosphere for every moment.",
      icon: FiSliders,
      color: "#54BB74",
      video: "https://static.videezy.com/system/resources/previews/000/051/517/original/alargando_la_luz_de_una_lampara.mp4",
      tip: "Create custom scenes for different activities – reading, dining, movie night – and activate them with a tap or voice command.",
      carousel: [
        {
          title: "Intuitive Controls",
          description: "Simple sliders and presets make adjusting your lighting quick and easy.",
          media: "https://static.videezy.com/system/resources/previews/000/051/517/original/alargando_la_luz_de_una_lampara.mp4",
          type: "video"
        },
        {
          title: "Custom Scenes",
          description: "Create and save personalized lighting scenes for different activities and moods.",
          media: "https://static.videezy.com/system/resources/previews/000/051/517/original/alargando_la_luz_de_una_lampara.mp4",
          type: "video"
        },
        {
          title: "Adaptive Learning",
          description: "LIMI learns your preferences over time and suggests optimal lighting for each time of day.",
          media: "https://static.videezy.com/system/resources/previews/000/051/517/original/alargando_la_luz_de_una_lampara.mp4",
          type: "video"
        }
      ]
    }
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize refs array for steps
      stepsRef.current = stepsRef.current.slice(0, steps.length);
      
      // Get references to elements
      const section = sectionRef.current;
      const container = containerRef.current;
      
      if (section && container) {
        // Calculate the width of the horizontal scroll container
        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // Create the horizontal scroll animation - much slower for storytelling
        const horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 5%", // Start when section is 10% from the top of viewport
            end: "+=300%", // Make the scroll distance much longer (3x the viewport height)
            scrub: 1, // Add smoothing (value between 0.5-3)
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: false, // Set to true for debugging
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Scale effect: 0.8 to 1 as we scroll
              const scale = 0.8 + (self.progress * 0.2);
              gsap.to(container, {
                scale: scale,
                duration: 0.3, // Slower duration
                ease: "power1.out", // Smoother easing
              });
            }
          }
        });
        
        // Animate the horizontal scroll - much slower
        horizontalScroll.to(container, {
          x: -(totalWidth - viewportWidth),
          ease: "power1.inOut", // Smoother easing
          duration: 2 // Double the duration
        });
        
        // Create more elaborate animations for each step
        stepsRef.current.forEach((step, index) => {
          if (!step) return;
          
          // Find elements within each step for more detailed animations
          const content = step.querySelector('.step-content');
          const visual = step.querySelector('.step-visual');
          const title = step.querySelector('.step-title');
          const description = step.querySelector('.step-description');
          const icon = step.querySelector('.step-icon');
          const button = step.querySelector('.step-button');
          
          // Create a timeline for each step
          const stepTimeline = gsap.timeline({
            scrollTrigger: {
              containerAnimation: horizontalScroll,
              trigger: step,
              start: "left right-=10%", // Start when the step is 10% from the right edge
              end: "right left+=10%", // End when the step is 10% past the left edge
              scrub: true, // Smooth scrubbing
              toggleActions: "play none none reverse", // Play when entering, reverse when leaving
              markers: false // Set to true for debugging
            }
          });
          
          // Set initial state for all elements
          gsap.set([visual, title, description, icon, button], { opacity: 0 });
          
          // Immediate animation sequence with no delay
          stepTimeline
            .to(step, { opacity: 1, duration: 0.05 }, 0)
            .to(visual, { opacity: 1, duration: 0.1 }, 0)
            .to(title, { opacity: 1, duration: 0.1 }, 0)
            .to(description, { opacity: 1, duration: 0.1 }, 0)
            .to(icon, { opacity: 1, duration: 0.1 }, 0)
            .to(button, { opacity: 1, duration: 0.1 }, 0);
        });
      }
    }
    
    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [steps.length]);

  // Variants for Framer Motion animations
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 15, filter: "drop-shadow(0 0 8px #54BB74)" }
  };

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="h-screen bg-[#F2F0E6] text-[#2B2D2F] relative overflow-hidden flex flex-col"
    >
      {/* Detail Carousel Modal */}
      <AnimatePresence>
        {showCarousel && activeStep && (
          <DetailCarousel step={activeStep} onClose={closeCarousel} />
        )}
      </AnimatePresence>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0E6] to-[#E8E4D8] overflow-hidden">
        {/* Animated circles */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#54BB74]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-[#54BB74]/15 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#54BB74]/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Section header - will be pinned by GSAP */}
      <div className="text-center pb-2 px-4 relative z-20 bg-[#F2F0E6] mt-10">
        <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
      </div>
      
      {/* Scrollable content container */}
      <div className="flex-1 overflow-hidden relative z-10">
        {/* Horizontal scrolling container */}
        <div 
          ref={containerRef}
          className="flex space-x-12 px-4 transform scale-[0.8] origin-center relative"
          style={{ width: `${steps.length * 100}vw`, maxWidth: `${steps.length * 100}vw` }}
        >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.id}
              ref={el => stepsRef.current[index] = el}
              className="min-w-[100vw] h-[90vh] flex items-center justify-center rounded-2xl p-4 py-8 relative overflow-hidden"
            >
              {/* Background video */}
              <div className="absolute inset-0 bg-black/30 z-0 rounded-2xl overflow-hidden">
                <video 
                  className="absolute w-full h-full object-cover opacity-60"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={step.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"></div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl z-10 gap-6 step-content">
                {/* Visual side - Video showcase with animated frame */}
                <div className="lg:w-2/3 flex justify-center items-center step-visual order-2 lg:order-1">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#54BB74]/30">
                    {/* Simple border */}
                    <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-10"></div>
                    
                    {/* Simple video player with corner play/pause button */}
                    <div className="relative w-full h-full overflow-hidden">
                      <video 
                        className="w-full h-full object-cover"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        id={`video-${step.id}`}
                      >
                        <source src={step.video} type="video/mp4" />
                      </video>
                      
                      {/* Corner play/pause button */}
                      <motion.button 
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#54BB74] text-white flex items-center justify-center z-20"
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          const video = document.getElementById(`video-${step.id}`);
                          if (video) {
                            if (video.paused) {
                              video.play();
                              e.currentTarget.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
                            } else {
                              video.pause();
                              e.currentTarget.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                            }
                          }
                        }}
                      >
                        <FiPause size={20} />
                      </motion.button>
                    </div>
                    
                    {/* Floating badge */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-[#54BB74] text-white text-xs font-bold px-3 py-1 rounded-full z-20"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Demo Video
                    </motion.div>
                  </div>
                </div>
                
                {/* Content side - Storytelling approach */}
                <div className="lg:w-1/3 text-white order-1 lg:order-2">
                  {/* Step number with chapter indication */}
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#54BB74]/80 backdrop-blur-sm flex items-center justify-center text-white text-base font-bold">
                      {step.id}
                    </div>
                    <div className="ml-3 text-xs uppercase tracking-widest text-[#54BB74]/80 font-medium">
                      Chapter {step.id} of {steps.length}
                    </div>
                  </div>
                  
                  {/* Title with animated icon */}
                  <div className="flex items-center mb-3 step-title">
                    <motion.div
                      className="mr-3 text-[#54BB74] step-icon"
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.div variants={iconVariants}>
                        <Icon size={36} />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-4xl font-bold">{step.title}</h3>
                  </div>
                  
                  {/* Description - Main story point */}
                  <p className="text-xl text-white/90 mb-3 step-description">{step.description}</p>
                  
                  {/* Story narrative - More detailed explanation */}
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl mb-4 border border-white/10">
                    <p className="text-base text-white/80 italic">"{step.story}"</p>
                  </div>
                  
                  {/* Tip box */}
                  <div className="flex items-start mb-4">
                    <div className="text-[#54BB74] mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-xs">{step.tip}</p>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-[#54BB74] text-white rounded-full hover:bg-[#54BB74]/90 transition-colors text-base font-medium step-button"
                    onClick={() => handleLearnMore(step)}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
