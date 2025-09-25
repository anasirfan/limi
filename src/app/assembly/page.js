"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import Script from "next/script";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Import components
import Hero from "./components/Hero";
import AssemblyScroll from "./components/AssemblyScroll";
import SensorModuleCard from "./components/SensorModuleCard";
import { HeroScrollDemo } from "./components/HeroScrollDemo";
import InteractiveViewer from "./components/InteractiveViewer";
import BenefitTimeline from "./components/BenefitTimeline";
import CTA from "./components/CTA";

// Import Umami tracking utilities
import {
  trackScrollInteraction,
  trackPagePerformance,
  trackSensorCard,
  trackAssemblyEvent,
} from "../utils/umamiTracking";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AssemblyPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Background color transition based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#f3ebe2", // Soft Beige
      "#292929", // Charleston Green
      "#54bb74", // Emerald
      "#93cfa2", // Eton
      "#292929", // Charleston Green
      "#f3ebe2", // Soft Beige
    ]
  );

  // Listen for app:ready message
  const listenForAppReady = (callback) => {
    function handleMessage(event) {
      if (
        typeof event.data === "string" &&
        event.data.startsWith("loadingOff")
      ) {
        callback(event.data, event);
      }
    }
    window.addEventListener("message", handleMessage);
    // Return cleanup
    return () => window.removeEventListener("message", handleMessage);
  };

  useEffect(() => {
    setMounted(true);

    // Hide loading overlay after 3 seconds
    const loadingTimer = setTimeout(() => {
      setShowLoadingOverlay(false);
    }, 3000);

    // Listen for app:ready message
    const cleanup = listenForAppReady((data, event) => {
      console.log("Received app:ready message:", data);
      // sendMessageToPlayCanvas('view all');
    });

    return () => {
      clearTimeout(loadingTimer);
      cleanup();
    };
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   direction: "vertical",
    //   gestureDirection: "vertical",
    //   smooth: true,
    //   mouseMultiplier: 1,
    //   smoothTouch: false,
    //   touchMultiplier: 2,
    //   infinite: false,
    // });

    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    // GSAP ScrollTrigger setup
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress < 0.3) {
          setCurrentTheme("light");
        } else if (progress < 0.7) {
          setCurrentTheme("dark");
        } else {
          setCurrentTheme("light");
        }
        trackScrollInteraction("assembly_page", progress);
      },
    });

    // Track page performance
    trackPagePerformance({
      page: "assembly",
      loadTime: performance.now(),
    });

    return () => {
      // lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      AOS.refresh();
    };
  }, [mounted]);

  return (
    <>
      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#292929] to-[#1a1a1a]"
        >
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="/images/svgLogos/__Icon_Wordmark_Inverted.svg"
                alt="LIMI Logo"
                width={200}
                height={60}
                className="h-12 w-auto mx-auto"
              />
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <div className="w-16 h-16 border-4 border-[#54bb74]/30 border-t-[#54bb74] rounded-full animate-spin mx-auto"></div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-white text-xl font-semibold mb-2">
                Loading Assembly Experience
              </p>
              <p className="text-gray-400 text-sm">
                Preparing your modular lighting interface...
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-8 mx-auto">
              <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full origin-center"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Umami Analytics Script for limiai.co */}
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="3b5b8e7b-2c5a-4b1e-9f8d-1a2b3c4d5e6f"
        strategy="afterInteractive"
      />

      {/* Floating Glassmorphism Header */}
      <motion.header
        className="fixed top-8 inset-x-0 max-w-5xl mx-auto z-[9999]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/images/svgLogos/__Icon_Wordmark_Inverted.svg"
                alt="LIMI Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#home"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="#assembly"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Assembly
              </Link>
              <Link
                href="#sensors"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Sensors
              </Link>
              <Link
                href="#configurator"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Configurator
              </Link>
              <Link
                href="#benefits"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Benefits
              </Link>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
                <motion.button
                  className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
           
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full right-0 mt-2 w-64 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="#hero"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#assembly"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Assembly
              </Link>
              <Link
                href="#sensors"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sensors
              </Link>
              <Link
                href="#configurator"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Configurator
              </Link>
              <Link
                href="#benefits"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="#contact"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <hr className="border-white/20 my-4" />

              <Link
                href="/login"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/get-started" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                  Get Started
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </motion.header>

      <motion.div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Hero Section */}
        <section id="hero">
          <Hero onVisible={() => trackAssemblyEvent("Hero Section")} />
        </section>

        {/* Assembly Scroll Storytelling */}
        <section id="assembly">
          <AssemblyScroll
            onVisible={() => trackAssemblyEvent("Assembly Scroll Storytelling")}
          />
        </section>

        {/* Sensor Modules Grid */}
        <section id="sensors" className="relative bg-white pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-[#292929] mb-6">
                Smart <span className="text-[#54bb74]">Sensor</span> Integration
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Each module contains advanced sensors that transform your
                lighting into an intelligent ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SensorModuleCard
                title="Radar Detection"
                description="Advanced motion sensing with precise occupancy detection"
                icon="radar"
                delay={0}
                onVisible={() => trackSensorCard("Radar Detection")}
              />
              <SensorModuleCard
                title="Audio Processing"
                description="Voice commands and ambient sound analysis"
                icon="microphone"
                delay={0.2}
                onVisible={() => trackSensorCard("Audio Processing")}
              />
              <SensorModuleCard
                title="Computer Vision"
                description="Visual recognition and gesture control"
                icon="camera"
                delay={0.4}
                onVisible={() => trackSensorCard("Computer Vision")}
              />
            </div>
          </div>
        </section>

        {/* Hero Scroll Demo Section */}
        <section id="hero-scroll">
          <HeroScrollDemo />
        </section>

        {/* Interactive 3D Viewer */}
        <section id="configurator">
          <InteractiveViewer
            onVisible={() =>
              trackAssemblyEvent("Configurator Interactive Viewer")
            }
          />
        </section>

        {/* Benefits Timeline */}
        <section id="benefits">
          <BenefitTimeline
            onVisible={() => trackAssemblyEvent("Benefits Timeline")}
          />
        </section>

        {/* CTA Section */}
        <CTA onVisible={() => trackAssemblyEvent("CTA Section")} />
      </motion.div>
    </>
  );
};

export default AssemblyPage;
