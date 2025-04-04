"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LightingCarousel = ({ userType }) => {
  // Return null if user is not a customer or if userType is not set yet
  // if (userType !== null && userType !== 'customer') {
  //   return null;
  // }
  
  const [activeSlide, setActiveSlide] = useState(0);
  const [warmCoolValue, setWarmCoolValue] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 255, b: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Green");
  const [isInProgress, setIsInProgress] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMode, setActiveMode] = useState('relax');
  const [showRainbowPicker, setShowRainbowPicker] = useState(true);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [pickerKnobPosition, setPickerKnobPosition] = useState({ x: 120, y: 5 }); // Default position for green
  
  // Refs
  const rainbowPickerRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const dialRef = useRef(null);
  const brightnessDialRef = useRef(null);
  const activeDialRef = useRef(null);
  const gradientRef = useRef(null);
  const coolLabelRef = useRef(null);
  const warmLabelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  
  // State for light effects
  const [offLight, setOffLight] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [rgbOpacities, setRgbOpacities] = useState({ r: 0.7, g: 0.7, b: 0.7 });
  
  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resizes

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);
  
  // Step 1: Define solid colors
  const solidColors = [
    { name: "Red", rgb: { r: 255, g: 0, b: 0 } },
    { name: "Green", rgb: { r: 0, g: 255, b: 0 } },
    { name: "Blue", rgb: { r: 0, g: 0, b: 255 } },
    { name: "Yellow", rgb: { r: 255, g: 255, b: 0 } },
    { name: "Cyan", rgb: { r: 0, g: 255, b: 255 } },
    { name: "Magenta", rgb: { r: 255, g: 0, b: 255 } },
    { name: "Orange", rgb: { r: 255, g: 165, b: 0 } },
    { name: "Purple", rgb: { r: 128, g: 0, b: 128 } },
    { name: "Pink", rgb: { r: 255, g: 192, b: 203 } },
    { name: "White", rgb: { r: 255, g: 255, b: 255 } },
  ];

  useEffect(() => {
    const minRGBThreshold = 20;
    const maxRGBThreshold = 240;

    const maxRGBValue = Math.max(rgbValues.r || 0, rgbValues.g || 0, rgbValues.b || 0);
    const minRGBValue = Math.min(rgbValues.r || 0, rgbValues.g || 0, rgbValues.b || 0);

    // 1️⃣ Handle Off Light (when RGB values are very low)
    if (maxRGBValue < minRGBThreshold) {
      globalThis.offLightOpacity = 1 - maxRGBValue / minRGBThreshold - 0.3;
      setOffLight(true);
    } else {
      globalThis.offLightOpacity = 0;
      setOffLight(false);
    }

    // 2️⃣ Handle White Light (when any RGB value exceeds 240)
    if (minRGBValue > maxRGBThreshold) {
      console.log("White Light");
      globalThis.whiteOpacity =
        (minRGBValue - maxRGBThreshold) / (255 - maxRGBThreshold); // Normalize between 0-1
      setOnLight(true);
      setRgbOpacities({
        r: Math.max(0, rgbValues.r / 255 - globalThis.whiteOpacity),
        g: Math.max(0, rgbValues.g / 255 - globalThis.whiteOpacity),
        b: Math.max(0, rgbValues.b / 255 - globalThis.whiteOpacity),
      });
    } else {
      globalThis.whiteOpacity = 0;
      setOnLight(false);
    }
  }, [rgbValues]);

  useEffect(() => {
    // Animate Heading Ref
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -30, // Increased vertical slide effect
        duration: 1, // Set duration for smoothness
        ease: "back.out", // Changed easing for a more pronounced effect
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate Description Ref
    if (descriptionRef.current) {
      gsap.from(descriptionRef.current, {
        opacity: 0,
        x: -30, // Increased horizontal slide effect
        duration: 1, // Set duration for smoothness
        ease: "back.out", // Changed easing for a more pronounced effect
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate text labels
    if (coolLabelRef.current && warmLabelRef.current) {
      gsap.fromTo(
        coolLabelRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: coolLabelRef.current,
            start: "top 80%",
            // toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        warmLabelRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: warmLabelRef.current,
            start: "top 80%",
            // toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [carouselRef]); // Run animations on mount

  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context(() => {
      // Slide transitions
      slidesRef.current.forEach((slide, index) => {
        gsap.set(slide, {
          opacity: index === activeSlide ? 1 : 0,
          display: index === activeSlide ? "flex" : "none",
        });
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [activeSlide]);

  // Handle circular dial interaction for warm/cool
  useEffect(() => {
    if (!dialRef.current) return;

    const handleMouseMove = (e) => {
      if (!isDragging || activeDialRef.current !== "warmCool") return;

      const dial = dialRef.current;
      const rect = dial.getBoundingClientRect();

      // Get cursor position relative to the dial
      const x = e.clientX - rect.left;

      // Calculate position on straight bar (0-100%)
      const barWidth = rect.width;
      const barStart = 50; // Left edge of bar in SVG coordinates
      const barEnd = 416; // Right edge of bar in SVG coordinates

      // Convert screen coordinates to SVG coordinates
      const svgX = (x / barWidth) * 466;

      // Constrain to bar boundaries
      const constrainedX = Math.max(barStart, Math.min(barEnd, svgX));

      // Convert position to value (0-100)
      const newValue = Math.round(
        ((constrainedX - barStart) / (barEnd - barStart)) * 100
      );
      setWarmCoolValue(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      activeDialRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (isDragging && activeDialRef.current === "warmCool") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Handle circular dial interaction for brightness
  useEffect(() => {
    if (!brightnessDialRef.current) return;

    const handleMouseMove = (e) => {
      if (!isDragging || activeDialRef.current !== "brightness") return;

      // Get event coordinates (works for both mouse and touch)
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);
      
      // If we couldn't get coordinates, exit
      if (clientX === null || clientY === null) return;

      const dial = brightnessDialRef.current;
      const rect = dial.getBoundingClientRect();

      // Get cursor position relative to the center of the dial
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = clientX - rect.left - centerX;
      const y = clientY - rect.top - centerY;

      // Calculate angle in radians, then convert to degrees
      const angleRad = Math.atan2(y, x);
      let angleDeg = (angleRad * 180) / Math.PI + 90; // +90 to start from top

      // Ensure angle is between 0-360
      if (angleDeg < 0) angleDeg += 360;

      // Convert angle to brightness value (0-100)
      const newValue = Math.round((angleDeg / 360) * 100);
      setBrightness(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      activeDialRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };

    if (isDragging && activeDialRef.current === "brightness") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleDialMouseDown = (e, dialType) => {
    e.preventDefault(); // Prevent default to avoid scrolling on mobile
    setIsDragging(true);
    activeDialRef.current = dialType;

    // For the brightness dial, we need special handling
    if (dialType === "brightness") {
      // The brightness dial is handled in its own useEffect
      return;
    }

    const moveHandler = (e) => {
      const dial = dialRef.current;
      const rect = dial.getBoundingClientRect();
      const x = e.clientX
        ? e.clientX - rect.left
        : e.touches[0].clientX - rect.left; // Handle both mouse and touch

      // Calculate position on the dial (0-100)
      const newValue = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setWarmCoolValue(newValue);
    };

    const endHandler = () => {
      setIsDragging(false);
      activeDialRef.current = null;
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchmove", moveHandler); // Remove touch event
      document.removeEventListener("touchend", endHandler); // Remove touch event
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", moveHandler); // Add touch event
    document.addEventListener("touchend", endHandler); // Add touch event
  };

  const handleRgbChange = (channel, value) => {
    setRgbValues((prev) => ({
      ...prev,
      [channel]: value,
    }));
  };

  const handleRainbowColorPick = (e) => {
    if (!rainbowPickerRef.current) return;
    
    const rect = rainbowPickerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width); // Constrain x within bounds
    
    // Only use x position for color selection (ignore y)
    const width = rect.width;
    
    // Calculate hue based on x position (0-360 degrees)
    const hue = (x / width) * 360;
    
    // Fixed saturation and value for consistent brightness
    const saturation = 100;
    const value = 100;
    
    // Set knob position (only x changes)
    setPickerKnobPosition({ x, y: rect.height / 2 });
    
    // Convert HSV to RGB
    const rgbColor = hsvToRgb(hue, saturation, value);
    setRgbValues(rgbColor);
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function(e) {
      if (!inThrottle) {
        func(e);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const throttledColorPick = useCallback(
    throttle(handleRainbowColorPick, 16), // ~60fps (1000ms/60 ≈ 16ms)
    []
  );

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      throttledColorPick(e);
    }
  }, [isDragging, throttledColorPick]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
    };
  }, [isDragging, handleMouseMove]);

  const hsvToRgb = (h, s, v) => {
    s = s / 100;
    v = v / 100;
    
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    
    let r, g, b;
    if (h >= 0 && h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (h >= 60 && h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (h >= 120 && h < 180) {
      [r, g, b] = [0, c, x];
    } else if (h >= 180 && h < 240) {
      [r, g, b] = [0, x, c];
    } else if (h >= 240 && h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  };

 

  // Calculate the cool value (inverse of warm)
  const coolValue = 100 - warmCoolValue;

  useEffect(() => {
    // Initialize rainbow picker knob position based on current RGB values
    if (rainbowPickerRef.current && showRainbowPicker) {
      setTimeout(() => {
        const rect = rainbowPickerRef.current.getBoundingClientRect();
        
        // Convert RGB to HSV to get appropriate position
        const r = rgbValues.r / 255;
        const g = rgbValues.g / 255;
        const b = rgbValues.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        // Calculate hue (0-360)
        let hue = 0;
        if (delta !== 0) {
          if (max === r) {
            hue = ((g - b) / delta) % 6;
          } else if (max === g) {
            hue = (b - r) / delta + 2;
          } else {
            hue = (r - g) / delta + 4;
          }
          
          hue = Math.round(hue * 60);
          if (hue < 0) hue += 360;
        }
        
        // Convert hue to picker position
        const x = (hue / 360) * rect.width;
        
        setPickerKnobPosition({ x, y: rect.height / 2 });
      }, 100); // Small delay to ensure the ref is properly set
    }
  }, [showRainbowPicker, rgbValues]);

  const slides = [
    {
      id: "warm-cool",
      title: "Warm & Cool Light",
      description: "Adjust the warmth and coolness of your lighting.",
    },
    {
      id: "brightness",
      title: "Brightness Control",
      description: "Fine-tune the brightness of your lights.",
    },
    {
      id: "modes",
      title: "Lighting Modes",
      description: "Choose from preset modes for different moods.",
    },
    {
      id: "rgb",
      title: "RGB Neon Lights",
      description: "Create custom color combinations with RGB controls.",
    },
  ];

  const lightingModes = [
    { id: "relax", name: "Relax Mode", color: "#FFA500" },
    { id: "ambient", name: "Ambient Mode", color: "#00BFFF" },
    { id: "party", name: "Party Mode", color: "#FF00FF" },
  ];

  // Function to copy RGB values to clipboard
  const copyToClipboard = (color) => {
    const rgbString = `rgb(${color.r}, ${color.g}, ${color.b})`;
    navigator.clipboard.writeText(rgbString).then(() => {
      toast.success("RGB value is copied!");
    });
  };

  // Brand colors
  const brandColors = {
    primary: "#54bb74", // Green from the button hover
    secondary: "#292929", // Dark gray from the button
    accent: "#FF6B6B", // Warm accent
    coolAccent: "#4ECDC4", // Cool accent
    dark: "#292929",
    light: "#FFFFFF",
    etonBlue: "#93CFA2",
  };

  return (
    <div
      id="lighting-carousel"
      ref={carouselRef}
      className="relative w-full h-screen overflow-hidden bg-black "
    >
      {/* Main Heading for the entire component */}
      <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent pt-4 pb-2 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2 max-sm:text-xl max-sm:mb-0"
            style={{ color: brandColors.primary }}
          >
            Smart Lighting Controls
          </h1>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto max-sm:text-xs max-sm:hidden"
            style={{ color: brandColors.light, opacity: 0.8 }}
          >
            Customize your lighting experience with our intuitive controls
          </p>
        </div>
      </div>

      <ToastContainer /> {/* This will display your toasts */}
      
      {/* Heading Section - Improved for mobile */}
      <div className="w-full bg-gradient-to-r from-[#1a2a20] to-[#2d4133] py-2 px-4 mb-4 max-h-[60px] mt-[100px] max-sm:mt-[40px]">
        <div className="container mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/70 mb-0">
            Smart Lighting Controls
          </p>
          <h2 className="text-lg font-bold" style={{ color: brandColors.primary }}>
            Customize Your Lighting Experience
          </h2>
        </div>
      </div>

      {/* Navigation Arrows - Moved to higher z-index */}
      <button
        onClick={prevSlide}
        className="absolute left-8 max-sm:left-2 top-1/2 max-sm:top-[45%] -translate-y-1/2 z-40 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all max-sm:p-2 max-sm:scale-75" 
        aria-label="Previous slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronLeft size={24} /> 
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 max-sm:right-2 top-1/2 max-sm:top-[45%] -translate-y-1/2 z-40 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all max-sm:p-2 max-sm:scale-75"
        aria-label="Next slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronRight size={24} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2  -translate-x-1/2 z-50 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === activeSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            style={{
              backgroundColor:
                index === activeSlide
                  ? brandColors.primary
                  : `${brandColors.primary}50`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Slides Container */}
      <div className="w-full h-full">
        {/* Warm & Cool Light Control Slide */}
        <div
          ref={(el) => (slidesRef.current[0] = el)}
          className="absolute inset-0 md:flex md:flex-row flex flex-col items-stretch justify-between p-0"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Mobile title - Smaller and more compact */}
          <div className="text-center block md:hidden pt-16 pb-2">
            <h2
              ref={headingRef}
              className="text-lg font-bold text-white  mb-1"
              style={{ color: brandColors.primary }}
            >
              {slides[0].title}
            </h2>
          </div>
          {/* Image Section - Enlarged for mobile */}
          <div className="relative max-sm:h-3/5 h-full md:w-2/3">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Warm Images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/carouselImages/warm_pure_mob.jpg"
                        : "/images/carouselImages/warm_pure.jpg"
                    }
                    alt="Warm Pure"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity:
                        warmCoolValue > 50 ? (warmCoolValue - 50) / 50 : 0,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/carouselImages/warm_mix_mob.jpg"
                        : "/images/carouselImages/warm_mix.jpg"
                    }
                    alt="Warm Mix"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity:
                        warmCoolValue <= 50
                          ? warmCoolValue / 50
                          : (100 - warmCoolValue) / 50,
                    }}
                  />
                </div>

                {/* Cool Images */}

                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/carouselImages/cool_mix_mob.jpg"
                        : "/images/carouselImages/cool_mix.jpg"
                    }
                    alt="Cool Mix"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity:
                        coolValue <= 50
                          ? coolValue / 50
                          : (100 - coolValue) / 50,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/carouselImages/cool_pure_mob.jpg"
                        : "/images/carouselImages/cool_pure.jpg"
                    }
                    alt="Cool Pure"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity: coolValue > 50 ? (coolValue - 50) / 50 : 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section - Smaller for mobile */}
          <div className="relative w-full md:w-1/3 max-sm:h-2/5 h-full bg-black/80 flex flex-col-reverse items-center justify-end max-sm:pb-4">
            <div className="text-center mb-12 hidden md:block md:pt-40">
              <h2
                ref={headingRef}
                className="text-3xl font-bold text-white  mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[0].title}
              </h2>
              <p ref={descriptionRef} className="text-base text-white/80 mb-8">
                {slides[0].description}
              </p>
            </div>

            <div className="w-full max-w-xs md:pt-60 max-sm:pt-0">
              <div
                ref={dialRef}
                className="relative w-full max-sm:w-[80%] max-sm:mx-auto max-sm:h-28 h-40 md:h-52 overflow-hidden cursor-pointer"
                onMouseDown={(e) => handleDialMouseDown(e, "warmCool")}
                onTouchStart={(e) => handleDialMouseDown(e, "warmCool")}
              >
                <div className="relative h-12 max-sm:h-6 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
                  {/* Gradient background */}
                  <div
                    ref={gradientRef}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, #00BFFF, #87CEFA, #FFFFFF, #FFCC80, #FFA500)",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  />

                  {/* Circle indicator */}
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 max-sm:w-5 max-sm:h-5 rounded-full border-4 max-sm:border-2 border-white dark:border-gray-800 shadow-lg transition-all duration-100 ease-out"
                    style={{
                      left: `${warmCoolValue}%`,
                      backgroundColor:
                        warmCoolValue < 30
                          ? "#00BFFF"
                          : warmCoolValue > 70
                          ? "#FFA500"
                          : "#FFFFFF",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      willChange: "left, background-color",
                    }}
                  />
                </div>

                {/* Text labels */}
                <div
                  ref={coolLabelRef}
                  className="absolute max-sm:bottom-6 left-16 max-sm:left-2 bottom-8 max-sm:text-xs text-blue-500 font-bold"
                >
                  Cool
                </div>
                <div
                  ref={warmLabelRef}
                  className="absolute max-sm:bottom-6 right-16 max-sm:right-2 bottom-8 max-sm:text-xs text-amber-500 font-bold"
                >
                  Warm
                </div>

                {/* Value display */}
                <div className="absolute bottom-2 max-sm:bottom-0 left-1/2 -translate-x-1/2 text-white font-bold max-sm:text-xs">
                  {warmCoolValue > 50
                    ? `Warm ${Math.round((warmCoolValue - 50) * 2)}%`
                    : `Cool ${Math.round((50 - warmCoolValue) * 2)}%`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brightness Control Slide */}
        <div
          ref={(el) => (slidesRef.current[2] = el)}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0 max-sm:flex-col max-sm:items-center"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Mobile title - Compact */}
          <div className="text-center block md:hidden pt-2 pb-1">
            <h2
              className="text-lg font-bold text-white mt-12 mb-1"
              style={{ color: brandColors.primary }}
            >
              {slides[1].title}
            </h2>
          </div>
          
          {/* Image Section - Enlarged for mobile */}
          <div className="relative w-2/3 h-full max-sm:w-full max-sm:h-3/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden mix-blend-screen">
                {/* Light On Image */}
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{ opacity: brightness / 100 }}
                >
                  <Image
                    src={
                      isMobile
                        ? "/images/brightness/light_on_mob.jpg"
                        : "/images/brightness/light_on.jpg"
                    }
                    alt="Light On"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                  />
                </div>

                {/* Light Off Image */}
                <div
                  className="absolute inset-0 mix-blend-screen w-full"
                  style={{ opacity: 1 - brightness / 100 }}
                >
                  <Image
                    src={
                      isMobile
                        ? "/images/brightness/light_off_mob.jpg"
                        : "/images/brightness/light_off.jpg"
                    }
                    alt="Light Off"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section - Smaller for mobile */}
          <div className="relative w-1/3 mb-12 h-full max-sm:w-full max-sm:h-2/5 bg-black/80 flex flex-col items-center justify-center p-8 max-sm:p-2 max-sm:flex-col-reverse">
            <div className="text-center mb-8 hidden md:block">
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[1].title}
              </h2>
              <p className="text-base text-white/80 mb-4">
                {slides[1].description}
              </p>
            </div>

            <div className="w-full max-w-xs max-sm:max-w-[80%]">
              <div
                ref={brightnessDialRef}
                className="relative w-64 h-64 max-sm:w-40 max-sm:h-40 rounded-full overflow-hidden cursor-pointer mx-auto touch-none"
                onClick={(e) => {
                  // Calculate brightness based on click position
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const x = e.clientX - rect.left - centerX;
                  const y = e.clientY - rect.top - centerY;
                  
                  // Calculate angle and convert to brightness
                  const angleRad = Math.atan2(y, x);
                  let angleDeg = (angleRad * 180) / Math.PI + 90; // +90 to start from top
                  if (angleDeg < 0) angleDeg += 360;
                  const newValue = Math.round((angleDeg / 360) * 100);
                  setBrightness(newValue);
                }}
                onMouseDown={(e) => handleDialMouseDown(e, "brightness")}
                onTouchStart={(e) => {
                  // For touch events, calculate brightness directly
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const touch = e.touches[0];
                  const x = touch.clientX - rect.left - centerX;
                  const y = touch.clientY - rect.top - centerY;
                  
                  // Calculate angle and convert to brightness
                  const angleRad = Math.atan2(y, x);
                  let angleDeg = (angleRad * 180) / Math.PI + 90; // +90 to start from top
                  if (angleDeg < 0) angleDeg += 360;
                  const newValue = Math.round((angleDeg / 360) * 100);
                  setBrightness(newValue);
                  
                  // Also start drag handling for continuous adjustment
                  handleDialMouseDown(e, "brightness");
                }}
              >
                {/* SVG for the circular path */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 200"
                  className="absolute top-0 left-0"
                >
                  {/* Circular path for visual reference */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#brightnessGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="brightnessGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#333333" />
                      <stop offset="50%" stopColor="#FFCC00" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>

                  {/* Inner circle */}
                  <circle cx="100" cy="100" r="70" fill="#121212" />

                  {/* Calculate position along the circular path based on brightness */}
                  {(() => {
                    const angle =
                      (brightness / 100) * 2 * Math.PI - Math.PI / 2; // Convert to radians, start from top
                    const radius = 80;
                    const cx = 100 + radius * Math.cos(angle);
                    const cy = 100 + radius * Math.sin(angle);

                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="12"
                        fill="white"
                        filter="drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))"
                      />
                    );
                  })()}
                </svg>

                {/* Value display */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl max-sm:text-base font-bold">
                  {brightness}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lighting Modes Slide */}
        <div
          ref={(el) => (slidesRef.current[1] = el)}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0 max-sm:flex-col max-sm:items-center"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Mobile title - Compact */}
          <div className="text-center block md:hidden pt-2 pb-1">
            <h2
              className="text-lg font-bold text-white mt-12 mb-1"
              style={{ color: brandColors.primary }}
            >
              {slides[2].title}
            </h2>
          </div>
          
          {/* Image Section - Enlarged for mobile */}
          <div className="relative w-2/3 h-full max-sm:w-full max-sm:h-3/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Mode Images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/presets/party_mob.jpg"
                        : "/images/presets/party.jpg"
                    }
                    alt="Party Mode"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity: activeMode === "party" ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                    priority
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/presets/relax_mob.jpg"
                        : "/images/presets/relax.jpg"
                    }
                    alt="Relax Mode"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity: activeMode === "relax" ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                    priority
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={
                      isMobile
                        ? "/images/presets/ambient_mob.jpg"
                        : "/images/presets/ambient.jpg"
                    }
                    alt="Ambient Mode"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    style={{
                      opacity: activeMode === "ambient" ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section - Smaller for mobile */}
          <div className="relative w-1/3 h-full max-sm:w-full max-sm:h-2/5 max-sm:pb-20 bg-black/80 flex flex-col items-center justify-center p-8 max-sm:p-2 max-sm:flex-col-reverse">
            <div className="text-center mb-8 hidden md:block">
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[2].title}
              </h2>
              <p className="text-base text-white/80 mb-4">
                {slides[2].description}
              </p>
            </div>

            <div className="w-full max-w-xs max-sm:max-w-[90%]">
              <div className="grid grid-cols-1 gap-4">
                {lightingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setActiveMode(mode.id);
                    }}
                    className={`px-6 py-3 max-sm:py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                      activeMode === mode.id
                        ? "scale-105 shadow-lg"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor:
                        activeMode === mode.id
                          ? brandColors.etonBlue
                          : "rgba(40, 40, 40, 0.8)",
                      boxShadow:
                        activeMode === mode.id
                          ? `0 0 15px ${brandColors.etonBlue}80`
                          : "none",
                    }}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RGB Control Slide */}
        <div
          ref={(el) => (slidesRef.current[3] = el)}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0 max-sm:flex-col max-sm:items-center"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Mobile title - Compact */}
          <div className="text-center block md:hidden pt-2 pb-1">
            <h2
              className="text-lg font-bold text-white mt-12 mb-1"
              style={{ color: brandColors.primary }}
            >
              {slides[3].title}
            </h2>
          </div>
          
          {/* Image Section - Enlarged for mobile */}
          <div className="relative w-2/3 h-full max-sm:w-full max-sm:h-3/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full ">
                {/* Base Room Image */}
                <div className="absolute inset-0 bg-cover bg-center" />

                {/* Off Light Layer */}
                <div className="absolute inset-0 mix-blend-screen">
                  <Image
                    src={
                      isMobile
                        ? "/images/RGB/off_mob.jpg"
                        : "/images/RGB/off.jpg"
                    }
                    alt="Off Light"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    style={{ opacity: offLight ? globalThis.offLightOpacity : 0 }}
                  />
                </div>

                {/* Red Light Layer */}
                <div className="absolute inset-0 mix-blend-screen">
                  <Image
                    src={
                      isMobile
                        ? "/images/RGB/red_mob.jpg"
                        : "/images/RGB/red.jpg"
                    }
                    alt="Red Light"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    style={{
                      opacity: !onLight ? (rgbValues.r || 0) / 255 : (rgbOpacities.r || 0),
                    }}
                  />
                </div>

                {/* Green Light Layer */}
                <div className="absolute inset-0 mix-blend-screen">
                  <Image
                    src={
                      isMobile
                        ? "/images/RGB/green_mob.jpg"
                        : "/images/RGB/green.jpg"
                    }
                    alt="Green Light"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    style={{
                      opacity: !onLight ? (rgbValues.g || 0) / 255 : (rgbOpacities.g || 0),
                    }}
                  />
                </div>

                {/* Blue Light Layer */}
                <div className="absolute inset-0 mix-blend-screen">
                  <Image
                    src={
                      isMobile
                        ? "/images/RGB/blue_mob.jpg"
                        : "/images/RGB/blue.jpg"
                    }
                    alt="Blue Light"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    style={{
                      opacity: !onLight ? (rgbValues.b || 0) / 255 : (rgbOpacities.b || 0),
                    }}
                  />
                </div>

                {/* White Light Layer */}
                <div className="absolute inset-0 mix-blend-screen">
                  <Image
                    src={
                      isMobile
                        ? "/images/RGB/white_mob.jpg"
                        : "/images/RGB/white.jpg"
                    }
                    alt="White Light"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    style={{ opacity: onLight ? globalThis.whiteOpacity : 0 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section - Smaller for mobile */}
          <div className="relative w-1/3 h-full max-sm:w-full max-sm:h-2/5 bg-black/80 flex flex-col-reverse items-center justify-center p-8 max-sm:p-0 max-sm:flex-col-reverse">
            <div className="w-full max-w-xs flex flex-col md:gap-6 max-sm:gap-0 ">
              <div className="text-center hidden md:block mb-12">
                <h2
                  className="text-3xl font-bold text-white mb-4"
                  style={{ color: brandColors.primary }}
                >
                  {slides[3].title}
                </h2>
                <p className="text-base text-white/80 mb-8">
                  {slides[3].description}
                </p>
              </div>

              {/* Mobile RGB Controls */}
              <div className="max-sm:block hidden">
                {/* Toggle Buttons */}
                <div className="flex justify-center items-center mb-3 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                      showRainbowPicker 
                        ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white scale-110 shadow-md' 
                        : 'bg-gray-700 text-white'
                    }`}
                    onClick={() => {
                      setShowRainbowPicker(true);
                      setShowColorPalette(false);
                    }}
                  >
                    Customise 
                  </button>
                  
                  <button 
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                      showColorPalette 
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white scale-110 shadow-md' 
                        : 'bg-gray-700 text-white'
                    }`}
                    onClick={() => {
                      setShowRainbowPicker(false);
                      setShowColorPalette(true);
                    }}
                  >
                    Presets
                  </button>
                </div>
                
                {/* Current Color Display */}
                <div className=" mb-3">
                  <div
                    className="relative p-2 rounded-lg mx-auto w-[70%] h-10 flex items-center justify-center"
                    style={{
                      backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
                      boxShadow: `0 0 10px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`,
                    }}
                  >
                    <div className="text-white font-bold text-center text-xs text-shadow-sm">
                      RGB({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
                    </div>
                  <button
                    onClick={() => copyToClipboard(rgbValues)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-1 text-lg"
                    title="Copy RGB values"
                  >
                    📋
                  </button>
                  </div>
                </div>
                
                {/* Rainbow Color Picker */}
                {showRainbowPicker && (
                  <div 
                    ref={rainbowPickerRef}
                    className="w-full h-10 rounded-lg mb-20 cursor-pointer relative z-50"
                    style={{
                      background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                      backgroundSize: '100% 50%',
                      backgroundImage: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000), linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(0,0,0,1))',
                      backgroundBlendMode: 'normal, overlay',
                      backgroundPosition: '0 0, 0 0',
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      throttledColorPick(e.touches[0]);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      throttledColorPick(e.touches[0]);
                    }}
                    onMouseDown={(e) => {
                      setIsDragging(true);
                      throttledColorPick(e);
                    }}
                    onClick={throttledColorPick}
                  >
                    {/* Always show the knob with conditional positioning */}
                    <div 
                      className="absolute h-full w-1 bg-white pointer-events-none"
                      style={{
                        left: `${pickerKnobPosition.x}px`,
                        boxShadow: `0 0 3px rgba(0,0,0,0.5), 0 0 5px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`,
                        top: 0,
                        transition: 'left 0.1s ease-out, box-shadow 0.2s ease'
                      }}
                    >
                      {/* Color indicator at the bottom of the line */}
                      <div 
                        className="absolute bottom-[-20px] w-6 h-6 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
                          left: '-10px',
                          boxShadow: '0 0 5px rgba(0,0,0,0.5)',
                          transition: 'background-color 0.2s ease'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Color Presets - Compact Grid */}
                {showColorPalette && (
                  <div className="color-selection mb-12 grid grid-cols-5 gap-2 justify-items-center">
                    {solidColors.map((color) => (
                      <button
                        key={color.name}
                        className={`rounded-full shadow-md hover:scale-110 transition-all duration-200 ${
                          selectedColor === color.name ? "ring-2 ring-white scale-110" : ""
                        }`}
                        onClick={() => {
                          setRgbValues(color.rgb);
                          setSelectedColor(color.name);
                        }}
                        style={{
                          backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                          width: "32px",
                          height: "32px",
                          boxShadow: selectedColor === color.name
                            ? `0 0 10px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.8)`
                            : 'none',
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop RGB Controls */}
              <div className="max-sm:hidden">
                <div>
                  <label className="text-red-500 md:mb-2 block font-bold text-sm max-sm:text-xs">
                    Red: {rgbValues.r || 0}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.r || 0}
                    onChange={(e) =>
                      handleRgbChange("r", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: "#FF0000",
                      background: "linear-gradient(to right, #300, #F00)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-green-500 md:mb-2 block font-bold text-sm max-sm:text-xs">
                    Green: {rgbValues.g || 0}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.g || 0}
                    onChange={(e) =>
                      handleRgbChange("g", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: "#00FF00",
                      background: "linear-gradient(to right, #030, #0F0)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-blue-500 md:mb-2 block font-bold text-sm max-sm:text-xs">
                    Blue: {rgbValues.b || 0}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.b || 0}
                    onChange={(e) =>
                      handleRgbChange("b", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: "#0000FF",
                      background: "linear-gradient(to right, #003, #00F)",
                    }}
                  />
                </div>

                <div className="relative">
                  <div
                    className="mt-2 p-3 max-sm:p-0 rounded-lg"
                    style={{
                      backgroundColor: `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.5)`,
                      boxShadow: `0 0 20px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`,
                    }}
                  >
                    <div className="text-white font-bold text-center text-shadow">
                      RGB({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(rgbValues)}
                    className="ml-2 max-sm:mt-1 text-white absolute top-0 right-0 p-2 text-3xl max-sm:text-xl"
                  >
                    📋
                  </button>
                </div>

                {/* Desktop Color Selection */}
                <div className="color-selection max-sm:mt-4 max-sm:gap-4 flex flex-wrap justify-center items-center">
                  {solidColors.map((color) => (
                    <button
                      key={color.name}
                      className={`rounded-full shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-[#54bb74]/30 hover:bg-[#292929]/10 focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:ring-opacity-50 ${
                        selectedColor === color.name ? "shadow-2xl" : ""
                      }`}
                      onClick={() => {
                        setRgbValues(color.rgb);
                        setSelectedColor(color.name);
                      }}
                      style={{
                        backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        width: "50px",
                        height: "50px",
                        border: "none",
                        margin: "5px",
                        cursor: "pointer",
                        boxShadow:
                          selectedColor === color.name
                            ? `0 0 20px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.8)`
                            : "none",
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logo at Bottom */}
      <div className="absolute bottom-20 max-sm:bottom-7 max-sm:left-2 left-4 z-20">
        <Image
          src="/images/svgLogos/__Primary_Logo_Black.svg"
          alt="Limi Logo"
          width={120}
          height={60}
          className="invert opacity-80"
          priority
        />
      </div>
    </div>
  );
};

export default LightingCarousel;
