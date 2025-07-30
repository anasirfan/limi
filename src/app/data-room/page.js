"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Enhanced Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const float = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const scaleHover = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)",
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
};

const premiumGlow = {
  whileHover: {
    boxShadow: [
      "0 0 20px rgba(16, 185, 129, 0.3)",
      "0 0 40px rgba(16, 185, 129, 0.5)",
      "0 0 60px rgba(16, 185, 129, 0.3)",
    ],
    transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
  },
};

// Premium button styles with glassmorphism
const borderBtnWide =
  "group relative px-10 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-400/50 transition-all duration-500 border border-emerald-400/30 overflow-hidden backdrop-blur-sm";
const brandBtn =
  "group relative px-10 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-400/50 transition-all duration-500 border border-emerald-400/30 overflow-hidden backdrop-blur-sm";

const glassBorderBtn =
  "relative px-8 py-4 bg-white/5 backdrop-blur-md border border-emerald-400/30 text-emerald-400 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-400/20";

const premiumCard =
  "relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:border-emerald-400/30 group";

const gradientText =
  "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent";

const LimiInvestorsPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden"></div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Left Content */}
          <motion.div
            className="space-y-10"
            variants={fadeInLeft}
            style={{ y: y1 }}
          >
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center space-x-4 mb-12"
              variants={fadeInUp}
            >
              <div>
                <Image
                  src="/images/svgLogos/__Icon_Wordmark_Inverted.svg"
                  alt="Limi Logo"
                  width={240}
                  height={72}
                  priority
                  className="drop-shadow-2xl filter brightness-110"
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <motion.h1
                className={`text-4xl lg:text-6xl font-black leading-tight ${gradientText}`}
                variants={fadeInUp}
              >
                Welcome to LIMI’s Investor Data Room
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-xl lg:text-2xl text-slate-200 leading-relaxed font-light"
                variants={fadeInUp}
              >
                LIMI has already won the ceiling with a modular lighting system
                that's generating revenue, locked in{" "}
                <span className="font-bold text-emerald-400">£50M+</span> of
                signed LOIs, and is now preparing to deploy embedded AI across
                real spaces.
              </motion.p>

              {/* Data Room Access */}
              <motion.div className="space-y-6" variants={fadeInUp}>
                <motion.p
                  className="text-2xl font-bold text-white"
                  variants={fadeInUp}
                >
                  This Data Room is your access point to:
                </motion.p>

                <motion.ul
                  className="space-y-4 text-slate-200"
                  variants={staggerContainer}
                >
                  {[
                    "Real revenue",
                    "Signed contracts",
                    "Patent-backed IP",
                    "And a modular platform designed to dominate ceilings and walls across sectors",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-4 group"
                      variants={fadeInUp}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-lg lg:text-xl font-medium group-hover:text-emerald-300 transition-colors duration-300">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* CTA Button */}
              <motion.div className="pt-8" variants={fadeInUp}>
                <motion.button
                  {...scaleHover}
                  className={brandBtn}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 80px rgba(16, 185, 129, 0.6)",
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Ask LIMI Assistant</span>

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            variants={fadeInRight}
            style={{ y: y2 }}
          >
            <motion.div
              className={`relative w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden ${premiumCard} border-2 border-emerald-400/20`}
              {...float}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.5 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818] z-10"></div>
              <Image
                src="/data_room/section1_img.png"
                alt="Limi Hero"
                fill
                priority
                className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Investment Journey Section */}
      <section className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 overflow-hidden">
        {/* Enhanced Background with multiple layers */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818]"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2
              className={`text-4xl md:text-6xl font-black mb-6 ${gradientText}`}
              variants={fadeInUp}
            >
              Your Investment Journey with LIMI
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
              variants={fadeInUp}
            >
              Everything you need to validate this opportunity—real traction,
              real IP, and a system already deployed.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
          >
            {/* First Row - 3 Cards */}
            {[
              {
                title: "Market Opportunity & Vision",
                description:
                  "How we're using lighting as a Trojan Horse to install AI infrastructure into every ceiling and wall.",
                icon: "",
              },
              {
                title: "Product & Architecture",
                description:
                  "See how our modular hardware, edge AI firmware, and model-agnostic platform form a unified infrastructure layer.",
                icon: "",
              },
              {
                title: "Commercial Traction",
                description:
                  "£50M+ in signed LOIs. 0% customer churn. £1M+ in POs.",
                icon: "",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} min-h-[220px] group cursor-pointer`}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${gradientText} group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300`}
                >
                  {card.title}
                </h3>
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {card.description}
                </p>
                <div className="absolute inset-0 "></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {/* Second Row - 2 Cards */}
            {[
              {
                title: "Financials & Operational Model",
                description:
                  "Understand our operational strategy and financial projections.",
                icon: "",
              },
              {
                title: "Team & Legal Infrastructure",
                description:
                  "Patent filings, legal structure, and founder track records.",
                icon: "",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} min-h-[220px] group cursor-pointer`}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${gradientText} group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300`}
                >
                  {card.title}
                </h3>
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {card.description}
                </p>
                <div className="absolute inset-0 "></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2
              className={`text-4xl md:text-6xl font-black mb-6 ${gradientText}`}
              variants={fadeInUp}
            >
              Vision
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
              variants={fadeInUp}
            >
              Lighting was just the entry point. Our goal is{" "}
              <span className="font-bold text-emerald-400">
                AI in every space
              </span>
              .
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            variants={staggerContainer}
          >
            {/* Left Image */}
            <motion.div className="relative" variants={fadeInLeft}>
              <motion.div
                className={`w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden ${premiumCard} border-2 border-emerald-400/20 group`}
                whileHover={{
                  scale: 1.02,
                  rotateY: -5,
                  transition: { duration: 0.5 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818] z-10"></div>
                <Image
                  src="/data_room/section2_img.png"
                  alt="Limi Vision"
                  fill
                  priority
                  className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20"></div>
              </motion.div>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              className="flex flex-col gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  title: "Systemic Opportunity TL;DR",
                  description:
                    "The Trojan Horse Strategy for AI in Every Space",
                  icon: "",
                },
                {
                  title: "LIMI AI Vision",
                  description:
                    "A one-pager showing how LIMI transforms ordinary light fixtures into AI-ready, modular endpoints—creating an ambient operating system layer for every space.",
                  icon: "",
                },
                {
                  title: "Our Market Advantage",
                  description: "Why now, why LIMI",
                  icon: "",
                },
              ].map((card, index) => (
                <>
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`${premiumCard} min-h-[180px] group cursor-pointer`}
                    whileHover={{
                      scale: 1.03,
                      rotateX: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-3 ${gradientText} group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300`}
                        >
                          {card.title}
                        </h3>
                        <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                          {card.description}
                        </p>
                        <motion.button
                          {...scaleHover}
                          className={glassBorderBtn}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          <span className="flex items-center space-x-2">
                            <span>Download PDF</span>

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  <div className="absolute inset-0 "></div>
                </>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-gradient-to-b from-[#232323] via-[#232323] to-[#181818] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2
              className={`text-4xl md:text-6xl font-black mb-6 ${gradientText}`}
              variants={fadeInUp}
            >
              Product
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto font-light leading-relaxed"
              variants={fadeInUp}
            >
              The lighting infrastructure is built. Now comes the{" "}
              <span className="font-bold text-emerald-400">
                AI intelligence
              </span>
              .
              <br />
              This section shows how our modular hardware, firmware, and
              configurator come together to deliver real-world AI intelligence.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <motion.div
              whileHover={{
                scale: 1.025,
                boxShadow: "0 6px 24px 0 rgba(16,30,54,0.10)",
              }}
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col p-6"
            >
              <div className="w-full h-36 mb-4 rounded-md overflow-hidden border border-slate-200">
                <Image
                  src="/factory-tour.jpg"
                  alt="Factory Tour"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded mr-3" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Factory Tour Video
                </h3>
              </div>
              <p className="text-emerald-400 text-sm mb-4 flex-1">
                Watch how we manufacture our modular hubs and platforms
                in-house.
              </p>
              <motion.button
                {...scaleHover}
                className="mt-auto w-full px-4 py-2 border border-emerald-600 text-emerald-700 font-medium rounded-md transition bg-white hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                Watch Video
              </motion.button>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              whileHover={{
                scale: 1.025,
                boxShadow: "0 6px 24px 0 rgba(16,30,54,0.10)",
              }}
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col p-6"
            >
              <div className="w-full h-36 mb-4 rounded-md overflow-hidden border border-slate-200">
                <Image
                  src="/app-demo.jpg"
                  alt="App + Configurator Demo"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded mr-3" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  App + Configurator Demo
                </h3>
              </div>
              <p className="text-emerald-400 text-sm mb-4 flex-1">
                See our intuitive interface that allows users to customize
                lighting in real-time.
              </p>
              <motion.button
                {...scaleHover}
                className="mt-auto w-full px-4 py-2 border border-emerald-600 text-emerald-700 font-medium rounded-md transition bg-white hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                View Demo
              </motion.button>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              whileHover={{
                scale: 1.025,
                boxShadow: "0 6px 24px 0 rgba(16,30,54,0.10)",
              }}
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col p-6"
            >
              <div className="w-full h-36 mb-4 rounded-md overflow-hidden border border-slate-200">
                <Image
                  src="/modular-hardware.jpg"
                  alt="Modular Hardware Architecture"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded mr-3" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Modular Hardware Architecture
                </h3>
              </div>
              <p className="text-emerald-400 text-sm mb-4 flex-1">
                How our physical layer supports plug-and-play AI sensors and
                edge compute
              </p>
              <motion.button
                {...scaleHover}
                className="mt-auto w-full px-4 py-2 border border-emerald-600 text-emerald-700 font-medium rounded-md transition bg-white hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                Download PDF
              </motion.button>
            </motion.div>
            {/* Card 4 */}
            <motion.div
              whileHover={{
                scale: 1.025,
                boxShadow: "0 6px 24px 0 rgba(16,30,54,0.10)",
              }}
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col p-6"
            >
              <div className="w-full h-36 mb-4 rounded-md overflow-hidden border border-slate-200">
                <Image
                  src="/product-roadmap.jpg"
                  alt="Product Roadmap"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded mr-3" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Product Roadmap
                </h3>
              </div>
              <p className="text-emerald-400 text-sm mb-4 flex-1">
                Explore our development timeline, upcoming features, and
                long-term product vision for the next 12-36 months.
              </p>
              <motion.button
                {...scaleHover}
                className="mt-auto w-full px-4 py-2 border border-emerald-600 text-emerald-700 font-medium rounded-md transition bg-white hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                Download PDF
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
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
          <div className="flex flex-wrap gap-8">
            {/* Financial Card 1 */}
            <div className="flex items-start gap-6">
              <div className="mt-1 text-emerald-400"></div>
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

            {/* Financial Card 2 */}
            <div className="flex items-start gap-6">
              <div className="mt-1 text-emerald-400"></div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  Historical P&L
                </h3>
                <p className="text-gray-200 mb-2">
                  Review our financial performance to date, including revenue
                  growth, cost structure, and capital efficiency metrics.
                </p>
                <motion.button {...scaleHover} className={borderBtnWide}>
                  Download Excel
                </motion.button>
              </div>
            </div>

            {/* Financial Card 3 */}
            <div className="flex items-start gap-6">
              <div className="mt-1 text-emerald-400"></div>
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
