"use client";

import { Tabs } from "../../components/ui/tabs";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Environment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const tabs = [
    {
      title: "Room",
      value: "room",
      content: (
        <div className="w-full relative h-auto min-h-[320px] md:h-[500px] rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 backdrop-blur-xl p-4 md:p-6">
          {/* Header Section */}
          <div className="mb-3 text-center md:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Room</h3>
          </div>
          {/* Main Content - Features + Video */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-4 md:mb-6 flex-1">
            {/* Left - Content */}
            <div className="flex-1 space-y-4 md:space-y-6 mb-4 lg:mb-0">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Seamless Room Control</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Adaptive ambience for relaxation and comfort</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Personalized lighting based on daily routines</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Temperature-responsive lighting adjustments</p>
                </div>
              </div>
            </div>
            
            {/* Right - Video Demo */}
            <div className="flex-1">
              <div className="relative h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden">
                <video
                  src="/limiai/benefit1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
        </div>
      ),
    },
    {
      title: "Office",
      value: "office",
      content: (
        <div className="w-full relative h-auto min-h-[320px] md:h-[500px] rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-900 backdrop-blur-xl p-4 md:p-6">
          {/* Header Section */}
          <div className="mb-3 text-center md:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Office</h3>
          </div>
          
          {/* Main Content - Features + Video */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-4 md:mb-6 flex-1">
            {/* Left - Content */}
            <div className="flex-1 space-y-4 md:space-y-6 mb-4 lg:mb-0">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Smart Office Control</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Adaptive lighting for focus and productivity</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Auto-adjusts to daylight and occupancy</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Seamless transition between meeting modes</p>
                </div>
              </div>
            </div>
            
            {/* Right - Video Demo */}
            <div className="flex-1">
              <div className="relative h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden">
                <video
                  src="/limiai/benefit1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
        </div>
      ),
    },
    {
      title: "Restaurant",
      value: "restaurant",
      content: (
        <div className="w-full relative h-auto min-h-[320px] md:h-[500px] rounded-2xl bg-gradient-to-br from-orange-700 to-red-900 backdrop-blur-xl p-4 md:p-6">
          {/* Header Section */}
          <div className="mb-3 text-center md:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Restaurant</h3>
          </div>
          
          {/* Main Content - Features + Video */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-4 md:mb-6 flex-1">
            {/* Left - Content */}
            <div className="flex-1 space-y-4 md:space-y-6 mb-4 lg:mb-0">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Restaurant Ambience Control</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Dynamic ambience for different dining moods</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Time-based lighting for breakfast, lunch, and dinner</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Synchronized lighting with music and events</p>
                </div>
              </div>
            </div>
            
            {/* Right - Video Demo */}
            <div className="flex-1">
              <div className="relative h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden">
                <video
                  src="/limiai/benefit1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          
        </div>
      ),
    },
    {
      title: "Hotel",
      value: "hotel",
      content: (
        <div className="w-full relative h-auto min-h-[320px] md:h-[500px] rounded-2xl bg-gradient-to-br from-green-700 to-emerald-900 backdrop-blur-xl p-4 md:p-6">
          {/* Header Section */}
          <div className="mb-3 text-center md:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Hotel</h3>
          </div>
          
          {/* Main Content - Features + Video */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-4 md:mb-6 flex-1">
            {/* Left - Content */}
            <div className="flex-1 space-y-4 md:space-y-6 mb-4 lg:mb-0">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Luxury Hotel Control</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Personalized guest preferences and settings</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Automated check-in and room preparation</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-base md:text-lg">•</span>
                  <p className="text-base md:text-lg text-white/90">Circadian rhythm optimization for better sleep</p>
                </div>
              </div>
            </div>
            
            {/* Right - Video Demo */}
            <div className="flex-1">
              <div className="relative h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden">
                <video
                  src="/limiai/benefit1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
        </div>
      ),
    },
  ];

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            One AI.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              Endless Environments.
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
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Unlike traditional smart systems, LIMI AI adapts seamlessly to rooms, offices, hotels, and restaurants — transforming every space intelligently.
        </p>
      </motion.div>

      {/* Tabs Section */}
      <div className="h-auto min-h-[28rem] md:h-[25rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

const DummyContent = ({ imageSrc }) => {
  return (
    <div className="relative w-full h-full p-4">
      <Image
        src={imageSrc || "/linear.webp"}
        alt="Environment showcase"
        width={1000}
        height={1000}
        className="object-cover w-full h-full rounded-xl"
      />
    </div>
  );
};
