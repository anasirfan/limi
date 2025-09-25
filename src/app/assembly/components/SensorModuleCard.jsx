'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRadar, FaMicrophone, FaCamera, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { HiWifi, HiMicrophone, HiCamera } from 'react-icons/hi';
import anime from 'animejs';

const SensorModuleCard = ({ title, description, icon, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
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



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative ">
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        transition={{ duration: 0.3 }}
      >
        {/* Glassmorphism Card */}
        <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
              <h3 className="text-2xl font-bold text-[#292929] group-hover:text-[#292929] mb-4">
                {title}
              </h3>
              <p className="text-[#292929]/70 group-hover:text-[#292929]/80 leading-relaxed mb-6">
                {description}
              </p>

              {/* Specs Preview */}
              <div className="space-y-2 mb-6">
                {currentSensor.specs.slice(0, 2).map((spec, index) => (
                  <div key={index} className="text-sm text-[#292929]/60 group-hover:text-[#292929]/70 flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></span>
                    {spec}
                  </div>
                ))}
              </div>

              {/* Info Button */}
              <button
                onClick={openModal}
                className="inline-flex items-center px-4 py-2 bg-[#54bb74]/10 hover:bg-[#54bb74]/20 rounded-full text-sm text-[#292929] transition-all duration-300"
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/20 via-transparent to-[#93cfa2]/10"></div>
              
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-all duration-200"
              >
                <FaTimes />
              </button>
              
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
                    style={{ backgroundColor: '#54bb74' }}
                  >
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#292929] leading-tight mb-2">
                      {title} Sensor
                    </h3>
                    <p className="text-lg text-[#54bb74] font-semibold">
                      Technical Specifications & Features
                    </p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Technical Specifications */}
                  <div>
                    <h4 className="text-xl font-bold text-[#292929] mb-4 flex items-center">
                      <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-3"></div>
                      Technical Specs
                    </h4>
                    <div className="space-y-3">
                      {currentSensor.specs.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex items-center p-3 bg-gradient-to-r from-[#f3ebe2]/30 to-[#93cfa2]/20 rounded-xl"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-[#292929] font-medium">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xl font-bold text-[#292929] mb-4 flex items-center">
                      <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-3"></div>
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {currentSensor.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                          className="flex items-center p-3 bg-white rounded-xl border border-[#54bb74]/10 shadow-sm"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-[#292929] font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8 p-6 bg-gradient-to-r from-[#292929] to-[#1a1a1a] rounded-2xl text-white">
                  <h4 className="text-lg font-bold mb-3">About This Sensor</h4>
                  <p className="text-white/90 leading-relaxed">
                    {description} This advanced sensor module integrates seamlessly with our modular lighting system, 
                    providing intelligent automation and enhanced user experience through cutting-edge technology.
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#54bb74]/20 to-[#93cfa2]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default SensorModuleCard;
