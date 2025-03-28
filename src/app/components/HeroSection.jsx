"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HeroSection() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionRef.current, { opacity: 0, scale: 0.9 });
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
        end: "bottom center",
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    });

    tl.to(headingRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.3,
    })
    .to(descriptionRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(buttonRef.current, { 
      opacity: 1, 
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });

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
        >
          <source src="/videos/BgVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">

        </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 hero-content relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="text-white self-end -mb-6 max-sm:-mb-12">
              <h1 
                ref={headingRef}
                className="text-3xl md:text-6xl max-sm:text-2xl font-bold mb-6"
              >
                From Standard to Smart
              </h1>
            </div>
            {/* Right Side - Description and CTA */}
            <div className="text-[#54bb74]/90">
              <p 
                ref={descriptionRef}
                className="hero-description text-lg max-sm:text-sm mb-8 leading-relaxed"
              >
                Experience the future of lighting with our innovative smart solutions. Our intelligent design seamlessly adapts to your needs, putting modular innovation and intuitive control at your fingertips. Join us in revolutionizing modern illumination technology and transform your space into something extraordinary.
              </p>
              <a 
                ref={buttonRef}
                href="#lighting-carousel"
                className="cta-button px-8 py-4 bg-[#292929] text-white rounded-full text-lg font-bold transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#54bb74]/30 hover:bg-[#292929]/10 focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:ring-opacity-50 inline-block"
              >
                Explore Smart Lighting
              </a>
            </div>
          </div>
        </div>

        {/* Logo at Bottom */}
        <div className="hero-logo mt-20 w-full max-w-5xl mx-auto px-4 relative z-20">
          <Image
            src="/images/svgLogos/__Primary_Logo_Black.svg"
            alt="Limi Logo"
            width={400}
            height={200}
            className="w-full h-auto invert opacity-80"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
