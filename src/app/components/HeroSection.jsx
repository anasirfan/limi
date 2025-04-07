"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HeroSection() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const descriptionLinesRef = useRef([]);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [descriptionLines, setDescriptionLines] = useState([
    "Lighting should adapt to you, not the other way around. With <span class='highlight'>seamless control</span> and <span class='highlight'>modular design</span>, we make it effortless to transform your space—<span class='highlight'>no electrician needed</span>."
  ]);

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionLinesRef.current, { 
      opacity: 0,
      y: 20,
    });
    gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });

    // Delay video playback
    if (videoRef.current) {
      // Pause the video initially
      videoRef.current.pause();
      
      // Set the current time to 0 to ensure it starts from the beginning
      videoRef.current.currentTime = 0;
      
      // Start the video after a delay (adjust the delay as needed)
      setTimeout(() => {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      }, 2000); // 2-second delay, adjust based on your splash screen duration
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Extend the scroll distance to 200% of the section height
        scrub: 0.5, // Smoother scrubbing with slight delay
        pin: true,
        pinSpacing: true,
        markers: false,
      }
    });

    tl.to(headingRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.15, // Reduced duration to happen earlier in the scroll
    })
    // Animate each line of text sequentially
    .to(descriptionLinesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      stagger: 0.08,
      ease: "power2.out"
    }, "+=0.05") // Small delay after heading animation
    .to({}, {duration: 0.3}) // Add pause for reading
    .to(buttonRef.current, { 
      opacity: 1, 
      scale: 1,
      duration: 0.15,
      ease: "back.out(1.7)"
    }, "+=0.1"); // Delay button appearance to give more reading time

    return () => {
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
    <>
      <div
        id="hero"
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          src={isMobile ? "/videos/BgMobile.mp4" : "/videos/BgVideo.mp4"}
        ></video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">

        </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 hero-content relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-sm:mt-24 items-center">
            {/* Left Side - Heading */}
            <div className="text-white self-end max-md:mt-16 -mb-6 max-sm:-mb-12">
              <h1 
                ref={headingRef}
                className="text-3xl md:text-6xl max-sm:text-4xl font-bold mb-32 max-md:mb-6 max-md:text-center"
              >
                From Standard <br className="md:block hidden"></br>to Smart
              </h1>
            </div>
            {/* Right Side - Description and CTA */}
            <div className="text-white max-md:text-center">
              <div 
                ref={descriptionRef}
                className="hero-description font-[Poppins] mt-40 max-sm:mt-0 text-lg max-sm:text-base mb-8 leading-relaxed max-w-md max-md:mx-auto"
              >
                {descriptionLines.map((line, index) => (
                  <p 
                    key={index}
                    ref={el => descriptionLinesRef.current[index] = el}
                    className="typing-line mb-3"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>
              <style jsx>{`
                .typing-line {
                  overflow: hidden;
                  padding: 12px 18px;
                  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                  position: relative;
                  margin-bottom: 10px;
                  text-align: justify;
                  
                }
                .typing-line::after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;

                  z-index: -1;
                  border-radius: 4px;
                }
                @media (max-width: 768px) {
                  .typing-line {
                    margin-bottom: 12px;
                    padding: 4px 10px;
                  }
                 
                }
                :global(.highlight) {
                  color: #96c8a2;
                  font-weight: 600;
                  text-shadow: 0 0 8px rgba(84, 187, 116, 0.3);
                }
              `}</style>
              <a 
                ref={buttonRef}
                href="#lighting-carousel"
                className="cta-button px-6 py-3 md:px-8 md:py-4 bg-[#306b43] text-white rounded-full text-base md:text-lg font-bold transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#54bb74]/50 hover:bg-[#93CFA2] focus:outline-none focus:ring-2 focus:ring-[#292929] focus:ring-opacity-50 inline-block"
              >
                Explore Smart Lighting
              </a>
            </div>
          </div>
        </div>

        {/* Logo at Bottom */}
        <div className="hero-logo mt-60 max-md:mt-40 w-full max-w-5xl mx-auto px-4 relative z-20">
          <Image
            src="/images/svgLogos/__Primary_Logo_Black.svg"
            alt="Limi Logo"
            width={400}
            height={200}
            className="w-[50%] max-sm:w-[70%] mx-auto h-auto invert opacity-90"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
