"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import OnboardingSection from './OnboardingSection';
import ConfiguratorHighlights from './configurator/ConfiguratorHighlights';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function InteractiveConfigurator() {
  const sectionRef = useRef(null);
  const parallaxLayersRef = useRef([]);
  
  // Initialize animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set up parallax effects for background elements
    if (parallaxLayersRef.current.length > 0) {
      parallaxLayersRef.current.forEach((layer, index) => {
        if (!layer) return;
        
        // Different parallax speeds based on layer index
        const speed = 0.1 + (index * 0.05);
        
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        
        parallaxTl.to(layer, {
          y: `${100 * speed}%`,
          ease: 'none'
        });
      });
    }
    
    // Clean up function
    return () => {
      // Clean up any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id="configurator" 
      ref={sectionRef} 
      className="relative py-16 bg-[#F2F0E6] overflow-hidden InteractiveConfigurator"
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {/* Parallax layer 1 */}
        <div 
          ref={el => parallaxLayersRef.current[0] = el} 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#50C878] blur-3xl"
        ></div>
        
        {/* Parallax layer 2 */}
        <div 
          ref={el => parallaxLayersRef.current[1] = el}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#50C878] blur-3xl"
        ></div>
        
        {/* Parallax layer 3 - floating particles */}
        <div 
          ref={el => parallaxLayersRef.current[2] = el}
          className="absolute inset-0"
        >
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-[#50C878] opacity-20"
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
      
      <div className="w-full">
        {/* Section header with animation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[#50C878] font-bold mb-4 animate-fadeIn">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Interactive</span>{' '}
            <span className="inline-block hover:scale-105 transition-transform duration-300">3D</span>{' '}
            <span className="inline-block hover:scale-105 transition-transform duration-300">Configurator</span>
          </h2>
          <p className="text-xl text-[#2B2D2F] opacity-75 max-w-3xl mx-auto animate-fadeIn animation-delay-300">
            Try out different designs, colors, and configurations in real-time. Create your perfect lighting solution with our powerful customization tools.
          </p>
        </div>
        
        {/* Replace the old structure with our new OnboardingSection component */}
        <OnboardingSection />
        
        {/* Feature highlights */}
        <ConfiguratorHighlights />
        
        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl text-[#50C878] font-bold mb-4">Ready to design your perfect light?</h3>
          <p className="text-[#2B2D2F] opacity-75 mb-6 max-w-2xl mx-auto">Our full configurator gives you complete control over every aspect of your lighting solution.</p>
          <div className="relative z-50">
            <Link 
              href="/configurator" 
              className="inline-block px-8 py-4 bg-[#50C878] text-white rounded-lg hover:bg-[#3da861] transition-colors text-lg font-medium relative z-50"
              style={{
                position: 'relative',
                zIndex: 50,
                pointerEvents: 'auto'
              }}
              onClick={(e) => {
                console.log('Link clicked');
                e.stopPropagation();
              }}
            >
              Launch Full Configurator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}