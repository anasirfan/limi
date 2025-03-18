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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle
      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      let angleDeg = (angleRad * 180 / Math.PI) + 90; // +90 to start from top
      
      // Adjust to 0-180 range (half circle)
      if (angleDeg < 0) angleDeg += 360;
      if (angleDeg > 180) angleDeg = 180;
      
      // Convert to 0-100 value
      const newValue = Math.round((angleDeg / 180) * 100);
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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle
      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      let angleDeg = (angleRad * 180 / Math.PI) + 90; // +90 to start from top
      
      // Adjust to 0-360 range (full circle)
      if (angleDeg < 0) angleDeg += 360;
      
      // Convert to 0-100 value
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
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: '#121212' }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[85%] max-w-5xl overflow-hidden rounded-xl">
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
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-black/40 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ color: brandColors.primary }}>{slides[0].title}</h2>
            <p className="text-base text-white/80 mb-6">{slides[0].description}</p>
          </div>
          
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
            <div 
              ref={dialRef}
              className="relative w-80 h-40 overflow-hidden cursor-pointer"
              onMouseDown={(e) => handleDialMouseDown(e, 'warmCool')}
            >
              {/* Half-circle background */}
              <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-amber-500 to-blue-500 top-0 left-0"></div>
              
              {/* Inner half-circle */}
              <div className="absolute w-72 h-72 rounded-full bg-black top-4 left-4"></div>
              
              {/* Dial indicator */}
              <div 
                className="absolute w-6 h-6 rounded-full bg-white top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ 
                  transform: `rotate(${warmCoolRotation}deg) translateY(-32px) translateX(-50%)`,
                  transformOrigin: 'bottom center',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                }}
              ></div>
              
              {/* Text labels */}
              <div className="absolute top-12 left-4 text-amber-500 font-bold">Warm</div>
              <div className="absolute top-12 right-4 text-blue-500 font-bold">Cool</div>
              
              {/* Value display */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold">
                {warmCoolValue > 50 ? `Warm ${Math.round((warmCoolValue - 50) * 2)}%` : `Cool ${Math.round((50 - warmCoolValue) * 2)}%`}
              </div>
            </div>
          </div>
        </div>

        {/* Brightness Control Slide */}
        <div 
          ref={el => slidesRef.current[1] = el}
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: '#121212' }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[85%] max-w-5xl overflow-hidden rounded-xl">
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
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-black/40 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ color: brandColors.primary }}>{slides[1].title}</h2>
            <p className="text-base text-white/80 mb-6">{slides[1].description}</p>
          </div>
          
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
            <div 
              ref={brightnessDialRef}
              className="relative w-64 h-64 rounded-full overflow-hidden cursor-pointer"
              onMouseDown={(e) => handleDialMouseDown(e, 'brightness')}
            >
              {/* Circle background */}
              <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-gray-800 via-yellow-500 to-white"></div>
              
              {/* Inner circle */}
              <div className="absolute w-56 h-56 rounded-full bg-black top-4 left-4"></div>
              
              {/* Dial indicator */}
              <div 
                className="absolute w-6 h-6 rounded-full bg-white top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ 
                  transform: `rotate(${brightnessRotation}deg) translateY(-28px)`,
                  transformOrigin: 'center center',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                }}
              ></div>
              
              {/* Value display */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
                {brightness}%
              </div>
            </div>
          </div>
        </div>

        {/* Lighting Modes Slide */}
        <div 
          ref={el => slidesRef.current[2] = el}
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: '#121212' }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[85%] max-w-5xl overflow-hidden rounded-xl">
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
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-black/40 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ color: brandColors.primary }}>{slides[2].title}</h2>
            <p className="text-base text-white/80 mb-6">{slides[2].description}</p>
          </div>
          
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-6 justify-center">
            {lightingModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => selectMode(mode.id)}
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-110"
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

        {/* RGB Neon Lights Control Slide */}
        <div 
          ref={el => slidesRef.current[3] = el}
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: '#121212' }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[85%] max-w-5xl overflow-hidden rounded-xl">
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
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-black/40 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ color: brandColors.primary }}>{slides[3].title}</h2>
            <p className="text-base text-white/80 mb-6">{slides[3].description}</p>
          </div>
          
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm flex flex-col gap-4 bg-black/60 p-4 rounded-xl backdrop-blur-md">
            <div>
              <label className="text-red-500 mb-1 block font-bold text-sm">Red: {rgbValues.r}</label>
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
              <label className="text-green-500 mb-1 block font-bold text-sm">Green: {rgbValues.g}</label>
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
              <label className="text-blue-500 mb-1 block font-bold text-sm">Blue: {rgbValues.b}</label>
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
            
            <div className="mt-1 p-2 rounded-lg" style={{
              backgroundColor: `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.5)`,
              boxShadow: `0 0 20px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`
            }}>
              <div className="text-white font-bold text-center text-shadow text-sm">
                RGB({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
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
