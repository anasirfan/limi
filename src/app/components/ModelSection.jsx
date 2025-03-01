'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ModelSection = () => {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const containerRef = useRef(null);

  const texts = [
    {
      id: 1,
      number: "01",
      heading: "Participation",
      description: "Join tight-knit communities around your favorite creators, thoughtleaders, products, and experiences.",
      subtext: "Access, distribute and co-own what matters to you, while generating passive income through revenue sharing.",
      color: "#FF0066"
    },
    {
      id: 2,
      number: "02",
      heading: "Visualization",
      description: "Experience your space in stunning 3D detail before making any physical changes.",
      subtext: "Our advanced visualization tools help you make confident decisions about your space.",
      color: "#4CAF50"
    },
    {
      id: 3,
      number: "03",
      heading: "Customization",
      description: "Tailor every aspect of your space to match your unique style and needs.",
      subtext: "From colors to layouts, customize every detail to create your perfect environment.",
      color: "#2196F3"
    },
    {
      id: 4,
      number: "04",
      heading: "Realization",
      description: "Watch your vision come to life with our expert implementation support.",
      subtext: "We guide you through every step of turning your digital design into reality.",
      color: "#FFC107"
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const textElements = containerRef.current.querySelectorAll('.text-item');
      const indicators = containerRef.current.querySelectorAll('.scroll-indicator');
      const section = sectionRef.current;
      const blob = blobRef.current;

      // Set initial states
      gsap.set(textElements, { 
        opacity: 0, 
        y: 20,
        zIndex: 0,
        visibility: 'hidden'
      });
      gsap.set(textElements[0], { 
        opacity: 1, 
        y: 0,
        zIndex: 1,
        visibility: 'visible'
      });
      gsap.set(indicators, { backgroundColor: '#4a4a4a' });
      gsap.set(indicators[0], { backgroundColor: '#ffffff' });

      // Create scroll triggers for each text section transition
      texts.forEach((_, index) => {
        const startPosition = `${index * 400}vh`;
        const endPosition = `${(index + 1) * 400 - 10}vh`;
        
        ScrollTrigger.create({
          trigger: section,
          start: `${startPosition} top`,
          end: `${endPosition} top`,
          markers: false,
          onEnter: () => {
            // Hide all texts first
            gsap.set(textElements, { visibility: 'hidden', zIndex: 0 });
          
            // Show the current text
            gsap.set(textElements[index], { visibility: 'visible', zIndex: 1 });
          
            if (index > 0) {
              gsap.to(textElements[index], { opacity: 1, y: 0, duration: 0.3 });
              gsap.to(textElements[index - 1], { opacity: 0, y: -20, duration: 0.3 });
            } else {
              gsap.to(textElements[index], { opacity: 1, y: 0, duration: 0.3 });
            }
          
            // Update blob color
            gsap.to(blob, { attr: { fill: texts[index].color }, duration: 0.3 });
          
            // Update indicators
            gsap.to(indicators, { backgroundColor: '#4a4a4a', duration: 0.3 });
            gsap.to(indicators[index], { backgroundColor: '#ffffff', duration: 0.3 });
          },
          onEnterBack: () => {
            if (index === 0) return;
            
            // Hide all texts before showing the correct one
            gsap.set(textElements, { visibility: 'hidden', zIndex: 0 });
          
            // Show the previous text
            gsap.set(textElements[index - 1], { visibility: 'visible', zIndex: 1 });
          
            gsap.to(textElements[index], { opacity: 0, y: 20, duration: 0.3 });
            gsap.to(textElements[index - 1], { opacity: 1, y: 0, duration: 0.3 });
          
            // Update blob color
            gsap.to(blob, { attr: { fill: texts[index - 1].color }, duration: 0.3 });
          
            // Update indicators
            gsap.to(indicators, { backgroundColor: '#4a4a4a', duration: 0.3 });
            gsap.to(indicators[index - 1], { backgroundColor: '#ffffff', duration: 0.3 });
          }
        });
      });

      // Create a separate trigger for the last section
      ScrollTrigger.create({
        trigger: section,
        start: `${(texts.length - 1) * 400}vh top`,
        end: `${texts.length * 400}vh top`,
        markers: false,
        onEnter: () => {
          // Show the final section text
          gsap.set(textElements, { visibility: 'hidden', zIndex: 0 });
          gsap.set(textElements[texts.length - 1], { visibility: 'visible', zIndex: 1 });
          gsap.to(textElements[texts.length - 1], { opacity: 1, y: 0, duration: 0.3 });
          gsap.to(textElements[texts.length - 2], { opacity: 0, y: -20, duration: 0.3 });
          
          // Update blob color
          gsap.to(blob, { attr: { fill: texts[texts.length - 1].color }, duration: 0.3 });
          
          // Update indicators
          gsap.to(indicators, { backgroundColor: '#4a4a4a', duration: 0.3 });
          gsap.to(indicators[texts.length - 1], { backgroundColor: '#ffffff', duration: 0.3 });
        },
        onLeaveBack: () => {
          // Show the previous section text
          gsap.set(textElements, { visibility: 'hidden', zIndex: 0 });
          gsap.set(textElements[texts.length - 2], { visibility: 'visible', zIndex: 1 });
          gsap.to(textElements[texts.length - 1], { opacity: 0, y: 20, duration: 0.3 });
          gsap.to(textElements[texts.length - 2], { opacity: 1, y: 0, duration: 0.3 });
          
          // Update blob color
          gsap.to(blob, { attr: { fill: texts[texts.length - 2].color }, duration: 0.3 });
          
          // Update indicators
          gsap.to(indicators, { backgroundColor: '#4a4a4a', duration: 0.3 });
          gsap.to(indicators[texts.length - 2], { backgroundColor: '#ffffff', duration: 0.3 });
        }
      });

      // Pin the section for the total height of all sections
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `${texts.length * 400}vh top`,
        pin: true,
        pinSpacing: true,
        scrub: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#292929] h-screen flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto px-28">
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Left side - Blob/Model */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg 
              ref={blobRef}
              viewBox="0 0 200 200" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-md"
            >
              <path 
                fill="#FF0066" 
                d="M37.4,-58.9C49.8,-50.2,62.1,-42.1,67.9,-30.7C73.6,-19.2,72.8,-4.4,70.9,10.4C69.1,25.2,66.2,40,58.6,53.4C51.1,66.9,38.9,79,24.6,82.8C10.2,86.7,-6.3,82.3,-21,75.9C-35.7,69.6,-48.5,61.4,-58.9,50.4C-69.2,39.5,-77.1,25.9,-76.5,12.6C-75.8,-0.6,-66.6,-13.4,-60,-27.3C-53.5,-41.2,-49.6,-56.1,-40,-66.1C-30.5,-76.1,-15.2,-81.1,-1.4,-78.9C12.5,-76.8,25,-67.6,37.4,-58.9Z" 
                transform="translate(100 100)" 
              />
            </svg>
          </div>

          {/* Right side - Text carousel */}
          <div ref={containerRef} className="relative min-h-[300px]">
            <div className="relative">
              {texts.map((text, index) => (
                <div
                  key={text.id}
                  className={`text-item absolute top-0 left-0 w-full`}
                  style={{
                    zIndex: index === 0 ? 1 : 0,
                    visibility: index === 0 ? 'visible' : 'hidden'
                  }}
                >
                  <span className="text-[230px] font-amenti text-white opacity-20 leading-none block -mb-20">
                    {text.number}
                  </span>
                  <h3 className="text-white font-amenti text-[42px] mb-6 uppercase font-semibold">
                    {text.heading}
                  </h3>
                  <p className="text-white font-poppins text-[18px] leading-relaxed max-w-[80%] mb-4">
                    {text.description}
                  </p>
                  <p className="text-white font-poppins text-[18px] leading-relaxed max-w-[80%] opacity-80">
                    {text.subtext}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Custom vertical carousel indicators */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              {texts.map((_, index) => (
                <div
                  key={index}
                  className={`scroll-indicator w-1 h-16 rounded-full bg-[#4a4a4a] transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection; 