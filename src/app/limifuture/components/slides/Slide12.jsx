// Pixel-perfect React refactor of Slide 12: The Ask: Scaling the New Standard
'use client';

import { useState } from 'react';
import { FaCoins, FaInfoCircle, FaLightbulb, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const useOfFunds = [
  { percent: '40%', desc: 'US & EU Market Expansion' },
  { percent: '30%', desc: 'R&D for AI Platform' },
  { percent: '20%', desc: 'Scale Manufacturing' },
  { percent: '10%', desc: 'Key Executive Hires' },
];

const Slide12 = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(false);

  const openPopup = () => {
    setActivePopup(true);
    trackPopupInteraction(slideNumber, 'popup1', 'open');
  };
  const closePopup = () => {
    setActivePopup(false);
    trackPopupInteraction(slideNumber, 'popup1', 'close');
  };

  return (
    <div className="relative w-full h-[75vh] bg-[#292929]">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/96d1d4fde39a.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[30px] py-[25px] max-sm:px-3 max-sm:py-3">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[32px] mb-[20px] text-[#f3ebe2] relative headline drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] max-sm:text-2xl max-sm:mb-4 max-sm:leading-snug">
          The Ask: Scaling the New Standard
          <div className="absolute -bottom-[15px] left-0 w-[60px] h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-[2px] max-sm:w-[40px] max-sm:h-[2px]" />
        </h1>

        {/* Ask Section */}
        <div className="ask-container flex flex-col items-center justify-center flex-grow text-center">
          {/* Icon */}
          <div className="ask-icon-container mb-[20px] relative max-sm:mb-3">
            <div className="glow absolute top-[-10px] left-[-10px] right-[-10px] bottom-[-10px] rounded-full z-0 animate-pulse-glow" />
            <div className="ask-icon-bg w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#54bb74]/20 to-[#54bb74]/10 flex items-center justify-center relative shadow-[0_10px_30px_rgba(84,187,116,0.2)] z-10 max-sm:w-[60px] max-sm:h-[60px]">
              <FaCoins className="ask-icon text-[50px] bg-gradient-to-br from-[#54bb74] to-[#93cfa2] text-[#54bb74] max-sm:text-2xl" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
            </div>
          </div>

          {/* Amount */}
          <div className="ask-amount font-[Amenti] font-bold text-[70px] text-[#f3ebe2] mb-[15px] leading-none bg-gradient-to-br from-[#f3ebe2] to-[#93cfa2] bg-clip-text text-transparent max-sm:text-4xl max-sm:mb-3" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>
            $5M
          </div>
          <div className="ask-description text-[18px] leading-[1.4] text-[#93cfa2] max-w-[600px] mb-[20px] font-semibold max-sm:text-sm max-sm:mb-3">
            To aggressively scale our first-mover advantage and establish Limi as the global standard for ambient AI infrastructure
          </div>

          {/* Strategic Note Card */}
          <div
            className="strategic-note relative bg-[#292929]/70 backdrop-blur-[10px] rounded-[12px] p-[15px] max-w-[600px] mx-auto text-left cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] max-sm:p-2 max-sm:rounded-lg max-sm:max-w-full"
            onClick={openPopup}
          >
            <div className="info-badge absolute top-[10px] right-[10px] w-[18px] h-[18px] bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[10px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white max-sm:w-4 max-sm:h-4 max-sm:text-[8px]">
              <FaInfoCircle />
            </div>
            <div className="note-title font-[Amenti] font-bold text-[16px] text-[#54bb74] mb-[8px] flex items-center max-sm:text-xs max-sm:mb-1">
              <FaLightbulb className="mr-[12px]" />
              Strategic Allocation
            </div>
            <div className="note-content text-[14px] text-[#f3ebe2] leading-[1.4] max-sm:text-xs">
              Capital will be deployed to accelerate growth across key business areas
            </div>
            <div className="key-points mt-[10px] max-sm:mt-1">
              {['Market Expansion', 'R&D Acceleration', 'Manufacturing Scale', 'Team Growth'].map((point, idx) => (
                <div key={point} className="key-point flex items-start mb-[10px] max-sm:mb-1">
                  <FaCheckCircle className="text-[#54bb74] mr-[6px] mt-[2px] text-[12px]" />
                  <div className="key-point-text text-[#93cfa2] text-[13px] max-sm:text-xs">{point}</div>
                </div>
              ))}
            </div>
            {/* Left gradient bar */}
            <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2] rounded-tl-lg rounded-bl-lg max-sm:w-[2px]" />
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {activePopup && (
        <div
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="popup bg-[#292929]/95 backdrop-blur-[15px] rounded-[12px] p-[20px] w-[420px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative max-sm:p-2 max-sm:w-full max-sm:rounded-lg max-sm:border max-sm:border-[#54bb74]/40"
            onClick={e => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-[10px] right-[10px] text-[16px] text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300"
              onClick={closePopup}
            />
            <div className="popup-title font-[Amenti] font-bold text-[18px] text-[#54bb74] mb-[12px] text-center max-sm:text-sm max-sm:mb-1">
              Strategic Fund Allocation
            </div>
            <div className="popup-content text-[12px] leading-[1.5] text-[#f3ebe2] text-center mb-3 max-sm:text-xs max-sm:mb-1">
              Our $5M raise will be strategically deployed across four key areas to maximize growth and market position.
            </div>
            <div className="use-of-funds grid grid-cols-2 gap-[8px] mt-[10px] max-sm:grid-cols-1 max-sm:gap-1 max-sm:mt-1">
              {useOfFunds.map(fund => (
                <div key={fund.desc} className="fund-item bg-[#54bb74]/10 rounded-[6px] p-[8px] flex items-center max-sm:p-1 max-sm:rounded max-sm:mb-1">
                  <div className="fund-percentage font-[Amenti] font-bold text-[16px] text-[#54bb74] mr-[8px] max-sm:text-xs max-sm:mr-2">{fund.percent}</div>
                  <div className="fund-desc text-[12px] text-[#93cfa2] max-sm:text-xs">{fund.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for glow and popup animation */}
      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-pulse-glow {
          animation: pulse 3s infinite alternate;
        }
        @keyframes pulse {
          from { opacity: 0.5; transform: scale(1); }
          to { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Slide12;
