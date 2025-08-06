'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide13 = ({ slideNumber }) => {
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
      title: "Global Expansion Strategy",
      content: "Systematic approach to international market entry, starting with English-speaking markets and expanding globally.",
      keyPoints: [
        "Phase 1: US, Canada, UK, Australia",
        "Phase 2: European Union markets",
        "Phase 3: Asia-Pacific expansion",
        "Localized products for regional preferences"
      ]
    },
    popup2: {
      title: "Strategic Partnerships",
      content: "Building key partnerships with retailers, distributors, and technology companies to accelerate growth.",
      keyPoints: [
        "Retail partnerships for market reach",
        "Technology integrations with major platforms",
        "Distribution partnerships for logistics",
        "OEM partnerships for embedded solutions"
      ]
    },
    popup3: {
      title: "Product Ecosystem Expansion",
      content: "Expanding beyond lighting to create a comprehensive intelligent spaces ecosystem.",
      keyPoints: [
        "Smart home security integration",
        "Climate control and HVAC systems",
        "Entertainment and media systems",
        "Health and wellness monitoring"
      ]
    },
    popup4: {
      title: "Platform Evolution",
      content: "Evolving from hardware company to platform provider, enabling third-party developers and integrations.",
      keyPoints: [
        "Developer SDK and API platform",
        "Third-party app marketplace",
        "Integration with existing smart home ecosystems",
        "AI model marketplace for specialized use cases"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/future-expansion.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Future Vision: Scaling the Intelligent Spaces Revolution
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Vision Statement */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <i className="fas fa-globe text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#f3ebe2] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Amazon's</strong> marketplace evolution and <strong className="text-[#54bb74] font-bold">Apple's</strong> ecosystem expansion, we're building the foundation for global intelligent spaces.
          </div>
        </div>
        
        {/* Future Pillars */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Global Expansion */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-world-americas text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Global Expansion
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Systematic international market entry starting with key English-speaking markets.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Phased Approach
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Localized
                </span>
              </div>
            </div>
          </div>
          
          {/* Industry Leadership */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-crown text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Industry Leadership
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Establishing market leadership position through innovation and strategic partnerships.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Market Leader
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Innovation Hub
                </span>
              </div>
            </div>
          </div>
          
          {/* Strategic Partnerships */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-handshake text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Strategic Partnerships
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Building key partnerships with retailers, distributors, and technology companies.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Retail Partners
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Tech Integration
                </span>
              </div>
            </div>
          </div>
          
          {/* Platform Evolution */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-rocket text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Platform Evolution
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Continuous platform enhancement with new capabilities and expanded ecosystem integration.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Innovation
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Ecosystem
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Future Timeline */}
        <div className="mt-8 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-6 rounded-xl border border-[#54bb74]/30 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <div className="font-[Amenti] font-bold text-xl text-[#54bb74] mb-4 text-center flex items-center justify-center">
            <i className="fas fa-road mr-3" />
            Future Roadmap
          </div>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">2025</div>
              <div className="text-sm text-[#93cfa2]">US Market Launch</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">2026</div>
              <div className="text-sm text-[#93cfa2]">Global Expansion</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">2027</div>
              <div className="text-sm text-[#93cfa2]">Platform Launch</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">2030</div>
              <div className="text-sm text-[#93cfa2]">Market Leadership</div>
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

export default Slide13;
