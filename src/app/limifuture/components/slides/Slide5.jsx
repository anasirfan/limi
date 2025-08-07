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
    <div className="slide relative w-[1280px] h-[70vh] mx-auto bg-[#292929] overflow-hidden max-sm:w-full max-sm:min-h-0 max-sm:h-[700px] max-sm:mx-0">
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
      <div className="slide-content relative z-10 flex flex-col h-full p-[40px] max-sm:p-4">
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[42px] mb-[30px] text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] max-sm:text-2xl max-sm:mb-6 max-sm:leading-snug">
          Why Lighting: The Perfect Trojan Horse
          <div className="absolute left-0 -bottom-[15px] w-[100px] h-[5px] rounded-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] max-sm:w-[60px] max-sm:h-[3px]" />
        </h1>
        
        {/* Trojan Horse Section */}
        <div className="trojan-horse flex items-center mb-[40px] bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-[20px] rounded-[12px] border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)] max-sm:flex-col max-sm:items-start max-sm:mb-6 max-sm:p-3 max-sm:rounded-lg">
          <FaLightbulb className="trojan-horse-icon text-[36px] text-[#54bb74] mr-[20px] max-sm:text-xl max-sm:mr-2" />
          <div className="trojan-horse-text text-[20px] text-[#f3ebe2] leading-[1.4] font-medium max-sm:text-sm">
            Lighting is not our end product, but our <strong className="text-[#54bb74] font-bold">strategic entry point</strong> to deploy ambient AI infrastructure at scale.
          </div>
        </div>
        
        {/* Advantages Grid */}
        <div className="advantages-grid grid grid-cols-2 gap-[30px] flex-grow max-sm:grid-cols-1 max-sm:gap-4">
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaThumbsUp className="advantage-icon text-[#ffffff] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Consumer Acceptance
            </div>
            <div className="advantage-desc text-[16px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              People already upgrade lighting for aesthetic reasons
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaEyeSlash className="advantage-icon text-[#6fc488] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Aesthetic Invisibility
            </div>
            <div className="advantage-desc text-[16px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Technology hidden in the base, reducing visual clutter
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <PiCircleDashedBold className="advantage-icon text-[#6fc488] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Superior Sensor Location
            </div>
            <div className="advantage-desc text-[16px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Ceiling provides optimal vantage point for data collection
            </div>
          </div>
          
          <div 
            className="advantage-card bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaLevelUpAlt className="advantage-icon text-[#6fc488] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Natural Upgrade Path
            </div>
            <div className="advantage-desc text-[16px] text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
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
            className="bg-[#292929]/95 backdrop-blur-md rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-4 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="absolute top-4 right-4 text-[22px] text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300 max-sm:text-base max-sm:top-2 max-sm:right-2"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center max-sm:text-base max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-base leading-relaxed text-[#f3ebe2] text-center mb-4 max-sm:text-xs max-sm:mb-2">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-4 text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-2.5 max-sm:mb-1">
                    <FaCheckCircle className="text-[#54bb74] mr-2.5 mt-0.5 max-sm:text-xs max-sm:mr-1 max-sm:mt-1" />
                    <span className="text-[#f3ebe2] max-sm:text-xs">{point}</span>
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
