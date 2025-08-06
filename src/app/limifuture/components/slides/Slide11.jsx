'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide11 = ({ slideNumber }) => {
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
      title: "Manufacturing Partnership",
      content: "Strategic partnership with established manufacturers to ensure quality and scale production efficiently.",
      keyPoints: [
        "Owned factory in China for quality control",
        "Established supply chain relationships",
        "Scalable manufacturing processes",
        "Cost-effective production at volume"
      ]
    },
    popup2: {
      title: "Technology Integration",
      content: "Seamless integration of AI, hardware, and software components into a unified intelligent system.",
      keyPoints: [
        "Edge AI processing capabilities",
        "Cloud connectivity and synchronization",
        "Modular hardware architecture",
        "Over-the-air software updates"
      ]
    },
    popup3: {
      title: "Market Entry Strategy",
      content: "Phased approach to market entry, starting with early adopters and expanding to mainstream consumers.",
      keyPoints: [
        "Beta testing with select customers",
        "Direct-to-consumer initial launch",
        "Retail partnerships for scale",
        "B2B commercial market expansion"
      ]
    },
    popup4: {
      title: "Quality Assurance",
      content: "Rigorous testing and quality control processes to ensure product reliability and customer satisfaction.",
      keyPoints: [
        "Comprehensive product testing protocols",
        "User experience validation",
        "Reliability and durability testing",
        "Continuous improvement processes"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/a1b2c3d4e5f6.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Execution Strategy: From Vision to Reality
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Strategy Overview */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <i className="fas fa-rocket text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#f3ebe2] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Tesla's</strong> vertical integration and <strong className="text-[#54bb74] font-bold">Apple's</strong> end-to-end control, we're building comprehensive execution capabilities.
          </div>
        </div>
        
        {/* Execution Pillars */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Manufacturing */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-industry text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Manufacturing Partnership
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Strategic manufacturing partnerships ensuring quality control and scalable production.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Quality Control
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Scale Ready
                </span>
              </div>
            </div>
          </div>
          
          {/* Technology Integration */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-microchip text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Technology Integration
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Seamless integration of AI, hardware, and software into unified intelligent systems.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Edge AI
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Modular Design
                </span>
              </div>
            </div>
          </div>
          
          {/* Market Entry */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-chart-line text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Market Entry Strategy
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Phased market approach from early adopters to mainstream consumer adoption.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Beta Testing
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  B2B Expansion
                </span>
              </div>
            </div>
          </div>
          
          {/* Quality Assurance */}
          <div 
            className="bg-[#292929]/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-shield-alt text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
                Quality Assurance
              </div>
              <div className="text-sm text-[#93cfa2] leading-relaxed mb-3">
                Rigorous testing and quality control ensuring product reliability and satisfaction.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Rigorous Testing
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Reliable
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Execution Timeline */}
        <div className="mt-8 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-6 rounded-xl border border-[#54bb74]/30 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <div className="font-[Amenti] font-bold text-xl text-[#54bb74] mb-4 text-center flex items-center justify-center">
            <i className="fas fa-calendar-alt mr-3" />
            Execution Timeline
          </div>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">Q1 2024</div>
              <div className="text-sm text-[#93cfa2]">MVP Development</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">Q3 2024</div>
              <div className="text-sm text-[#93cfa2]">Beta Testing</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">Q1 2025</div>
              <div className="text-sm text-[#93cfa2]">Market Launch</div>
            </div>
            <i className="fas fa-long-arrow-alt-right text-2xl text-[#54bb74]" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-lg text-[#f3ebe2]">Q4 2025</div>
              <div className="text-sm text-[#93cfa2]">Scale Production</div>
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

export default Slide11;
