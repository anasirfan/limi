'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide10 = ({ slideNumber }) => {
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
      title: "Anasir Faisal - CEO & Founder",
      content: "Visionary leader with deep expertise in AI, hardware, and business strategy.",
      keyPoints: [
        "Former AI researcher with published papers",
        "Experience in hardware product development",
        "Strong business acumen and strategic thinking",
        "Passionate about creating intelligent spaces"
      ]
    },
    popup2: {
      title: "Technical Excellence",
      content: "Our team combines cutting-edge AI expertise with practical hardware engineering skills.",
      keyPoints: [
        "Advanced machine learning and computer vision",
        "Hardware design and manufacturing expertise",
        "IoT and edge computing specialization",
        "User experience and interface design"
      ]
    },
    popup3: {
      title: "Advisory Board",
      content: "Industry veterans and experts providing strategic guidance and market insights.",
      keyPoints: [
        "Former executives from major tech companies",
        "Hardware manufacturing and supply chain experts",
        "AI and machine learning thought leaders",
        "Business development and growth specialists"
      ]
    },
    popup4: {
      title: "Culture & Values",
      content: "Building a team culture focused on innovation, excellence, and user-centric design.",
      keyPoints: [
        "Innovation-first mindset",
        "User-centric product development",
        "Collaborative and inclusive environment",
        "Commitment to quality and excellence"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/b8c8d8e8f8g8.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/95 to-[#f3ebe2]/85" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          Our Team: Building the Future Together
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Team Philosophy */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <i className="fas fa-users text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#292929] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Apple's</strong> design-first culture and <strong className="text-[#54bb74] font-bold">Tesla's</strong> innovation mindset, we're building a team that combines technical excellence with visionary thinking.
          </div>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Leadership */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            {/* Profile Image Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <i className="fas fa-user text-xl text-white" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-1">
                Anasir Faisal
              </div>
              <div className="text-base text-[#54bb74] font-medium mb-3">
                CEO & Founder
              </div>
              <div className="text-sm text-[#292929] leading-relaxed">
                Visionary leader combining AI expertise with business acumen to revolutionize intelligent spaces.
              </div>
            </div>
          </div>
          
          {/* Technical Team */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-cogs text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-1">
                Technical Excellence
              </div>
              <div className="text-base text-[#54bb74] font-medium mb-3">
                AI & Hardware Experts
              </div>
              <div className="text-sm text-[#292929] leading-relaxed">
                World-class engineers specializing in AI, computer vision, hardware design, and IoT systems.
              </div>
            </div>
          </div>
          
          {/* Advisory Board */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-chess-king text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-1">
                Advisory Board
              </div>
              <div className="text-base text-[#54bb74] font-medium mb-3">
                Industry Veterans
              </div>
              <div className="text-sm text-[#292929] leading-relaxed">
                Strategic advisors from leading tech companies providing guidance on growth and market expansion.
              </div>
            </div>
          </div>
          
          {/* Culture & Values */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-heart text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-1">
                Culture & Values
              </div>
              <div className="text-base text-[#54bb74] font-medium mb-3">
                Innovation First
              </div>
              <div className="text-sm text-[#292929] leading-relaxed">
                Building a collaborative culture focused on innovation, user-centric design, and excellence in execution.
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="flex justify-center items-center mt-6 gap-8">
          <div className="text-center">
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              10+
            </div>
            <div className="text-sm text-[#292929] font-medium">Team Members</div>
          </div>
          <div className="w-px h-8 bg-[#54bb74]/30" />
          <div className="text-center">
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              5+
            </div>
            <div className="text-sm text-[#292929] font-medium">Advisors</div>
          </div>
          <div className="w-px h-8 bg-[#54bb74]/30" />
          <div className="text-center">
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-sm text-[#292929] font-medium">Committed</div>
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

export default Slide10;
