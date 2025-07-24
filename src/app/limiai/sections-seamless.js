'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaArrowRight, FaUsers, FaRocket, FaChartLine, FaLightbulb, FaNetworkWired, FaCloud } from 'react-icons/fa';
import { HiCube, HiSparkles, HiLightningBolt } from 'react-icons/hi';

// Seamless Traction Section
export const SeamlessTractionSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate section progress (20% to 40% of total scroll)
  const sectionProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  
  const backgroundColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#292929', '#f3ebe2', '#f3ebe2']
  );
  
  const textColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#ffffff', '#292929', '#292929']
  );
  
  const textColorSecondary = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(41,41,41,0.7)']
  );

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-4xl md:text-6xl font-[Amenti] font-bold mb-8 leading-tight"
          >
            An <span className="italic text-[#54bb74]">Unprecedented</span> Foundation
            <br />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="text-3xl md:text-4xl font-normal"
            >
              for a Series A
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { 
              value: "£50,000,000+", 
              label: "Letters of Intent", 
              sublabel: "From Fortune 500 partners",
              icon: FaChartLine,
              delay: 0.3
            },
            { 
              value: "0%", 
              label: "Customer Churn Rate", 
              sublabel: "100% retention across all deployments",
              icon: FaUsers,
              delay: 0.5
            },
            { 
              value: "55%+", 
              label: "Gross Margin", 
              sublabel: "Software-like economics at scale",
              icon: FaRocket,
              delay: 0.7
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: metric.delay, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-[#54bb74]/30">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center">
                    <metric.icon className="text-2xl text-white" />
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: metric.delay + 0.2 }}
                  viewport={{ once: true }}
                  style={{ color: textColor }}
                  className="text-4xl md:text-5xl font-[Amenti] font-bold mb-4 text-center"
                >
                  {metric.value}
                </motion.div>
                
                <motion.h3 
                  style={{ color: textColor }}
                  className="text-xl font-semibold mb-2 text-center"
                >
                  {metric.label}
                </motion.h3>
                
                <motion.p 
                  style={{ color: textColorSecondary }}
                  className="text-center leading-relaxed"
                >
                  {metric.sublabel}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Seamless Strategy Section
export const SeamlessStrategySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate section progress (40% to 60% of total scroll)
  const sectionProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  const backgroundColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#f3ebe2', '#292929', '#292929']
  );
  
  const textColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#292929', '#ffffff', '#ffffff']
  );
  
  const textColorSecondary = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)']
  );

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-4xl md:text-6xl font-[Amenti] font-bold mb-8 leading-tight"
          >
            Our <span className="italic text-[#54bb74]">Three-Layer</span>
            <br />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="text-3xl md:text-4xl font-normal"
            >
              AI Infrastructure Moat
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="space-y-16">
          {[
            {
              title: "Hardware Anchor",
              subtitle: "Physical Foundation",
              description: "Proprietary sensor arrays and edge computing nodes that create the physical touchpoints for ambient intelligence in every space.",
              icon: HiCube,
              gradient: "from-[#54bb74] to-[#93cfa2]",
              delay: 0.3
            },
            {
              title: "Edge AI OS",
              subtitle: "Intelligence Layer",
              description: "Real-time processing engine that transforms raw environmental data into contextual insights without cloud dependency.",
              icon: HiLightningBolt,
              gradient: "from-[#93cfa2] to-[#54bb74]",
              delay: 0.5
            },
            {
              title: "Cloud Gateway",
              subtitle: "Scale Infrastructure",
              description: "Unified API platform that enables seamless integration with existing enterprise systems and third-party applications.",
              icon: FaCloud,
              gradient: "from-[#54bb74] via-[#93cfa2] to-[#54bb74]",
              delay: 0.7
            }
          ].map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: layer.delay, type: "spring", stiffness: 80 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className={`w-32 h-32 bg-gradient-to-br ${layer.gradient} rounded-3xl shadow-2xl flex items-center justify-center mb-8 lg:mb-0 mx-auto lg:mx-0`}
                >
                  <layer.icon className="text-4xl text-white" />
                </motion.div>
              </div>
              
              <div className="flex-2 text-center lg:text-left">
                <motion.h3 
                  style={{ color: textColor }}
                  className="text-3xl md:text-4xl font-[Amenti] font-bold mb-4"
                >
                  {layer.title}
                </motion.h3>
                
                <motion.p 
                  style={{ color: textColor }}
                  className="text-lg md:text-xl font-medium mb-6 text-[#54bb74]"
                >
                  {layer.subtitle}
                </motion.p>
                
                <motion.p 
                  style={{ color: textColorSecondary }}
                  className="text-lg leading-relaxed max-w-2xl"
                >
                  {layer.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Seamless Opportunity Section
export const SeamlessOpportunitySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate section progress (60% to 80% of total scroll)
  const sectionProgress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  
  const backgroundColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#292929', '#f3ebe2', '#f3ebe2']
  );
  
  const textColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#ffffff', '#292929', '#292929']
  );
  
  const textColorSecondary = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(41,41,41,0.7)']
  );

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-4xl md:text-6xl font-[Amenti] font-bold mb-8 leading-tight"
          >
            The <span className="italic text-[#54bb74]">Market Consolidation</span>
            <br />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="text-3xl md:text-4xl font-normal"
            >
              Play of the Decade
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 lg:p-16"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                "Smart Buildings",
                "IoT Platforms", 
                "Energy Management",
                "Security Systems",
                "HVAC Controls",
                "Lighting Networks",
                "Space Analytics",
                "Facility Management"
              ].map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-[#54bb74]/20 to-[#93cfa2]/20 rounded-2xl p-6 border border-[#54bb74]/20">
                    <motion.p 
                      style={{ color: textColor }}
                      className="font-medium"
                    >
                      {market}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-8"
              >
                <FaArrowRight className="text-4xl text-[#54bb74] transform rotate-90" />
              </motion.div>
              
              <div className="bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-3xl p-8 lg:p-12 shadow-2xl">
                <motion.h3 
                  className="text-3xl lg:text-4xl font-[Amenti] font-bold text-white mb-4"
                >
                  LIMI
                </motion.h3>
                <motion.p 
                  className="text-xl text-white/90 font-medium"
                >
                  The Unifying Standard
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Seamless Team Section
export const SeamlessTeamSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate section progress (80% to 90% of total scroll)
  const sectionProgress = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  
  const backgroundColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#f3ebe2', '#292929', '#292929']
  );
  
  const textColor = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['#292929', '#ffffff', '#ffffff']
  );
  
  const textColorSecondary = useTransform(
    sectionProgress,
    [0, 0.8, 1],
    ['rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)']
  );

  const team = [
    {
      name: "Umer",
      role: "Visionary Operator",
      description: "Former McKinsey consultant with deep enterprise relationships and strategic vision for market transformation.",
      delay: 0.3
    },
    {
      name: "Dr. Karen",
      role: "On-Ground Executor", 
      description: "PhD in AI/ML with 15+ years building scalable infrastructure platforms for Fortune 500 companies.",
      delay: 0.5
    },
    {
      name: "Shahrukh",
      role: "Enterprise Scaler",
      description: "Former enterprise sales leader with proven track record of scaling B2B platforms from $0 to $100M ARR.",
      delay: 0.7
    }
  ];

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-4xl md:text-6xl font-[Amenti] font-bold mb-8 leading-tight"
          >
            The <span className="italic text-[#54bb74]">Right Team</span>
            <br />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="text-3xl md:text-4xl font-normal"
            >
              to Win
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: member.delay, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-[#54bb74]/30">
                <div className="w-24 h-24 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-[Amenti] font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                
                <motion.h3 
                  style={{ color: textColor }}
                  className="text-2xl font-[Amenti] font-bold mb-2 text-center"
                >
                  {member.name}
                </motion.h3>
                
                <motion.p 
                  className="text-lg font-medium mb-4 text-center text-[#54bb74]"
                >
                  {member.role}
                </motion.p>
                
                <motion.p 
                  style={{ color: textColorSecondary }}
                  className="text-center leading-relaxed"
                >
                  {member.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Seamless Final CTA Section
export const SeamlessFinalCTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate section progress (90% to 100% of total scroll)
  const sectionProgress = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  
  const backgroundColor = useTransform(
    sectionProgress,
    [0, 1],
    ['#292929', '#292929']
  );
  
  const textColor = '#ffffff';
  const textColorSecondary = 'rgba(255,255,255,0.7)';

  return (
    <motion.section 
      ref={ref}
      style={{ backgroundColor }}
      className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-4xl md:text-6xl font-[Amenti] font-bold mb-8 leading-tight"
          >
            The <span className="italic text-[#54bb74]">Ask</span> & Vision
          </motion.h2>
          
          <motion.p 
            style={{ color: textColorSecondary }}
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12"
          >
            We're raising <span className="text-[#54bb74] font-semibold">$20M Series A</span> to become 
            the foundational AI infrastructure layer for the next generation of intelligent spaces.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
          >
            <span className="relative flex items-center gap-3 z-10">
              Request Access to Data Room
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.div>
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: textColor }}
            className="px-12 py-5 border-2 border-white/20 rounded-2xl font-semibold text-lg transition-all duration-500 hover:border-[#54bb74]/50 hover:bg-white/5"
          >
            Schedule Call
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};
