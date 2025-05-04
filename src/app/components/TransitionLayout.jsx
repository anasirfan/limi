"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function TransitionLayout({ children }) {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [barbaInitialized, setBarbaInitialized] = useState(false);

  // Create paper roll transition overlay
  useEffect(() => {
    // Safely check if we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Dynamically import Barba.js only on the client side
    const initBarba = async () => {
      try {
        const barbaModule = await import('@barba/core');
        const barba = barbaModule.default;
        
        // Create overlay elements for the paper roll effect
        if (!overlayRef.current) {
          // First check if an overlay already exists (from a previous mount)
          const existingOverlay = document.querySelector('.transition-overlay');
          
          if (existingOverlay) {
            // Use the existing overlay
            overlayRef.current = existingOverlay;
          } else {
            // Create a new overlay
            const overlay = document.createElement('div');
            overlay.className = 'transition-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '9999';
            overlay.style.pointerEvents = 'none';
            overlay.style.backgroundColor = '#292929'; // Using Limi's Charleston green
            document.body.appendChild(overlay);
            overlayRef.current = overlay;

            // Create strips for the paper roll effect with different colors
            const numStrips = 12;
            // Define a palette of colors to use for transitions
            // Using Limi's brand colors and complementary colors
            const colorPalette = [
              '#54BB74', // Limi's Eton green
              '#292929', // Limi's Charleston green
              '#3a8351', // Darker green
              '#6fd98d', // Lighter green
              '#1e1e1e', // Darker gray
              '#404040', // Medium gray
              '#54BB74', // Repeat Eton green
              '#292929', // Repeat Charleston green
              '#3a8351', // Repeat darker green
              '#6fd98d', // Repeat lighter green
              '#1e1e1e', // Repeat darker gray
              '#404040'  // Repeat medium gray
            ];
            
            for (let i = 0; i < numStrips; i++) {
              const strip = document.createElement('div');
              strip.className = 'transition-strip';
              strip.style.position = 'absolute';
              strip.style.top = '0';
              strip.style.width = `${100 / numStrips}%`;
              strip.style.height = '100%';
              strip.style.left = `${(i * 100) / numStrips}%`;
              strip.style.backgroundColor = colorPalette[i]; // Use color from palette
              strip.style.transformOrigin = 'center';
              strip.style.zIndex = '9999';
              overlay.appendChild(strip);
            }
          }
        }

        // Initial page load animation
        if (isInitialLoad && overlayRef.current) {
          const strips = overlayRef.current.querySelectorAll('.transition-strip');
          
          // Initial state - all strips closed
          gsap.set(strips, { scaleY: 1 });
          
          // Animate strips opening from center outward
          const tl = gsap.timeline({
            onComplete: () => {
              setIsInitialLoad(false);
            }
          });
          
          // Get center strips and outer strips
          const middleIndex = Math.floor(strips.length / 2);
          const sortedStrips = [...strips].sort((a, b) => {
            const indexA = Array.from(strips).indexOf(a);
            const indexB = Array.from(strips).indexOf(b);
            return Math.abs(indexA - middleIndex) - Math.abs(indexB - middleIndex);
          });
          
          // Open from center outward with colorful transitions
          tl.to(sortedStrips, {
            scaleY: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power2.inOut",
            onStart: function() {
              // Animate colors during the transition
              sortedStrips.forEach((strip, index) => {
                // Use colors that match Limi's brand identity
                const colors = ['#54BB74', '#292929', '#3a8351', '#6fd98d', '#1e1e1e', '#404040'];
                
                // Create a sequence of color changes
                const colorTl = gsap.timeline();
                colorTl.to(strip, {
                  backgroundColor: colors[index % colors.length],
                  duration: 0.4,
                  ease: "power1.inOut"
                });
                
                // Add a subtle pulse effect
                gsap.to(strip, {
                  opacity: 0.8,
                  repeat: 1,
                  yoyo: true,
                  duration: 0.3,
                  delay: index * 0.05
                });
              });
            }
          });
        }

        // Initialize Barba.js for page transitions
        if (!isInitialLoad && !barbaInitialized) {
          barba.init({
            transitions: [
              {
                name: "paper-roll-transition",
                async leave(data) {
                  // Close the paper roll (from top and bottom to center)
                  const strips = overlayRef.current.querySelectorAll('.transition-strip');
                  const tl = gsap.timeline();
                  
                  // Reset all strips to be open
                  gsap.set(strips, { scaleY: 0 });
                  
                  // Get center strips and outer strips for closing animation
                  const middleIndex = Math.floor(strips.length / 2);
                  const sortedStrips = [...strips].sort((a, b) => {
                    const indexA = Array.from(strips).indexOf(a);
                    const indexB = Array.from(strips).indexOf(b);
                    return Math.abs(indexB - middleIndex) - Math.abs(indexA - middleIndex);
                  });
                  
                  // Close from outer edges to center with color transitions
                  await tl.to(sortedStrips, {
                    scaleY: 1,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: "power2.inOut",
                    onStart: function() {
                      // Randomize strip colors on each transition
                      sortedStrips.forEach((strip, index) => {
                        // Alternate between Limi brand colors and variations
                        const colors = ['#54BB74', '#292929', '#3a8351', '#6fd98d', '#1e1e1e', '#404040'];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        gsap.to(strip, {
                          backgroundColor: randomColor,
                          duration: 0.3,
                          ease: "power1.inOut"
                        });
                      });
                    }
                  }).to(data.current.container, {
                    opacity: 0,
                    duration: 0.1
                  }, "-=0.3");
                },
                async enter(data) {
                  // Open the paper roll (from center to edges)
                  const strips = overlayRef.current.querySelectorAll('.transition-strip');
                  const tl = gsap.timeline();
                  
                  // Get center strips and outer strips for opening animation
                  const middleIndex = Math.floor(strips.length / 2);
                  const sortedStrips = [...strips].sort((a, b) => {
                    const indexA = Array.from(strips).indexOf(a);
                    const indexB = Array.from(strips).indexOf(b);
                    return Math.abs(indexA - middleIndex) - Math.abs(indexB - middleIndex);
                  });
                  
                  // Set initial state of new page
                  gsap.set(data.next.container, { opacity: 1 });
                  
                  // Open from center outward with color transitions
                  await tl.to(sortedStrips, {
                    scaleY: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power2.inOut",
                    onStart: function() {
                      // Create a colorful transition effect
                      sortedStrips.forEach((strip, index) => {
                        // Use vibrant colors that complement Limi's brand
                        const colors = ['#54BB74', '#292929', '#3a8351', '#6fd98d', '#1e1e1e', '#404040'];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        gsap.to(strip, {
                          backgroundColor: randomColor,
                          duration: 0.4,
                          delay: index * 0.03,
                          ease: "power1.inOut"
                        });
                      });
                    }
                  });
                }
              }
            ]
          });
          setBarbaInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing Barba.js:', error);
      }
    };

    initBarba();

    return () => {
      // Clean up overlay on unmount
      if (overlayRef.current && typeof document !== 'undefined') {
        try {
          // Check if the overlay is actually a child of document.body before removing
          if (overlayRef.current.parentNode === document.body) {
            document.body.removeChild(overlayRef.current);
          }
        } catch (error) {
          console.error('Error removing overlay:', error);
        }
      }
      
      // Clean up Barba.js
      if (barbaInitialized) {
        const cleanupBarba = async () => {
          try {
            const barbaModule = await import('@barba/core');
            const barba = barbaModule.default;
            barba.destroy();
          } catch (error) {
            console.error('Error destroying Barba.js:', error);
          }
        };
        cleanupBarba();
      }
    };
  }, [isInitialLoad, barbaInitialized]);

  return (
    <div ref={wrapperRef} data-barba="wrapper">
      <div data-barba="container" data-barba-namespace="home">
        {children}
      </div>
    </div>
  );
}
