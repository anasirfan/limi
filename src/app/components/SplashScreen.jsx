'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [svgContent, setSvgContent] = useState(null);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    // Fetch the SVG content
    fetch('/images/svgLogos/__Primary_Logo_Inverted.svg')
      .then(response => response.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, []);

  useEffect(() => {
    if (!svgContent || !svgContainerRef.current) return;

    // Create GSAP timeline for the animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire splash screen after animation completes
        gsap.to('.splash-screen', { 
          opacity: 0, 
          duration: 0.5, 
          delay: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            // Hide splash screen completely after animation
            setIsVisible(false);
            
            // Enable scrolling on the body
            document.body.style.overflow = 'auto';
          }
        });
      }
    });

    // Get all paths in the SVG
    const paths = svgContainerRef.current.querySelectorAll('path, rect, circle, polygon, polyline, line');
    
    // Set initial state - all paths invisible
    gsap.set(paths, { 
      opacity: 0,
      strokeDasharray: function(i, target) {
        // Get the total length of the path
        const length = target.getTotalLength ? target.getTotalLength() : 100;
        return length + " " + length;
      },
      strokeDashoffset: function(i, target) {
        // Get the total length of the path
        return target.getTotalLength ? target.getTotalLength() : 100;
      }
    });

    // Animate each path to draw
    tl.to(paths, { 
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power1.inOut"
    });

    // Add a slight scale animation at the end
    tl.to(svgContainerRef.current, { 
      scale: 1.05, 
      duration: 0.3, 
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1
    }, "-=0.2");

    // Disable scrolling while splash screen is visible
    document.body.style.overflow = 'hidden';

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [svgContent]);

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div className="splash-screen fixed inset-0 z-[100] flex items-center justify-center bg-[#292929]">
      <div 
        ref={svgContainerRef}
        className="splash-logo w-[80%] max-w-[600px] h-auto"
        dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : null}
      />
    </div>
  );
};

export default SplashScreen;
