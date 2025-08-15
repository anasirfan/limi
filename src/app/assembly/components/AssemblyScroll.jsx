'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { HiCube, HiOutlineWifi, HiLightningBolt, HiCog } from 'react-icons/hi';

const AssemblyScroll = () => {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const steps = [
    {
      id: 1,
      title: 'Install the Base',
      description: 'Mount the intelligent base unit to your ceiling. Zero-config installation with built-in power management.',
      icon: HiCube,
      color: '#54bb74',
      highlights: ['Zero-config installation', 'Built-in power management', 'Universal mounting system'],
      animation: 'base-install'
    },
    {
      id: 2,
      title: 'Connect the Cable',
      description: 'Plug in the smart cable system. Automatic detection and power distribution to all components.',
      icon: HiOutlineWifi,
      color: '#93cfa2',
      highlights: ['Automatic detection', 'Smart power distribution', 'Flexible cable management'],
      animation: 'cable-connect'
    },
    {
      id: 3,
      title: 'Attach the Pendant',
      description: 'Snap on your chosen pendant design. Magnetic connection ensures perfect alignment every time.',
      icon: HiLightningBolt,
      color: '#54bb74',
      highlights: ['Magnetic connection', 'Perfect alignment', 'Multiple design options'],
      animation: 'pendant-attach'
    },
    {
      id: 4,
      title: 'Add Smart Modules',
      description: 'Insert sensor modules for advanced functionality. Radar, microphone, and camera modules available.',
      icon: HiCog,
      color: '#292929',
      highlights: ['Plug-and-play sensors', 'Advanced AI processing', 'Expandable ecosystem'],
      animation: 'module-insert'
    }
  ];

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Create scroll-triggered animations for each step
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: `.step-${index}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentStep(index),
          onEnterBack: () => setCurrentStep(index),
        });

        // Animate step content
        gsap.fromTo(`.step-content-${index}`, 
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power.out',
            scrollTrigger: {
              trigger: `.step-${index}`,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate step visual
        gsap.fromTo(`.step-visual-${index}`, 
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: `.step-${index}`,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Progress bar animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.progress-bar', {
            scaleY: progress,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-[#292929] to-[#1a1a1a] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2354bb74\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
</div>


      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            ASSEMBLY
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              {' '}PROCESS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how our modular system comes together in four simple steps. 
            Each component is designed for effortless installation and perfect integration.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
          <div className="relative">
            <div className="w-1 h-64 bg-white/20 rounded-full">
              <div className="progress-bar w-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2] rounded-full origin-top scale-y-0"></div>
            </div>
            <div className="absolute -left-2 top-0 w-5 h-5 bg-[#54bb74] rounded-full"></div>
            <div className="absolute -left-2 bottom-0 w-5 h-5 bg-[#93cfa2] rounded-full"></div>
          </div>
        </div>

        {/* Assembly Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`step-${index} relative`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Step Content */}
                <div className={`step-content-${index} ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="text-2xl text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                        Step {step.id}
                      </span>
                      <h3 className="text-3xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3 mb-8">
                    {step.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="flex items-center text-gray-300"
                      >
                        <FaCheck className="text-[#54bb74] mr-3 text-sm" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Step Indicator */}
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-4">
                      {steps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx <= index ? 'bg-[#54bb74]' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {index + 1} of {steps.length}
                    </span>
                  </div>
                </div>

                {/* Step Visual */}
                <div className={`step-visual-${index} ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    {/* Enhanced Animation Placeholder */}
                    <div className="w-full h-[400px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden relative">
                      {/* Background Grid */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
                          {[...Array(24)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="border border-[#54bb74]/30"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0.5, 0] }}
                              transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 4
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="text-center">
                          <motion.div 
                            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 10, 0]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            <step.icon className="text-3xl text-white" />
                          </motion.div>
                          <span className="text-white/70 text-lg font-medium block mb-2">
                            {step.animation} Animation
                          </span>
                          <div className="flex justify-center space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-[#54bb74] rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Interactive Elements */}
                      <motion.div
                        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-4 left-4 w-6 h-6 bg-[#54bb74]/40 rounded-full"
                      />
                      <motion.div
                        animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="absolute bottom-4 right-4 w-4 h-4 bg-[#93cfa2]/50 rounded-full"
                      />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-[#54bb74] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <FaArrowRight className="text-white text-sm" />
                    </motion.div>
                    
                    {/* Step Progress Indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {steps.map((_, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            stepIndex <= index ? 'bg-[#54bb74]' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Modular Lighting?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(84, 187, 116, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Start Your Installation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AssemblyScroll;
