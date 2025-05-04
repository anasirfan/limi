"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function InteractiveConfigurator() {
  const sectionRef = useRef(null);
  const configuratorRef = useRef(null);
  const modelRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const parallaxLayersRef = useRef([]);
  const stickyWrapperRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotationActive, setRotationActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState('white');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Feature list with icons
  const features = [
    {
      title: "Real-time Visualization",
      description: "See your design changes instantly with our 3D preview technology.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Customizable Options",
      description: "Choose from various styles, colors, sizes, and lighting effects.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.4 15C19.1277 15.8031 19.2583 16.6718 19.7601 17.37C20.2619 18.0281 21.0755 18.4446 21.9 18.5C21.9682 19.0628 21.8648 19.6344 21.6 20.15C21.3348 20.6681 20.9228 21.1082 20.4 21.425C19.8771 21.7393 19.2735 21.9157 18.6571 21.9366C18.0406 21.9576 17.4269 21.8224 16.885 21.545C16.2825 21.2394 15.7866 20.7518 15.4629 20.1487C15.1391 19.5456 15.0017 18.8566 15.07 18.175C15.1354 17.4954 15.4045 16.8534 15.8435 16.3259C16.2824 15.7985 16.8712 15.4091 17.53 15.2C16.9782 14.3279 16.1628 13.6746 15.2 13.35C14.2306 13.0187 13.1648 13.0515 12.2149 13.4427C11.265 13.8339 10.4969 14.5585 10.05 15.475C9.60333 16.3853 9.48448 17.4253 9.71685 18.4132C9.94922 19.4011 10.5209 20.2753 11.3289 20.8837C12.1368 21.4921 13.1283 21.7947 14.1421 21.7447C15.1559 21.6947 16.1129 21.2952 16.85 20.615" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 5.65685 13.6569 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12C5 13.6569 3.65685 15 2 15C0.343146 15 -1 13.6569 -1 12C-1 10.3431 0.343146 9 2 9C3.65685 9 5 10.3431 5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Choose from various styles, colors, sizes, and lighting effects."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27002 6.96002L12 12L20.73 6.96002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '3D Visualization',
      description: 'See your light from every angle with our interactive 3D model.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Real-time Preview',
      description: 'Instantly see how your choices affect the look and feel of your lighting solution.'
    },
    {
      title: "Easy to Share",
      description: "Share your designs with friends, family, or your interior designer with a single click.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];
  
  // Color options
  const colors = [
    { name: 'White', value: '#ffffff', selected: selectedColor === 'white' },
    { name: 'Black', value: '#333333', selected: selectedColor === 'black' },
    { name: 'Brass', value: '#d4a556', selected: selectedColor === 'brass' },
    { name: 'Chrome', value: '#c0c0c0', selected: selectedColor === 'chrome' },
    { name: 'Copper', value: '#b87333', selected: selectedColor === 'copper' }
  ];
  
  // Toggle rotation animation
  const toggleRotation = () => {
    setRotationActive(!rotationActive);
    
    if (modelRef.current) {
      if (rotationActive) {
        // Stop rotation
        gsap.killTweensOf(modelRef.current);
      } else {
        // Start rotation
        gsap.to(modelRef.current, {
          rotateY: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });
      }
    }
  };
  
  // Initialize slider functionality
  const initSlider = () => {
    if (!sliderRef.current || !sliderTrackRef.current) return;
    
    const slides = sliderTrackRef.current.children;
    const slideWidth = slides[0].offsetWidth;
    const slideCount = slides.length;
    
    // Set up click handlers for slider navigation
    const handleSlideChange = (index) => {
      setActiveSlide(index);
      gsap.to(sliderTrackRef.current, {
        x: -slideWidth * index,
        duration: 0.8,
        ease: 'power2.out'
      });
    };
    
    // Expose the slide change function to window for external access
    window.changeSlide = handleSlideChange;
    
    return handleSlideChange;
  };
  
  // Main effect for setting up animations and interactions
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Simulate loading delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    // Set up animation for the configurator container
    const section = sectionRef.current;
    const configurator = configuratorRef.current;
    const model = modelRef.current;
    const featuresSection = featuresSectionRef.current;
    const stickyWrapper = stickyWrapperRef.current;
    
    // Initialize the slider
    const handleSlideChange = initSlider();
    
    // Collection of all animations and ScrollTriggers for cleanup
    const animations = [];
    const scrollTriggers = [];
    
    if (section && configurator) {
      // Create the initial fade-in animation
      const fadeInTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
        }
      });
      
      // Add animations to the timeline
      fadeInTl.to(configurator, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      scrollTriggers.push(fadeInTl.scrollTrigger);
    }
    
    // Set up rotation animation if active
    let rotationAnimation;
    if (model && rotationActive) {
      rotationAnimation = gsap.to(model, {
        rotationY: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
      animations.push(rotationAnimation);
    }
    
    // Set up parallax effects for background elements
    if (parallaxLayersRef.current.length > 0) {
      parallaxLayersRef.current.forEach((layer, index) => {
        if (!layer) return;
        
        // Different parallax speeds based on layer index
        const speed = 0.1 + (index * 0.05);
        
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        
        parallaxTl.to(layer, {
          y: `${100 * speed}%`,
          ease: 'none'
        });
        
        scrollTriggers.push(parallaxTl.scrollTrigger);
      });
    }
    
    // Set up sticky behavior and scroll-based animations
    if (stickyWrapper && featuresSection) {
      const stickyTl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyWrapper,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: true,
          scrub: 0.5
        }
      });
      
      // Animate the 3D model as user scrolls
      if (model) {
        stickyTl.to(model, {
          rotateY: 180,
          scale: 1.2,
          ease: 'none'
        }, 0);
      }
      
      // Animate the progress indicator
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        stickyTl.to(progressBar, {
          width: '100%',
          ease: 'none'
        }, 0);
      }
      
      // Trigger step changes based on scroll position
      stickyTl.call(() => setCurrentStep(2), [], 0.25);
      stickyTl.call(() => setCurrentStep(3), [], 0.5);
      stickyTl.call(() => setCurrentStep(4), [], 0.75);
      
      scrollTriggers.push(stickyTl.scrollTrigger);
    }
    
    // Set up on-scroll slider effects
    if (sliderRef.current && sliderTrackRef.current) {
      const slides = sliderTrackRef.current.children;
      const slideCount = slides.length;
      
      // Create scroll-triggered slider animation
      const sliderTl = gsap.timeline({
        scrollTrigger: {
          trigger: sliderRef.current,
          start: 'top center',
          end: `+=${slideCount * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate which slide should be active based on scroll progress
            const slideIndex = Math.min(
              Math.floor(self.progress * slideCount),
              slideCount - 1
            );
            if (slideIndex !== activeSlide) {
              setActiveSlide(slideIndex);
            }
          }
        }
      });
      
      // Animate the slider track based on scroll position
      sliderTl.to(sliderTrackRef.current, {
        x: () => -(sliderTrackRef.current.offsetWidth - sliderRef.current.offsetWidth),
        ease: 'none'
      });
      
      scrollTriggers.push(sliderTl.scrollTrigger);
    }
    
    // Clean up function
    return () => {
      clearTimeout(loadTimer);
      
      // Kill all animations
      animations.forEach(anim => anim.kill());
      
      // Kill all ScrollTriggers
      scrollTriggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
      
      // Clean up any remaining ScrollTriggers that might be associated with this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section ||
            trigger.vars.trigger === stickyWrapper ||
            trigger.vars.trigger === sliderRef.current ||
            trigger.vars.trigger === featuresSection) {
          trigger.kill();
        }
      });
      
      // Remove the window function
      delete window.changeSlide;
    };
  }, [rotationActive, activeSlide]);

  return (
    <section 
      id="interactive-configurator" 
      ref={sectionRef}
      className="min-h-screen bg-[#1e1e1e] text-white py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {/* Parallax layer 1 */}
        <div 
          ref={el => parallaxLayersRef.current[0] = el} 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#54BB74] blur-3xl"
        ></div>
        
        {/* Parallax layer 2 */}
        <div 
          ref={el => parallaxLayersRef.current[1] = el}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#54BB74] blur-3xl"
        ></div>
        
        {/* Parallax layer 3 - floating particles */}
        <div 
          ref={el => parallaxLayersRef.current[2] = el}
          className="absolute inset-0"
        >
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-[#54BB74] opacity-20"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${Math.random() * 5 + 2}px)`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        {/* Section header with animation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Interactive</span>{' '}
            <span className="inline-block text-[#54BB74] hover:scale-105 transition-transform duration-300">3D</span>{' '}
            <span className="inline-block hover:scale-105 transition-transform duration-300">Configurator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeIn animation-delay-300">
            Try out different designs, colors, and configurations in real-time. Create your perfect lighting solution with our powerful customization tools.
          </p>
        </div>
        
        {/* Sticky wrapper for scroll animations */}
        <div ref={stickyWrapperRef} className="relative min-h-[150vh]">
          {/* Progress bar that fills as user scrolls */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-10">
            <div className="progress-bar h-full bg-[#54BB74] w-0"></div>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left side: Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Powerful Customization Tools</h3>
            
            {/* Feature list */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-[#54BB74]/10 rounded-lg flex items-center justify-center mr-4 text-[#54BB74]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Steps indicator */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex justify-between mb-4">
                <h4 className="text-lg font-medium">Configuration Steps</h4>
                <span className="text-[#54BB74] font-medium">Step {currentStep}/4</span>
              </div>
              
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#54BB74] transition-all duration-300"
                  style={{ width: `${currentStep * 25}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Style</span>
                <span>Color</span>
                <span>Size</span>
                <span>Lighting</span>
              </div>
            </div>
            
            {/* Launch CTA */}
            <div className="mt-8">
              <Link 
                href="/configurator" 
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#54BB74] text-white rounded-lg hover:bg-[#3a8351] transition-colors text-lg font-medium"
              >
                <span>Launch Full Configurator</span>
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p className="text-center text-gray-400 mt-3 text-sm">No account required. Start designing in seconds.</p>
            </div>
          </div>
          
          {/* Right side: 3D Preview */}
          <div 
            ref={configuratorRef}
            className="bg-[#292929] rounded-xl overflow-hidden shadow-2xl opacity-0 transform translate-y-10 relative"
            style={{ height: '500px', minHeight: '500px' }}
          >
            {/* Loading state */}
            {!isLoaded && isVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#292929] z-10">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#54BB74] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                  <p className="text-lg">Loading 3D preview...</p>
                </div>
              </div>
            )}
            
            {/* 3D Preview container */}
            <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
              {/* Drag to rotate hint */}
              {isLoaded && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm flex items-center z-10 animate-fadeOut">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 15L19 19M19 19V15M19 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L5 5M5 5V9M5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Drag to rotate</span>
                </div>
              )}
              
              {/* 3D model placeholder */}
              <div ref={modelRef} className="relative w-64 h-64 transform-gpu">
                {/* Light fixture */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#333] rounded-t-lg"></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-[#444]"></div>
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-[#333] flex items-center justify-center overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-[#54BB74] animate-pulse opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a] opacity-30"></div>
                </div>
                
                {/* Light effect */}
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#54BB74] rounded-full opacity-10 blur-xl animate-pulse"></div>
              </div>
              
              {/* Controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex justify-between items-center">
                  {/* Color swatches */}
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button 
                        key={color.name}
                        className={`w-8 h-8 rounded-full border-2 ${color.selected ? 'border-[#54BB74]' : 'border-transparent hover:border-gray-400'} transition-colors`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        onClick={() => setSelectedColor(color.name.toLowerCase())}
                      />
                    ))}
                  </div>
                  
                  {/* Camera controls */}
                  <div className="flex space-x-2">
                    <button 
                      className={`w-10 h-10 ${rotationActive ? 'bg-[#54BB74]' : 'bg-[#333]'} rounded-full flex items-center justify-center hover:bg-[#444] transition-colors`}
                      onClick={toggleRotation}
                      title={rotationActive ? "Stop rotation" : "Start rotation"}
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                        <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="white" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button 
                      className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center hover:bg-[#444] transition-colors"
                      onClick={() => setCurrentStep(prev => Math.min(prev + 1, 4))}
                      title="Next step"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          {/* On-scroll slider */}
          <div ref={sliderRef} className="relative w-full overflow-hidden my-16 h-[400px]">
            <div ref={sliderTrackRef} className="flex transition-transform duration-500 h-full">
              {/* Slide 1: Styles */}
              <div className="min-w-full px-6 flex flex-col items-center justify-center">
                <div className="bg-[#292929] rounded-xl p-8 max-w-2xl w-full">
                  <div className="w-16 h-16 bg-[#54BB74]/10 rounded-full flex items-center justify-center mb-6 text-[#54BB74]">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                      <path d="M20 7L12 3L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 7L12 11L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 11L12 15L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 15L12 19L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Choose Your Style</h3>
                  <p className="text-gray-300 mb-6">Select from pendant, wall, table, or floor lighting options to match your space perfectly.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Pendant', 'Wall', 'Table', 'Floor'].map(style => (
                      <button 
                        key={style}
                        className={`p-3 rounded-lg border ${style === 'Pendant' ? 'border-[#54BB74] bg-[#54BB74]/10' : 'border-gray-600 hover:border-gray-400'} transition-colors`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Slide 2: Colors */}
              <div className="min-w-full px-6 flex flex-col items-center justify-center">
                <div className="bg-[#292929] rounded-xl p-8 max-w-2xl w-full">
                  <div className="w-16 h-16 bg-[#54BB74]/10 rounded-full flex items-center justify-center mb-6 text-[#54BB74]">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Select Your Color</h3>
                  <p className="text-gray-300 mb-6">Choose the perfect finish to complement your interior design.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {colors.map(color => (
                      <button 
                        key={color.name}
                        className={`w-16 h-16 rounded-full border-4 ${color.selected ? 'border-[#54BB74]' : 'border-transparent hover:border-gray-400'} transition-colors flex flex-col items-center justify-center`}
                        style={{ backgroundColor: color.value }}
                      >
                        <span className={`text-xs mt-20 ${color.name === 'White' ? 'text-black' : 'text-white'}`}>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Slide 3: Size */}
              <div className="min-w-full px-6 flex flex-col items-center justify-center">
                <div className="bg-[#292929] rounded-xl p-8 max-w-2xl w-full">
                  <div className="w-16 h-16 bg-[#54BB74]/10 rounded-full flex items-center justify-center mb-6 text-[#54BB74]">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                      <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Choose Your Size</h3>
                  <p className="text-gray-300 mb-6">Find the perfect dimensions for your space.</p>
                  <div className="flex justify-center gap-6">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button 
                        key={size}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${size === 'M' ? 'bg-[#54BB74] text-white' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slider navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0, 1, 2].map(index => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-[#54BB74]' : 'bg-gray-600'} transition-colors`}
                  onClick={() => window.changeSlide && window.changeSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#292929] rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#54BB74]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#54BB74]">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M20 7L12 3L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 7L12 11L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 11L12 15L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 15L12 19L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Multiple Styles</h3>
              <p className="text-gray-400">Choose from pendant, wall, table, and floor light styles.</p>
            </div>
            
            <div className="bg-[#292929] rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#54BB74]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#54BB74]">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Save & Share</h3>
              <p className="text-gray-400">Save your designs and share them with friends and family.</p>
            </div>
            
            <div className="bg-[#292929] rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#54BB74]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#54BB74]">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Instant Preview</h3>
              <p className="text-gray-400">See changes in real-time as you customize your light.</p>
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Ready to design your perfect light?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Our full configurator gives you complete control over every aspect of your lighting solution.</p>
            <Link 
              href="/configurator" 
              className="inline-block px-8 py-4 bg-[#54BB74] text-white rounded-lg hover:bg-[#3a8351] transition-colors text-lg font-medium"
            >
              Launch Full Configurator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
