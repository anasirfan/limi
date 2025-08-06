'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide9 = ({ slideNumber }) => {
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
      title: "Seed Round (Current)",
      content: "Initial funding to build our MVP and validate the market with early customers.",
      keyPoints: [
        "$2M target for product development",
        "Build core team and MVP",
        "Validate product-market fit",
        "Establish supply chain partnerships"
      ]
    },
    popup2: {
      title: "Series A",
      content: "Scale manufacturing and expand market reach with proven product-market fit.",
      keyPoints: [
        "$15M for manufacturing scale-up",
        "Expand team and operations",
        "Launch commercial sales",
        "Build brand and market presence"
      ]
    },
    popup3: {
      title: "Series B",
      content: "Accelerate growth and expand into new markets and product categories.",
      keyPoints: [
        "$50M for market expansion",
        "International market entry",
        "New product lines and features",
        "Strategic partnerships and acquisitions"
      ]
    },
    popup4: {
      title: "IPO/Exit",
      content: "Public offering or strategic acquisition as a market leader in intelligent spaces.",
      keyPoints: [
        "Market leadership position established",
        "Strong recurring revenue streams",
        "Global market presence",
        "Platform licensing opportunities"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/c4f4c4a6a0a2.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Funding Roadmap: Building the Future of Intelligent Spaces
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Vision Statement */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <i className="fas fa-rocket text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#f3ebe2] leading-relaxed font-medium">
            Our strategic funding approach mirrors successful tech companies: <strong className="text-[#54bb74] font-bold">validate</strong>, <strong className="text-[#54bb74] font-bold">scale</strong>, <strong className="text-[#54bb74] font-bold">dominate</strong>.
          </div>
        </div>
        
        {/* Funding Timeline */}
        <div className="flex-grow relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#54bb74] to-[#93cfa2] rounded-full" />
          
          {/* Funding Stages */}
          <div className="space-y-6">
            {/* Seed Round */}
            <div 
              className="relative flex items-center cursor-pointer group"
              onClick={() => openPopup('popup1')}
            >
              <div className="absolute left-4 w-3 h-3 bg-[#54bb74] rounded-full border-2 border-[#292929] z-10 transition-all duration-300 group-hover:scale-125" />
              <div className="ml-16 bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 flex-grow border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
                  <i className="fas fa-info" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-1 flex items-center">
                      Seed Round
                      <span className="bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-[#292929] font-[Amenti] font-bold text-sm px-2 py-1 rounded-full ml-3">
                        Current
                      </span>
                    </div>
                    <div className="text-sm text-[#93cfa2] leading-relaxed">
                      Build MVP, validate market, establish core team
                    </div>
                  </div>
                  <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
                    $2M
                  </div>
                </div>
              </div>
            </div>
            
            {/* Series A */}
            <div 
              className="relative flex items-center cursor-pointer group"
              onClick={() => openPopup('popup2')}
            >
              <div className="absolute left-4 w-3 h-3 bg-[#93cfa2] rounded-full border-2 border-[#292929] z-10 transition-all duration-300 group-hover:scale-125" />
              <div className="ml-16 bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 flex-grow border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#93cfa2] to-[#54bb74]" />
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
                  <i className="fas fa-info" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-1 flex items-center">
                      Series A
                      <span className="bg-gradient-to-r from-[#93cfa2] to-[#54bb74] text-[#292929] font-[Amenti] font-bold text-sm px-2 py-1 rounded-full ml-3">
                        2025
                      </span>
                    </div>
                    <div className="text-sm text-[#93cfa2] leading-relaxed">
                      Scale manufacturing, expand market reach
                    </div>
                  </div>
                  <div className="font-[Amenti] font-bold text-3xl text-[#93cfa2] bg-gradient-to-r from-[#93cfa2] to-[#54bb74] bg-clip-text text-transparent">
                    $15M
                  </div>
                </div>
              </div>
            </div>
            
            {/* Series B */}
            <div 
              className="relative flex items-center cursor-pointer group"
              onClick={() => openPopup('popup3')}
            >
              <div className="absolute left-4 w-3 h-3 bg-[#a3d5b3] rounded-full border-2 border-[#292929] z-10 transition-all duration-300 group-hover:scale-125" />
              <div className="ml-16 bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 flex-grow border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#a3d5b3] to-[#54bb74]" />
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
                  <i className="fas fa-info" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-1 flex items-center">
                      Series B
                      <span className="bg-gradient-to-r from-[#a3d5b3] to-[#54bb74] text-[#292929] font-[Amenti] font-bold text-sm px-2 py-1 rounded-full ml-3">
                        2027
                      </span>
                    </div>
                    <div className="text-sm text-[#93cfa2] leading-relaxed">
                      Accelerate growth, expand globally
                    </div>
                  </div>
                  <div className="font-[Amenti] font-bold text-3xl text-[#a3d5b3] bg-gradient-to-r from-[#a3d5b3] to-[#54bb74] bg-clip-text text-transparent">
                    $50M
                  </div>
                </div>
              </div>
            </div>
            
            {/* IPO/Exit */}
            <div 
              className="relative flex items-center cursor-pointer group"
              onClick={() => openPopup('popup4')}
            >
              <div className="absolute left-4 w-3 h-3 bg-[#6a9d78] rounded-full border-2 border-[#292929] z-10 transition-all duration-300 group-hover:scale-125" />
              <div className="ml-16 bg-[#292929]/70 backdrop-blur-sm rounded-xl p-4 flex-grow border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#54bb74] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6a9d78] to-[#54bb74]" />
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
                  <i className="fas fa-info" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-1 flex items-center">
                      IPO/Exit
                      <span className="bg-gradient-to-r from-[#6a9d78] to-[#54bb74] text-[#292929] font-[Amenti] font-bold text-sm px-2 py-1 rounded-full ml-3">
                        2030+
                      </span>
                    </div>
                    <div className="text-sm text-[#93cfa2] leading-relaxed">
                      Market leadership, platform licensing
                    </div>
                  </div>
                  <div className="font-[Amenti] font-bold text-3xl text-[#6a9d78] bg-gradient-to-r from-[#6a9d78] to-[#54bb74] bg-clip-text text-transparent">
                    $1B+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Funding Summary */}
        <div className="flex items-center justify-center mt-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border border-[#54bb74]/30 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <span className="text-base text-[#93cfa2] mr-3">Total Funding Journey:</span>
          <span className="font-[Amenti] font-bold text-2xl text-[#f3ebe2] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
            $67M → $1B+ Valuation
          </span>
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

export default Slide9;
