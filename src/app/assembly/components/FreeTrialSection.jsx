"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const FreeTrialSection = ({ onGetStarted }) => {
  const [mounted, setMounted] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStartJourney = () => {
    setShowJourneyModal(true);
  };

  const handleGetBrochure = () => {
    setShowBrochureModal(true);
  };

  const closeModals = () => {
    setShowJourneyModal(false);
    setShowBrochureModal(false);
  };

  if (!mounted) return null;

  return (
    <section className="pb-20  px-4 sm:px-6 md:px-8 lg:px-16 bg-[#010101]">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-visible">
          {/* Main Container - Bright Blue Background */}
          <div
            className="flex flex-col lg:flex-row items-center justify-between p-4 sm:px-8 sm:py-0  rounded-2xl shadow-2xl overflow-visible relative"
            style={{
              backgroundColor: "#54BB74",
              minHeight: "320px",
              borderRadius: "16px",
            }}
          >
            {/* Left Content - Text Area */}
            <div className="flex-1 text-white z-10 mb-6 lg:mb-0 text-center lg:text-left lg:pr-8">
              <h2 className="font-bold text-white mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Ready to Transform Your Space?
              </h2>

              <p className="mb-6 leading-relaxed text-sm sm:text-base md:text-lg text-white/90">
                Join thousands of satisfied customers who have revolutionized
                their lighting with our modular system. Experience the future
                today.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleStartJourney}
                  className="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 group bg-white text-black px-6 py-3 sm:px-7 sm:py-4 rounded-full shadow-lg hover:shadow-xl border-none cursor-pointer w-full sm:w-auto"
                >
                  Start your journey
                  <div className="text-sm">
                    <FaArrowRight />
                  </div>
                </button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.9,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.8)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                  onClick={handleGetBrochure}
                  className="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 bg-transparent text-white px-6 py-3 sm:px-7 sm:py-4 rounded-full border-2 border-white/40 hover:border-white/80 hover:bg-white/10 cursor-pointer w-full sm:w-auto"
                >
                  Get brochure
                </motion.button>
              </div>
            </div>

            {/* Right Content - Robot Image Area */}
            <div className="w-full lg:flex-1 flex items-center justify-center relative lg:pl-8 mt-6 lg:mt-0">
              <motion.div
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-full lg:h-96 lg:max-w-xl xl:max-w-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Image
                  src="/limiai/robot.png"
                  alt="LIMI AI Robot"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#54bb74]/10 to-transparent rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Modal */}
      {showJourneyModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModals}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Start Your Journey
            </h3>
            <p className="text-gray-600 mb-6">
              Ready to transform your space with our innovative modular lighting
              system? Let's get started!
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-[#54BB74] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4a9f65] transition-colors">
                Get Started Now
              </button>
              <button
                onClick={closeModals}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModals}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Download Brochure
            </h3>
            <p className="text-gray-600 mb-6">
              Get detailed information about our modular lighting system,
              specifications, and installation guide.
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-[#54BB74] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4a9f65] transition-colors">
                Download PDF
              </button>
              <button
                onClick={closeModals}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default FreeTrialSection;
