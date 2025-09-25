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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

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
          className="text-center mb-20"
        >
          <div className="relative  inline-block mb-8">
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

          <p className="text-2xl text-white max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Join the lighting revolution. Experience the future of modular,
            intelligent illumination that adapts to your needs and grows with
            your space.
          </p>
        </motion.div>

        {/* Aceternity UI Glowing Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={
                <HiCube className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Modular Assembly System"
              description="Experience the revolutionary modular lighting system that adapts to any space configuration."
              video="/limiai/benefit1.mp4"
              onClick={() => {
                setShowDemoModal(true);
                trackModalInteraction("demo", "open");
              }}
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={
                <HiCog className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="AI-Powered Intelligence"
              description="Smart automation that learns your preferences and optimizes lighting conditions automatically."
              video="/limiai/benefit2.mp4"
              onClick={() => {
                setShowStartModal(true);
                trackModalInteraction("start_journey", "open");
              }}
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={
                <HiLockClosed className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Enterprise Security"
              description="Bank-level security protocols ensure your lighting data and controls remain protected."
              video="/limiai/benefit3.mp4"
              onClick={() => {
                setShowBrochureModal(true);
                trackModalInteraction("brochure", "open");
              }}
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={
                <HiSparkles className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Endless Customization"
              description="Create unique lighting experiences with infinite configuration possibilities and color options."
              video="/limiai/benefit4.mp4"
              onClick={() => {
                setShowDemoModal(true);
                trackModalInteraction("demo", "open");
              }}
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={
                <HiLightBulb className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Future-Ready Technology"
              description="Built for tomorrow with continuous updates and expanding ecosystem of smart features."
              video="/limiai/main_vid.mp4"
              onClick={() => {
                setShowStartModal(true);
                trackModalInteraction("start_journey", "open");
              }}
            />
          </ul>
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
                <div className="flex justify-center">
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

const GridItem = ({ area, icon, title, description, video, onClick }) => {
  return (
    <li
      className={`min-h-[14rem] list-none cursor-pointer ${area}`}
      onClick={onClick}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#54bb74]/20">
          {/* Background Video */}
          {video && (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <video
                src={video}
                className="w-full h-full object-cover opacity-40"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Enhanced gradient overlay for better text readability */}
            </div>
          )}

          <div className="relative flex flex-1 flex-col justify-end gap-3 z-10">
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-bold text-balance text-white md:text-2xl/[1.875rem] drop-shadow-lg">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-white/90 md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold drop-shadow-md">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CTA;
