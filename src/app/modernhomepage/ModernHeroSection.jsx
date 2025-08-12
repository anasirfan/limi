"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

function ModernHeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentRender, setCurrentRender] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const renderTypes = [
    { name: "Ceiling", image: "/images/configrenders/ceiling.jpg" },
    { name: "Floor", image: "/images/configrenders/floor.jpg" },
    { name: "Wall", image: "/images/configrenders/wall.jpg" }
  ];

  const productImages = [
    "/images/products/product1/1.jpg",
    "/images/products/product1/2.jpg",
    "/images/products/product1/3.jpg"
  ];

  const navigationLinks = [
    { href: '/configurator', label: 'Customize Yourself' },
    { href: '/portal', label: 'Your Space' },
    { href: '/about-us', label: 'What is LIMI?' },
    { href: '/contact-us', label: "Let's Talk" },
    { href: '/collaborate', label: "Let's Grow Together" }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Initial animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate left column content
    if (leftColumnRef.current) {
      tl.fromTo(leftColumnRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }

    // Animate right column products
    if (rightColumnRef.current) {
      tl.fromTo(rightColumnRef.current.children,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }

    // Video fade in
    if (videoRef.current) {
      tl.fromTo(videoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRender((prev) => (prev + 1) % renderTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle video optimization
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';

    const playVideo = () => {
      video.play().catch(console.error);
    };

    video.addEventListener('loadeddata', playVideo);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white overflow-hidden"
    >
      {/* Premium SVG Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-background.svg"
          alt="Hero Background"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
      {/* Integrated Header and Hero Content */}
      <div className="relative z-10 w-full h-full">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 py-6">
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/svgLogos/__Logo_Icon_Colored.svg"
                  alt="LIMI Logo"
                  width={50}
                  height={50}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#292929] hover:text-[#54bb74] transition-colors duration-300 font-medium text-sm relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#54bb74] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <div className="w-5 h-0.5 bg-[#292929] mb-1"></div>
                <div className="w-5 h-0.5 bg-[#292929] mb-1"></div>
                <div className="w-5 h-0.5 bg-[#292929]"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="container mx-auto px-8 pt-24 pb-12 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full min-h-[calc(100vh-6rem)]">
          
          {/* Left Column - Content */}
          <div ref={leftColumnRef} className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-[#292929] leading-tight">
                Lighting Made
                <br />
                <span className="text-[#54bb74]">Limitless</span>
              </h1>
              
              <p className="text-lg text-[#292929]/80 max-w-md leading-relaxed">
                Smart, beautiful, and yours to shape. Experience the future of intelligent lighting with modular design and AI-powered automation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/configurator"
                className="px-8 py-3 bg-[#54bb74] text-white rounded-full hover:bg-[#3a8351] transition-all duration-300 text-center font-medium"
              >
                Customize It
              </Link>
              <Link
                href="/products"
                className="px-8 py-3 border-2 border-[#54bb74] text-[#54bb74] rounded-full hover:bg-[#54bb74] hover:text-white transition-all duration-300 text-center font-medium"
              >
                Discover Products
              </Link>
            </div>

            {/* Small Description and Carousel */}
            <div className="mt-12 space-y-4">
              <p className="text-sm text-[#292929]/60 uppercase tracking-wider">
                Available Configurations
              </p>
              
              <div ref={carouselRef} className="flex space-x-4">
                {renderTypes.map((render, index) => (
                  <div
                    key={render.name}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      currentRender === index ? 'ring-2 ring-[#54bb74] scale-105' : 'opacity-70'
                    }`}
                    onClick={() => setCurrentRender(index)}
                  >
                    <Image
                      src={render.image}
                      alt={render.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-1 left-1 text-xs text-white font-medium">
                      {render.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Main Video */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main Video Container with cleaner styling */}
              <div className="relative aspect-[3/4] bg-white rounded-[2.5rem] p-4 shadow-2xl">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gray-100">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src="/videos/limi-web.m4v" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Floating Feature Cards - positioned like in original */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="text-2xl font-bold text-[#54bb74]">AI</div>
                <div className="text-xs text-[#292929]/60 uppercase tracking-wide">Smart Lighting</div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="text-2xl font-bold text-[#54bb74]">∞</div>
                <div className="text-xs text-[#292929]/60 uppercase tracking-wide">Modular Design</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Images */}
          <div ref={rightColumnRef} className="lg:col-span-3 space-y-4 ">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden h-[200px] w-[200px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <Image
                  src={image}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-20 right-1/4 w-32 h-32 bg-[#54bb74]/3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-[#93cfa2]/3 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}

export default ModernHeroSection;
