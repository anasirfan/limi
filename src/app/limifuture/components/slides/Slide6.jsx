'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

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
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/c53fe3094401.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-15 py-15">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-5xl mb-10 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          From Lighting to Ambient AI: Our Staged Approach
          <div className="absolute -bottom-4 left-0 w-25 h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Evolution Intro */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <i className="fas fa-chart-line text-4xl text-[#54bb74] mr-5" />
          <div className="text-xl text-[#292929] leading-relaxed font-medium">
            Our deliberate, <strong className="text-[#54bb74] font-bold">de-risked journey</strong> from current product to long-term vision, building value at each stage.
          </div>
        </div>
        
        {/* Stages Container */}
        <div className="flex justify-between gap-5 flex-grow">
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              1
            </div>
            <i className="fas fa-shopping-cart text-4xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-xl mb-3 text-[#292929]">
              Initial Purchase
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              Lighting with embedded AI base
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              2
            </div>
            <i className="fas fa-cloud-download-alt text-4xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-xl mb-3 text-[#292929]">
              Software Activation
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              OTA updates unlock AI capabilities
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              3
            </div>
            <i className="fas fa-puzzle-piece text-4xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-xl mb-3 text-[#292929]">
              Ecosystem Expansion
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              Add-on modules for enhanced functionality
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              4
            </div>
            <i className="fas fa-crown text-4xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-xl mb-3 text-[#292929]">
              Premium Services
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              Subscription for advanced AI features
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup5')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              5
            </div>
            <i className="fas fa-sync-alt text-4xl text-[#54bb74] mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-xl mb-3 text-[#292929]">
              Data Flywheel
            </div>
            <div className="text-base leading-relaxed text-[#555]">
              AI network that continuously improves
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

export default Slide6;
