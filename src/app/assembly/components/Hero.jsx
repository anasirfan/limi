"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  FaPlay,
  FaArrowDown,
  FaArrowRight,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { HiCube, HiLightBulb, HiWifi, HiCog, HiSparkles } from "react-icons/hi";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  trackPagePerformance,
  trackHeroCarousel,
  trackAssemblyEvent,
} from "../../utils/umamiTracking";

const Hero = ({ startCarousel = true }) => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { margin: "-100px", once: false });
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [
    {
      title: "Edge AI",
      subtitle: "Infrastructure",
      description:
        "The central nervous system for intelligent environments. Ceiling-mounted hubs transform spaces into proactive, empathetic ecosystems that understand and anticipate.",
      ctaPrimary: { label: "Experience Limi", href: "/configurator" },
      ctaSecondary: { label: "Learn More", href: "/configurator" },
      background: "from-[#f3ebe2] to-[#93cfa2]",
      features: [
        { icon: HiCube, title: "Local Processing", desc: "Edge Computing" },
        { icon: HiWifi, title: "Modular Design", desc: "Scalable Hubs" },
        { icon: HiCog, title: "Privacy First", desc: "Secure & Local" },
        { icon: HiSparkles, title: "AI Processing", desc: "Instant Response" },
      ],
      showcase: {
        title: "SENSORS ACTIVE",
        description: "Motion • Sound • Temperature",
        stats: [
          { number: "Local", label: "Processing", color: "#54bb74" },
          { number: "Secure", label: "Privacy", color: "#93cfa2" },
          { number: "Instant", label: "Response", color: "#54bb74" },
        ],
      },
    },
    {
      title: "Modular",
      subtitle: "Ecosystem",
      description:
        "Ceiling-mounted AI hubs that expand with your needs. Each module adds intelligence, creating a distributed network that grows smarter over time.",
      ctaPrimary: { label: "Build System", href: "/configurator" },
      ctaSecondary: { label: "View Modules", href: "/configurator" },
      background: "from-[#f8f6f3] to-[#93cfa2]",
      features: [
        { icon: HiCube, title: "Expandable", desc: "Add Modules" },
        { icon: HiWifi, title: "Connected", desc: "Mesh Network" },
        { icon: HiCog, title: "Adaptive", desc: "Self-Learning" },
        { icon: HiSparkles, title: "Scalable", desc: "No Limits" },
      ],
      showcase: {
        title: "AI PROCESSING",
        description: "Local • Secure • Instant",
        stats: [
          { number: "∞", label: "Modules", color: "#54bb74" },
          { number: "Mesh", label: "Network", color: "#93cfa2" },
          { number: "Edge", label: "Computing", color: "#54bb74" },
        ],
      },
    },
    {
      title: "Intelligent",
      subtitle: "Environments",
      description:
        "Transform any space into a responsive ecosystem. AI-powered hubs understand occupancy, preferences, and patterns to create truly intelligent environments.",
      ctaPrimary: { label: "Get Started", href: "/configurator" },
      ctaSecondary: { label: "Contact", href: "/configurator" },
      background: "from-[#faf9f7] to-[#54bb74]",
      features: [
        { icon: HiCube, title: "Proactive", desc: "Anticipates" },
        { icon: HiWifi, title: "Empathetic", desc: "Understands" },
        { icon: HiCog, title: "Responsive", desc: "Adapts" },
        { icon: HiSparkles, title: "Seamless", desc: "Invisible Tech" },
      ],
      showcase: {
        title: "ECOSYSTEM ACTIVE",
        description: "Proactive • Empathetic • Intelligent",
        stats: [
          { number: "24/7", label: "Monitoring", color: "#54bb74" },
          { number: "AI", label: "Powered", color: "#93cfa2" },
          { number: "Future", label: "Ready", color: "#54bb74" },
        ],
      },
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendMessageToPlayCanvas = (message) => {
    const iframe = document.getElementById("playcanvas-app");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
      console.log("Message sent to PlayCanvas: " + message);
    }
  };
  useEffect(() => {
    const messages = [
      "LimiAi_ZoomEnabled:true",
      "light_type:ceiling",
      "light_amount:3",
      "base_color:gold",
      "cable_0",
      "glass_none",
      "color_gold",
      "silver_none",
      "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/model_1756464038799.glb",
      "system_base_1",
      "cable_1",
      "glass_none",
      "color_gold",
      "silver_none",
       "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/model_1756464038799.glb",
      "system_base_1",
      "cable_2",
      "glass_none",
      "color_gold",
      "silver_none",
      "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/model_1756464038799.glb",
      "system_base_1",
      "allmodelsloaded"
    ];

    function handleAppReady(event) {
      if (
        typeof event.data === "string" &&
        event.data.startsWith("app:ready1")
      ) {
        messages.forEach((message, index) => {
          setTimeout(() => {
            sendMessageToPlayCanvas(message);
          });
        });
      }
    }
    window.addEventListener("message", handleAppReady);
    return () => {
      window.removeEventListener("message", handleAppReady);
    };
  }, []);

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
        trackAssemblyEvent("hero_form_submission", "Hero Form Submission");
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
        trackAssemblyEvent("hero_brochure_download", "Hero Brochure Download");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send brochure");
      }
    } catch (error) {
      console.error("Error sending brochure:", error);
      toast.error("Failed to send brochure. Please try again.");
    }
  };

  const handleCTAClick = (ctaType) => {
    switch (ctaType) {
      case "Experience Limi":
      case "Build System":
      case "Get Started":
        setShowStartModal(true);
        trackAssemblyEvent("hero_cta_click", "Hero CTA Click");
        break;
      case "Learn More":
      case "View Modules":
        setShowBrochureModal(true);
        trackAssemblyEvent("hero_learn_more_click", "Hero Learn More Click");
        break;
      case "Contact":
        setShowDemoModal(true);
        trackAssemblyEvent("hero_contact_click", "Hero Contact Click");
        break;
      default:
        setShowStartModal(true);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Track page load performance
    const startTime = performance.now();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkReducedMotion = () => {
      setPrefersReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", checkReducedMotion);

    // Track performance metrics after component mount
    setTimeout(() => {
      const loadTime = performance.now() - startTime;
      trackPagePerformance({
        loadTime,
        component: "Hero",
        isMobile: window.innerWidth < 768,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
      });
    }, 100);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", checkReducedMotion);
    };
  }, []);

  // Auto-rotate slides with tracking
  useEffect(() => {
    if (prefersReduced || !startCarousel) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length;
        trackHeroCarousel("auto_rotate", nextSlide, slides[nextSlide].title, {
          fromSlide: prev,
          toSlide: nextSlide,
          method: "auto",
        });
        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReduced, slides.length, startCarousel]);

  useEffect(() => {
    if (!mounted || prefersReduced || slides.length <= 1) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight")
        setCurrentSlide((p) => (p + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, prefersReduced, slides.length]);

  // Touch swipe navigation
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null || slides.length <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold)
      setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
    if (delta < -threshold) setCurrentSlide((p) => (p + 1) % slides.length);
    touchStartX.current = null;
  };

  const initParticles = async (engine) => {
    await loadSlim(engine);
  };

  if (!mounted) return null;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen mb-8 sm:mb-0 overflow-hidden bg-white"
    >
      {/* Dynamic Background */}
      {/* <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].background} transition-all duration-1000`}
        style={{ y, opacity }}
      /> */}

      {/* Background Video */}
      {/* <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/limiai/hero.mp4" type="video/mp4" />
        </video>
      </div> */}

      {/* Particles */}
      {!prefersReduced && mounted && (
        <Particles
          id="hero-particles"
          init={initParticles}
          className="absolute inset-0 z-0"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: ["#292929", "#54bb74"] },
              links: {
                color: "#54bb74",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: { enable: true, speed: isMobile ? 0.4 : 0.6 },
              number: { value: isMobile ? 25 : 50 },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
        />
      )}

      <div
        className="relative bg-[#f3ebe2] z-10 min-h-screen flex items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-8">
              {/* Hero Title Carousel */}
              <div className="relative h-[24rem] sm:h-[28rem] lg:h-[32rem] overflow-hidden">
                {slides.map((slide, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{
                      x: index === currentSlide ? "0%" : "-100%",
                      opacity: index === currentSlide ? 1 : 0,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-[#292929] leading-none mb-3 lg:mb-4">
                      {slide.title}
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-[#292929]/70 mb-6 lg:mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => handleCTAClick(slide.ctaPrimary.label)}
                        className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#292929] text-white rounded-full font-semibold text-base sm:text-lg hover:bg-[#54bb74] transition-all duration-300"
                      >
                        <span>{slide.ctaPrimary.label}</span>
                        <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleCTAClick(slide.ctaSecondary.label)}
                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#54bb74] text-[#54bb74] rounded-full font-semibold text-base sm:text-lg hover:bg-[#54bb74] hover:text-white transition-all duration-300"
                      >
                        {slide.ctaSecondary.label}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    className="hero-card group p-2 sm:p-3 bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl border border-[#54bb74]/20 hover:bg-white/90 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-md sm:rounded-lg flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                      <feature.icon className="text-sm sm:text-base text-white" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#292929] mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#292929]/60">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Slide Indicators */}
              {slides.length > 1 && (
                <div className="flex space-x-3">
                  {/* Debug button for manual testing */}

                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-8 h-1.5 sm:w-12 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-[#54bb74]"
                          : "bg-[#292929]/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Content - 5 columns */}
            <div className="lg:col-span-5 mt-6 lg:mt-0">
              {/* 3D Interactive Viewer (iframe) */}
              <div className="hero-card mb-4 lg:mb-6 relative w-full max-w-2xl rounded-xl lg:rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] sm:aspect-[16/9] border-none w-full">
                  <iframe
                    id="playcanvas-app"
                    src="https://playcanv.as/e/p/7c2273a2/"
                    className="w-full h-full"
                    title="LIMI 3D Interactive Viewer"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Large Feature Showcase */}
              <motion.div
                key={`showcase-${currentSlide}`}
                className="hero-card mt-4 lg:mt-6 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#292929] to-[#1a1a1a] rounded-xl lg:rounded-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
                    {slides[currentSlide].showcase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4 lg:mb-6">
                    {slides[currentSlide].showcase.description}
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    {slides[currentSlide].showcase.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <div
                          className="text-lg sm:text-xl lg:text-2xl font-black"
                          style={{ color: stat.color }}
                        >
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-white/60">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="floating-element absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#54bb74]/20 rounded-full"></div>
                <div className="floating-element absolute bottom-4 right-6 sm:bottom-6 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#93cfa2]/30 rounded-full"></div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center text-[#292929]/60">
              <span className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                Scroll to explore
              </span>
              <FaArrowDown className="text-lg sm:text-xl" />
            </div>
          </motion.div>
        </div>
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
                trackAssemblyEvent("hero_modal_close", "Hero Modal Close");
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

            <form onSubmit={handleStartJourneySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company (Optional)
                </label>
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

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowDemoModal(false);
                trackAssemblyEvent("hero_modal_close", "Hero Modal Close");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#292929] mb-2">
                Contact Us
              </h3>
              <p className="text-gray-600">Get in touch with our team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-[#292929] mb-4">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#54bb74] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <span className="text-gray-700">
                      hello@limilighting.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#54bb74] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#292929] mb-4">
                  Quick Contact
                </h4>
                <form onSubmit={handleStartJourneySubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none"
                    placeholder="Your email"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowBrochureModal(false);
                trackAssemblyEvent("hero_modal_close", "Hero Modal Close");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">
                Get Brochure
              </h3>
              <p className="text-gray-600">
                Download our detailed product brochure
              </p>
            </div>

            <form onSubmit={handleBrochureSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
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

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaDownload />
                <span>Send Brochure</span>
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

export default Hero;
