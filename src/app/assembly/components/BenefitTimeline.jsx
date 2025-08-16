'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { FaRocket, FaClock, FaCog, FaLock, FaCheck, FaStar, FaTimes } from 'react-icons/fa';
import { HiLightningBolt, HiCube, HiWifi, HiSparkles } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BenefitTimeline = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const benefits = [
    {
      id: 1,
      title: 'INSTANT SETUP',
      subtitle: 'Zero Configuration Required',
      description: 'Our plug-and-play system eliminates complex installation procedures. Simply connect and activate.',
      icon: HiLightningBolt,
      color: '#54bb74',
      stats: ['5 min', 'setup time'],
      features: ['Auto-detection', 'Self-configuration', 'Instant activation']
    },
    {
      id: 2,
      title: 'MODULAR DESIGN',
      subtitle: 'Infinite Possibilities',
      description: 'Mix and match components to create your perfect lighting solution. Expand anytime.',
      icon: HiCube,
      color: '#93cfa2',
      stats: ['100+', 'combinations'],
      features: ['Interchangeable parts', 'Scalable system', 'Future-proof design']
    },
    {
      id: 3,
      title: 'SMART INTEGRATION',
      subtitle: 'AI-Powered Intelligence',
      description: 'Advanced sensors and AI processing create an intelligent lighting ecosystem.',
      icon: HiWifi,
      color: '#54bb74',
      stats: ['24/7', 'monitoring'],
      features: ['Real-time adaptation', 'Predictive behavior', 'Energy optimization']
    },
    {
      id: 4,
      title: 'PREMIUM QUALITY',
      subtitle: 'Built to Last',
      description: 'Enterprise-grade components with rigorous testing ensure long-lasting performance.',
      icon: FaLock,
      color: '#292929',
      stats: ['10 year', 'warranty'],
      features: ['Premium materials', 'Rigorous testing', 'Reliable performance']
    }
  ];

  // Simplified without GSAP animations
  useEffect(() => {
    // Simple initialization if needed
  }, []);

  const triggerConfetti = () => {
    const colors = ['#54bb74', '#93cfa2', '#292929', '#f3ebe2'];
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['circle', 'square'],
      gravity: 0.8,
      drift: 0.1
    });

    // Secondary burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: colors,
        startVelocity: 20
      });
    }, 200);
  };

  const handleBenefitClick = (index) => {
    setSelectedBenefit(benefits[index]);
    setShowBenefitModal(true);
  };

  const closeBenefitModal = () => {
    setShowBenefitModal(false);
    setSelectedBenefit(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartJourneySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Thank you! We\'ll be in touch soon.');
    setShowStartModal(false);
    setFormData({ name: '', email: '', company: '' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/30 via-transparent to-[#93cfa2]/20"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-[#54bb74]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            ))}
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#292929] mb-6 leading-tight">
            WHY CHOOSE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              {' '}MODULAR?
            </span>
          </h2>
          <p className="text-xl text-[#292929]/70 max-w-4xl mx-auto leading-relaxed">
            Discover the revolutionary advantages that make our modular lighting system 
            the future of intelligent illumination.
          </p>
        </motion.div>

        {/* Modern Grid Layout */}
        <div className="relative">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className={`benefit-card-${index} group relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Main Benefit Card */}
                <div className="relative p-8 bg-white rounded-3xl shadow-xl border border-[#54bb74]/10 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/30 via-transparent to-[#93cfa2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: benefit.color }}
                        >
                          <benefit.icon className="text-2xl text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[#54bb74] uppercase tracking-wide">
                            Benefit {benefit.id}
                          </span>
                          <h3 className="text-2xl font-black text-[#292929] leading-tight">
                            {benefit.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        completedSteps.includes(index) ? 'bg-[#54bb74]' : 'bg-[#292929]/20'
                      }`} />
                    </div>

                    {/* Subtitle */}
                    <p className="text-lg font-semibold text-[#54bb74] mb-4">
                      {benefit.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[#292929]/70 mb-6 leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {benefit.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                          className="flex items-center text-sm text-[#292929]/60"
                        >
                          <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animation Placeholder */}
                    <div className="mb-6 p-6 bg-gradient-to-br from-[#f3ebe2]/30 to-[#93cfa2]/20 rounded-2xl border border-[#54bb74]/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-[#292929]/70 uppercase tracking-wide">Interactive Demo</h4>
                        <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-full h-32 bg-white/50 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                          <benefit.icon className="text-3xl mx-auto mb-2" style={{ color: benefit.color }} />
                          <span className="text-sm font-medium text-[#292929]/60">
                            {benefit.title} Animation
                          </span>
                        </div>
                        {/* Floating animation elements */}
                        <motion.div
                          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute top-2 right-2 w-3 h-3 bg-[#54bb74]/30 rounded-full"
                        />
                        <motion.div
                          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                          className="absolute bottom-2 left-2 w-2 h-2 bg-[#93cfa2]/40 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Stats Display */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f3ebe2]/50 to-[#93cfa2]/20 rounded-2xl mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-black text-[#292929]">
                          {benefit.stats[0]}
                        </div>
                        <div className="text-xs text-[#292929]/60 uppercase tracking-wide">
                          {benefit.stats[1]}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                        <benefit.icon className="text-xl" style={{ color: benefit.color }} />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => handleBenefitClick(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-[#292929] text-white hover:bg-[#54bb74]"
                    >
                      <FaStar className="text-sm" />
                      <span>Explore Benefit</span>
                    </motion.button>
                  </div>

                  {/* Floating Decorations */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="absolute bottom-6 left-6 w-4 h-4 bg-[#93cfa2]/20 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large Showcase Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative p-12 bg-gradient-to-br from-[#292929] to-[#1a1a1a] rounded-3xl text-white overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0">
              <div className="grid grid-cols-6 grid-rows-4 h-full w-full opacity-10">
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
                      repeatDelay: 3
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-2">
                <h3 className="text-4xl font-black mb-4">
                  Ready to Transform Your Space?
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Join thousands of satisfied customers who have revolutionized their lighting 
                  with our modular system. Experience the future today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowStartModal(true)}
                    className="px-8 py-4 bg-[#54bb74] text-white rounded-2xl font-semibold hover:bg-[#93cfa2] transition-colors duration-300"
                  >
                    Start Your Journey
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>

              {/* Right Stats */}
              <div className="space-y-6">
                {[
                  { number: '10K+', label: 'Installations', icon: HiCube },
                  { number: '99.9%', label: 'Uptime', icon: HiLightningBolt },
                  { number: '24/7', label: 'Support', icon: HiSparkles }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-[#54bb74] rounded-xl flex items-center justify-center">
                      <stat.icon className="text-xl text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black">{stat.number}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-[#54bb74]/20">
            <span className="text-[#292929] font-medium">Progress:</span>
            <div className="flex space-x-1">
              {benefits.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    completedSteps.includes(index) ? 'bg-[#54bb74]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#292929] font-medium">
              {completedSteps.length}/{benefits.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Start Journey Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowStartModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightningBolt className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Tell us about yourself and we'll get you started</p>
            </div>

            <form onSubmit={handleStartJourneySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="Your company name"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Benefit Detail Modal */}
      {showBenefitModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/20 via-transparent to-[#93cfa2]/10"></div>
            
            <button
              onClick={closeBenefitModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-all duration-200"
            >
              <FaTimes />
            </button>
            
            <div className="relative z-10 h-full flex flex-col p-8">
              {/* Enhanced Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center">
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mr-6 shadow-xl relative overflow-hidden"
                    style={{ backgroundColor: selectedBenefit.color }}
                  >
                    <selectedBenefit.icon className="text-3xl text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/10"></div>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#54bb74]/10 text-[#54bb74] text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                      Benefit {selectedBenefit.id}
                    </span>
                    <h3 className="text-4xl font-black text-[#292929] leading-tight mb-2">
                      {selectedBenefit.title}
                    </h3>
                    <p className="text-xl font-semibold text-[#54bb74]">
                      {selectedBenefit.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Stats Badge */}
                <div className="text-right">
                  <div className="bg-gradient-to-br from-[#54bb74] to-[#93cfa2] text-white px-6 py-4 rounded-2xl shadow-lg">
                    <div className="text-3xl font-black mb-1">
                      {selectedBenefit.stats[0]}
                    </div>
                    <div className="text-sm opacity-90 uppercase tracking-wide">
                      {selectedBenefit.stats[1]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: Description & Features */}
                <div className="lg:col-span-3 flex flex-col">
                  {/* Description Card */}
                  <div className="bg-gradient-to-br from-white to-[#f3ebe2]/30 p-6 rounded-2xl border border-[#54bb74]/10 shadow-sm mb-4">
                    <h4 className="text-lg font-bold text-[#292929] mb-3 flex items-center">
                      <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-3"></div>
                      Overview
                    </h4>
                    <p className="text-base text-[#292929]/80 leading-relaxed">
                      {selectedBenefit.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#292929] mb-3 flex items-center">
                      <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-3"></div>
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedBenefit.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          className="group flex items-center p-4 bg-white rounded-xl border border-[#54bb74]/10 shadow-sm hover:shadow-md hover:border-[#54bb74]/20 transition-all duration-300"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-[#292929] font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Demo */}
                <div className="lg:col-span-2 flex flex-col">
                  
                  <div className="flex-1 bg-gradient-to-br from-[#f3ebe2]/40 to-[#93cfa2]/20 rounded-2xl border border-[#54bb74]/10 p-6 relative overflow-hidden">
                    {/* Demo Area */}
                    <div className="w-full h-64 bg-white/60 rounded-xl backdrop-blur-sm border border-white/40 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <selectedBenefit.icon className="text-6xl mx-auto mb-4" style={{ color: selectedBenefit.color }} />
                        </motion.div>
                        <span className="text-sm font-semibold text-[#292929]/70 uppercase tracking-wide">
                          {selectedBenefit.title} Demo
                        </span>
                      </div>
                      
                      {/* Enhanced floating elements */}
                      <motion.div
                        animate={{ x: [0, 25, 0], y: [0, -12, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-4 right-4 w-4 h-4 bg-[#54bb74]/50 rounded-full"
                      />
                      <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 18, 0], scale: [1, 0.9, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="absolute bottom-4 left-4 w-3 h-3 bg-[#93cfa2]/60 rounded-full"
                      />
                      <motion.div
                        animate={{ x: [0, 15, 0], y: [0, -8, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        className="absolute top-1/2 left-6 w-2 h-2 bg-[#54bb74]/40 rounded-full"
                      />
                      <motion.div
                        animate={{ x: [0, -12, 0], y: [0, 10, 0], scale: [1, 0.8, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                        className="absolute top-1/3 right-8 w-2 h-2 bg-[#93cfa2]/50 rounded-full"
                      />
                    </div>
                    
                    {/* Impact Statement */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-[#292929] to-[#1a1a1a] rounded-xl text-white">
                      <p className="text-white/90 text-sm leading-relaxed text-center">
                        <strong className="text-[#54bb74]">{selectedBenefit.title}</strong> delivers measurable improvements 
                        to your lighting infrastructure with proven results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: 'white',
          color: '#292929',
          borderRadius: '12px',
          border: '1px solid #54bb74'
        }}
      />
    </section>
  );
};

export default BenefitTimeline;
