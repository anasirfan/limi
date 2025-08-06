'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide14 = ({ slideNumber }) => {
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
      title: "Competitive Advantages",
      content: "Our unique positioning and technological advantages that create sustainable competitive moats.",
      keyPoints: [
        "First-mover advantage in ceiling-based AI",
        "Proprietary edge AI processing technology",
        "Integrated hardware-software platform",
        "Strong intellectual property portfolio"
      ]
    },
    popup2: {
      title: "Market Differentiation",
      content: "How we differentiate from existing smart home and lighting solutions in the market.",
      keyPoints: [
        "Ambient AI vs. device-specific intelligence",
        "Proactive assistance vs. reactive commands",
        "Unified platform vs. fragmented ecosystems",
        "Privacy-first approach vs. cloud dependency"
      ]
    },
    popup3: {
      title: "Technology Moats",
      content: "Technical barriers that protect our market position and create switching costs.",
      keyPoints: [
        "Proprietary computer vision algorithms",
        "Edge AI optimization for low-power devices",
        "Seamless multi-device coordination",
        "Continuous learning and adaptation"
      ]
    },
    popup4: {
      title: "Network Effects",
      content: "How our platform becomes more valuable as more users and developers join the ecosystem.",
      keyPoints: [
        "Improved AI models with more data",
        "Developer ecosystem creates value",
        "Inter-device communication benefits",
        "Community-driven feature development"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/competitive-advantage.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/95 to-[#f3ebe2]/85" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          Competitive Advantage: Building Unassailable Market Position
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Advantage Statement */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <i className="fas fa-chess-queen text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#292929] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Tesla's</strong> vertical integration and <strong className="text-[#54bb74] font-bold">Apple's</strong> ecosystem lock-in, we're building multiple layers of competitive protection.
          </div>
        </div>
        
        {/* Competitive Pillars */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Competitive Advantages */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-trophy text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Competitive Advantages
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Unique positioning and technological advantages creating sustainable competitive moats.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  First Mover
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Proprietary Tech
                </span>
              </div>
            </div>
          </div>
          
          {/* Market Differentiation */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-bullseye text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Market Differentiation
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Clear differentiation from existing smart home and lighting solutions in the market.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Ambient AI
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Proactive
                </span>
              </div>
            </div>
          </div>
          
          {/* Technology Moats */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-shield-alt text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Technology Moats
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Technical barriers protecting market position and creating high switching costs.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Proprietary AI
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Edge Optimization
                </span>
              </div>
            </div>
          </div>
          
          {/* Network Effects */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-network-wired text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Network Effects
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Platform becomes more valuable as more users and developers join the ecosystem.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Data Network
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Developer Ecosystem
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Competitive Comparison */}
        <div className="mt-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border border-[#54bb74]/30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <div className="font-[Amenti] font-bold text-lg text-[#54bb74] mb-3 text-center flex items-center justify-center">
            <i className="fas fa-chart-bar mr-2" />
            Competitive Positioning
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-[Amenti] font-bold text-base text-[#292929] mb-1">Traditional Lighting</div>
              <div className="text-xs text-[#292929]">Basic illumination</div>
              <div className="text-xs text-[#54bb74] mt-1">No intelligence</div>
            </div>
            <div>
              <div className="font-[Amenti] font-bold text-base text-[#292929] mb-1">Smart Bulbs</div>
              <div className="text-xs text-[#292929]">App-controlled</div>
              <div className="text-xs text-[#54bb74] mt-1">Limited features</div>
            </div>
            <div>
              <div className="font-[Amenti] font-bold text-base text-[#292929] mb-1">Smart Speakers</div>
              <div className="text-xs text-[#292929]">Voice commands</div>
              <div className="text-xs text-[#54bb74] mt-1">Single point</div>
            </div>
            <div className="bg-[#54bb74]/10 rounded-lg p-2">
              <div className="font-[Amenti] font-bold text-base text-[#54bb74] mb-1">Limi Platform</div>
              <div className="text-xs text-[#292929]">Ambient AI</div>
              <div className="text-xs text-[#54bb74] mt-1">Comprehensive ecosystem</div>
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

export default Slide14;
