'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LightingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [warmCoolValue, setWarmCoolValue] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const dialRef = useRef(null);
  const brightnessDialRef = useRef(null);
  const activeDialRef = useRef(null);

  // Brand colors
  const brandColors = {
    primary: '#54bb74', // Green from the button hover
    secondary: '#292929', // Dark gray from the button
    accent: '#FF6B6B', // Warm accent
    coolAccent: '#4ECDC4', // Cool accent
    dark: '#292929',
    light: '#FFFFFF'
  };

  const slides = [
    {
      id: 'warm-cool',
      title: 'Warm & Cool Light',
      description: 'Adjust the warmth and coolness of your lighting.'
    },
    {
      id: 'brightness',
      title: 'Brightness Control',
      description: 'Fine-tune the brightness of your lights.'
    },
    {
      id: 'modes',
      title: 'Lighting Modes',
      description: 'Choose from preset modes for different moods.'
    },
    {
      id: 'rgb',
      title: 'RGB Neon Lights',
      description: 'Create custom color combinations with RGB controls.'
    }
  ];

  const lightingModes = [
    { id: 'party', name: 'Party Mode', color: '#FF00FF' },
    { id: 'relax', name: 'Relax Mode', color: '#FFA500' },
    { id: 'ambient', name: 'Ambient Mode', color: '#00BFFF' }
  ];

  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context(() => {
      // Slide transitions
      slidesRef.current.forEach((slide, index) => {
        gsap.set(slide, {
          opacity: index === activeSlide ? 1 : 0,
          display: index === activeSlide ? 'flex' : 'none'
        });
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [activeSlide]);

  // Handle circular dial interaction for warm/cool
  useEffect(() => {
    if (!dialRef.current) return;

    const handleMouseMove = (e) => {
      if (!isDragging || activeDialRef.current !== 'warmCool') return;
      
      const dial = dialRef.current;
      const rect = dial.getBoundingClientRect();
      
      // Get cursor position relative to the dial
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Get closest point on the path
      const pathLength = 400; // Approximate path length
      let closestDistance = Infinity;
      let closestPoint = { x: 0, y: 0 };
      let closestT = 0;
      
      // Sample points along the path to find the closest one
      for (let t = 0; t <= 1; t += 0.01) {
        // Bezier curve calculation for path: M65,261 C64,36 400,41 401,258
        const p0x = 65;
        const p0y = 261;
        const p1x = 64;
        const p1y = 36;
        const p2x = 400;
        const p2y = 41;
        const p3x = 401;
        const p3y = 258;
        
        // Cubic Bezier formula
        const cx = (1-t)**3 * p0x + 3*(1-t)**2*t * p1x + 3*(1-t)*t**2 * p2x + t**3 * p3x;
        const cy = (1-t)**3 * p0y + 3*(1-t)**2*t * p1y + 3*(1-t)*t**2 * p2y + t**3 * p3y;
        
        const distance = Math.sqrt((x - cx)**2 + (y - cy)**2);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = { x: cx, y: cy };
          closestT = t;
        }
      }
      
      // Convert t value (0-1) to warmCoolValue (0-100)
      const newValue = Math.round(closestT * 100);
      setWarmCoolValue(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      activeDialRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (isDragging && activeDialRef.current === 'warmCool') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle circular dial interaction for brightness
  useEffect(() => {
    if (!brightnessDialRef.current) return;

    const handleMouseMove = (e) => {
      if (!isDragging || activeDialRef.current !== 'brightness') return;
      
      const dial = brightnessDialRef.current;
      const rect = dial.getBoundingClientRect();
      
      // Get cursor position relative to the center of the dial
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;
      
      // Calculate angle in radians, then convert to degrees
      const angleRad = Math.atan2(y, x);
      let angleDeg = (angleRad * 180 / Math.PI) + 90; // +90 to start from top
      
      // Ensure angle is between 0-360
      if (angleDeg < 0) angleDeg += 360;
      
      // Convert angle to brightness value (0-100)
      const newValue = Math.round((angleDeg / 360) * 100);
      setBrightness(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      activeDialRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (isDragging && activeDialRef.current === 'brightness') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleDialMouseDown = (e, dialType) => {
    e.preventDefault();
    setIsDragging(true);
    activeDialRef.current = dialType;
  };

  const handleRgbChange = (color, value) => {
    setRgbValues(prev => ({ ...prev, [color]: value }));
  };

  const selectMode = (mode) => {
    // Apply lighting mode settings
    switch (mode) {
      case 'party':
        setRgbValues({ r: 255, g: 0, b: 255 });
        setBrightness(100);
        break;
      case 'relax':
        setWarmCoolValue(80);
        setBrightness(60);
        setRgbValues({ r: 255, g: 165, b: 0 });
        break;
      case 'ambient':
        setWarmCoolValue(40);
        setBrightness(80);
        setRgbValues({ r: 0, g: 191, b: 255 });
        break;
      default:
        break;
    }
  };

  // Calculate warm/cool dial rotation
  const warmCoolRotation = (warmCoolValue / 100) * 180;
  
  // Calculate brightness dial rotation
  const brightnessRotation = (brightness / 100) * 360;

  // Calculate the cool value (inverse of warm)
  const coolValue = 100 - warmCoolValue;

  return (
    <div 
      ref={carouselRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Navigation Arrows - Moved to higher z-index */}
      <button 
        onClick={prevSlide} 
        className="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white p-6 rounded-full hover:bg-black/70 transition-all hover:scale-110"
        aria-label="Previous slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronLeft size={36} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white p-6 rounded-full hover:bg-black/70 transition-all hover:scale-110"
        aria-label="Next slide"
        style={{ backgroundColor: `${brandColors.secondary}80` }}
      >
        <FaChevronRight size={36} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === activeSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            style={{ 
              backgroundColor: index === activeSlide ? brandColors.primary : `${brandColors.primary}50` 
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides Container */}
      <div className="w-full h-full">
        {/* Warm & Cool Light Control Slide */}
        <div 
          ref={el => slidesRef.current[0] = el}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0"
          style={{ backgroundColor: '#121212' }}
        >
          {/* Image Section (2/3) */}
          <div className="relative w-2/3 h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Warm Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/images/lighting/warm-max.jpg')",
                    opacity: warmCoolValue / 100
                  }}
                />
                
                {/* Cool Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/images/lighting/cool-max.jpg')",
                    opacity: coolValue / 100
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ color: brandColors.primary }}>{slides[0].title}</h2>
              <p className="text-base text-white/80 mb-8">{slides[0].description}</p>
            </div>
            
            <div className="w-full max-w-xs">
              <div 
                ref={dialRef}
                className="relative w-full h-64 overflow-hidden cursor-pointer mx-auto"
                onMouseDown={(e) => handleDialMouseDown(e, 'warmCool')}
              >
                {/* SVG for the curved path */}
                <svg width="100%" height="100%" viewBox="0 0 466 300" className="absolute top-0 left-0">
                  {/* Path for visual reference */}
                  <path 
                    d="M65,261 C64,36 400,41 401,258" 
                    fill="none" 
                    stroke="url(#warmCoolGradient)" 
                    strokeWidth="40" 
                    strokeLinecap="round"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="warmCoolGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFA500" />
                      <stop offset="100%" stopColor="#00BFFF" />
                    </linearGradient>
                  </defs>
                  
                  {/* Inner path (thinner) */}
                  <path 
                    d="M65,261 C64,36 400,41 401,258" 
                    fill="none" 
                    stroke="#121212" 
                    strokeWidth="30" 
                    strokeLinecap="round"
                  />
                  
                  {/* Calculate position along the path based on warmCoolValue */}
                  {(() => {
                    const t = warmCoolValue / 100;
                    const p0x = 65;
                    const p0y = 261;
                    const p1x = 64;
                    const p1y = 36;
                    const p2x = 400;
                    const p2y = 41;
                    const p3x = 401;
                    const p3y = 258;
                    
                    // Cubic Bezier formula
                    const cx = (1-t)**3 * p0x + 3*(1-t)**2*t * p1x + 3*(1-t)*t**2 * p2x + t**3 * p3x;
                    const cy = (1-t)**3 * p0y + 3*(1-t)**2*t * p1y + 3*(1-t)*t**2 * p2y + t**3 * p3y;
                    
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r="15" 
                        fill="white" 
                        filter="drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))"
                      />
                    );
                  })()}
                </svg>
                
                {/* Text labels */}
                <div className="absolute bottom-10 left-16 text-amber-500 font-bold">Warm</div>
                <div className="absolute bottom-10 right-16 text-blue-500 font-bold">Cool</div>
                
                {/* Value display */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold">
                  {warmCoolValue > 50 ? `Warm ${Math.round((warmCoolValue - 50) * 2)}%` : `Cool ${Math.round((50 - warmCoolValue) * 2)}%`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brightness Control Slide */}
        <div 
          ref={el => slidesRef.current[1] = el}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0"
          style={{ backgroundColor: '#121212' }}
        >
          {/* Image Section (2/3) */}
          <div className="relative w-2/3 h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Light On Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/images/lighting/light-on.jpg')",
                    opacity: brightness / 100
                  }}
                />
                
                {/* Light Off Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/images/lighting/light-off.jpg')",
                    opacity: 1 - (brightness / 100)
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ color: brandColors.primary }}>{slides[1].title}</h2>
              <p className="text-base text-white/80 mb-8">{slides[1].description}</p>
            </div>
            
            <div className="w-full max-w-xs">
              <div 
                ref={brightnessDialRef}
                className="relative w-64 h-64 rounded-full overflow-hidden cursor-pointer mx-auto"
                onMouseDown={(e) => handleDialMouseDown(e, 'brightness')}
              >
                {/* SVG for the circular path */}
                <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute top-0 left-0">
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
                    <linearGradient id="brightnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#333333" />
                      <stop offset="50%" stopColor="#FFCC00" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                  
                  {/* Inner circle */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="70" 
                    fill="#121212" 
                  />
                  
                  {/* Calculate position along the circular path based on brightness */}
                  {(() => {
                    const angle = (brightness / 100) * 2 * Math.PI - (Math.PI / 2); // Convert to radians, start from top
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
                  {brightness}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lighting Modes Slide */}
        <div 
          ref={el => slidesRef.current[2] = el}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0"
          style={{ backgroundColor: '#121212' }}
        >
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
                      opacity: rgbValues.r === parseInt(mode.color.slice(1, 3), 16) && 
                              rgbValues.g === parseInt(mode.color.slice(3, 5), 16) && 
                              rgbValues.b === parseInt(mode.color.slice(5, 7), 16) ? 1 : 0
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ color: brandColors.primary }}>{slides[2].title}</h2>
              <p className="text-base text-white/80 mb-8">{slides[2].description}</p>
            </div>
            
            <div className="w-full flex flex-col gap-6 justify-center">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => selectMode(mode.id)}
                  className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 w-full"
                  style={{ 
                    backgroundColor: mode.color,
                    boxShadow: `0 0 20px ${mode.color}80`
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
          ref={el => slidesRef.current[3] = el}
          className="absolute inset-0 flex flex-row items-stretch justify-between p-0"
          style={{ backgroundColor: '#121212' }}
        >
          {/* Image Section (2/3) */}
          <div className="relative w-2/3 h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Base Room Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/images/lighting/room-base.jpg')"
                  }}
                />
                
                {/* Red Light Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-screen" 
                  style={{
                    backgroundImage: "url('/images/lighting/red-light.jpg')",
                    opacity: rgbValues.r / 255
                  }}
                />
                
                {/* Green Light Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-screen" 
                  style={{
                    backgroundImage: "url('/images/lighting/green-light.jpg')",
                    opacity: rgbValues.g / 255
                  }}
                />
                
                {/* Blue Light Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-screen" 
                  style={{
                    backgroundImage: "url('/images/lighting/blue-light.jpg')",
                    opacity: rgbValues.b / 255
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Text and Controls Section (1/3) */}
          <div className="relative w-1/3 h-full bg-black/80 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ color: brandColors.primary }}>{slides[3].title}</h2>
              <p className="text-base text-white/80 mb-8">{slides[3].description}</p>
            </div>
            
            <div className="w-full max-w-xs flex flex-col gap-6">
              <div>
                <label className="text-red-500 mb-2 block font-bold text-sm">Red: {rgbValues.r}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={rgbValues.r} 
                  onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    accentColor: '#FF0000',
                    background: 'linear-gradient(to right, #300, #F00)'
                  }}
                />
              </div>
              
              <div>
                <label className="text-green-500 mb-2 block font-bold text-sm">Green: {rgbValues.g}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={rgbValues.g} 
                  onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    accentColor: '#00FF00',
                    background: 'linear-gradient(to right, #030, #0F0)'
                  }}
                />
              </div>
              
              <div>
                <label className="text-blue-500 mb-2 block font-bold text-sm">Blue: {rgbValues.b}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={rgbValues.b} 
                  onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    accentColor: '#0000FF',
                    background: 'linear-gradient(to right, #003, #00F)'
                  }}
                />
              </div>
              
              <div className="mt-2 p-3 rounded-lg" style={{
                backgroundColor: `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.5)`,
                boxShadow: `0 0 20px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`
              }}>
                <div className="text-white font-bold text-center text-shadow">
                  RGB({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo at Bottom */}
      <div className="absolute bottom-4 left-4 z-20">
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
