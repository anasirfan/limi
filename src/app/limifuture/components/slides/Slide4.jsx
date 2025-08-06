'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

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
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
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
      <div className="relative z-10 flex flex-col h-full px-15 py-15">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-5xl mb-10 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          Our Solution: The Intelligent Gateway is Hiding in Plain Sight
          <div className="absolute -bottom-4 left-0 w-25 h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Trojan Horse Section */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <i className="fas fa-lightbulb text-4xl text-[#54bb74] mr-5" />
          <div className="text-xl text-[#292929] leading-relaxed font-medium">
            We've reinvented the <strong className="text-[#54bb74] font-bold">light fixture</strong> as the perfect <strong className="text-[#54bb74] font-bold">"Trojan Horse"</strong> for deploying Edge AI infrastructure into every space.
          </div>
        </div>
        
        {/* Advantages Container */}
        <div className="flex justify-between gap-8 flex-grow">
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-map-marker-alt text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#292929]">
              Ubiquitous Presence
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              In every room of every building, providing unparalleled existing footprint
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-bolt text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#292929]">
              Constant Power
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              Hardwired to mains, eliminating battery limitations and ensuring reliability
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-eye text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#292929]">
              Central Vantage Point
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              360° view of entire space, enabling comprehensive sensor data collection
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="bg-white/95 backdrop-blur-md rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <i 
              className="fas fa-times absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-base leading-relaxed text-[#292929] text-center mb-4">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-4 text-left">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-2.5">
                    <i className="fas fa-check-circle text-[#54bb74] mr-2.5 mt-0.5" />
                    <span className="text-[#292929]">{point}</span>
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
