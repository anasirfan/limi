'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

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
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
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
      <div className="relative z-10 flex flex-col h-full px-15 py-15">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-5xl mb-10 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Why Lighting: The Perfect Trojan Horse
          <div className="absolute -bottom-4 left-0 w-25 h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Trojan Horse Section */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <i className="fas fa-lightbulb text-4xl text-[#54bb74] mr-5" />
          <div className="text-xl text-[#f3ebe2] leading-relaxed font-medium">
            Lighting is not our end product, but our <strong className="text-[#54bb74] font-bold">strategic entry point</strong> to deploy ambient AI infrastructure at scale.
          </div>
        </div>
        
        {/* Advantages Grid */}
        <div className="grid grid-cols-2 gap-8 flex-grow">
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-thumbs-up text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Consumer Acceptance
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              People already upgrade lighting for aesthetic reasons
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-eye-slash text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Aesthetic Invisibility
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              Technology hidden in the base, reducing visual clutter
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-360-degrees text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Superior Sensor Location
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              Ceiling provides optimal vantage point for data collection
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-level-up-alt text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Natural Upgrade Path
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              Modular system encourages continuous enhancement
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
            className="bg-[#292929]/95 backdrop-blur-md rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <i 
              className="fas fa-times absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-base leading-relaxed text-[#f3ebe2] text-center mb-4">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-4 text-left">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-2.5">
                    <i className="fas fa-check-circle text-[#54bb74] mr-2.5 mt-0.5" />
                    <span className="text-[#f3ebe2]">{point}</span>
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
