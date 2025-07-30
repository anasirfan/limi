"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants for entrance
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};
const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};
const scaleHover = {
  whileHover: { scale: 1.06, boxShadow: "0 6px 32px #50C87844" },
  whileTap: { scale: 0.97 },
};

// Utility for brand button classes
const brandBtn =
  "group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-eton-blue text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 border-2 border-emerald-400 overflow-hidden";
const borderBtn =
  "inline-block px-6 py-2 border-2 border-emerald-500 text-emerald-400 font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-500/10";
const borderBtnWide =
  "inline-block px-8 py-3 border-2 border-emerald-500 text-emerald-400 font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-500/10";

const LimiInvestorsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 mb-8">
              <Image
                src="/images/svgLogos/__Icon_Wordmark_Colored.svg"
                alt="Limi Logo"
                width={200}
                height={60}
                priority
                className="drop-shadow-glow"
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-emerald-500 leading-tight">
                Start Here: What You're Looking At
              </h2>

              {/* Description */}
              <p className="text-lg text-black leading-relaxed">
                LIMI has already won the ceiling with a modular lighting system
                that's generating revenue, locked in £50M+ of signed LOIs, and
                is now preparing to deploy embedded AI across real spaces.
              </p>

              {/* Data Room Access */}
              <div className="space-y-4">
                <p className="text-xl font-semibold text-black">
                  This Data Room is your access point to:
                </p>

                <ul className="space-y-3 text-black">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-eton-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">Real revenue</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-eton-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">Signed contracts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-eton-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">Patent-backed IP</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-eton-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">
                      And a modular platform designed to dominate ceilings and
                      walls across sectors
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <motion.button {...scaleHover} className={brandBtn}>
                  <span className="relative z-10">Ask LIMI Assistant</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-eton-blue rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative bg-black">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/data_room/section1_img.png"
                alt="Limi Hero"
                fill
                priority
                className="object-cover object-center w-full h-full drop-shadow-glow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Journey Section */}
      <section className="relative py-20  px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-8">
        {/* Background Image with emerald overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/investor-bg.jpg" // Replace with your actual image path
            alt="LIMI Investment Background"
            fill
            className="object-cover object-center opacity-60"
            style={{ zIndex: 0 }}
            priority
          />
          <div
            className="absolute inset-0 bg-emerald-900/80"
            style={{ zIndex: 1 }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Your Investment Journey with LIMI
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
              Everything you need to validate this opportunity—real traction,
              real IP, and a system already deployed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* First Row - 3 Cards */}
            <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[180px] hover:shadow-emerald-500/20 transition-shadow">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                Market Opportunity & Vision
              </h3>
              <p className="text-gray-200">
                How we’re using lighting as a Trojan Horse to install AI
                infrastructure into every ceiling and wall.
              </p>
            </div>
            <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[180px] hover:shadow-emerald-500/20 transition-shadow">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                Product & Architecture
              </h3>
              <p className="text-gray-200">
                See how our modular hardware, edge AI firmware, and
                model-agnostic platform form a unified infrastructure layer.
              </p>
            </div>
            <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[180px] hover:shadow-emerald-500/20 transition-shadow">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                Commercial Traction
              </h3>
              <p className="text-gray-200">
                £50M+ in signed LOIs. 0% customer churn. £1M+ in POs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Second Row - 2 Cards */}
            <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[180px] hover:shadow-emerald-500/20 transition-shadow">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                Financials & Operational Model
              </h3>
              <p className="text-gray-200">
                Understand our operational strategy and financial projections.
              </p>
            </div>
            <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[180px] hover:shadow-emerald-500/20 transition-shadow">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                Team & Legal Infrastructure
              </h3>
              <p className="text-gray-200">
                Patent filings, legal structure, and founder track records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
              Vision
            </h2>
            <p className="text-lg md:text-xl text-black max-w-2xl mx-auto">
              Lighting was just the entry point. Our goal is AI in every space.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/data_room/section2_img.png"
                alt="Limi Hero"
                fill
                priority
                className="object-cover object-center w-full h-full drop-shadow-glow"
              />
            </div>
            {/* Right Cards */}
            <div className="flex flex-col gap-8">
              {/* Card 1 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[150px]"
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  Systemic Opportunity TL;DR
                </h3>
                <p className="text-black mb-4">
                  The Trojan Horse Strategy for AI in Every Space
                </p>
                <motion.button {...scaleHover} className={borderBtn}>
                  Download PDF
                </motion.button>
              </motion.div>
              {/* Card 2 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[150px]"
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  LIMI AI Vision
                </h3>
                <p className="text-black mb-4">
                  A one-pager showing how LIMI transforms ordinary light
                  fixtures into AI-ready, modular endpoints—creating an ambient
                  operating system layer for every space.
                </p>
                <motion.button {...scaleHover} className={borderBtn}>
                  Download PDF
                </motion.button>
              </motion.div>
              {/* Card 3 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[150px]"
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  Our Market Advantage
                </h3>
                <p className="text-black mb-4">Why now, why LIMI</p>
                <motion.button {...scaleHover} className={borderBtn}>
                  Download PDF
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section
        className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48"
        style={{ background: "#292929" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Product
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              The lighting infrastructure is built. Now comes the AI
              intelligence.
              <br />
              This section shows how our modular hardware, firmware, and
              configurator come together to deliver real-world AI intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-[#232323] border border-emerald-600/30 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border-2 border-emerald-400">
                <Image
                  src="/factory-tour.jpg"
                  alt="Factory Tour"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Factory Tour Video
              </h3>
              <p className="text-gray-200 mb-4">
                Watch how we manufacture our modular hubs and platforms
                in-house.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Watch Video
              </motion.button>
            </div>
            {/* Card 2 */}
            <div className="bg-[#232323] border border-emerald-600/30 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border-2 border-emerald-400">
                <Image
                  src="/app-demo.jpg"
                  alt="App + Configurator Demo"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                App + Configurator Demo
              </h3>
              <p className="text-gray-200 mb-4">
                See our intuitive interface that allows users to customize
                lighting in real-time.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                View Demo
              </motion.button>
            </div>
            {/* Card 3 */}
            <div className="bg-[#232323] border border-emerald-600/30 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border-2 border-emerald-400">
                <Image
                  src="/modular-hardware.jpg"
                  alt="Modular Hardware Architecture"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Modular Hardware Architecture
              </h3>
              <p className="text-gray-200 mb-4">
                How our physical layer supports plug-and-play AI sensors and
                edge compute
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Download PDF
              </motion.button>
            </div>
            {/* Card 4 */}
            <div className="bg-[#232323] border border-emerald-600/30 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border-2 border-emerald-400">
                <Image
                  src="/product-roadmap.jpg"
                  alt="Product Roadmap"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Product Roadmap
              </h3>
              <p className="text-gray-200 mb-4">
                Explore our development timeline, upcoming features, and
                long-term product vision for the next 12-36 months.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Download PDF
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Traction Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
              Commercial Traction
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
              Not just interest. Contracts. Pipelines. Revenue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Div 1 */}
            <div className="bg-[#232323] rounded-2xl p-8 flex flex-col gap-6 shadow-lg border border-emerald-600/20">
              <div>
                <div className="text-4xl md:text-5xl font-extrabold text-white flex items-center gap-2 mb-2">
                  <span className="text-emerald-400">£</span>57.5M
                </div>
                <p className="text-gray-200 mb-4">
                  Signed LOI Value
                  <br />
                  Letter of Intent with major property developer, including
                  Joint Venture agreement for flagship implementation.
                </p>
              </div>
              <div className="bg-white/5 border border-emerald-600/30 rounded-xl p-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Traction Summary
                </h3>
                <p className="text-gray-200 mb-4">
                  Snapshot of metrics, customer segments, and deal progress.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download PDF
                </motion.button>
              </div>
            </div>
            {/* Div 2 */}
            <div className="bg-[#232323] rounded-2xl p-8 flex flex-col gap-6 shadow-lg border border-emerald-600/20">
              <div>
                <div className="text-4xl md:text-5xl font-extrabold text-white flex items-center gap-2 mb-2">
                  <span className="text-emerald-400">£</span>5T
                </div>
                <p className="text-gray-200 mb-4">
                  Addressable Market
                  <br />
                  Total addressable market infrastructure in commercial
                  buildings globally.
                </p>
              </div>
              <div className="bg-white/5 border border-emerald-600/30 rounded-xl p-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Traction Summary
                </h3>
                <p className="text-gray-200 mb-4">
                  Signed POs/Contracts
                  <br />
                  Review our executed agreements with key partners.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download PDF
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operation Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#181818]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
            Operation
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-12">
            We control our supply chain end-to-end. Our factory, QA processes,
            and EPDP ensure speed, precision, and scale.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center px-6 py-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white text-2xl font-bold shadow-lg mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">EPDP</h3>
              <p className="text-gray-200 mb-4">
                Our Engineering Product Development Process outlines how we
                launch new solutions for the built environment.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Download PDF
              </motion.button>
            </div>
            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center px-6 py-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white text-2xl font-bold shadow-lg mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Factory Overview
              </h3>
              <p className="text-gray-200 mb-4">
                Detailed information about our manufacturing capabilities,
                capacity forecasts and production methodologies.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Download PDF
              </motion.button>
            </div>
            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center px-6 py-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white text-2xl font-bold shadow-lg mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Supply Chain & QA
              </h3>
              <p className="text-gray-200 mb-4">
                Our approach to resilient supply chain management and
                comprehensive quality assurance protocols.
              </p>
              <motion.button {...scaleHover} className={borderBtnWide}>
                Download PDF
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#232323]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
              Team
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
              LIMI’s founders built everything from scratch — no outsourcing, no
              intermediaries.
              <br />
              We’re the only team with the technical depth and operational
              muscle to ship this system at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/team-image.jpg" // Replace with your actual image path
                alt="LIMI Team"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Right Cards */}
            <div className="flex flex-col gap-8">
              {/* Card 1 */}
              <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[150px]">
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  Founder Bios
                </h3>
                <p className="text-gray-200 mb-4">
                  Learn about our founders' backgrounds, previous successes, and
                  the unique expertise they bring to LIMI's mission of
                  transforming the built environment.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download PDF
                </motion.button>
              </div>
              {/* Card 2 */}
              <div className="bg-white/5 border border-emerald-600/30 rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[150px]">
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  Strategic Hiring Roadmap
                </h3>
                <p className="text-gray-200 mb-4">
                  Review our strategic hiring roadmap designed to scale
                  engineering, AI, and commercial execution in 2025.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download PDF
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financials Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
              Financials
            </h2>
            <h3 className="text-xl md:text-2xl text-white mb-4">
              Capital efficiency. Margin profile. Path to scale.
            </h3>
            <p className="text-lg text-emerald-100 mb-10">
              Our numbers aren’t projections — they’re already outperforming
              peers in smart home and IoT.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {/* Financial Card 1 */}
            <div className="flex items-start gap-6">
              <div className="mt-1 text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  5-Year Financial Model
                </h3>
                <p className="text-gray-200 mb-2">
                  Comprehensive projections including revenue forecasts, margin
                  analysis, and key performance indicators through 2028.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download Excel
                </motion.button>
              </div>
            </div>

            {/* Financial Card 3 */}
            <div className="flex items-start gap-6">
              <div className="mt-1 text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  Capital Allocation Plan
                </h3>
                <p className="text-gray-200 mb-2">
                  Our capital allocation strategy for the $20M Series A.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download Excel
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal and IP Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#181818]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
            Legal and IP
          </h2>
          <p className="text-lg text-emerald-100 mb-2">
            Modular lighting as AI infrastructure — and we own the patent.
          </p>
          <p className="text-lg text-emerald-100 mb-8">
            Our patent protects the modular delivery of AI infrastructure
            through lighting. Our IP stack is strategic and defensible.
          </p>
          <div className="border-2 border-emerald-500 rounded-2xl p-8 mb-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-2">
              IP Summary
            </h3>
            <p className="text-gray-200 mb-4">
              Overview of our patent portfolio, trade secrets, and proprietary
              technology that create our sustainable competitive advantage.
            </p>
            <motion.button {...scaleHover} className={borderBtnWide}>
              Download PDF
            </motion.button>
          </div>
        </div>
      </section>

      {/* Ask LIMI’s AI Agent Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#232323]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
            Ask LIMI’s AI Agent
          </h2>
          <h3 className="text-xl md:text-2xl text-white mb-4">
            Need Answers Now?
          </h3>
          <p className="text-lg text-emerald-100 mb-8">
            Our AI agent is trained on everything in this room.
            <br />
            Ask about product, tech, traction, or roadmap — or book a meeting
            directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button {...scaleHover} className={borderBtnWide}>
              Ask Anything
            </motion.button>
            <motion.button {...scaleHover} className={borderBtnWide}>
              Book a Meeting
            </motion.button>
          </div>
        </div>
      </section>

      {/* Connect With LIMI's Leadership Team Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
            Connect With LIMI's Leadership Team
          </h2>
          <p className="text-lg text-emerald-100 mb-12">
            Ready to explore investment opportunities with LIMI? Our founding
            team is available to discuss in more detail.{" "}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border-2 border-emerald-500 rounded-2xl p-8 flex flex-col items-start min-h-[170px]">
              <h3 className="text-xl font-bold text-white mb-1">Umer Asif</h3>
              <p className="text-emerald-400 font-semibold mb-2">
                Founder & CEO
              </p>
              <a
                href="mailto:umer.asif@limilighting.co.uk"
                className="text-emerald-200 underline mb-1"
              >
                umer.asif@limilighting.co.uk
              </a>
            </div>
            {/* Card 2 */}
            <div className="border-2 border-emerald-500 rounded-2xl p-8 flex flex-col items-start min-h-[170px]">
              <h3 className="text-xl font-bold text-white mb-1">Karen Law</h3>
              <p className="text-emerald-400 font-semibold mb-2">
                Co-Founder & COO
              </p>
              <a
                href="mailto:karen.law@limilighting.co.uk"
                className="text-emerald-200 underline mb-1"
              >
                karen.law@limilighting.co.uk
              </a>
            </div>
            {/* Card 3 */}
            <div className="border-2 border-emerald-500 rounded-2xl p-8 flex flex-col items-start min-h-[170px] relative">
              <h3 className="text-xl font-bold text-white mb-1">
                Shahrukh Ahmed
              </h3>
              <p className="text-emerald-400 font-semibold mb-2">
                Co-Founder & CTO
              </p>
              <a
                href="mailto:s.ahmed@limilighting.co.uk"
                className="text-emerald-200 underline mb-1"
              >
                s.ahmed@limilighting.co.uk
              </a>
            </div>
          </div>
          {/* Brand Logo Bottom Left */}
          <div className="absolute bottom-4 left-4 w-130 h-130">
            <Image
              src="/images/svgLogos/__Logo_Icon_Inverted.svg"
              alt="Limi Logo"
              width={130}
              height={130}
              priority
              className="drop-shadow-glow"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimiInvestorsPage;
