'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide3 = ({ slideNumber }) => {
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
      title: "The Fragmentation Problem",
      content: "Today's smart homes require multiple apps, hubs, and devices from different manufacturers that don't communicate with each other.",
      keyPoints: [
        "Separate systems for lighting, security, climate",
        "Multiple apps and interfaces required",
        "Creates frustrating and disjointed experience"
      ]
    },
    popup2: {
      title: "Privacy Issues",
      content: "Current AI systems rely on cloud processing, meaning sensitive personal data is constantly transmitted to and stored on remote servers.",
      keyPoints: [
        "Data constantly streamed to remote servers",
        "Vulnerable to data breaches and surveillance",
        "Lack of user control over personal information"
      ]
    },
    popup3: {
      title: "The Reactive Limitation",
      content: "Current AI assistants only respond to explicit commands rather than understanding context or anticipating needs.",
      keyPoints: [
        "Only responds to direct commands",
        "Lacks contextual understanding",
        "Misses true potential of ambient intelligence"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/6e97614fa968.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-15 py-15">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-5xl mb-10 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Current AI is Trapped in the Cloud
          <div className="absolute -bottom-4 left-0 w-25 h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Problems Container */}
        <div className="flex justify-between gap-8 flex-grow mt-5">
          <div 
            className="flex-1 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-puzzle-piece text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Fragmentation
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              Device chaos with incompatible systems and apps
            </div>
          </div>
          
          <div 
            className="flex-1 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-shield-alt text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Privacy Concerns
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              Constant data streaming to remote servers
            </div>
          </div>
          
          <div 
            className="flex-1 bg-[#292929]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            <i className="fas fa-sync-alt text-5xl text-[#54bb74] mb-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2]">
              Reactive Nature
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2]">
              AI that waits for commands instead of anticipating needs
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

export default Slide3;
