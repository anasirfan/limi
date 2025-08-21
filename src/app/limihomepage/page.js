"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "./components/GridBackground";
import ParticleBackground from "./components/ParticleBackground";
import WaveBackground from "./components/WaveBackground";
import GeometricBackground from "./components/GeometricBackground";
import NoiseBackground from "./components/NoiseBackground";
import GradientMeshBackground from "./components/GradientMeshBackground";
import ThreadsBackground from "./components/ThreadsBackground";
import OrbBackground from "./components/OrbBackground";
import BeamsBackground from "./components/BeamsBackground";

const LimiHomepage = () => {
  const [currentBackground, setCurrentBackground] = useState(0);

  const backgrounds = [
    { name: "Grid Pattern", component: GridBackground },
    { name: "Particle System", component: ParticleBackground },
    { name: "Wave Animation", component: WaveBackground },
    { name: "Geometric Shapes", component: GeometricBackground },
    { name: "Noise Field", component: NoiseBackground },
    { name: "Gradient Mesh", component: GradientMeshBackground },
    { name: "Threads", component: ThreadsBackground },
    { name: "Orb", component: OrbBackground },
    { name: "Beams", component: BeamsBackground },
  ];

  const nextBackground = () => {
    setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBackground = () => {
    setCurrentBackground((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  const CurrentBackgroundComponent = backgrounds[currentBackground].component;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <CurrentBackgroundComponent />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4">
            LIMI
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50C878] to-[#87CEAB]">
              AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Experience the future of intelligent lighting with dynamic backgrounds
          </p>
        </motion.div>

        {/* Background Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Current Background Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#50C878] mb-2">
              {backgrounds[currentBackground].name}
            </h3>
            <p className="text-white/60">
              {currentBackground + 1} of {backgrounds.length}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-6">
            <button
              onClick={prevBackground}
              className="group p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-[#50C878] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {backgrounds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBackground(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentBackground
                      ? "bg-[#50C878] scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextBackground}
              className="group p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-[#50C878] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-cycle Toggle */}
          <button
            onClick={() => {
              // Auto-cycle through backgrounds every 5 seconds
              const interval = setInterval(() => {
                setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
              }, 5000);
              
              // Clear after 30 seconds
              setTimeout(() => clearInterval(interval), 30000);
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Auto Cycle Backgrounds
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-white/40 text-sm">
            LIMI AI Experience
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LimiHomepage;
