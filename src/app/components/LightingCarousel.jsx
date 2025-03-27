"use client";
import { useState, useEffect, useRef } from "react";
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

const LightingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [warmCoolValue, setWarmCoolValue] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 255, b: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isInProgress, setIsInProgress] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resizes

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

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
  const [offLight, setOffLight] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [rgbOpacities, setRgbOpacities] = useState({ r: 0.7, g: 0.7, b: 0.7 });
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
    { name: "Brown", rgb: { r: 165, g: 42, b: 42 } },
    { name: "Pink", rgb: { r: 255, g: 192, b: 203 } },
  ];

  useEffect(() => {
    const minRGBThreshold = 20;
    const maxRGBThreshold = 240;

    const maxRGBValue = Math.max(rgbValues.r, rgbValues.g, rgbValues.b);
    const minRGBValue = Math.min(rgbValues.r, rgbValues.g, rgbValues.b);

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
        r: Math.max(0, rgbValues.r / 255 - whiteOpacity),
        g: Math.max(0, rgbValues.g / 255 - whiteOpacity),
        b: Math.max(0, rgbValues.b / 255 - whiteOpacity),
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

  // Brand colors
  const brandColors = {
    primary: "#54bb74", // Green from the button hover
    secondary: "#292929", // Dark gray from the button
    accent: "#FF6B6B", // Warm accent
    coolAccent: "#4ECDC4", // Cool accent
    dark: "#292929",
    light: "#FFFFFF",
  };

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
    { id: "party", name: "Party Mode", color: "#FF00FF" },
    { id: "relax", name: "Relax Mode", color: "#FFA500" },
    { id: "ambient", name: "Ambient Mode", color: "#00BFFF" },
  ];

  // Function to copy RGB values to clipboard
  const copyToClipboard = (color) => {
    const rgbString = `rgb(${color.r}, ${color.g}, ${color.b})`;
    navigator.clipboard.writeText(rgbString).then(() => {
      toast.success("RGB value is copied!");
    });
  };

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

      const dial = brightnessDialRef.current;
      const rect = dial.getBoundingClientRect();

      // Get cursor position relative to the center of the dial
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;

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
    };

    if (isDragging && activeDialRef.current === "brightness") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleDialMouseDown = (e, dialType) => {
    // e.preventDefault();
    setIsDragging(true);
    activeDialRef.current = dialType;

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

  const handleRgbChange = (color, value) => {
    setRgbValues((prev) => ({ ...prev, [color]: value }));
  };

  const selectMode = (mode) => {
    // Apply lighting mode settings
    switch (mode) {
      case "party":
        setRgbValues({ r: 255, g: 0, b: 255 });
        setBrightness(100);
        break;
      case "relax":
        setWarmCoolValue(80);
        setBrightness(60);
        setRgbValues({ r: 255, g: 165, b: 0 });
        break;
      case "ambient":
        setWarmCoolValue(40);
        setBrightness(80);
        setRgbValues({ r: 0, g: 191, b: 255 });
        break;
      default:
        break;
    }
  };

  // Calculate the cool value (inverse of warm)
  const coolValue = 100 - warmCoolValue;

  return (
    <div
    id="lighting-carousel"
      ref={carouselRef}
      className="relative w-full h-screen overflow-hidden bg-black "
    >
      <ToastContainer /> {/* This will display your toasts */}
      {/* Navigation Arrows - Moved to higher z-index */}
      <button
        onClick={prevSlide}
        className="absolute left-8 max-sm:left-3 top-1/2 max-sm:top-[40%]  -translate-y-1/2 z-50 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-all  max-sm:p-2 max-sm:scale-75" // Adjusted padding and scale for mobile
        aria-label="Previous slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronLeft size={28} /> {/* Adjusted icon size */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 max-sm:right-3 top-1/2 -translate-y-1/2 max-sm:top-[40%] z-50 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-all  max-sm:p-2 max-sm:scale-75" // Adjusted padding and scale for mobile
        aria-label="Next slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronRight size={28} /> {/* Adjusted icon size */}
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
          className="absolute  inset-0 md:flex md:flex-row flex flex-col items-stretch justify-between p-0"
          style={{ backgroundColor: "#121212" }}
        >
          <div className="text-center block md:hidden  pt-10">
            <h2
              ref={headingRef}
              className="text-3xl font-bold text-white mb-4"
              style={{ color: brandColors.primary }}
            >
              {slides[0].title}
            </h2>
            <p ref={descriptionRef} className="text-base text-white/80 mb-0">
              {slides[0].description}
            </p>
          </div>
          {/* Image Section (2/3) */}
          <div className="relative    max-sm:h-2/5 h-full md:w-2/3  ">
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
                    objectPosition="center" // Focuses on the center
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
                    objectPosition="center" // Focuses on the center
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
                    objectPosition="center" // Focuses on the center
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
                    objectPosition="center" // Focuses on the center
                    style={{
                      opacity: coolValue > 50 ? (coolValue - 50) / 50 : 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section (1/3) */}
          <div className="relative w-full md:w-1/3 md:h-full h-1/2  bg-black/80 flex flex-col-reverse  items-center justify-end ">
            <div className="text-center mb-12 hidden md:block md:pt-40 ">
              <h2
                ref={headingRef}
                className="text-3xl font-bold text-white mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[0].title}
              </h2>
              <p ref={descriptionRef} className="text-base text-white/80 mb-8">
                {slides[0].description}
              </p>
            </div>

            <div className="w-full max-w-xs  md:pt-60 ">
              <div
                ref={dialRef}
                className="relative w-full max-sm:w-[60%] h-40 md:h-52 overflow-hidden cursor-pointer mx-auto "
                onMouseDown={(e) => handleDialMouseDown(e, "warmCool")}
                onTouchStart={(e) => handleDialMouseDown(e, "warmCool")}
              >
                <div className="relative h-12 max-sm:h-7 rounded-full cursor-pointer  transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 ">
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
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 max-sm:w-6 max-sm:h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transition-all duration-100 ease-out"
                    style={{
                      left: `${warmCoolValue}%`,
                      backgroundColor:
                        warmCoolValue < 30
                          ? "#00BFFF"
                          : warmCoolValue > 70
                          ? "#FFA500"
                          : "#FFFFFF",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      willChange: "left, background-color", // Add this line
                    }}
                  />
                </div>

                {/* </div> */}

                {/* Text labels */}
                <div
                  ref={coolLabelRef}
                  className="absolute max-sm:bottom-10 left-16  bottom-8 max-sm:left-0 max-sm:text-sm text-blue-500 font-bold"
                >
                  Cool
                </div>
                <div
                  ref={warmLabelRef}
                  className="absolute max-sm:bottom-10  right-16 bottom-8 max-sm:right-0 max-sm:text-sm text-amber-500 font-bold"
                >
                  Warm
                </div>

                {/* Value display */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold">
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
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0 max-sm:flex-col max-sm:items-center "
          style={{ backgroundColor: "#121212" }}
        >
          <div className="text-center block md:hidden  pt-10">
            <h2
              ref={headingRef}
              className="text-3xl font-bold text-white mb-4"
              style={{ color: brandColors.primary }}
            >
              {slides[1].title}
            </h2>
            <p ref={descriptionRef} className="text-base text-white/80 mb-0">
              {slides[1].description}
            </p>
          </div>
          {/* Image Section (2/3) */}
          <div className="relative w-2/3 h-full max-sm:w-full">
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
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
                    layout="fill" // Makes the image cover the div
                    objectFit="contain" // Ensures the whole image is visible
                    objectPosition="center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8 max-sm:p-2 max-sm:w-full max-sm:flex-col-reverse">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[1].title}
              </h2>
              <p className="text-base text-white/80 mb-8">
                {slides[1].description}
              </p>
            </div>

            <div className="w-full max-w-xs">
              <div
                ref={brightnessDialRef}
                className="relative w-64 h-64 max-sm:w-48 max-sm:h-48 rounded-full overflow-hidden cursor-pointer mx-auto"
                onMouseDown={(e) => handleDialMouseDown(e, "brightness")}
                onTouchStart={(e) => handleDialMouseDown(e, "brightness")}
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
          ref={(el) => (slidesRef.current[3] = el)}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0"
          style={{ backgroundColor: "#121212" }}
        >
          {isInProgress ? (
            <div className="absolute bottom-96 left-1/2 transform -translate-x-1/2 text-white font-bold">
              inProgress
            </div>
          ) : (
            <>
              {/* Image Section (2/3) */}
              <div className="relative w-2/3 h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full overflow-hidden">
                    {lightingModes.map((mode) => (
                      <div
                        key={mode.id}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                        style={{
                          backgroundImage: `url('/images/lighting/${mode.id}-mode.jpg')`,
                          opacity:
                            rgbValues.r ===
                              parseInt(mode.color.slice(1, 3), 16) &&
                            rgbValues.g ===
                              parseInt(mode.color.slice(3, 5), 16) &&
                            rgbValues.b === parseInt(mode.color.slice(5, 7), 16)
                              ? 1
                              : 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ color: brandColors.primary }}
              >
                {slides[2].title}
              </h2>
              <p className="text-base text-white/80 mb-8">
                {slides[2].description}
              </p>
            </div>

            <div className="w-full flex flex-col gap-6 justify-center">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => selectMode(mode.id)}
                  className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 w-full"
                  style={{
                    backgroundColor: mode.color,
                    boxShadow: `0 0 20px ${mode.color}80`,
                  }}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RGB Neon Lights Control Slide */}
        <div
          ref={(el) => (slidesRef.current[1] = el)}
          className="absolute  inset-0 md:flex md:flex-row flex flex-col items-stretch justify-between p-0 max-sm:mb-12"
          style={{ backgroundColor: "#121212" }}
        >
          <div className="text-center   block md:hidden pt-8  border-white ">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ color: brandColors.primary }}
            >
              {slides[3].title}
            </h2>
            <p className="text-base text-white/80  ">{slides[3].description}</p>
          </div>

          {/* Image Section (2/3) */}
          <div className="relative w-full h-full  md:w-2/3  ">
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
                    style={{ opacity: offLight ? offLightOpacity : 0 }}
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
                      opacity: !onLight ? rgbValues.r / 255 : rgbOpacities.r,
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
                      opacity: !onLight ? rgbValues.g / 255 : rgbOpacities.g,
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
                      opacity: !onLight ? rgbValues.b / 255 : rgbOpacities.b,
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
                    style={{ opacity: onLight ? whiteOpacity : 0 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text and Controls Section (1/3) */}
          <div className="relative w-full md:w-1/3 h-full bg-black/80 flex flex-col-reverse  items-center justify-center p-8 max-sm:p-2">
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

              <div>
                <label className="text-red-500  md:mb-2 block font-bold text-sm max-sm:text-xs">
                  Red: {rgbValues.r}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbValues.r}
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
                <label className="text-green-500  md:mb-2 block font-bold text-sm max-sm:text-xs">
                  Green: {rgbValues.g}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbValues.g}
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
                <label className="text-blue-500   md:mb-2 block font-bold text-sm max-sm:text-xs">
                  Blue: {rgbValues.b}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbValues.b}
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
                  className="mt-2 p-3 max-sm:py-2 max-sm:px-1 rounded-lg"
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

              {/* // Step 2: Add color selection UI */}
              <div className="color-selection max-sm:mt-4 max-sm:gap-4 flex flex-wrap justify-center items-center">
                {solidColors.map((color) => (
                  <button
                    key={color.name}
                    className={`rounded-full shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-[#54bb74]/30 hover:bg-[#292929]/10 focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:ring-opacity-50 max-sm:!w-8 max-sm:!h-8 ${
                      selectedColor === color.name ? "shadow-2xl" : ""
                    }`}
                    onClick={() => {
                      setRgbValues(color.rgb);
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
                          : "none", // Apply dynamic shadow
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logo at Bottom */}
      {/* <div className="absolute bottom-4 left-4 z-20">
        <Image
          src="/images/svgLogos/__Primary_Logo_Black.svg"
          alt="Limi Logo"
          width={120}
          height={60}
          className="invert opacity-80"
          priority
        />
      </div> */}
    </div>
  );
};

export default LightingCarousel;
