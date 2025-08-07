// Pixel-perfect React refactor of Slide 10: Our Unassailable Moat: Why We Win
'use client';

import { useState } from 'react';
import { FaShieldAlt, FaIndustry, FaLock, FaNetworkWired, FaInfoCircle, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const moatLayers = [
  {
    key: 'popup1',
    icon: <FaIndustry className="layer-icon text-[32px] text-[#54bb74] inline-block mr-4 max-sm:text-xl max-sm:mr-2 max-sm:mb-1" />,
    title: 'First-Principles Supply Chain',
    desc: 'Owned factory, 55%+ margins, mastered manufacturing from the ground up',
    info: 'Our owned factory and first-principles approach to manufacturing creates significant barriers to entry.',
    keyPoints: [
      'Owned factory in China for quality control',
      '55%+ gross margins through supply chain mastery',
      'Proprietary connectors and components',
      'Deep manufacturing expertise',
    ],
  },
  {
    key: 'popup2',
    icon: <FaLock className="layer-icon text-[32px] text-[#54bb74] inline-block mr-4 max-sm:text-xl max-sm:mr-2 max-sm:mb-1" />,
    title: 'Intelligence Lock-in',
    desc: 'Privacy-first Edge AI, 0% churn, deeply personalized user experience',
    info: 'Our privacy-first Edge AI creates an indispensable operating system for the home.',
    keyPoints: [
      'Local processing ensures privacy',
      '0% customer churn demonstrates stickiness',
      'Deep personalization creates switching costs',
      'Continuous learning improves over time',
    ],
  },
  {
    key: 'popup3',
    icon: <FaNetworkWired className="layer-icon text-[32px] text-[#54bb74] inline-block mr-4 max-sm:text-xl max-sm:mr-2 max-sm:mb-1" />,
    title: 'Strategic Platform',
    desc: 'Model-agnostic, works with all AI providers, consolidates fragmented markets',
    info: 'Our model-agnostic approach works with all AI providers and consolidates fragmented markets.',
    keyPoints: [
      '"Switzerland of the AI Wars" strategy',
      'Works with all major AI models',
      'Consolidates multiple $100B markets',
      'Creates ecosystem defensibility',
    ],
  },
];

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

  return (
    <div className="relative w-full h-[75vh] bg-[#f3ebe2]">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/d21dc88ef20e.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[30px] py-[25px] max-sm:px-3 max-sm:py-2">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[32px] mb-6 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)] headline max-sm:text-xl max-sm:mb-3 max-sm:leading-snug">
          Our Unassailable Moat: Why We Win
          <div className="absolute -bottom-3 left-0 w-[50px] h-[2px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded max-sm:w-[30px] max-sm:h-[2px] max-sm:mb-1" />
        </h1>

        {/* Moat Intro */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-3 rounded-lg border-l-[4px] border-[#54bb74] shadow-[0_3px_10px_rgba(0,0,0,0.05)] moat-intro max-sm:flex-col max-sm:items-start max-sm:mb-3 max-sm:p-2 max-sm:rounded-lg">
          <FaShieldAlt className="text-[24px] text-[#54bb74] mr-3 moat-intro-icon max-sm:text-lg max-sm:mr-1" />
          <div className="text-lg p-4 text-[#292929] leading-tight font-medium moat-intro-text max-sm:text-xs">
            We've built <strong className="text-[#54bb74] font-bold">multiple layers of competitive advantage</strong> that create a defensible business difficult for others to replicate.
          </div>
        </div>

        {/* Moat Layers */}
        <div className="flex flex-col gap-3 flex-grow moat-layers max-sm:mt-3">
          {moatLayers.map((layer) => (
            <div
              key={layer.key}
              className="moat-layer mb-4 bg-white/85 backdrop-blur-lg rounded-xl p-4 flex items-center cursor-pointer border border-[#54bb74]/20 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:border-[#54bb74] max-sm:p-2 max-sm:rounded-lg max-sm:flex-col max-sm:items-start"
              onClick={() => openPopup(layer.key)}
            >
              <div className="info-badge absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[8px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white max-sm:w-3 max-sm:h-3">
                <FaInfoCircle />
              </div>
              {layer.icon}
              <div className="layer-content  flex-grow max-sm:flex-grow-0">
                <div className="layer-title font-[Amenti] font-bold text-[18px] mb-1 text-[#292929] max-sm:text-sm max-sm:mb-1">{layer.title}</div>
                <div className="layer-desc text-[13px] text-[#555] leading-tight max-sm:text-xs">{layer.desc}</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
            </div>
          ))}
        </div>
      </div>

      {/* Popup Overlay */}
      {activePopup && (
        <div
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
          onClick={() => closePopup(activePopup)}
        >
          <div
            className="popup bg-white/95 backdrop-blur-[15px] rounded-xl p-5 w-[380px] border border-[#54bb74]/50 shadow-[0_10px_25px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative max-sm:p-3 max-sm:w-full max-sm:rounded-lg max-sm:border max-sm:border-[#54bb74]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-3 right-3 text-[16px] text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300 max-sm:text-sm"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-[18px] text-[#54bb74] mb-3 text-center max-sm:text-sm max-sm:mb-2">
              {moatLayers.find((l) => l.key === activePopup)?.title}
            </div>
            <div className="popup-content text-[13px] leading-tight text-[#292929] text-center mb-3 max-sm:text-xs max-sm:mb-2">
              {moatLayers.find((l) => l.key === activePopup)?.info}
            </div>
            <div className="key-points mt-3 text-left max-sm:mt-2">
              {moatLayers.find((l) => l.key === activePopup)?.keyPoints.map((point, idx) => (
                <div key={idx} className="key-point flex items-start mb-2 max-sm:mb-1">
                  <FaCheckCircle className="text-[#54bb74] mr-2 mt-0.5 text-xs max-sm:mr-1 max-sm:mt-0" />
                  <span className="text-[#292929] text-[12px] max-sm:text-xs">{point}</span>
                </div>
              ))}
            </div>
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
