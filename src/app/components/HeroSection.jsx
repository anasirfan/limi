"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const taglineRef = useRef(null);
  const subheadingRef = useRef(null);
  const scrollCueRef = useRef(null);
  const overlayRef = useRef(null);
  const interactiveLayerRef = useRef(null);
  const lightParticlesRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const particlesRef = useRef([]);
  const particleCount = 20;

  // Handle mouse movement for interactive effects
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    
    // Apply interactive light effect
    if (interactiveLayerRef.current) {
      gsap.to(interactiveLayerRef.current, {
        backgroundPosition: `${x * 100}% ${y * 100}%`,
        duration: 0.5,
        ease: "power1.out"
      });
    }
  };

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

  // Create particles for light effect
  useEffect(() => {
    if (!lightParticlesRef.current || isMobile) return;

    // Clear any existing particles
    while (lightParticlesRef.current.firstChild) {
      lightParticlesRef.current.removeChild(lightParticlesRef.current.firstChild);
    }

    // Create new particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-white opacity-0';
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      lightParticlesRef.current.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animate particles
    particlesRef.current.forEach((particle) => {
      gsap.set(particle, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        opacity: 0
      });

      animateParticle(particle);
    });

    return () => {
      // Clear particles on cleanup
      if (lightParticlesRef.current) {
        while (lightParticlesRef.current.firstChild) {
          lightParticlesRef.current.removeChild(lightParticlesRef.current.firstChild);
        }
      }
    };
  }, [isMobile]);

  // Animate individual particles
  const animateParticle = (particle) => {
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    gsap.to(particle, {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: () => Math.random() * 0.6 + 0.1,
      duration,
      delay,
      ease: "power1.inOut",
      onComplete: () => animateParticle(particle)
    });
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Play video
    if (videoRef.current) {
      try {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }

    // Create custom text animation with character spans
    const createCharacterSpans = (element, className) => {
      if (!element) return [];
      
      const text = element.innerText;
      const chars = [];
      
      // Clear the element
      element.innerHTML = '';
      
      // Create spans for each character
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = className;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'color 0.3s, transform 0.3s';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        
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
            color: 'white',
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)',
            overwrite: true
          });
        });
        
        element.appendChild(span);
        chars.push(span);
      }
      
      return chars;
    };
    
    // Create character spans for animations
    const taglineChars = createCharacterSpans(taglineRef.current, 'tagline-char');
    const subheadingChars = createCharacterSpans(subheadingRef.current, 'subheading-char');
    
    // Set initial states
    gsap.set(scrollCueRef.current, { opacity: 0, y: -20 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(taglineChars, { 
      opacity: 0, 
      y: 80,
      rotationX: -120
    });
    gsap.set(subheadingChars, { 
      opacity: 0, 
      y: 30 
    });

    // Listen for splash screen completion event
    const handleSplashComplete = () => {
      // Start animations immediately after splash screen completes
      startAnimations();
    };

    // Add event listener for splash screen completion
    window.addEventListener('splashComplete', handleSplashComplete);
    
    // If splash screen is already complete or doesn't exist, start animations immediately
    if (!document.querySelector('.splash-screen') || 
        document.querySelector('.splash-screen.completed')) {
      startAnimations();
    }
    
    // Main animation function
    function startAnimations() {
      // Main animation timeline
      const mainTl = gsap.timeline();
      
      // Fade in overlay
      mainTl.to(overlayRef.current, {
        opacity: 0.4,
        duration: 1,
        ease: "power2.out"
      })
      
      // Piano-key-like bouncing animation for tagline characters
      .staggerFromTo(taglineChars, 
        0.8, 
        { 
          opacity: 0, 
          y: 80, // Increased starting position for more dramatic effect
          rotationX: -120 // More extreme rotation
        }, 
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          ease: "elastic.out(0.6, 0.3)", // More pronounced elastic easing
          onComplete: function(i) {
            // Make sure taglineChars[i] exists before animating it
            if (taglineChars && taglineChars[i]) {
              // Add a more pronounced bounce after the initial animation
              gsap.to(taglineChars[i], {
                y: -20, // More dramatic bounce height
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                delay: 0.05 // Small delay for better visual effect
              });
            }
          },
          onCompleteParams: ["$i"] // Pass the index to onComplete
        }, 
        0.07, // Slightly increased stagger time for more noticeable effect
        "-=0.7" // Start earlier for faster overall animation
      )
      
      // Animate subheading characters
      .staggerTo(subheadingChars, 
        0.5, 
        {
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }, 
        0.02, 
        "-=0.3"
      )
      // Fade in scroll cue
      .to(scrollCueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Scroll cue bounce animation
      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Parallax effect on scroll
      gsap.to(videoRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false
        }
      });
    }

    // Clean up function
    return () => {
      // Remove event listener
      window.removeEventListener('splashComplete', handleSplashComplete);
      
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up video element
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center HeroSection"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fullscreen video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-16 left-0 w-full h-full object-cover z-0 transition-all duration-700"
        src={"/videos/limi-web.m4v"}
      ></video>
      
      {/* Dark overlay for better text readability */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-40 z-10"
      ></div>
      
      {/* Interactive light layer */}
      {/* <div 
        ref={interactiveLayerRef}
        className="absolute inset-0 bg-radial-light opacity-30 z-10 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(84, 187, 116, 0.15), transparent)`,
          opacity: isHovering ? 0.6 : 0.3
        }}
      ></div>
       */}
      {/* Light particles container */}
      <div 
        ref={lightParticlesRef}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      ></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 
          ref={taglineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight cursor-default"
        >
          Lighting Made Limitless
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto font-light"
        >
          Smart, beautiful, and yours to shape.
        </p>
        
        {/* Interactive buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12 opacity-0 animate-fadeIn" style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>
          <button 
            className="px-6 py-3 bg-transparent border-2 border-[#54BB74] text-white rounded-full hover:bg-[#54BB74] hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none"
            onClick={() => document.getElementById('product-showcase').scrollIntoView({ behavior: 'smooth' })}
          >
            Discover Products
          </button>
          <button 
            className="px-6 py-3 bg-[#54BB74] text-white rounded-full hover:bg-[#3a8351] transition-all duration-300 transform hover:scale-105 focus:outline-none"
            onClick={() => window.open('#', '_blank')}
          >
            Watch Demo
          </button>
        </div>
      </div>
      
      {/* Scroll cue */}
      <div 
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => {
          document.getElementById('product-showcase').scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white hover:text-[#54BB74] transition-colors duration-300"
        >
          <path 
            d="M12 4V20M12 20L6 14M12 20L18 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Add custom styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .bg-radial-light {
          transition: background 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
