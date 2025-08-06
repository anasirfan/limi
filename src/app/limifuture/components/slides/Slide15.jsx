'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide15 = ({ slideNumber }) => {
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
      title: "Investment Opportunity",
      content: "Join us in revolutionizing how people interact with their living and working spaces through intelligent AI.",
      keyPoints: [
        "Ground floor opportunity in $400B+ market",
        "Proven team with technical expertise",
        "Clear path to profitability and scale",
        "Multiple exit opportunities and high returns"
      ]
    },
    popup2: {
      title: "Partnership Opportunities",
      content: "Strategic partnerships to accelerate growth and market penetration across multiple channels.",
      keyPoints: [
        "Technology integration partnerships",
        "Retail and distribution partnerships",
        "OEM and manufacturing partnerships",
        "Developer ecosystem partnerships"
      ]
    },
    popup3: {
      title: "Join Our Mission",
      content: "Be part of the team building the future of intelligent spaces and ambient AI technology.",
      keyPoints: [
        "Work on cutting-edge AI and hardware",
        "Shape the future of human-computer interaction",
        "Join a fast-growing, well-funded startup",
        "Competitive compensation and equity"
      ]
    },
    popup4: {
      title: "Get Early Access",
      content: "Be among the first to experience the future of intelligent spaces with our beta program.",
      keyPoints: [
        "Priority access to new products",
        "Influence product development",
        "Special pricing for early adopters",
        "Direct feedback channel to our team"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#292929] via-[#54bb74]/20 to-[#292929] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#54bb74] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#93cfa2] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#54bb74]/30 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#f3ebe2] relative drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
          Join the Revolution: The Future is Now
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        <p className="text-2xl text-[#93cfa2] leading-relaxed max-w-4xl mx-auto">
          The future of living and working spaces is here. Be part of the transformation that will redefine how humans interact with their environments.
        </p>
        
        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Investment Opportunity */}
          <div 
            className="bg-gradient-to-br from-[#54bb74]/90 to-[#54bb74]/70 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 border border-[#54bb74] shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group h-32"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f3ebe2] to-[#f3ebe2]/70" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#f3ebe2]/20 rounded-full flex items-center justify-center text-[#f3ebe2] text-xs transition-all duration-300 group-hover:bg-[#f3ebe2] group-hover:text-[#54bb74]">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-2">
              <i className="fas fa-rocket text-2xl text-[#f3ebe2] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-base text-[#f3ebe2] mb-1">
                Investment Opportunity
              </div>
              <div className="text-xs text-[#f3ebe2]/90 leading-relaxed mb-2">
                Join visionary investors backing the future of ambient intelligence.
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="bg-[#f3ebe2]/20 text-[#f3ebe2] px-1 py-0.5 rounded-full text-xs font-medium">
                  Series A
                </span>
                <span className="bg-[#f3ebe2]/20 text-[#f3ebe2] px-1 py-0.5 rounded-full text-xs font-medium">
                  $10M
                </span>
              </div>
            </div>
          </div>
          
          {/* Partnership Opportunities */}
          <div 
            className="bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 border border-[#f3ebe2]/50 shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group h-32"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#54bb74]/70" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-[#f3ebe2]">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-2">
              <i className="fas fa-handshake text-2xl text-[#54bb74] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-base text-[#292929] mb-1">
                Partnership Opportunities
              </div>
              <div className="text-xs text-[#292929] leading-relaxed mb-2">
                Collaborate with industry leaders to accelerate market adoption.
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-1 py-0.5 rounded-full text-xs font-medium">
                  Strategic
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-1 py-0.5 rounded-full text-xs font-medium">
                  Tech
                </span>
              </div>
            </div>
          </div>
          
          {/* Talent Acquisition */}
          <div 
            className="bg-gradient-to-br from-[#54bb74]/90 to-[#54bb74]/70 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 border border-[#54bb74] shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group h-32"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f3ebe2] to-[#f3ebe2]/70" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#f3ebe2]/20 rounded-full flex items-center justify-center text-[#f3ebe2] text-xs transition-all duration-300 group-hover:bg-[#f3ebe2] group-hover:text-[#54bb74]">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-2">
              <i className="fas fa-users text-2xl text-[#f3ebe2] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-base text-[#f3ebe2] mb-1">
                Talent Acquisition
              </div>
              <div className="text-xs text-[#f3ebe2]/90 leading-relaxed mb-2">
                Join our world-class team building the future.
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="bg-[#f3ebe2]/20 text-[#f3ebe2] px-1 py-0.5 rounded-full text-xs font-medium">
                  AI/ML
                </span>
                <span className="bg-[#f3ebe2]/20 text-[#f3ebe2] px-1 py-0.5 rounded-full text-xs font-medium">
                  Hardware
                </span>
              </div>
            </div>
          </div>
          
          {/* Early Access Program */}
          <div 
            className="bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 border border-[#f3ebe2]/50 shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group h-32"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#54bb74]/70" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-[#f3ebe2]">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-2">
              <i className="fas fa-star text-2xl text-[#54bb74] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-base text-[#292929] mb-1">
                Early Access Program
              </div>
              <div className="text-xs text-[#292929] leading-relaxed mb-2">
                Be among the first to experience the future of intelligent spaces.
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-1 py-0.5 rounded-full text-xs font-medium">
                  Beta
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-1 py-0.5 rounded-full text-xs font-medium">
                  Exclusive
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Message */}
        <div className="text-center mt-12">
          <div className="text-xl text-[#93cfa2] mb-4">
            Ready to transform the way we live and work?
          </div>
          <div className="font-[Amenti] font-bold text-3xl text-[#f3ebe2] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
            The Future is Intelligent. The Future is Now.
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-6 text-center bg-gradient-to-r from-[#54bb74]/30 to-[#54bb74]/20 p-4 rounded-xl border border-[#54bb74]/40 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <div className="font-[Amenti] font-bold text-xl text-[#f3ebe2] mb-3">
            Ready to Shape the Future?
          </div>
          <div className="text-base text-[#f3ebe2]/90 mb-4">
            The revolution starts now. Choose your path and join us in creating tomorrow's intelligent world.
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center text-[#f3ebe2]">
              <i className="fas fa-envelope mr-2" />
              <span className="text-xs">contact@limi.space</span>
            </div>
            <div className="flex items-center text-[#f3ebe2]">
              <i className="fas fa-phone mr-2" />
              <span className="text-xs">Schedule a Call</span>
            </div>
            <div className="flex items-center text-[#f3ebe2]">
              <i className="fas fa-calendar mr-2" />
              <span className="text-xs">Book a Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="bg-gradient-to-br from-[#292929]/95 to-[#292929]/90 backdrop-blur-md rounded-3xl p-10 w-[500px] border border-[#54bb74]/50 shadow-[0_25px_60px_rgba(0,0,0,0.4)] animate-[popupFadeIn_0.4s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <i 
              className="fas fa-times absolute top-6 right-6 text-2xl text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300 hover:scale-110"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] mb-6 text-center bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-lg leading-relaxed text-[#f3ebe2] text-center mb-6">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-6 text-left">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <i className="fas fa-star text-[#54bb74] mr-3 mt-1" />
                    <span className="text-[#f3ebe2] text-lg">{point}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-center mt-8">
              <div className="bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white px-8 py-3 rounded-full text-lg font-medium cursor-pointer hover:shadow-[0_10px_25px_rgba(84,187,116,0.3)] transition-all duration-300 inline-block">
                Get Started
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Slide15;
