'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import anime from 'animejs';
import { FaArrowRight, FaPlay, FaDownload, FaPhone, FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiSparkles, HiLightBulb, HiCube } from 'react-icons/hi';

const CTA = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-[#f3ebe2] to-white min-h-screen"
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-6xl md:text-8xl font-black text-[#292929] mb-6 leading-tight">
              READY TO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                TRANSFORM?
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

          <p className="text-2xl text-[#292929]/80 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Join the lighting revolution. Experience the future of modular, intelligent illumination 
            that adapts to your needs and grows with your space.
          </p>

          {/* Main CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 mb-8"
          >
            <HiLightBulb className="text-3xl" />
            <span>Start Your Journey</span>
            <FaArrowRight className="text-xl" />
          </motion.button>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#292929] text-white rounded-full font-semibold border-2 border-[#292929] hover:bg-transparent hover:text-[#292929] transition-all duration-300 flex items-center space-x-3"
            >
              <FaPlay className="text-lg" />
              <span>Watch Demo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-[#292929] rounded-full font-semibold border-2 border-[#292929] hover:bg-[#292929] hover:text-white transition-all duration-300 flex items-center space-x-3"
            >
              <FaDownload className="text-lg" />
              <span>Get Brochure</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { title: "Assembly Demo", desc: "Watch the modular assembly process", icon: HiCube, color: "from-[#54bb74] to-[#93cfa2]" },
            { title: "Smart Features", desc: "Experience AI-powered automation", icon: HiLightBulb, color: "from-[#93cfa2] to-[#54bb74]" },
            { title: "Customization", desc: "Explore endless possibilities", icon: HiSparkles, color: "from-[#54bb74] to-[#292929]" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 bg-white rounded-3xl shadow-xl border border-[#54bb74]/20 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-4 text-center">{feature.title}</h3>
              <p className="text-[#292929]/70 text-center mb-6 leading-relaxed">{feature.desc}</p>
              
              {/* Animation Placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-[#f3ebe2]/50 to-[#93cfa2]/20 rounded-2xl border border-[#54bb74]/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-sm text-[#292929]/60 font-medium">{feature.title} Animation</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                  className="absolute top-3 right-3 w-3 h-3 bg-[#54bb74] rounded-full"
                />
                <motion.div
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute bottom-3 left-3 w-2 h-2 bg-[#93cfa2] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>

        </section>


        )}