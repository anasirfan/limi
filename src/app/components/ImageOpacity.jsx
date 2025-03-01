"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageOpacity = () => {
  const containerRef = useRef(null);
  const lightOnRef = useRef(null);
  const lightOffRef = useRef(null);

  useEffect(() => {
    const texts = document.querySelectorAll('.text-section');
    const totalSections = texts.length || 4;

    // Initial setup
    gsap.set(lightOnRef.current, {
      opacity: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    });

    gsap.set(lightOffRef.current, {
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    });

    // Create timeline for opacity animation
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: `${totalSections * 400}vh top`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log("Opacity Progress:", progress.toFixed(2));
          
          // Animate opacity
          gsap.to(lightOnRef.current, {
            opacity: 1 - progress,
            duration: 0,
          });
          
          gsap.to(lightOffRef.current, {
            opacity: progress,
            duration: 0,
          });
        }
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px]"
      id="image-section"
    >
      <img 
        ref={lightOnRef}
        src="/test.png" 
        alt="Light On"
        className="object-cover"
      />
      <img 
        ref={lightOffRef}
        src="/test1.png" 
        alt="Light Off"
        className="object-cover"
      />
    </div>
  );
};

export default ImageOpacity;
