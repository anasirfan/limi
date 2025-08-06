'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';
import { FaInfoCircle, FaLightbulb, FaMapMarkerAlt, FaBolt, FaEye, FaCheckCircle, FaTimes } from 'react-icons/fa';

const Slide4 = ({ slideNumber }) => {
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
      title: "Ubiquitous Presence",
      content: "Light fixtures exist in virtually every room of every home and commercial building globally, regardless of culture or economic status.",
      keyPoints: [
        "Immediate, massive distribution network",
        "No other smart home device can match this reach",
        "Cultural and economic universality"
      ]
    },
    popup2: {
      title: "Constant Power",
      content: "Unlike battery-powered devices, light fixtures are connected directly to mains power, providing continuous, reliable energy.",
      keyPoints: [
        "No battery life limitations",
        "No charging requirements",
        "Always-on reliability for Edge AI and sensors"
      ]
    },
    popup3: {
      title: "Central Vantage Point",
      content: "Ceiling lights offer an unobstructed, top-down view of the entire room, allowing for exponentially more effective sensors.",
      keyPoints: [
        "Superior vantage point for accurate data collection",
        "Enables effective radar mapping and thermal detection",
        "Comprehensive contextual awareness"
      ]
    }
  };

  return (
    <div className="slide relative w-[1280px] min-h-[720px] mx-auto bg-[#f3ebe2] overflow-hidden max-sm:w-full max-sm:min-h-0 max-sm:h-[700px] max-sm:mx-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/b288886fb85f.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />
      
      {/* Content */}
      <div className="slide-content relative z-10 flex flex-col h-full p-[60px] max-sm:p-4">
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[52px] mb-[40px] text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)] max-sm:text-2xl max-sm:mb-6 max-sm:leading-snug">
          Our Solution: The Intelligent Gateway is Hiding in Plain Sight
          <div className="absolute left-0 -bottom-[15px] w-[100px] h-[5px] rounded-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] max-sm:w-[60px] max-sm:h-[3px]" />
        </h1>
        
        {/* Trojan Horse Section */}
        <div className="trojan-horse flex items-center mb-[40px] bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-[20px] rounded-[12px] border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)] max-sm:flex-col max-sm:items-start max-sm:mb-6 max-sm:p-3 max-sm:rounded-lg">
          <FaLightbulb className="trojan-horse-icon text-[36px] text-[#54bb74] mr-[20px] max-sm:text-xl max-sm:mr-2" />
          <div className="trojan-horse-text text-[20px] text-[#292929] leading-[1.4] font-medium max-sm:text-sm">
            We've reinvented the <strong className="text-[#54bb74] font-bold">light fixture</strong> as the perfect <strong className="text-[#54bb74] font-bold">"Trojan Horse"</strong> for deploying Edge AI infrastructure into every space.
          </div>
        </div>
        
        {/* Advantages Container */}
        <div className="flex justify-between gap-8 flex-grow max-sm:flex-col max-sm:gap-4">
          <div 
            className="advantage-card flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaMapMarkerAlt className="advantage-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#292929] max-sm:text-base max-sm:mb-2">
              Ubiquitous Presence
            </div>
            <div className="advantage-desc text-[16px] text-[#555] max-sm:text-xs max-sm:leading-tight">
              In every room of every building, providing unparalleled existing footprint
            </div>
          </div>
          
          <div 
            className="advantage-card flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaBolt className="advantage-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#292929] max-sm:text-base max-sm:mb-2">
              Constant Power
            </div>
            <div className="advantage-desc text-[16px] text-[#555] max-sm:text-xs max-sm:leading-tight">
              Hardwired to mains, eliminating battery limitations and ensuring reliability
            </div>
          </div>
          
          <div 
            className="advantage-card flex-1 bg-white/85 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaEye className="advantage-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="advantage-title font-[Amenti] font-bold text-[24px] mb-[15px] text-[#292929] max-sm:text-base max-sm:mb-2">
              Central Vantage Point
            </div>
            <div className="advantage-desc text-[16px] text-[#555] max-sm:text-xs max-sm:leading-tight">
              360° view of entire space, enabling comprehensive sensor data collection
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
            className="bg-white/95 backdrop-blur-md rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-4 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes 
              className="popup-close absolute top-4 right-4 text-[20px] text-[#93cfa2] cursor-pointer transition-colors duration-300 hover:text-[#292929] max-sm:text-base max-sm:top-2 max-sm:right-2"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[24px] text-[#54bb74] mb-[15px] text-center max-sm:text-base max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="popup-content text-[16px] text-[#292929] text-center mb-[15px] max-sm:text-xs max-sm:mb-2">
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

export default Slide4;
