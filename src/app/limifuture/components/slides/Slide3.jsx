'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';
import { FaInfoCircle, FaPuzzlePiece, FaShieldAlt, FaSyncAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';

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
    <div className="slide relative h-[75vh] bg-[#292929] overflow-hidden">
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
      <div className="slide-content relative z-10 flex flex-col h-full p-[60px] max-sm:p-4">
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[52px] mb-[40px] text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] max-sm:text-2xl max-sm:mb-6 max-sm:leading-snug">
          Current AI is Trapped in the Cloud
          <div className="absolute left-0 -bottom-[15px] w-[100px] h-[5px] rounded-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] max-sm:w-[60px] max-sm:h-[3px]" />
        </h1>
        
        {/* Problems Container */}
        <div className="problems-container flex justify-between gap-[30px] flex-grow mt-[20px] max-sm:flex-col max-sm:gap-4 max-sm:mt-4">
          <div 
            className="problem-card flex-1 bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaPuzzlePiece className="problem-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Fragmentation
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Device chaos with incompatible systems and apps
            </div>
          </div>
          
          <div 
            className="problem-card flex-1 bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaShieldAlt className="problem-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Privacy Concerns
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              Constant data streaming to remote servers
            </div>
          </div>
          
          <div 
            className="problem-card flex-1 bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[30px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group max-sm:p-3 max-sm:rounded-lg"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            <div className="info-badge absolute top-2 right-2 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white max-sm:w-4 max-sm:h-4">
              <FaInfoCircle />
            </div>
            <FaSyncAlt className="problem-icon text-[#66C081] text-[48px] mb-[20px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-2xl max-sm:mb-2" />
            <div className="font-[Amenti] font-bold text-2xl mb-4 text-[#f3ebe2] max-sm:text-base max-sm:mb-2">
              Reactive Nature
            </div>
            <div className="text-base leading-relaxed text-[#93cfa2] max-sm:text-xs max-sm:leading-tight">
              AI that waits for commands instead of anticipating needs
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
            className="bg-[#292929]/95 backdrop-blur-[15px] rounded-[16px] p-[30px] w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative max-sm:w-full max-sm:p-4 max-sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes 
              className="popup-close absolute top-4 right-4 text-[20px] text-[#93cfa2] cursor-pointer transition-colors duration-300 hover:text-[#f3ebe2] max-sm:text-base max-sm:top-2 max-sm:right-2"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[24px] text-[#54bb74] mb-[15px] text-center max-sm:text-base max-sm:mb-2">
              {popupData[activePopup]?.title}
            </div>
            <div className="popup-content text-[16px] text-[#f3ebe2] text-center mb-[15px] max-sm:text-xs max-sm:mb-2">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="key-points mt-[15px] text-left max-sm:mt-2">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="key-point flex items-start mb-[10px] max-sm:mb-1">
                    <FaCheckCircle className="text-[#54bb74] mr-[10px] mt-[3px] max-sm:text-xs max-sm:mr-1 max-sm:mt-1" />
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

export default Slide3;
