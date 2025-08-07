'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';
import { FaInfoCircle, FaChartLine, FaShoppingCart, FaCloudDownloadAlt, FaPuzzlePiece, FaCrown, FaSyncAlt, FaTimes, FaCheckCircle } from 'react-icons/fa';

const Slide6 = ({ slideNumber }) => {
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
      title: "Initial Purchase",
      content: "Customers buy our beautifully designed lighting fixtures for their aesthetic appeal and modularity.",
      keyPoints: [
        "Each fixture contains our proprietary Edge AI base",
        "Processing power and sensors hidden inside",
        "Forms foundation of intelligent network"
      ]
    },
    popup2: {
      title: "Software Activation",
      content: "Once installed, we push powerful AI models and new functionalities via Over-the-Air updates.",
      keyPoints: [
        "Transforms \"smart light\" into \"intelligent node\"",
        "Reveals true value beyond illumination",
        "Creates house-wide AI network"
      ]
    },
    popup3: {
      title: "Ecosystem Expansion",
      content: "The same modular base accepts additional plug-and-play modules like advanced security cameras and sensors.",
      keyPoints: [
        "Expands system capabilities beyond lighting",
        "Increases customer lifetime value",
        "Modular design ensures future compatibility"
      ]
    },
    popup4: {
      title: "Premium Services",
      content: "We introduce subscription-based premium AI features like proactive assistance and advanced security monitoring.",
      keyPoints: [
        "High-margin recurring revenue stream",
        "Similar to cloud AI service subscriptions",
        "Deepens customer engagement"
      ]
    },
    popup5: {
      title: "Data Flywheel",
      content: "As more hardware is deployed, our proprietary Edge and Cloud AI process unique real-world data, creating a \"learning loop.\"",
      keyPoints: [
        "Continuously makes AI smarter",
        "Deepens competitive moat",
        "Increases system value over time"
      ]
    }
  };

  return (
    <div className="slide relative h-[75vh] mx-auto bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      {/* Background Image */}
      <div 
        className="slide-background absolute inset-0 bg-cover bg-center opacity-30 z-[1]"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/c53fe3094401.jpg')"
        }}
      />
      {/* Overlay */}
      <div className="slide-overlay absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70 z-[2]" />
      {/* Content */}
      <div className="slide-content relative z-10 flex flex-col h-full p-[60px] max-sm:p-4">
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[42px] mb-[40px] text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)] max-sm:text-2xl max-sm:mb-6 max-sm:leading-snug">
          From Lighting to Ambient AI: Our Staged Approach
          <div className="absolute left-0 -bottom-[15px] w-[100px] h-[5px] rounded-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] max-sm:w-[60px] max-sm:h-[3px]" />
        </h1>
        
        {/* Evolution Intro */}
        <div className="evolution-intro flex items-center mb-[40px] bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-[20px] rounded-[12px] border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)] max-sm:flex-col max-sm:items-start max-sm:mb-6 max-sm:p-3 max-sm:rounded-lg">
          <FaChartLine className="evolution-intro-icon text-[36px] text-[#54bb74] mr-[20px] max-sm:text-xl max-sm:mr-2" />
          <div className="evolution-intro-text text-[20px] text-[#292929] leading-[1.4] font-medium max-sm:text-sm">
            Our deliberate, <strong className="text-[#54bb74] font-bold">de-risked journey</strong> from current product to long-term vision, building value at each stage.
          </div>
        </div>
        
        {/* Stages Container */}
        <div className="stages-container flex justify-between gap-[20px] flex-grow max-sm:flex-col max-sm:gap-4">
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_6px_15px_rgba(0,0,0,0.08)] hover:transform hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(0,0,0,0.13)] hover:border-[#54bb74] relative overflow-hidden group min-h-[180px] max-h-[210px] max-sm:p-1 max-sm:rounded-lg max-sm:min-h-[70px] max-sm:max-h-[90px]"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <div className="stage-number absolute top-3 left-4 font-[Amenti] font-bold text-[22px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xs max-sm:top-1 max-sm:left-1">
              1
            </div>
            <FaShoppingCart className="stage-icon text-[#66C081] text-[28px] mb-[8px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-[10px] max-sm:mb-0.5" />
            <div className="stage-title font-[Amenti] font-bold text-[16px] mb-[6px] text-[#292929] max-sm:text-[10px] max-sm:mb-0.5">
              Initial Purchase
            </div>
            <div className="stage-desc text-[13px] leading-[1.3] text-[#555] max-sm:text-[10px] max-sm:leading-[1.1]">
              Lighting with embedded AI base
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] px-[15px] py-[25px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <div className="stage-number absolute top-3 left-4 font-[Amenti] font-bold text-[22px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xs max-sm:top-1 max-sm:left-1">
              2
            </div>
            <FaCloudDownloadAlt className="stage-icon text-[#66C081] text-[28px] max-sm:text-[10px]" />
            <div className="stage-title font-[Amenti] font-bold text-[16px] text-[#292929] max-sm:text-[10px]">
              Software Activation
            </div>
            <div className="stage-desc text-[13px] leading-[1.3] text-[#555] max-sm:text-[10px] max-sm:leading-[1.1]">
              OTA updates unlock AI capabilities
            </div>
          </div>
          {/* Stage 3 */}
          <div 
            className="flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] px-[15px] py-[25px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <div className="stage-number absolute top-3 left-4 font-[Amenti] font-bold text-[22px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xs max-sm:top-1 max-sm:left-1">
              3
            </div>
            <FaPuzzlePiece className="stage-icon text-[#66C081] text-[28px] max-sm:text-[10px]" />
            <div className="stage-title font-[Amenti] font-bold text-[16px] text-[#292929] max-sm:text-[10px]">
              Ecosystem Expansion
            </div>
            <div className="stage-desc text-[13px] leading-[1.3] text-[#555] max-sm:text-[10px] max-sm:leading-[1.1]">
              Add-on modules for enhanced functionality
            </div>
          </div>
          {/* Stage 4 */}
          <div 
            className="flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] px-[15px] py-[25px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <div className="stage-number absolute top-3 left-4 font-[Amenti] font-bold text-[22px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xs max-sm:top-1 max-sm:left-1">
              4
            </div>
            <FaCrown className="stage-icon text-[28px] text-[#66C081] max-sm:text-[10px]" />
            <div className="stage-title font-[Amenti] font-bold text-[16px] text-[#292929] max-sm:text-[10px]">
              Premium Services
            </div>
            <div className="stage-desc text-[13px] leading-[1.3] text-[#555] max-sm:text-[10px] max-sm:leading-[1.1]">
              Subscription for advanced AI features
            </div>
          </div>
          {/* Stage 5 */}
          <div 
            className="flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] px-[15px] py-[25px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:-translate-y-2.5 hover:shadow-lg hover:border-[#54bb74] max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup5')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <div className="stage-number absolute top-3 left-4 font-[Amenti] font-bold text-[22px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-xs max-sm:top-1 max-sm:left-1">
              5
            </div>
            <FaSyncAlt className="stage-icon text-[#66C081] text-[28px] max-sm:text-[10px]" />
            <div className="stage-title font-[Amenti] font-bold text-[16px] text-[#292929] max-sm:text-[10px]">
              Data Flywheel
            </div>
            <div className="stage-desc text-[13px] leading-[1.3] text-[#555] max-sm:text-[10px] max-sm:leading-[1.1]">
              AI network that continuously improves
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center max-sm:px-2"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="popup bg-white/95 backdrop-blur-[15px] rounded-[16px] p-[30px] w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-4 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-4 right-4 text-[20px] text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300 max-sm:text-base max-sm:top-2 max-sm:right-2"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[24px] text-[#54bb74] mb-[15px] text-center max-sm:text-xs max-sm:mb-0.5">
              {popupData[activePopup]?.title}
            </div>
            <div className="popup-content text-[16px] leading-[1.6] text-[#292929] text-center max-sm:text-xs max-sm:mb-2">
              {popupData[activePopup]?.content}
            </div>
            {popupData[activePopup]?.keyPoints && (
              <div className="key-points mt-[15px] text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="key-point flex items-start mb-[10px] max-sm:mb-1">
                    <FaCheckCircle className="text-[#54bb74] mr-[10px] mt-[3px] max-sm:text-xs max-sm:mr-1 max-sm:mt-1" />
                    <span className="text-[#292929] max-sm:text-xs">{point}</span>
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

export default Slide6;
