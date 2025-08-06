'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide1 = ({ slideNumber }) => {
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
      title: "Market Opportunity",
      content: "Our market spans lighting ($188B), security ($100B+), smart speakers ($80B+), climate control ($30B+), and safety monitoring ($25B+)."
    },
    popup2: {
      title: "Strategic Partnership",
      content: "Signed with a leading UK distributor for our AI infrastructure platform, validating our business model at scale."
    },
    popup3: {
      title: "Profitability",
      content: "Achieved through first-principles mastery of our supply chain and owned factory in China."
    }
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/1fcaea6bc633.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/85 to-[#292929]/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-15">
        {/* Logo */}
        <div className="mb-10 animate-pulse">
          <i className="fas fa-lightbulb text-8xl text-[#54bb74] drop-shadow-[0_0_15px_rgba(84,187,116,0.5)]" />
        </div>
        
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-6xl text-center mb-15 text-[#f3ebe2] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          The OS for Physical Spaces
        </h1>
        
        {/* Metrics */}
        <div className="flex justify-center gap-10 mt-10">
          <div 
            className="relative w-70 h-50 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] group"
            onClick={() => openPopup('popup1')}
          >
            <i className="fas fa-info-circle absolute top-4 right-4 text-sm text-[#93cfa2] opacity-70 group-hover:bg-[#54bb74] group-hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300" />
            <div className="font-[Amenti] font-bold text-5xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              $400B+
            </div>
            <div className="text-lg text-[#93cfa2] leading-snug">
              Total Addressable Market
            </div>
          </div>
          
          <div 
            className="relative w-70 h-50 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] group"
            onClick={() => openPopup('popup2')}
          >
            <i className="fas fa-info-circle absolute top-4 right-4 text-sm text-[#93cfa2] opacity-70 group-hover:bg-[#54bb74] group-hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300" />
            <div className="font-[Amenti] font-bold text-5xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              £50M+
            </div>
            <div className="text-lg text-[#93cfa2] leading-snug">
              5-Year Platform Agreement
            </div>
          </div>
          
          <div 
            className="relative w-70 h-50 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] group"
            onClick={() => openPopup('popup3')}
          >
            <i className="fas fa-info-circle absolute top-4 right-4 text-sm text-[#93cfa2] opacity-70 group-hover:bg-[#54bb74] group-hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300" />
            <div className="font-[Amenti] font-bold text-5xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              55%+
            </div>
            <div className="text-lg text-[#93cfa2] leading-snug">
              Hardware Gross Margins
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
            className="bg-[#292929]/95 backdrop-blur-md rounded-2xl p-8 w-96 border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <i 
              className="fas fa-times absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-base leading-relaxed text-[#f3ebe2] text-center">
              {popupData[activePopup]?.content}
            </div>
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

export default Slide1;
