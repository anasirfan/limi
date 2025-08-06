'use client';

import { useState } from 'react';
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
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
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
      <div className="relative z-10 flex flex-col h-full px-15 py-15">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-5xl mb-10 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Our Multi-Layered Business Model: Beyond Hardware
          <div className="absolute -bottom-4 left-0 w-25 h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Business Model Intro */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <i className="fas fa-coins text-4xl text-[#54bb74] mr-5" />
          <div className="text-xl text-[#f3ebe2] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Intel</strong> (90%+ margins on chips) and <strong className="text-[#54bb74] font-bold">Qualcomm</strong> (IP royalties), we're building a multi-layered revenue model that scales beyond hardware.
          </div>
        </div>
        
        {/* Revenue Layers */}
        <div className="flex flex-col gap-6 flex-grow">
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-6 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-box-open text-5xl text-[#54bb74] mr-6 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-2xl mb-2 text-[#f3ebe2] flex items-center">
                Profitable Hardware Sales
                <span className="bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-lg px-3 py-1 rounded-full ml-4">
                  55%+ Margins
                </span>
              </div>
              <div className="text-base leading-relaxed text-[#93cfa2]">
                Lighting fixtures, modular bases, and add-on sensors with exceptional supply chain mastery
              </div>
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-6 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-crown text-5xl text-[#54bb74] mr-6 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-2xl mb-2 text-[#f3ebe2] flex items-center">
                Premium AI Subscriptions
                <span className="bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-lg px-3 py-1 rounded-full ml-4">
                  70%+ Margins
                </span>
              </div>
              <div className="text-base leading-relaxed text-[#93cfa2]">
                Recurring revenue for advanced features like proactive assistance, security monitoring, and personalization
              </div>
            </div>
          </div>
          
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-6 flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-certificate text-5xl text-[#54bb74] mr-6 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="flex-grow">
              <div className="font-[Amenti] font-bold text-2xl mb-2 text-[#f3ebe2] flex items-center">
                Platform Licensing
                <span className="bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-lg px-3 py-1 rounded-full ml-4">
                  80%+ Margins
                </span>
              </div>
              <div className="text-base leading-relaxed text-[#93cfa2]">
                "Intel Inside" model licensing our core technology to other manufacturers in the intelligent spaces ecosystem
              </div>
            </div>
          </div>
        </div>
        
        {/* Margin Progression */}
        <div className="flex items-center justify-center mt-8 gap-4">
          <span className="text-lg text-[#93cfa2]">Margin Progression:</span>
          <span className="font-[Amenti] font-bold text-2xl text-[#f3ebe2]">55%</span>
          <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
          <span className="font-[Amenti] font-bold text-2xl text-[#f3ebe2]">70%</span>
          <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
          <span className="font-[Amenti] font-bold text-2xl text-[#f3ebe2]">80%+</span>
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

export default Slide7;
