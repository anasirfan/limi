"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  FaInfoCircle,
  FaObjectGroup,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { trackPopupInteraction } from "../../../utils/umamiTracking";

const Slide8 = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (popupId) => {
    setActivePopup(popupId);
    trackPopupInteraction(slideNumber, popupId, "open");
  };

  const closePopup = (popupId) => {
    setActivePopup(null);
    trackPopupInteraction(slideNumber, popupId, "close");
  };

  const popupData = {
    popup1: {
      title: "Lighting & Decoration",
      content:
        "The largest segment in our TAM, representing both residential and commercial lighting markets.",
      keyPoints: [
        "Consumers already upgrade lighting for aesthetic reasons",
        "Existing market behaviors support our approach",
        "High margins and frequent replacement cycles",
      ],
    },
    popup2: {
      title: "Home Security",
      content:
        "Includes security cameras, access control, and monitoring systems that can be integrated into our lighting infrastructure.",
      keyPoints: [
        "Growing demand for integrated security solutions",
        "Our ceiling vantage point ideal for surveillance",
        "Recurring revenue from monitoring services",
      ],
    },
    popup3: {
      title: "Smart Speakers & Voice",
      content:
        "Voice assistants and smart speakers that can be replaced or enhanced by our ambient AI system.",
      keyPoints: [
        "Distributed microphones offer better coverage",
        "Privacy advantages with local processing",
        "Superior contextual awareness",
      ],
    },
    popup4: {
      title: "Climate Control",
      content:
        "HVAC systems and smart thermostats that can be integrated with our platform for comprehensive environmental control.",
      keyPoints: [
        "Energy efficiency optimization",
        "Occupancy-based climate adjustments",
        "Integration with other systems for holistic control",
      ],
    },
    popup5: {
      title: "Safety & Monitoring",
      content:
        "Includes smoke detectors, health monitoring systems, and emergency response systems.",
      keyPoints: [
        "Non-contact health monitoring capabilities",
        "Early detection of potential issues",
        "Integration with emergency services",
      ],
    },
  };

  // Recharts data for PieChart
  const pieData = [
    { name: "Lighting & Decoration", value: 188, color: "#54bb74" },
    { name: "Home Security", value: 100, color: "#93cfa2" },
    { name: "Smart Speakers & Voice", value: 80, color: "#292929" },
    { name: "Climate Control", value: 30, color: "#a3d5b3" },
    { name: "Safety & Monitoring", value: 25, color: "#6a9d78" },
  ];

  return (
    <div className="relative w-full bg-[#f3ebe2] h-[75vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://sfile.chatglm.cn/images-ppt/86824bc9973b.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 py-4 max-sm:px-3 max-sm:py-2">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[28px] mb-4 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)] max-sm:text-lg max-sm:mb-2 max-sm:leading-snug">
          Market Opportunity: The $400B+ Intelligent Spaces Market
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full max-sm:w-[50px] max-sm:h-[2px]" />
        </h1>

        {/* Content Container */}
        <div className="flex gap-4 flex-grow max-sm:flex-col max-sm:gap-2">
          {/* Chart Container */}
          <div className="flex-1 h-auto relative max-sm:h-[100px] max-sm:mb-1">
            <ResponsiveContainer
              width="100%"
              height={window?.innerWidth < 640 ? "100%" : "100%"}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={window?.innerWidth < 640 ? 25 : 45}
                  outerRadius={window?.innerWidth < 640 ? 40 : 75}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  label={({ name, value }) => `$${value}B`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`$${value}B`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Market Info */}
          <div className="flex-1 flex flex-col justify-center max-sm:justify-start">
            <div className="font-[Amenti] font-bold text-[36px] text-[#54bb74] mb-2 leading-none bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-1">
              $400B+
            </div>
            <div className="text-[14px] text-[#292929] mb-3 leading-tight max-sm:text-xs max-sm:mb-2">
              Total Addressable Market for intelligent spaces that Limi is
              positioned to capture through our consolidation strategy.
            </div>

            {/* Market Segments */}
            <div className="mb-3">
              <div
                className="flex items-center mb-2 p-1 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1 max-sm:mb-1 max-sm:text-xs max-sm:gap-1"
                onClick={() => openPopup("popup1")}
              >
                <div className="w-2 h-2 rounded bg-[#54bb74] mr-2" />
                <div className="text-[12px] text-[#292929] flex-grow">
                  Lighting & Decoration
                </div>
                <div className="font-[Amenti] font-bold text-[12px] text-[#292929] ml-2">
                  $188B
                </div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle className="-z-1" />
                </div>
              </div>

              <div
                className="flex items-center mb-2 p-1 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1 max-sm:mb-1"
                onClick={() => openPopup("popup2")}
              >
                <div className="w-2 h-2 rounded bg-[#93cfa2] mr-2" />
                <div className="text-[12px] text-[#292929] flex-grow">
                  Home Security
                </div>
                <div className="font-[Amenti] font-bold text-[12px] text-[#292929] ml-2">
                  $100B+
                </div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle className="-z-1" />
                </div>
              </div>

              <div
                className="flex items-center mb-2 p-1 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1 max-sm:mb-1"
                onClick={() => openPopup("popup3")}
              >
                <div className="w-2 h-2 rounded bg-[#292929] mr-2" />
                <div className="text-[12px] text-[#292929] flex-grow">
                  Smart Speakers & Voice
                </div>
                <div className="font-[Amenti] font-bold text-[12px] text-[#292929] ml-2">
                  $80B+
                </div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle className="-z-1" />
                </div>
              </div>

              <div
                className="flex items-center mb-2 p-1 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1 max-sm:mb-1"
                onClick={() => openPopup("popup4")}
              >
                <div className="w-2 h-2 rounded bg-[#a3d5b3] mr-2" />
                <div className="text-[12px] text-[#292929] flex-grow">
                  Climate Control
                </div>
                <div className="font-[Amenti] font-bold text-[12px] text-[#292929] ml-2">
                  $30B+
                </div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle className="-z-1" />
                </div>
              </div>

              <div
                className="flex items-center mb-2 p-1 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1 max-sm:mb-1"
                onClick={() => openPopup("popup5")}
              >
                <div className="w-2 h-2 rounded bg-[#6a9d78] mr-2" />
                <div className="text-[12px] text-[#292929] flex-grow">
                  Safety & Monitoring
                </div>
                <div className="font-[Amenti] font-bold text-[12px] text-[#292929] ml-2">
                  $25B
                </div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle className="-z-1" />
                </div>
              </div>
            </div>

            {/* Consolidation Note */}
            <div className="bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 border-l-3 border-[#54bb74] p-2 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.05)] max-sm:p-2 max-sm:rounded-lg">
              <div className="font-[Amenti] font-bold text-[14px] text-[#54bb74] mb-1 flex items-center max-sm:text-sm max-sm:mb-1">
                <FaObjectGroup className="mr-1 text-[12px]" />
                Consolidation Strategy
              </div>
              <div className="text-[11px] text-[#292929] leading-tight max-sm:text-xs max-sm:leading-tight">
                Just as Apple consolidated multiple devices into one smartphone,
                Limi is unifying these fragmented markets into a single
                intelligent platform.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center max-sm:items-end max-sm:p-2"
          onClick={() => closePopup(activePopup)}
        >
          <div
            className="popup bg-white/95 backdrop-blur-[15px] rounded-xl p-4 w-[350px] border border-[#54bb74]/50 shadow-[0_10px_25px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative max-sm:p-3 max-sm:w-full max-sm:rounded-lg max-sm:border max-sm:border-[#54bb74]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-3 right-3 text-[16px] text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300 max-sm:text-sm"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[18px] text-[#54bb74] mb-3 text-center max-sm:text-sm max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="popup-content text-[13px] leading-[1.5] text-[#292929] text-center mb-2 max-sm:text-xs">
              {popupData[activePopup]?.content}
            </div>
            {popupData[activePopup]?.keyPoints && (
              <div className="key-points mt-3 text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="key-point flex items-start mb-2 max-sm:mb-1"
                  >
                    <FaCheckCircle className="text-[#54bb74] mr-2 mt-0.5 text-xs" />
                    <span className="text-[#292929] text-[12px] max-sm:text-xs">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Slide8;
