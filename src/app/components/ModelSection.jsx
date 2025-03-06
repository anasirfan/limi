'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import ModelTransition from './ModelTransition';
import ImageOpacity from './ImageOpacity';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ModelSection = () => {
  const sectionRef = useRef(null);

  const containerRef = useRef(null);

  const texts = [
    {
      id: 1,
      number: "01",
      heading: "Placement",
      description: "Begin with a pendant positioned on the ceiling, setting the foundation for transformation.",
      subtext: "This marks the starting point of an evolving lighting experience.",
      color: "#54bb74"
    },
    {
      id: 2,
      number: "02",
      heading: "Repositioning",
      description: "The pendant transitions from the ceiling to a lamp, adapting to a new function.",
      subtext: "A shift in placement opens up creative possibilities.",
      color: "#93cfa2"
    },
    {
      id: 3,
      number: "03",
      heading: "Replacement",
      description: "A new pendant takes its place on the ceiling, introducing a fresh aesthetic.",
      subtext: "Lighting evolves as new elements are introduced.",
      color: "#54bb74"
    },
    {
      id: 4,
      number: "04",
      heading: "Adaptation",
      description: "The new pendant moves to the wall while the previous one transitions from the lamp.",
      subtext: "Dynamic placements create an ever-changing ambiance.",
      color: "#93cfa2"
    },
    {
      id: 5,
      number: "05",
      heading: "Restoration",
      description: "The previous pendant returns to the ceiling, completing the transformation cycle.",
      subtext: "A seamless return to the original placement, ready for the next cycle.",
      color: "#54bb74"
    },
    {
      id: 6,
      number: "06",
      heading: "Continuity",
      description: "The cycle repeats, ensuring a continuous loop of lighting evolution.",
      subtext: "Endless adaptability for a dynamic and immersive space.",
      color: "#93cfa2"
    }
  ];
  

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const textElements = containerRef.current.querySelectorAll('.text-item');
      const indicators = containerRef.current.querySelectorAll('.scroll-indicator');
      const section = sectionRef.current;
     

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
      gsap.set(indicators[0], { backgroundColor: '#54bb74' });

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
          
          
            // Update indicators
            gsap.to(indicators, { backgroundColor: '#4a4a4a', duration: 0.3 });
            gsap.to(indicators[index], { backgroundColor: '#54bb74', duration: 0.3 });
          },
          onEnterBack: () => {
            if (index === 0) return;
            
            // Hide all texts before showing the correct one
            gsap.set(textElements, { visibility: 'hidden', zIndex: 0 });
          
            // Show the previous text
            gsap.set(textElements[index - 1], { visibility: 'visible', zIndex: 1 });
          
            gsap.to(textElements[index], { opacity: 0, y: 20, duration: 0.3 });
            gsap.to(textElements[index - 1], { opacity: 1, y: 0, duration: 0.3 });
          
          
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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Model */}
          <div 
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] flex items-center justify-center rounded-xl overflow-hidden"
            style={{
              background: '#1a1a1a',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* <ModelTransition /> */}
            <ImageOpacity />
          </div>

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
                 <span className="text-[120px] md:text-[180px] lg:text-[230px] font-['Amenti'] text-[#54bb74] opacity-20 leading-none block -mb-10 md:-mb-20">
  {text.number}
</span>
<h3 className="text-[#f3ebe2] font-['Amenti'] text-[28px] md:text-[36px] lg:text-[42px] mb-4 md:mb-6 uppercase font-bold">
  {text.heading}
</h3>
<p className="text-[#f3ebe2] font-['Poppins'] text-[16px] md:text-[18px] leading-relaxed max-w-full md:max-w-[90%] lg:max-w-[80%] mb-2 md:mb-4">
  {text.description}
</p>
<p className="text-[#93cfa2] font-['Poppins'] text-[16px] md:text-[18px] leading-relaxed max-w-full md:max-w-[90%] lg:max-w-[80%] opacity-80">
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
                  className={`scroll-indicator w-1 h-8 md:h-12 lg:h-16 rounded-full bg-[#4a4a4a] transition-colors duration-300`}
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