"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaArrowRight,
  FaPlay,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaTimes,
} from "react-icons/fa";
import {
  HiSparkles,
  HiLightBulb,
  HiCube,
  HiCog,
  HiLockClosed,
} from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { trackAssemblyEvent } from "../../utils/umamiTracking";
import { GlowingEffect } from "../../components/ui/glowing-effect";

const CTA = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // Accordion data
  const accordionData = [
    {
      id: "01",
      title: "Instant Deployment",
      heading: "Instant Deployment",
      description: "Revolutionary AI infrastructure that activates immediately. Transform any environment into an intelligent ecosystem without technical expertise or complex installation procedures.",
      image: "/limiai/benefit1.mp4",
      isVideo: true
    },
    {
      id: "02", 
      title: "Autonomous Intelligence",
      heading: "Autonomous Intelligence",
      description: "Self-learning AI that continuously adapts to your lifestyle, work patterns, and preferences. Experience truly personalized automation that gets smarter over time.",
      image: "/limiai/benefit2.mp4",
      isVideo: true
    },
    {
      id: "03",
      title: "Fortress-Level Security", 
      heading: "Fortress-Level Security",
      description: "Military-grade encryption and privacy protection ensure your intelligent environment remains completely secure. Your data stays private while AI enhances your life.",
      image: "/limiai/benefit3.mp4",
      isVideo: true
    },
    {
      id: "04",
      title: "Infinite Possibilities",
      heading: "Infinite Possibilities", 
      description: "Limitless customization and expansion capabilities. From simple room automation to complex multi-building intelligence networks—scale without limits.",
      image: "/limiai/benefit4.mp4",
      isVideo: true
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartJourneySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        "https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
          }),
        }
      );

      if (response.ok) {
        toast.success("Thank you! We'll be in touch soon.");
        setShowStartModal(false);
        setFormData({ name: "", email: "", company: "" });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const response = await fetch(
        "https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        }
      );

      if (response.ok) {
        toast.success("Brochure sent to your email!");
        setShowBrochureModal(false);
        setFormData({ name: "", email: "", company: "" });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send brochure");
      }
    } catch (error) {
      console.error("Error sending brochure:", error);
      toast.error("Failed to send brochure. Please try again.");
    }
  };

  const trackModalInteraction = (modalName, action) => {
    trackAssemblyEvent(`Modal ${action}`, modalName);
  };

  const trackFormSubmission = (formName, success, formData) => {
    trackAssemblyEvent(
      `Form Submission ${success ? "Success" : "Failure"}`,
      formName,
      formData
    );
  };

  // Accordion navigation functions
  const handleNextAccordion = (e) => {
    e.stopPropagation();
    if (activeAccordion < accordionData.length - 1) {
      setActiveAccordion(activeAccordion + 1);
    }
  };

  const handlePreviousAccordion = (e) => {
    e.stopPropagation();
    if (activeAccordion > 0) {
      setActiveAccordion(activeAccordion - 1);
    }
  };

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-[#010101] min-h-screen"
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
                repeatDelay: 8,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="relative  inline-block">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              READY TO{" "}
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

          <p className="text-2xl text-white max-w-4xl mx-auto mb-4 leading-relaxed font-medium">
            Join the intelligence revolution. Experience the future of autonomous
            environments that understand, adapt, and evolve with your lifestyle.
          </p>
        </motion.div>

        {/* Modern Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row gap-4 h-[550px]">
            {accordionData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative transition-all duration-500 ease-in-out cursor-pointer ${
                  activeAccordion === index 
                    ? 'flex-[2]' 
                    : 'flex-[0.3]'
                }`}
                onClick={() => setActiveAccordion(index)}
                whileHover={{ scale: activeAccordion !== index ? 1.02 : 1 }}
              >
                {/* Unified Container */}
                <div className={`
                  h-full flex flex-row rounded-2xl overflow-hidden
                  transition-all duration-500
                  ${activeAccordion === index 
                    ? 'bg-[#004D3F]' 
                    : 'bg-[#0F1511] hover:bg-[#54bb74]/10'
                  }
                `}>
                  {/* Vertical Bar - Always Visible */}
                  <div className={`
                    ${activeAccordion === index ? 'w-20' : 'w-full'} 
                    h-full transition-all duration-500 relative
                  `}>
                    {/* Collapsed State Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-300">
                      {/* Number at top */}
                      <div className={`text-2xl font-bold text-center transition-colors duration-300 ${
                        activeAccordion === index ? 'text-white' : 'text-[#8ECA9F]'
                      }`}>
                        {item.id}
                      </div>
                      
                      {/* Vertical Title at bottom */}
                      <div className="flex justify-center items-end h-full pb-4">
                        <div 
                          className={`text-xl font-medium tracking-wider transition-colors duration-300 ${
                            activeAccordion === index ? 'text-white' : 'text-[#8ECA9F]'
                          }`}
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            transform: 'rotate(180deg)'
                          }}
                        >
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Panel - Desktop */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: activeAccordion === index ? 'auto' : 0,
                      opacity: activeAccordion === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`
                      overflow-hidden
                      ${activeAccordion === index ? 'flex-1' : 'w-0'}
                    `}
                  >
                    <div className="h-full flex flex-row min-w-[500px]">
                      {/* Content Section */}
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-4">
                            {item.heading}
                          </h3>
                          <p className="text-white/90 text-lg leading-relaxed mb-8">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Navigation Buttons - Desktop Only */}
                        <div className="flex gap-4">
                          {/* Previous Button - Show for options 2, 3, 4 */}
                          {index > 0 && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handlePreviousAccordion}
                              className="px-8 py-3 bg-transparent border-2 border-white 
                                       text-white rounded-xl font-semibold flex items-center gap-2 
                                       hover:bg-white hover:text-[#004D3F] transition-all duration-300"
                            >
                              <FaArrowRight className="text-sm rotate-180" />
                              Previous
                            </motion.button>
                          )}
                          
                          {/* Next Button - Show for options 1, 2, 3 */}
                          {index < accordionData.length - 1 && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleNextAccordion}
                              className="px-8 py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] 
                                       text-white rounded-xl font-semibold flex items-center gap-2 
                                       hover:shadow-lg transition-all duration-300"
                            >
                              Next
                              <FaArrowRight className="text-sm" />
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Image/Video Section */}
                      <div className="flex-1 relative p-8">
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          {item.isVideo ? (
                            <video
                              src={item.image}
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.heading}
                              fill
                              className="object-cover"
                            />
                          )}
                          {/* Gradient overlay for better integration */}
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#004D3F]/30" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-4">
            {accordionData.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative cursor-pointer"
                onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
                whileHover={{ scale: 1.01 }}
              >
                {/* Mobile Accordion Item */}
                <div className={`
                  rounded-2xl overflow-hidden transition-all duration-500
                  ${activeAccordion === index 
                    ? 'bg-[#004D3F]' 
                    : 'bg-[#0F1511] hover:bg-[#54bb74]/10'
                  }
                `}>
                  {/* Header Bar */}
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold transition-colors duration-300 ${
                        activeAccordion === index ? 'text-white' : 'text-[#8ECA9F]'
                      }`}>
                        {item.id}
                      </div>
                      <div className={`text-xl font-medium transition-colors duration-300 ${
                        activeAccordion === index ? 'text-white' : 'text-[#8ECA9F]'
                      }`}>
                        {item.title}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-colors duration-300 ${
                        activeAccordion === index ? 'text-white' : 'text-[#8ECA9F]'
                      }`}
                    >
                      <FaArrowRight className="text-lg rotate-90" />
                    </motion.div>
                  </div>

                  {/* Expanded Content - Mobile */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeAccordion === index ? 'auto' : 0,
                      opacity: activeAccordion === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 space-y-6">
                      {/* Content Section */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {item.heading}
                        </h3>
                        <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>

                      {/* Video Section */}
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        {item.isVideo ? (
                          <video
                            src={item.image}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.heading}
                            fill
                            className="object-cover"
                          />
                        )}
                        {/* Gradient overlay for better integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004D3F]/30 to-transparent" />
                      </div>

                      {/* Navigation Buttons - Mobile Only */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Previous Button - Show for options 2, 3, 4 */}
                        {index > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePreviousAccordion}
                            className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white 
                                     text-white rounded-xl font-semibold flex items-center justify-center gap-2 
                                     hover:bg-white hover:text-[#004D3F] transition-all duration-300"
                          >
                            <FaArrowRight className="text-sm rotate-180" />
                            Previous
                          </motion.button>
                        )}
                        
                        {/* Next Button - Show for options 1, 2, 3 */}
                        {index < accordionData.length - 1 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNextAccordion}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] 
                                     text-white rounded-xl font-semibold flex items-center justify-center gap-2 
                                     hover:shadow-lg transition-all duration-300"
                          >
                            Next
                            <FaArrowRight className="text-sm" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          <div className="p-10 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              {/* Contact Info */}
              <div className="text-center w-full flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-gray-300">
                    <FaEnvelope className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">@limiai.co</span>
                  </div>
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="text-center w-full flex flex-col items-center justify-center">
                <Image
                  src="/images/svgLogos/__Icon_Wordmark_Inverted.svg"
                  alt="LIMI Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto mx-auto mb-3"
                />
                <p className="text-white/70 text-sm font-medium">
                  Intelligent Modular Lighting
                </p>
              </div>

              {/* Social Links */}
              <div className="text-center w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Follow Us
                </h4>
                <div className="flex justify-center gap-4">
                  <motion.a
                    href="https://www.linkedin.com/company/limi-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/limi_uk/?igsh=N2t5ODNsbWFxcm8y#"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                    title="Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-white/30 text-center">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} LIMI AI. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-2">
                Comfort, Control, and Connection in One System{" "}
              </p>
            </div>
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
              onClick={() => {
                setShowStartModal(false);
                trackModalInteraction("start_journey", "close");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightBulb className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">
                Start Your Journey
              </h3>
              <p className="text-gray-600">
                Tell us about yourself and we'll get you started
              </p>
            </div>

            <form
              onSubmit={(e) => {
                handleStartJourneySubmit(e);
                trackFormSubmission("start_journey", true, formData);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Start My Journey
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowDemoModal(false);
                trackModalInteraction("demo", "close");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              <FaTimes />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-[#292929] mb-4">
                  Interactive Demo
                </h3>
                <p className="text-gray-600 mb-6">
                  Experience LIMI's capabilities with our interactive
                  demonstration
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span className="text-gray-700">
                      Real-time sensor data visualization
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <span className="text-gray-700">
                      AI-powered lighting adjustments
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <span className="text-gray-700">
                      Modular configuration options
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#292929] mb-4">
                  Quick Contact
                </h4>
                <form
                  onSubmit={(e) => {
                    handleStartJourneySubmit(e);
                    trackFormSubmission("demo", true, formData);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#292929] text-white rounded-xl font-semibold hover:bg-[#54bb74] transition-all duration-300"
                  >
                    Request Demo Access
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowBrochureModal(false);
                trackModalInteraction("brochure", "close");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">
                Download Brochure
              </h3>
              <p className="text-gray-600">
                Download our detailed product brochure
              </p>
            </div>

            <form
              onSubmit={(e) => {
                handleBrochureSubmit(e);
                trackFormSubmission("brochure", true, formData);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#93cfa2] to-[#54bb74] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Send Brochure
              </button>
            </form>
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
          background: "white",
          color: "#292929",
          borderRadius: "12px",
          border: "1px solid #54bb74",
        }}
      />
    </section>
  );
};


export default CTA;
