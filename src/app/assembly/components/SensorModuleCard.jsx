'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SensorModuleCard = ({ title, description, icon, delay = 0 }) => {
  const [mounted, setMounted] = useState(true);

  if (!mounted) return null;

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Modern Card */}
      <motion.div
        className="relative bg-[#1a1a1a] text-white overflow-hidden"
        style={{
          height: '270px',
          borderRadius: '16px 16px 0 0', // Only top corners rounded
        }}
      >
        {/* MODULAR Pill Label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold tracking-wider uppercase text-white">
              MODULAR
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Top Section */}
          <div className="pt-8">
            <h3 className="text-2xl font-bold text-white mb-4 font-sans">
              {title}
            </h3>
            <p className="text-white/90 leading-relaxed font-sans text-sm">
              Experience the pinnacle of branding excellence with Brando as we proudly accept the Brand Brilliance Award.
            </p>
          </div>

          {/* Bottom Section - More Details Link */}
          <div className="mt-auto">
            <a
              href="#"
              className="inline-flex items-center text-[#54bb74] font-semibold text-sm font-sans"
            >
              More Details
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SensorModuleCard;
