'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaLightbulb, FaArrowRight, FaCog, FaRegLightbulb, FaPalette, FaCheck, FaInfoCircle, FaSun, FaMoon, FaStar, FaRegStar } from 'react-icons/fa';

const ConfiguratorPreview = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef(null);
  const controlsRef = useRef(null);
  const [activePreset, setActivePreset] = useState(0);
  const [colorTemp, setColorTemp] = useState(50); // 0-100 scale (warm to cool)
  const [brightness, setBrightness] = useState(80); // 0-100 scale
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' or 'custom'
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Lighting presets for the preview
  const presets = [
    { 
      name: 'Warm Ambient', 
      color: '#F5A623', 
      brightness: 80,
      colorTemp: 30,
      description: 'Cozy, relaxing atmosphere perfect for living rooms and bedrooms',
      icon: <FaMoon className="text-[#F5A623]" />
    },
    { 
      name: 'Cool Focus', 
      color: '#87CEAB', 
      brightness: 100,
      colorTemp: 70,
      description: 'Bright, energizing light ideal for workspaces and task lighting',
      icon: <FaSun className="text-[#87CEAB]" />
    },
    { 
      name: 'Emerald Glow', 
      color: '#50C878', 
      brightness: 90,
      colorTemp: 50,
      description: 'Balanced, vibrant lighting for entertaining and everyday use',
      icon: <FaLightbulb className="text-[#50C878]" />
    },
    { 
      name: 'Evening Mode', 
      color: '#E57373', 
      brightness: 60,
      colorTemp: 20,
      description: 'Gentle, warm lighting that minimizes blue light before bedtime',
      icon: <FaRegLightbulb className="text-[#E57373]" />
    }
  ];
  
  // Room types for different applications
  const roomTypes = [
    { name: 'Living Room', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Office', image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=2070&auto=format&fit=crop' }
  ];
  
  // Key configurator features
  const configuratorFeatures = [
    { 
      title: 'Real-time Visualization', 
      description: 'See exactly how your lighting will look before you buy',
      icon: <FaPalette className="text-[#50C878] text-2xl" />
    },
    { 
      title: 'Save Custom Presets', 
      description: 'Create and save your perfect lighting scenes for future use',
      icon: <FaStar className="text-[#50C878] text-2xl" />
    },
    { 
      title: 'Room-specific Settings', 
      description: 'Optimize lighting for different spaces and activities',
      icon: <FaCog className="text-[#50C878] text-2xl" />
    }
  ];

  // Update brightness and color temp when preset changes
  useEffect(() => {
    if (activePreset >= 0 && activePreset < presets.length) {
      setBrightness(presets[activePreset].brightness);
      setColorTemp(presets[activePreset].colorTemp);
    }
  }, [activePreset, presets]);

  // Auto-rotate presets only when in presets tab
  useEffect(() => {
    let interval;
    
    if (activeTab === 'presets') {
      interval = setInterval(() => {
        setActivePreset((prev) => (prev + 1) % presets.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [presets.length, activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // If switching to presets tab, set the active preset values
    if (tab === 'presets') {
      setBrightness(presets[activePreset].brightness);
      setColorTemp(presets[activePreset].colorTemp);
    }
  };

  // Handle preset selection
  const handlePresetSelect = (index) => {
    setActivePreset(index);
    setActiveTab('presets');
  };

  // Handle brightness change
  const handleBrightnessChange = (e) => {
    setBrightness(parseInt(e.target.value));
    setActiveTab('custom');
  };

  // Handle color temperature change
  const handleColorTempChange = (e) => {
    setColorTemp(parseInt(e.target.value));
    setActiveTab('custom');
  };

  // Get current color based on active preset or custom settings
  const getCurrentColor = () => {
    if (activeTab === 'presets') {
      return presets[activePreset].color;
    }
    
    // For custom tab, blend between warm and cool colors based on colorTemp
    const warmColor = '#F5A623'; // Warm color (amber)
    const coolColor = '#87CEAB'; // Cool color (light teal)
    
    // Simple linear interpolation between colors
    // In a real app, this would be more sophisticated
    return colorTemp <= 50 
      ? warmColor 
      : coolColor;
  };

  // Get opacity based on brightness
  const getBrightnessOpacity = () => {
    return brightness / 100;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // Add animations to the timeline
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1 },
      '-=0.6'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      controlsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );
    
    // Animate features with stagger
    gsap.fromTo(
      '.feature-item',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.15,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#F2F0E6] text-[#2B2D2F]"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Design Your <span className="text-[#50C878]">Perfect Light</span> with Our Configurator
          </h2>
          
          <p 
            ref={textRef}
            className="text-lg mb-8 text-[#2B2D2F]/80"
          >
            Experience our interactive lighting configurator that lets you visualize and customize your lighting setup in real-time. Adjust colors, brightness, and modes to create your ideal ambiance before purchase.
          </p>
          
          <div 
            ref={featuresRef} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {configuratorFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-item bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#2B2D2F]/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column - Interactive room preview */}
          <div className="lg:col-span-7">
            <div 
              ref={imageRef}
              className="relative rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[550px]"
            >
              <div className="absolute inset-0 bg-[#1e2022] flex items-center justify-center">
                {/* Room scene with lighting effect */}
                <div className="relative w-full h-full">
                  <Image
                    src={roomTypes[0].image}
                    alt="Modern living room"
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  
                  {/* Light overlay with current color and brightness */}
                  <div 
                    className="absolute inset-0 mix-blend-soft-light transition-all duration-500"
                    style={{ 
                      backgroundColor: getCurrentColor(),
                      opacity: getBrightnessOpacity()
                    }}
                  ></div>
                  
                  {/* Interactive elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full max-w-md">
                      <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white/30 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <motion.div 
                          className="w-32 h-32 rounded-full"
                          animate={{
                            backgroundColor: getCurrentColor(),
                            boxShadow: `0 0 40px 10px ${getCurrentColor()}`
                          }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1e2022] to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        {activeTab === 'presets' ? (
                          <>
                            <div className="flex items-center gap-2">
                              {presets[activePreset].icon}
                              <h3 className="text-white font-medium text-lg">{presets[activePreset].name}</h3>
                            </div>
                            <p className="text-gray-300 text-sm mt-1">{presets[activePreset].description}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-white font-medium text-lg">Custom Settings</h3>
                            <p className="text-gray-300 text-sm mt-1">Your personalized lighting configuration</p>
                          </>
                        )}
                      </div>
                      
                      {activeTab === 'presets' && (
                        <div className="flex gap-2">
                          {presets.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${activePreset === index ? 'bg-[#50C878] w-4' : 'bg-white/50'}`}
                              onClick={() => handlePresetSelect(index)}
                              aria-label={`Select ${presets[index].name} preset`}
                            ></button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Controls */}
          <div className="lg:col-span-5">
            <div 
              ref={controlsRef}
              className="bg-white rounded-xl shadow-xl p-6 md:p-8"
            >
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  className={`px-4 py-3 font-medium ${activeTab === 'presets' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-[#50C878]'}`}
                  onClick={() => handleTabChange('presets')}
                >
                  Lighting Presets
                </button>
                <button 
                  className={`px-4 py-3 font-medium ${activeTab === 'custom' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-500 hover:text-[#50C878]'}`}
                  onClick={() => handleTabChange('custom')}
                >
                  Custom Settings
                </button>
              </div>
              
              {activeTab === 'presets' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Select a Preset</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {presets.map((preset, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors duration-300 ${activePreset === index 
                          ? 'bg-[#2B2D2F] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handlePresetSelect(index)}
                      >
                        <div className="flex-shrink-0">
                          {preset.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className={`font-medium ${activePreset === index ? 'text-white' : 'text-[#2B2D2F]'}`}>
                            {preset.name}
                          </h4>
                          <p className={`text-xs ${activePreset === index ? 'text-gray-300' : 'text-gray-500'}`}>
                            Brightness: {preset.brightness}% • Color Temp: {preset.colorTemp < 50 ? 'Warm' : 'Cool'}
                          </p>
                        </div>
                        {activePreset === index && (
                          <FaCheck className="text-[#50C878] ml-auto flex-shrink-0" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Customize Your Lighting</h3>
                  
                  {/* Brightness slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Brightness</label>
                      <span className="text-sm text-gray-500">{brightness}%</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={brightness}
                        onChange={handleBrightnessChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #50C878 0%, #50C878 ${brightness}%, #e5e7eb ${brightness}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {/* Color temperature slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Color Temperature</label>
                      <div className="relative">
                        <span 
                          className="text-sm text-gray-500 cursor-help"
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        >
                          {colorTemp < 33 ? 'Warm' : colorTemp < 66 ? 'Neutral' : 'Cool'} <FaInfoCircle className="inline text-gray-400" />
                        </span>
                        {showTooltip && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-[#2B2D2F] text-white text-xs rounded shadow-lg z-10">
                            Warm (amber) light is cozy and relaxing, while cool (blue-white) light promotes focus and alertness.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={colorTemp}
                        onChange={handleColorTempChange}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: 'linear-gradient(to right, #F5A623 0%, #FFFFFF 50%, #87CEAB 100%)'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Warm</span>
                      <span>Cool</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                      Fine-tune your settings and save them as a custom preset in the full configurator.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <motion.div 
                  ref={buttonRef}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Link href="/configurator">
                    <span className="inline-flex items-center justify-center w-full gap-2 px-8 py-4 bg-[#50C878] hover:bg-[#3da861] text-white font-medium rounded-md transition-colors duration-300">
                      Try the Full Configurator
                      <FaArrowRight />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfiguratorPreview;
