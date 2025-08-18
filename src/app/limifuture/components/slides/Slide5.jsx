'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';
import { FaInfoCircle, FaLightbulb, FaThumbsUp, FaEyeSlash, FaLevelUpAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { PiCircleDashedBold } from 'react-icons/pi';

const Slide5 = ({ slideNumber }) => {
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
      title: "Consumer Acceptance",
      content: "Unlike specialized tech devices, lighting fixtures are items consumers naturally upgrade for design purposes.",
      keyPoints: [
        "Lower adoption barriers",
        "Feels like design choice, not tech purchase",
        "Existing consumer behavior patterns"
      ]
    },
    popup2: {
      title: "Aesthetic Invisibility",
      content: "Our sensors, processors, and connectivity modules are discreetly housed within the light fixture's base.",
      keyPoints: [
        "Eliminates visual clutter",
        "Seamless integration into any environment",
        "Technology that blends rather than stands out"
      ]
    },
    popup3: {
      title: "Superior Sensor Location",
      content: "Ceiling-mounted lights offer an unobstructed, 360° view of the entire room.",
      keyPoints: [
        "Optimal vantage point for sensors",
        "Accurate radar mapping and thermal detection",
        "Comprehensive contextual awareness"
      ]
    },
    popup4: {
      title: "Natural Upgrade Path",
      content: "Our modular design allows customers to easily add new capabilities over time.",
      keyPoints: [
        '"Fast fashion" model for the home',
        "Swap styles or add new sensor modules",
        "Establishes recurring revenue stream"
      ]
    }
  };

  return (
    <div className="slide relative h-[75vh] mx-auto bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/996d5d73cb63.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="slide-content relative z-10 flex flex-col h-full p-[25px] max-sm:p-3">
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[32px] mb-[20px] text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] max-sm:text-xl max-sm:mb-4 max-sm:leading-snug">
          Why Lighting: The Perfect Trojan Horse
          <div className="absolute left-0 -bottom-[10px] w-[80px] h-[4px] rounded-[2px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] max-sm:w-[50px] max-sm:h-[2px]" />
        </h1>
        
        {/* Trojan Horse Section */}
        <div className="trojan-horse flex items-center mb-[25px] bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-[15px] rounded-[10px] border-l-[4px] border-[#54bb74] shadow-[0_3px_10px_rgba(0,0,0,0.1)] max-sm:flex-col max-sm:items-start max-sm:mb-4 max-sm:p-2 max-sm:rounded-lg">
          <FaLightbulb className="trojan-horse-icon text-[28px] text-[#54bb74] mr-[15px] max-sm:text-lg max-sm:mr-2" />
          <div className="trojan-horse-text text-[16px] text-[#f3ebe2] leading-[1.3] font-medium max-sm:text-xs">
            Lighting is not our end product, but our <strong className="text-[#54bb74] font-bold">strategic entry point</strong> to deploy ambient AI infrastructure at scale.
          </div>
        </div>
        
        {/* Advantages Grid */}
        <div className="advantages-grid grid grid-cols-2 gap-[20px] flex-grow max-sm:grid-cols-1 max-sm:gap-3">
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[12px] p-[20px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:rounded-lg"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <FaThumbsUp className="advantage-icon text-[#ffffff] text-[32px] mb-[12px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xl max-sm:mb-1" />
            <div className="advantage-title font-[Amenti] font-bold text-[18px] mb-[8px] text-[#f3ebe2] max-sm:text-sm max-sm:mb-1">
              Consumer Acceptance
            </div>
            <div className="advantage-desc text-[13px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              People already upgrade lighting for aesthetic reasons
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[12px] p-[20px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:rounded-lg"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <FaEyeSlash className="advantage-icon text-[#6fc488] text-[32px] mb-[12px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xl max-sm:mb-1" />
            <div className="advantage-title font-[Amenti] font-bold text-[18px] mb-[8px] text-[#f3ebe2] max-sm:text-sm max-sm:mb-1">
              Aesthetic Invisibility
            </div>
            <div className="advantage-desc text-[13px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Technology hidden in the base, reducing visual clutter
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[12px] p-[20px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:rounded-lg"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <PiCircleDashedBold className="advantage-icon text-[#6fc488] text-[32px] mb-[12px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xl max-sm:mb-1" />
            <div className="advantage-title font-[Amenti] font-bold text-[18px] mb-[8px] text-[#f3ebe2] max-sm:text-sm max-sm:mb-1">
              Superior Sensor Location
            </div>
            <div className="advantage-desc text-[13px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Ceiling provides optimal vantage point for data collection
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[12px] p-[20px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-2 max-sm:rounded-lg"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-1 right-1 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-3 max-sm:h-3">
              <FaInfoCircle />
            </div>
            <FaLevelUpAlt className="advantage-icon text-[#6fc488] text-[32px] mb-[12px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xl max-sm:mb-1" />
            <div className="advantage-title font-[Amenti] font-bold text-[18px] mb-[8px] text-[#f3ebe2] max-sm:text-sm max-sm:mb-1">
              Natural Upgrade Path
            </div>
            <div className="advantage-desc text-[13px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Modular system encourages continuous enhancement
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center max-sm:px-2"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="bg-[#292929]/95 backdrop-blur-md rounded-xl p-6 w-[400px] border border-[#54bb74]/50 shadow-[0_10px_25px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-3 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="absolute top-3 right-3 text-[18px] text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300 max-sm:text-sm max-sm:top-2 max-sm:right-2"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-xl text-[#54bb74] mb-3 text-center max-sm:text-sm max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-sm leading-relaxed text-[#f3ebe2] text-center mb-3 max-sm:text-xs max-sm:mb-2">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-3 text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-2 max-sm:mb-1">
                    <FaCheckCircle className="text-[#54bb74] mr-2 mt-0.5 text-xs max-sm:mr-1 max-sm:mt-1" />
                    <span className="text-[#f3ebe2] text-sm max-sm:text-xs">{point}</span>
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

export default Slide5;
