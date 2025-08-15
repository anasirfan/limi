'use client';

import { useState } from 'react';
import { FaCoins, FaBoxOpen, FaCrown, FaCertificate, FaInfoCircle, FaLongArrowAltRight, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide7 = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (popupId) => {
    setActivePopup(popupId);
    trackPopupInteraction(slideNumber, popupId, 'open');
  };

  const closePopup = (popupId) => {
    setActivePopup(null);
    trackPopupInteraction(slideNumber, popupId, 'close');
  };

  const popupData = {
    popup1: {
      title: "Profitable Hardware Sales",
      content: "Our first revenue layer focuses on high-margin hardware sales that seed the market with our infrastructure.",
      keyPoints: [
        "Lighting fixtures with 55%+ gross margins",
        "Modular bases and add-on sensors",
        "Exceptional supply chain mastery",
        "Owned factory in China for quality control"
      ]
    },
    popup2: {
      title: "Premium AI Subscriptions",
      content: "Our second layer introduces high-margin recurring revenue through subscription-based advanced AI features.",
      keyPoints: [
        "Proactive assistance and anticipation",
        "Advanced security monitoring",
        "Hyper-personalization features",
        "Similar to cloud AI service subscriptions"
      ]
    },
    popup3: {
      title: "Platform Licensing",
      content: "Our ultimate layer creates the highest margins through licensing our core technology to other manufacturers.",
      keyPoints: [
        "\"Intel Inside\" model for intelligent spaces",
        "Licensing core technology to manufacturers",
        "Royalty income from licensed products",
        "Scalable, high-margin revenue stream"
      ]
    }
  };

  return (
    <div className="relative h-[75vh] mx-auto bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/14dc8ef31301.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[30px] py-[25px] max-sm:px-3 max-sm:py-2">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[28px] mb-8 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] max-sm:text-lg max-sm:mb-2 max-sm:leading-snug">
          Our Multi-Layered Business Model: Beyond Hardware
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full max-sm:w-[50px] max-sm:h-[2px]" />
        </h1>
        
        {/* Business Model Intro */}
        <div className="flex items-center mb-4 p-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 rounded-lg border-l-3 border-[#54bb74] shadow-[0_3px_10px_rgba(0,0,0,0.1)] max-sm:flex-col max-sm:items-start max-sm:mb-3 max-sm:p-2 max-sm:rounded-lg">
          <FaCoins className="text-[24px] text-[#54bb74] mr-3 max-sm:text-lg max-sm:mr-1" />
          <div className="text-[18px] text-[#f3ebe2] leading-tight font-medium max-sm:text-xs">
            Like <strong className="text-[#54bb74] font-bold">Intel</strong> (90%+ margins on chips) and <strong className="text-[#54bb74] font-bold">Qualcomm</strong> (IP royalties), we're building a multi-layered revenue model that scales beyond hardware.
          </div>
        </div>
        
        {/* Revenue Layers */}
        <div className="flex flex-col gap-3 flex-grow mt-4 max-sm:gap-2 max-sm:mt-2">
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 py-4 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:py-3 max-sm:rounded-lg max-sm:flex-col max-sm:items-start"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <FaBoxOpen className="text-[32px] text-[#66C081] mr-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent layer-icon max-sm:text-lg max-sm:mr-2" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-[20px] mb-1 text-[#f3ebe2] flex items-center max-sm:text-xs max-sm:mb-1">
                Profitable Hardware Sales
                <span className="margin-badge bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-[16px] px-2 py-0.5 rounded-full ml-3 max-sm:text-[8px] max-sm:px-1 max-sm:py-0.5 max-sm:ml-2">
                  55%+ Margins
                </span>
              </div>
              <div className="text-[16px] leading-tight text-[#93cfa2] max-sm:text-[16px] max-sm:leading-tight">
                Lighting fixtures, modular bases, and add-on sensors with exceptional supply chain mastery
              </div>
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 py-4 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:py-3 max-sm:rounded-lg max-sm:flex-col max-sm:items-start"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <FaCrown className="text-[32px] text-[#66C081] mr-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent layer-icon max-sm:text-lg max-sm:mr-2" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-[20px] mb-1 text-[#f3ebe2] flex items-center max-sm:text-xs max-sm:mb-1">
                Premium AI Subscriptions
                <span className="margin-badge bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-[16px] px-2 py-0.5 rounded-full ml-3 max-sm:text-[8px] max-sm:px-1 max-sm:py-0.5 max-sm:ml-2">
                  70%+ Margins
                </span>
              </div>
              <div className="text-[16px] leading-tight text-[#93cfa2] max-sm:text-[16px] max-sm:leading-tight">
                Recurring revenue for advanced features like proactive assistance, security monitoring, and personalization
              </div>
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 py-4 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:py-3 max-sm:rounded-lg max-sm:flex-col max-sm:items-start"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <PiCertificateFill className="text-[32px] text-[#66C081] mr-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent layer-icon max-sm:text-lg max-sm:mr-2" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-[20px] mb-1 text-[#f3ebe2] flex items-center max-sm:text-xs max-sm:mb-1">
                Platform Licensing
                <span className="margin-badge bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-[16px] px-2 py-0.5 rounded-full ml-3 max-sm:text-[8px] max-sm:px-1 max-sm:py-0.5 max-sm:ml-2">
                  80%+ Margins
                </span>
              </div>
              <div className="text-[16px] leading-tight text-[#93cfa2] max-sm:text-[16px] max-sm:leading-tight">
                "Intel Inside" model licensing our core technology to other manufacturers in the intelligent spaces ecosystem
              </div>
            </div>
          </div>
        </div>
        
        {/* Margin Progression */}
        <div className="flex items-center justify-center mt-4 gap-2 margin-progression max-sm:mt-2 max-sm:gap-1">
          <span className="text-[14px] text-[#93cfa2] max-sm:text-xs">Margin Progression:</span>
          <span className="font-[Amenti] font-bold text-[16px] text-[#f3ebe2] max-sm:text-xs">55%</span>
          <FaLongArrowAltRight className="text-[16px] text-[#54bb74] margin-arrow max-sm:text-xs" />
          <span className="font-[Amenti] font-bold text-[16px] text-[#f3ebe2] max-sm:text-xs">70%</span>
          <FaLongArrowAltRight className="text-[16px] text-[#54bb74] margin-arrow max-sm:text-xs" />
          <span className="font-[Amenti] font-bold text-[16px] text-[#f3ebe2] max-sm:text-xs">80%+</span>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center max-sm:px-2"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="popup bg-[#292929]/95 backdrop-blur-[15px] rounded-xl p-5 w-[400px] border border-[#54bb74]/50 shadow-[0_10px_25px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-3 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-3 right-3 text-[16px] text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300 max-sm:text-sm"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[18px] text-[#54bb74] mb-3 text-center max-sm:text-sm max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="popup-content text-[13px] leading-[1.5] text-[#f3ebe2] text-center mb-3 max-sm:text-xs max-sm:mb-2">
              {popupData[activePopup]?.content}
            </div>
            {popupData[activePopup]?.keyPoints && (
              <div className="key-points mt-3 text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="key-point flex items-start mb-2 max-sm:mb-1">
                    <FaCheckCircle className="text-[#54bb74] mr-2 mt-0.5 text-xs max-sm:mr-1 max-sm:mt-1" />
                    <span className="text-[#f3ebe2] text-[12px] max-sm:text-xs">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Slide7;
