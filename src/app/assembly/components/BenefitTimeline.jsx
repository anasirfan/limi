'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const BenefitTimeline = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    {
      title: "Instant Intelligence",
      description: "Deploy a complete AI ecosystem in minutes. No complex setup, no learning curve—just immediate intelligent automation that transforms any space into a responsive environment.",
      video: "/limiai/benefit1.mp4",
    },
    {
      title: "Adaptive Architecture",
      description: "Modular AI components that scale with your needs. Build comprehensive smart environments from single rooms to entire buildings with seamless integration.",
      video: "/limiai/benefit2.mp4",
    },
    {
      title: "Predictive Automation",
      description: "Machine learning algorithms that study your patterns, anticipate needs, and create personalized experiences. Your space evolves to serve you better every day.",
      video: "/limiai/benefit3.mp4",
    },
    {
      title: "Enterprise-Grade Intelligence",
      description: "Military-grade security, 99.9% uptime reliability, and professional-level performance. Built for mission-critical environments that demand perfection.",
      video: "/limiai/benefit4.mp4",
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative pb-20 pt-24 bg-[#010101] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-[#54bb74]/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.02,
                repeat: Infinity,
                repeatDelay: 8
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              WHY CHOOSE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                INTELLIGENCE
              </span>
            </h2>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-16 h-16 border-4 border-[#54bb74]/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-8 w-8 h-8 bg-[#93cfa2] rounded-full"
            />
          </div>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Discover the revolutionary advantages that make our AI ecosystem 
            the future of autonomous environments.
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          {/* Left Column - Options */}
          <div className="lg:w-1/2 ml-0 lg:ml-8">
            <div className="space-y-6">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => setSelectedOption(index)}
                >
                  {/* Option Label - Only this gets green background */}
                  <motion.div 
                    className="flex items-center space-x-4 p-4 rounded-lg outline-none"
                    style={{
                      backgroundColor: selectedOption === index ? '#8ECA9F1A' : 'transparent'
                    }}
                    animate={{
                      backgroundColor: selectedOption === index ? '#8ECA9F1A' : 'transparent',
                      scale: selectedOption === index ? 1.02 : 1
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: selectedOption === index ? '#8ECA9F1A' : 'rgba(255,255,255,0.05)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    <motion.span 
                      className={`text-2xl font-bold transition-colors duration-500 ease-out ${
                        selectedOption === index ? 'text-[#54bb74]' : 'text-white/50'
                      }`}
                      animate={{
                        scale: selectedOption === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.span 
                      className={`text-lg font-semibold transition-colors duration-500 ease-out ${
                        selectedOption === index ? 'text-white' : 'text-white/70'
                      }`}
                      animate={{
                        x: selectedOption === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {option.title}
                    </motion.span>
                  </motion.div>
                  
                  {/* Selected option description - No green background */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: selectedOption === index ? 'auto' : 0,
                      opacity: selectedOption === index ? 1 : 0,
                      marginTop: selectedOption === index ? 16 : 0,
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.4, 0.0, 0.2, 1],
                      opacity: { duration: 0.4 }
                    }}
                    className="overflow-hidden ml-12"
                  >
                    <motion.p 
                      className="text-white/80 leading-relaxed"
                      initial={{ y: 10 }}
                      animate={{ 
                        y: selectedOption === index ? 0 : 10 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: selectedOption === index ? 0.2 : 0,
                        ease: "easeOut"
                      }}
                    >
                      {option.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="lg:w-1/2  pl-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[400px] lg:h-[500px] rounded-l-lg overflow-hidden relative"
            >
              <motion.video
                key={selectedOption}
                src={options[selectedOption].video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              />
              {/* Video overlay for smooth transitions */}
              <motion.div
                className="absolute inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitTimeline;
                       