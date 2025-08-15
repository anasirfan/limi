'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRadar, FaMicrophone, FaCamera, FaInfoCircle } from 'react-icons/fa';
import { HiWifi, HiMicrophone, HiCamera } from 'react-icons/hi';
import anime from 'animejs';

const SensorModuleCard = ({ title, description, icon, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  const iconMap = {
    radar: HiWifi,
    microphone: HiMicrophone,
    camera: HiCamera
  };

  const IconComponent = iconMap[icon] || HiWifi;

  const sensorDetails = {
    radar: {
      specs: ['Range: 0-10m', 'Accuracy: ±5cm', 'Response: <100ms'],
      features: ['Motion Detection', 'Occupancy Sensing', 'Gesture Recognition']
    },
    microphone: {
      specs: ['Frequency: 20Hz-20kHz', 'SNR: >60dB', 'Directional: 360°'],
      features: ['Voice Commands', 'Sound Analysis', 'Noise Cancellation']
    },
    camera: {
      specs: ['Resolution: 1080p', 'FPS: 30', 'FOV: 120°'],
      features: ['Object Detection', 'Face Recognition', 'Gesture Control']
    }
  };

  const currentSensor = sensorDetails[icon] || sensorDetails.radar;

  useEffect(() => {
    setMounted(true);

    if (cardRef.current) {
      // Initial entrance animation
      anime({
        targets: cardRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        delay: delay * 1000,
        easing: 'easeOutCubic'
      });

      // Floating animation
      anime({
        targets: cardRef.current,
        translateY: [-5, 5],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, [delay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        duration: 300,
        easing: 'easeOutCubic'
      });

      // Animate internal elements
      anime({
        targets: cardRef.current.querySelectorAll('.card-icon'),
        scale: [1, 1.2],
        rotate: [0, 360],
        duration: 600,
        easing: 'easeOutBack'
      });

      anime({
        targets: cardRef.current.querySelectorAll('.card-content'),
        translateY: [0, -5],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 300,
        easing: 'easeOutCubic'
      });

      anime({
        targets: cardRef.current.querySelectorAll('.card-icon'),
        scale: 1,
        rotate: 0,
        duration: 400,
        easing: 'easeOutCubic'
      });

      anime({
        targets: cardRef.current.querySelectorAll('.card-content'),
        translateY: 0,
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glassmorphism Card */}
        <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#54bb74]/20 via-transparent to-[#93cfa2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#54bb74] via-[#93cfa2] to-[#54bb74] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
            <div className="w-full h-full rounded-2xl bg-[#292929]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="card-icon mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#54bb74] to-[#93cfa2] flex items-center justify-center shadow-lg">
                <IconComponent className="text-3xl text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="card-content text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {description}
              </p>

              {/* Specs Preview */}
              <div className="space-y-2 mb-6">
                {currentSensor.specs.slice(0, 2).map((spec, index) => (
                  <div key={index} className="text-sm text-gray-400 flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></span>
                    {spec}
                  </div>
                ))}
              </div>

              {/* Info Button */}
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-all duration-300"
              >
                <FaInfoCircle className="mr-2" />
                More Details
              </button>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {/* Particle Effect */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#54bb74] rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#93cfa2] rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-20"
          >
            <div className="bg-[#292929] rounded-xl p-6 shadow-2xl border border-[#54bb74]/20 min-w-[300px]">
              <h4 className="text-lg font-bold text-white mb-4">Technical Specifications</h4>
              
              <div className="space-y-3 mb-4">
                {currentSensor.specs.map((spec, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-[#54bb74] rounded-full mr-3"></span>
                    <span className="text-sm">{spec}</span>
                  </div>
                ))}
              </div>

              <h5 className="text-md font-semibold text-white mb-3">Key Features</h5>
              <div className="space-y-2">
                {currentSensor.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-[#93cfa2] rounded-full mr-3"></span>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#292929] rotate-45 border-l border-t border-[#54bb74]/20"></div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#54bb74]/20 to-[#93cfa2]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default SensorModuleCard;
