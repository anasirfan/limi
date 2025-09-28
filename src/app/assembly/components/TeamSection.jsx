'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TeamSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const teamMembers = [
    {
      name: "Umer Asif",
      role: "Founder & CEO",
      description: "Inventor and cloud systems architect with deep expertise across hardware, UX, software, LLMs, and edge AI. Leads product innovation and AI-first experience strategy."
    },
    {
      name: "Shahrukh Ahmed", 
      role: "Co-Founder & CTO",
      description: "Seasoned engineering leader with a track record of delivering large-scale, mission-critical platforms — including the UK's national COVID health pass system. Brings deep expertise in architecting scalable, secure cloud and edge AI infrastructure."
    },
    {
      name: "Karen Law",
      role: "Co-Founder & Head of Behavioral Intelligence", 
      description: "PhD in Counseling Psychology. Specializes in behavioral data interpretation and human-environment interaction. Drives our AI's ability to understand emotional, contextual, and lifestyle patterns for adaptive lighting personalization."
    }
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
              THE MINDS BEHIND{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                LIMI AI
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
            A passionate and experienced team building the future of LIMI AI
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              {/* Team Card with custom border radius */}
              <motion.div
                className="relative bg-[#0F1511] text-white p-8 h-full transition-all duration-300 group-hover:bg-[#54bb74]/10 border border-[#54bb74]/20"
                style={{
                  borderRadius: '24px 0 24px 0', // top-left and bottom-right rounded
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(132, 204, 159, 0.4)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* Name and Role */}
                <div className="mb-6">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2 group-hover:text-[#54bb74] transition-colors duration-300"
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p 
                    className="text-[#93cfa2] font-semibold text-lg"
                  >
                    {member.role}
                  </motion.p>
                </div>

                {/* Description */}
                <motion.p 
                  className="text-white/80 leading-relaxed text-sm"
                >
                  {member.description}
                </motion.p>

                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/5 to-[#93cfa2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    borderRadius: '24px 0 24px 0',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
