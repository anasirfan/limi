'use client';
import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaBrain, FaCloud, FaArrowRight, FaTimes, FaLightbulb, FaMicrochip, FaStore, FaWifi, FaHome, FaBuilding } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Enhanced What We're Really Building Section with Particles
export const TractionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2] to-white/80 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#54bb74]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-[#54bb74]/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-[#93cfa2]/5 to-[#54bb74]/5 rounded-2xl"
          animate={{ 
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-[#54bb74]/10 rounded-full"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            The Inflection Point: <span className="font-[Amenti] italic text-[#54bb74]">Why LIMI Exists Now</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-[Amenti] text-[#292929]/80 mb-8">
            LIMI rides the convergence of three unstoppable trends
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaBrain className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-[Amenti] text-[#292929] mb-4">
              AI Maturity
            </h4>
            <p className="text-[#292929]/70 leading-relaxed">
              Edge AI chips + powerful local LLMs unlock real-time, ambient intelligence
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaMicrochip className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-[Amenti] text-[#292929] mb-4">
              Sensor & Hardware Miniaturization
            </h4>
            <p className="text-[#292929]/70 leading-relaxed">
              High-performance modules now embed invisibly into everyday objects
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaStore className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-[Amenti] text-[#292929] mb-4">
              Market Readiness
            </h4>
            <p className="text-[#292929]/70 leading-relaxed">
              Post-COVID home focus + device fatigue = demand for seamless, private tech
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center pt-8"
        >
          <p className="text-2xl font-[Amenti] text-[#54bb74] leading-relaxed">
            LIMI is not early. It's right on time. The moment for infrastructure-led ambient AI is now.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Dark Strategy Section with Grid Background
export const StrategySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problemSolution = {
    problem: [
      "\"Smart\" devices are fragmented, cloud-dependent, and privacy-invasive",
      "No unified, ambient interface exists in the built environment"
    ],
    solution: [
      "Sensors, cameras, mics, speakers",
      "Embedded AI processors running locally",
      "Zero rewiring or disruption"
    ]
  };

  const metrics = [
    {
      value: "£57.5M",
      title: "LOI Signed",
      description: "Commercial Viability: De-risked"
    },
    {
      value: "0%",
      title: "Churn from Beta Installs",
      description: "Product-Market Fit: De-risked"
    },
    {
      value: "55%+",
      title: "Gross Margins",
      description: "Scalable Profitability: De-risked"
    },
    {
      value: "<£200K",
      title: "Bootstrapped",
      description: "Capital Efficiency: De-risked"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-[#292929] via-[#1a1a1a] to-[#292929] overflow-hidden"
    >
      {/* Dark theme background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(84, 187, 116, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84, 187, 116, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#54bb74]/10 to-[#93cfa2]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-[#93cfa2]/8 to-[#54bb74]/8 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating tech elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#54bb74]/30 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Circuit-like lines */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#54bb74]/20 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#93cfa2]/15 to-transparent"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-white leading-[1.2] tracking-tight mb-6">
            The Smart Home is Still a <span className="font-[Amenti] italic text-[#54bb74]">Dumb House</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-red-900/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20"
          >
            <h3 className="text-2xl font-[Amenti] text-red-400 mb-6">Problem:</h3>
            <div className="space-y-4">
              {problemSolution.problem.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-green-900/20 backdrop-blur-sm rounded-3xl p-8 border border-[#54bb74]/20"
          >
            <h3 className="text-2xl font-[Amenti] text-[#54bb74] mb-6">Solution:</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              LIMI installs modular, upgradeable AI nodes in the one place that already touches every space: lighting. Each fixture becomes an AI port, enabling seamless intelligence via:
            </p>
            <div className="space-y-4">
              {problemSolution.solution.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#54bb74] rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-[Amenti] text-white mb-12">
            De-Risked at Every Level: <span className="text-[#54bb74]">The Foundation is Built</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-[Amenti] font-bold text-[#54bb74] mb-3">{metric.value}</div>
                <h4 className="text-lg font-[Amenti] font-semibold text-white mb-2">{metric.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Opportunity Section with Background Image
export const OpportunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const layers = [
    {
      icon: FaLightbulb,
      title: "Lighting Infrastructure",
      description: "The entry point that's already in every space",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaMicrochip,
      title: "Expanded Capabilities",
      description: "Cameras that monitor posture, Sensors for health, security, air quality",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    },
    {
      icon: FaWifi,
      title: "Integration",
      description: "Sensors for health, security, air quality",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaBrain,
      title: "Ambient Intelligence",
      description: "Local LLMs powering real-world assistants",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-white/60 to-[#f3ebe2] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, rgba(84, 187, 116, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-1/4 right-1/6 w-20 h-20 border-2 border-[#54bb74]/20 rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/6 w-16 h-16 bg-[#93cfa2]/10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Subtle light rays */}
        <motion.div
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-[#54bb74]/10 via-transparent to-[#54bb74]/10"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            Lighting Is Just the Wedge. <span className="font-[Amenti] italic text-[#54bb74]">The Real Play Is Infrastructure</span>
          </h2>
          <p className="text-xl text-[#292929]/70 max-w-4xl mx-auto leading-relaxed">
            LIMI uses lighting to earn permanent access to ceilings and walls—then expands horizontally:
          </p>
        </motion.div>

        <div className="space-y-16">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Icon */}
              <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${layer.gradient} rounded-3xl shadow-2xl`}
                >
                  <layer.icon className="text-4xl text-white" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className={`lg:col-span-9 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#54bb74]/10 rounded-full border border-[#54bb74]/20">
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-[#292929]/80 tracking-wide">{layer.title.split(' — ')[0].toUpperCase()}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-[Amenti] text-[#292929] leading-tight">
                    {layer.title}
                  </h3>
                </div>
                
                <p className="text-xl text-[#292929]/70 leading-relaxed font-normal max-w-3xl">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="text-2xl font-[Amenti] text-[#292929] leading-relaxed max-w-4xl mx-auto">
            This isn't participation in the smart lighting category. It's a full absorption toward owning the <span className="text-[#54bb74] font-semibold">OS layer for physical space.</span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Learning Loop Section with Particle Effects
export const LearningLoopSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const loopSteps = [
    {
      icon: FaBuilding,
      title: "Deploy Infra",
      description: "LIMI nodes gather unique occupancy, motion,air, and engagement data",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaBrain,
      title: "Learn Patterns",
      description: "Proprietary edge/cloud models extract behavioral insights",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    },
    {
      icon: FaCloud,
      title: "Deepen Engagement",
      description: "More use 3 better performance 3 more value 3 faster loop",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaCloud, //use repeat icon
      title: "Improve System",
      description: "OTA updates push better predictions, automation, and features",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2] to-white/90 overflow-hidden"
      
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1649190800938-05929836db2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          filter: 'blur(2px)'
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3ebe2]/10 to-white/30" />
      {/* Animated background with neural network effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Neural network nodes */}
        {/* {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#54bb74]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))} */}
        
        {/* Connecting lines effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#54bb74]/20 to-transparent"
          animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-[#93cfa2]/20 to-transparent"
          animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        
        {/* Circular motion elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 border border-[#54bb74]/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            Our Learning Loop: <span className="font-[Amenti] italic text-[#54bb74]">The Intelligence Flywheel</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Every LIMI installation becomes smarter, creating a compounding advantage that competitors can't replicate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Deploy Infra */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-[Amenti] text-[#292929] font-semibold">{loopSteps[0].title}</h3>
              </div>
              <p className="text-[#292929]/70 leading-relaxed">{loopSteps[0].description}</p>
            </motion.div>

            {/* Optimize Experience */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center">
                  <FaCloud className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-[Amenti] text-[#292929] font-semibold">{loopSteps[2].title}</h3>
              </div>
              <p className="text-[#292929]/70 leading-relaxed">{loopSteps[2].description}</p>
            </motion.div>
          </div>

          {/* Center Column - Wheel Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <motion.img
                src="/images/limiai/wheel.png"
                alt="Intelligence Flywheel"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {/* Glowing effect around wheel */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/10 to-[#93cfa2]/10 rounded-full blur-xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="order-3 lg:order-3 space-y-8">
            {/* Learn Patterns */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-xl flex items-center justify-center">
                  <FaBrain className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-[Amenti] text-[#292929] font-semibold">{loopSteps[1].title}</h3>
              </div>
              <p className="text-[#292929]/70 leading-relaxed">{loopSteps[1].description}</p>
            </motion.div>

            {/* Improve System */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center">
                  <FaCloud className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-[Amenti] text-[#292929] font-semibold">{loopSteps[3].title}</h3>
              </div>
              <p className="text-[#292929]/70 leading-relaxed">{loopSteps[3].description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced Team Section with Professional Styling
export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const founders = [
    {
      name: "Umer Asif",
      title: "Founder & CEO",
      description: "Bootstrapped LIMI to £57.5M LOI. Built factory + modular IP after top-tier R&D firms failed.",
      linkedin: "LinkedIn"
    },
    {
      name: "Dr. Karen Law",
      title: "COO", 
      description: "PhD fluent in Mandarin, Cantonese & English. Runs our China factory—full ops control.",
      linkedin: "LinkedIn"
    },
    {
      name: "Anasim Asif",
      title: "CTO",
      description: "Full-stack engineer. Built our entire platform from embedded firmware to cloud infrastructure.",
      linkedin: "LinkedIn"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-[#292929] via-[#1a1a1a] to-[#292929] overflow-hidden"
    >
      {/* Professional background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Elegant light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#54bb74]/10 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#93cfa2]/10 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating professional elements */}
        <motion.div
          className="absolute top-1/4 right-1/6 w-12 h-12 border border-[#54bb74]/20 rounded-full"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-white leading-[1.2] tracking-tight mb-6">
            The Team: <span className="font-[Amenti] italic text-[#54bb74]">Execution-Focused Founders</span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Three complementary skill sets, one unified vision: ambient AI infrastructure for every space
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:border-[#54bb74]/30 transition-all duration-300"
            >
              <div className="relative mb-6">
                {/* Professional avatar placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-2xl font-[Amenti] font-bold text-white">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/10 to-[#93cfa2]/10 rounded-2xl blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index }}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-[Amenti] font-bold text-white mb-2">
                    {founder.name}
                  </h3>
                  
                  <p className="text-lg font-medium text-[#54bb74]">
                    {founder.title}
                  </p>
                </div>
                
                <p className="text-white/70 leading-relaxed font-normal">
                  {founder.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Export the remaining sections from the original file
export { MarketSection, RaisingSection, FinalCTASection } from './sections-light';
