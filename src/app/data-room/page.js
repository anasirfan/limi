"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBarChart2, FiBriefcase, FiShield, FiUsers, FiTrendingUp, FiCheckCircle, FiArrowRight, FiGlobe, FiFileText, FiLayers, FiKey, FiDollarSign, FiTarget, FiAward, FiActivity } from "react-icons/fi";
import Image from "next/image";

// Enhanced Animation variants with more sophisticated easing
const fadeInUp = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.12,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80, rotateY: -15 },
  show: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80, rotateY: 15 },
  show: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const float = {
  animate: {
    y: [0, -20, 0],
    rotateX: [0, 5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

const scaleHover = {
  whileHover: {
    scale: 1.08,
    rotateY: 5,
    boxShadow: "0 25px 80px rgba(16, 185, 129, 0.5)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  whileTap: { scale: 0.95 },
};

const premiumGlow = {
  whileHover: {
    boxShadow: [
      "0 0 30px rgba(16, 185, 129, 0.4)",
      "0 0 60px rgba(16, 185, 129, 0.6)",
      "0 0 90px rgba(16, 185, 129, 0.4)",
    ],
    scale: 1.02,
    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
  },
};

// Enhanced card hover effects
const cardHover = {
  whileHover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 20px 60px rgba(16, 185, 129, 0.2)",
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1],
      boxShadow: { duration: 0.5 }
    },
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

// Enhanced button styles with more sophisticated glassmorphism
// Enhanced button styles with consistent hover effects and animations
const borderBtnWide =
  "group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-base md:text-lg rounded-xl shadow-lg hover:shadow-emerald-400/40 transition-all duration-300 border border-emerald-400/50 overflow-hidden transform-gpu hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2";

const brandBtn =
  "group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-semibold text-base md:text-lg rounded-xl shadow-lg hover:shadow-emerald-400/40 transition-all duration-300 border border-emerald-400/50 overflow-hidden transform-gpu hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2";

const glassBorderBtn =
  "relative px-6 py-3 bg-white/5 backdrop-blur-lg border border-emerald-400/40 text-emerald-300 font-medium text-sm md:text-base rounded-xl transition-all duration-300 hover:bg-emerald-500/15 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] transform-gpu flex items-center justify-center gap-2";

const premiumCard =
  "relative bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:border-emerald-400/30 group transform-gpu";

const gradientText =
  "bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent";

const sectionContainer =
  "relative py-32 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 overflow-hidden";

const sectionTitle =
  "text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent";

const sectionSubtitle =
  "text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto font-light leading-relaxed mb-16";

const LimiInvestorsPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 800], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative h-screen z-10 max-w-5xl mx-auto flex flex-col items-center justify-center py-24 px-4 text-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="flex flex-col items-center gap-8 mb-10">
          <FiAward size={64} className="text-emerald-400" aria-hidden="true" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-white">
            LIMI Investor Data Room
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto">
            The trusted platform for investors to access LIMI’s real traction, IP, and commercial opportunity. <br />
            <span className="font-semibold text-emerald-300">£50M+ signed LOIs</span> • Modular platform • Embedded AI for real spaces
          </p>
        </motion.div>
        <motion.div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-base">
            <FiTrendingUp aria-hidden="true" /> Real Revenue
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-base">
            <FiFileText aria-hidden="true" /> Signed Contracts
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-base">
            <FiShield aria-hidden="true" /> Patent-backed IP
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-base">
            <FiLayers aria-hidden="true" /> Modular Platform
          </div>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 w-full mt-6">
          <motion.button
            className="px-10 py-5 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl text-lg flex items-center gap-2 hover:scale-105 hover:shadow-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="View Manifesto Deck"
          >
            View Manifesto Deck <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
          <motion.button
            className="px-10 py-5 rounded-2xl font-bold border border-emerald-400/40 text-white shadow-xl text-lg flex items-center gap-2 hover:bg-emerald-500/10 hover:scale-105 hover:shadow-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Ask LIMI AI Assistant"
          >
            Ask LIMI AI Assistant <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.section>

      {/* Investment Journey Section */}
      <section className={sectionContainer}>
        {/* Enhanced Background with multiple layers */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]"></div>
          {/* Additional background orb */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.h2
              className={sectionTitle}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Your Investment Journey with LIMI
            </motion.h2>
            <motion.p
              className={sectionSubtitle}
              variants={fadeInUp}
            >
              Everything you need to validate this opportunity—real traction,
              real IP, and a system already deployed.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
            variants={staggerContainer}
          >
            {/* First Row - 3 Cards */}
            {[
              {
                title: "Market Opportunity & Vision",
                description:
                  "How we're using lighting as a Trojan Horse to install AI infrastructure into every ceiling and wall.",
                icon: <FiTarget size={36} className="text-emerald-400" aria-hidden="true" />,
                gradient: "from-emerald-400 to-teal-400",
              },
              {
                title: "Product & Architecture",
                description:
                  "See how our modular hardware, edge AI firmware, and model-agnostic platform form a unified infrastructure layer.",
                icon: <FiLayers size={36} className="text-teal-400" aria-hidden="true" />,
                gradient: "from-teal-400 to-cyan-400",
              },
              {
                title: "Commercial Traction",
                description:
                  "£50M+ in signed LOIs. 0% customer churn. £1M+ in POs.",
                icon: <FiTrendingUp size={36} className="text-cyan-400" aria-hidden="true" />,
                gradient: "from-cyan-400 to-emerald-400",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} min-h-[220px] group cursor-pointer relative flex flex-col items-center text-center`}
                variants={fadeInUp}
                {...cardHover}
                tabIndex={0}
                aria-label={card.title}
              >
                {/* Card Icon */}
                <div className="mb-6 flex justify-center">{card.icon}</div>
                
                <h3
                  className={`text-2xl font-bold mb-6 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                >
                  {card.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors duration-300">
                  {card.description}
                </p>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerContainer}
          >
            {/* Second Row - 2 Cards */}
            {[
              {
                title: "Financials & Operational Model",
                description:
                  "Understand our operational strategy and financial projections.",
                icon: "💰",
                gradient: "from-emerald-300 to-teal-300",
              },
              {
                title: "Team & Legal Infrastructure",
                description:
                  "Patent filings, legal structure, and founder track records.",
                icon: "⚖️",
                gradient: "from-teal-300 to-cyan-300",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} min-h-[280px] group cursor-pointer relative overflow-hidden`}
                variants={fadeInUp}
                {...cardHover}
              >
                {/* Card Icon */}
                <motion.div 
                  className="text-4xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                
                <h3
                  className={`text-2xl font-bold mb-6 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                >
                  {card.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors duration-300">
                  {card.description}
                </p>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 bg-gradient-to-b from-[#232323] to-[#181818] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiI+PHVzZSBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbD0iIzAwMCIgeGxpbms6aHJlZj0iI2EiLz48L2c+PGc+PHBhdGggZD0iTTM2IDM0djJoNHYtMmg0di0yaC00di00aC0ydjR6IiBpZD0iYSIvPjwvZz48L2c+PC9zdmc+')]"></div>
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
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "Systemic Opportunity",
                description: "The Trojan Horse Strategy for AI in Every Space",
                icon: <FiTarget className="text-4xl mb-4 text-emerald-400" />,
                buttonText: "View Strategy"
              },
              {
                title: "LIMI AI Vision",
                description: "How we transform ordinary light fixtures into AI-ready, modular endpoints—creating an ambient operating system layer.",
                icon: <FiLayers className="text-4xl mb-4 text-teal-400" />,
                buttonText: "Learn More"
              },
              {
                title: "Market Advantage",
                description: "Why now is the perfect time for LIMI's technology and approach to dominate the market.",
                icon: <FiTrendingUp className="text-4xl mb-4 text-cyan-400" />,
                buttonText: "See Advantages"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${premiumCard} flex flex-col items-center text-center p-8`}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="mb-6 bg-emerald-500/10 p-4 rounded-2xl">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {card.description}
                </p>
                <motion.button
                  className={`${glassBorderBtn} group`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    {card.buttonText}
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section className={sectionContainer}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]"></div>
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-cyan-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.h2
              className={sectionTitle}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Product
            </motion.h2>
            <motion.p
              className={sectionSubtitle}
              variants={fadeInUp}
            >
              The lighting infrastructure is built. Now comes the{" "}
              <motion.span 
                className="font-bold text-emerald-300 px-3 py-1 bg-emerald-500/20 rounded-lg border border-emerald-400/30"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
              >
                AI intelligence
              </motion.span>
              .
              <br />
              This section shows how our modular hardware, firmware, and
              configurator come together to deliver real-world AI intelligence.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "Factory Tour Video",
                description: "Watch how we manufacture our modular hubs and platforms in-house.",
                action: "Watch Video",
                icon: <FiActivity className="text-4xl text-emerald-400" />,
                gradient: "from-emerald-400 to-teal-400"
              },
              {
                title: "App + Configurator Demo",
                description: "See our intuitive interface that allows users to customize lighting in real-time.",
                action: "View Demo",
                icon: <FiGlobe className="text-4xl text-teal-400" />,
                gradient: "from-teal-400 to-cyan-400"
              },
              {
                title: "Modular Hardware Architecture",
                description: "How our physical layer supports plug-and-play AI sensors and edge compute.",
                action: "Download PDF",
                icon: <FiLayers className="text-4xl text-cyan-400" />,
                gradient: "from-cyan-400 to-emerald-400"
              },
              {
                title: "Product Roadmap",
                description: "Explore our development timeline, upcoming features, and long-term product vision for the next 12-36 months.",
                action: "Download PDF",
                icon: <FiFileText className="text-4xl text-emerald-300" />,
                gradient: "from-emerald-300 to-teal-300"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} group cursor-pointer relative overflow-hidden min-h-[350px] flex flex-col items-center text-center p-8`}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Icon Container */}
                <div className="mb-8 bg-emerald-500/10 p-6 rounded-3xl border border-emerald-400/20 group-hover:border-emerald-400/40 transition-colors duration-300">
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed mb-8 flex-1 group-hover:text-slate-200 transition-colors duration-300">
                    {card.description}
                  </p>
                  
                  {/* Action Button */}
                  <motion.button
                    className={`${glassBorderBtn} group`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      {card.action}
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </motion.button>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Commercial Traction Section */}
      <section className={sectionContainer}>
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]"></div>
          <motion.div 
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.h2
              className={sectionTitle}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Commercial Traction
            </motion.h2>
            <motion.p
              className={sectionSubtitle}
              variants={fadeInUp}
            >
              Not just interest. Contracts. Pipelines. Revenue.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerContainer}
          >
            {/* Card 1 */}
            <motion.div 
              className={`${premiumCard} group cursor-pointer relative overflow-hidden`}
              variants={fadeInUp}
              {...cardHover}
            >
              <div className="mb-8">
                <motion.div 
                  className="text-6xl md:text-7xl font-black text-white flex items-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">£</span>
                  <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">57.5M</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-3">Signed LOI Value</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Letter of Intent with major property developer, including
                  Joint Venture agreement for flagship implementation.
                </p>
              </div>
              
              <div className="bg-white/5 border border-emerald-600/30 rounded-2xl p-6 flex flex-col gap-4">
                <h4 className="text-xl font-bold text-emerald-300 mb-2">
                  📈 Traction Summary
                </h4>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Snapshot of metrics, customer segments, and deal progress.
                </p>
                <motion.button 
                  className={glassBorderBtn}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download PDF
                </motion.button>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className={`${premiumCard} group cursor-pointer relative overflow-hidden`}
              variants={fadeInUp}
              {...cardHover}
            >
              <div className="mb-8">
                <motion.div 
                  className="text-6xl md:text-7xl font-black text-white flex items-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">£</span>
                  <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">5T</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-3">Addressable Market</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Total addressable market infrastructure in commercial
                  buildings globally.
                </p>
              </div>
              
              <div className="bg-white/5 border border-emerald-600/30 rounded-2xl p-6 flex flex-col gap-4">
                <h4 className="text-xl font-bold text-emerald-300 mb-2">
                  💼 Signed POs/Contracts
                </h4>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Review our executed agreements with key partners.
                </p>
                <motion.button 
                  className={glassBorderBtn}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download PDF
                </motion.button>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
            </motion.div>
          </motion.div>
        </motion.div>
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <motion.div 
              className={`${premiumCard} group cursor-pointer relative overflow-hidden min-h-[200px] flex flex-col items-center text-center p-8`}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-6 bg-emerald-500/10 p-4 rounded-2xl">
                <FiUsers className="text-4xl text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">
                Founder Bios
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed flex-1">
                Learn about our founders' backgrounds, previous successes, and
                the unique expertise they bring to LIMI's mission of
                transforming the built environment.
              </p>
              <motion.button 
                className={`${glassBorderBtn} group`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Download PDF
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className={`${premiumCard} group cursor-pointer relative overflow-hidden min-h-[200px] flex flex-col items-center text-center p-8`}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-6 bg-emerald-500/10 p-4 rounded-2xl">
                <FiBriefcase className="text-4xl text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">
                Strategic Hiring Roadmap
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed flex-1">
                Review our strategic hiring roadmap designed to scale
                engineering, AI, and commercial execution in 2025.
              </p>
              <motion.button 
                className={`${glassBorderBtn} group`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Download PDF
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financials Section */}
      <section className={sectionContainer}>
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]"></div>
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.h2
              className={sectionTitle}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Financials
            </motion.h2>
            <motion.h3 
              className="text-xl md:text-2xl text-white mb-4 font-semibold"
              variants={fadeInUp}
            >
              Capital efficiency. Margin profile. Path to scale.
            </motion.h3>
            <motion.p
              className={sectionSubtitle}
              variants={fadeInUp}
            >
              Our numbers aren't projections — they're already outperforming
              peers in smart home and IoT.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "5-Year Financial Model",
                description: "Comprehensive projections including revenue forecasts, margin analysis, and key performance indicators through 2028.",
                action: "Download Excel",
                icon: <FiBarChart2 className="text-4xl text-emerald-400" />,
                gradient: "from-emerald-400 to-teal-400"
              },
              {
                title: "Historical P&L",
                description: "Review our financial performance to date, including revenue growth, cost structure, and capital efficiency metrics.",
                action: "Download Excel",
                icon: <FiDollarSign className="text-4xl text-teal-400" />,
                gradient: "from-teal-400 to-cyan-400"
              },
              {
                title: "Capital Allocation Plan",
                description: "Our capital allocation strategy for the $20M Series A round and beyond.",
                action: "Download Excel",
                icon: <FiTrendingUp className="text-4xl text-cyan-400" />,
                gradient: "from-cyan-400 to-emerald-400"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`${premiumCard} group cursor-pointer relative overflow-hidden min-h-[300px] flex flex-col items-center text-center p-8`}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Icon Container */}
                <div className="mb-8 bg-emerald-500/10 p-6 rounded-3xl border border-emerald-400/20 group-hover:border-emerald-400/40 transition-colors duration-300">
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed mb-8 flex-1 group-hover:text-slate-200 transition-colors duration-300">
                    {card.description}
                  </p>
                  
                  {/* Action Button */}
                  <motion.button
                    className={`${glassBorderBtn} group`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      {card.action}
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </motion.button>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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
