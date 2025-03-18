'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LightingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [warmValue, setWarmValue] = useState(50);
  const [coolValue, setCoolValue] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);

  const slides = [
    {
      id: 'warm-cool',
      title: 'Warm & Cool Light Control',
      description: 'Adjust the warmth and coolness of your lighting to create the perfect ambiance.'
    },
    {
      id: 'brightness',
      title: 'Brightness Control',
      description: 'Fine-tune the brightness of your lights for any occasion.'
    },
    {
      id: 'modes',
      title: 'Lighting Modes',
      description: 'Choose from preset modes designed for different activities and moods.'
    },
    {
      id: 'rgb',
      title: 'RGB Neon Lights Control',
      description: 'Create custom color combinations with RGB controls for a vibrant atmosphere.'
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

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleWarmChange = (e) => {
    setWarmValue(e.target.value);
  };

  const handleCoolChange = (e) => {
    setCoolValue(e.target.value);
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
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
        setWarmValue(80);
        setCoolValue(20);
        setBrightness(60);
        setRgbValues({ r: 255, g: 165, b: 0 });
        break;
      case 'ambient':
        setWarmValue(40);
        setCoolValue(60);
        setBrightness(80);
        setRgbValues({ r: 0, g: 191, b: 255 });
        break;
      default:
        break;
    }
  };

  // Calculate RGB background style
  const rgbStyle = {
    backgroundColor: `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.5)`,
    boxShadow: `0 0 30px rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0.8)`,
    filter: 'blur(0px)'
  };

  return (
    <div 
      ref={carouselRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
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
        >
          <h2 className="text-4xl font-bold text-white mb-4">{slides[0].title}</h2>
          <p className="text-xl text-white/80 mb-12 text-center max-w-2xl">{slides[0].description}</p>
          
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden mb-8">
            {/* Warm Max Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/lighting/warm-max.jpg')",
                opacity: warmValue / 100
              }}
            />
            
            {/* Warm Low Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/lighting/warm-low.jpg')",
                opacity: (100 - warmValue) / 100 * (warmValue / 100)
              }}
            />
            
            {/* Cool Max Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/lighting/cool-max.jpg')",
                opacity: coolValue / 100
              }}
            />
            
            {/* Cool Low Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/lighting/cool-low.jpg')",
                opacity: (100 - coolValue) / 100 * (coolValue / 100)
              }}
            />
          </div>
          
          <div className="w-full max-w-md flex flex-col gap-8">
            <div>
              <label className="text-white mb-2 block">Warm Light: {warmValue}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={warmValue} 
                onChange={handleWarmChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            
            <div>
              <label className="text-white mb-2 block">Cool Light: {coolValue}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={coolValue} 
                onChange={handleCoolChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Brightness Control Slide */}
        <div 
          ref={el => slidesRef.current[1] = el}
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{slides[1].title}</h2>
          <p className="text-xl text-white/80 mb-12 text-center max-w-2xl">{slides[1].description}</p>
          
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden mb-8">
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
          
          <div className="w-full max-w-md">
            <label className="text-white mb-2 block">Brightness: {brightness}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={handleBrightnessChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
          </div>
        </div>

        {/* Lighting Modes Slide */}
        <div 
          ref={el => slidesRef.current[2] = el}
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{slides[2].title}</h2>
          <p className="text-xl text-white/80 mb-12 text-center max-w-2xl">{slides[2].description}</p>
          
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden mb-8">
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
          
          <div className="flex gap-4 justify-center">
            {lightingModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => selectMode(mode.id)}
                className="px-6 py-3 rounded-full text-white font-medium transition-all"
                style={{ 
                  backgroundColor: mode.color,
                  boxShadow: `0 0 15px ${mode.color}80`
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
        >
          <h2 className="text-4xl font-bold text-white mb-4">{slides[3].title}</h2>
          <p className="text-xl text-white/80 mb-12 text-center max-w-2xl">{slides[3].description}</p>
          
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden mb-8">
            {/* Base Room Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/lighting/room-base.jpg')"
              }}
            />
            
            {/* RGB Overlay */}
            <div 
              className="absolute inset-0 mix-blend-screen" 
              style={rgbStyle}
            />
          </div>
          
          <div className="w-full max-w-md flex flex-col gap-4">
            <div>
              <label className="text-white mb-2 block">Red: {rgbValues.r}</label>
              <input 
                type="range" 
                min="0" 
                max="255" 
                value={rgbValues.r} 
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>
            
            <div>
              <label className="text-white mb-2 block">Green: {rgbValues.g}</label>
              <input 
                type="range" 
                min="0" 
                max="255" 
                value={rgbValues.g} 
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>
            
            <div>
              <label className="text-white mb-2 block">Blue: {rgbValues.b}</label>
              <input 
                type="range" 
                min="0" 
                max="255" 
                value={rgbValues.b} 
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightingCarousel;
