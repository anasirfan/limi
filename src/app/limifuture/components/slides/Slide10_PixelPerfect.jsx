// Pixel-perfect React refactor of Slide 10: Our Unassailable Moat: Why We Win
'use client';

import { useState } from 'react';
import { FaShieldAlt, FaIndustry, FaLock, FaNetworkWired, FaInfoCircle, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const moatLayers = [
  {
    key: 'popup1',
    icon: <FaIndustry className="layer-icon text-[48px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2] inline-block mr-6" />,
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
    icon: <FaLock className="layer-icon text-[48px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2] inline-block mr-6" />,
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
    icon: <FaNetworkWired className="layer-icon text-[48px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2] inline-block mr-6" />,
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

const Slide10_PixelPerfect = ({ slideNumber }) => {
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
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/d21dc88ef20e.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[60px] py-[60px]">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[52px] mb-10 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)] headline">
          Our Unassailable Moat: Why We Win
          <div className="absolute -bottom-4 left-0 w-[100px] h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded" />
        </h1>

        {/* Moat Intro */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)] moat-intro">
          <FaShieldAlt className="text-[36px] text-[#54bb74] mr-5 moat-intro-icon" />
          <div className="text-[20px] text-[#292929] leading-snug font-medium moat-intro-text">
            We've built <strong className="text-[#54bb74] font-bold">multiple layers of competitive advantage</strong> that create a defensible business difficult for others to replicate.
          </div>
        </div>

        {/* Moat Layers */}
        <div className="flex flex-col gap-6 flex-grow moat-layers">
          {moatLayers.map((layer) => (
            <div
              key={layer.key}
              className="moat-layer bg-white/85 backdrop-blur-lg rounded-2xl p-8 flex items-center cursor-pointer border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-[#54bb74]"
              onClick={() => openPopup(layer.key)}
            >
              <div className="info-badge absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                <FaInfoCircle />
              </div>
              {layer.icon}
              <div className="layer-content flex-grow">
                <div className="layer-title font-[Amenti] font-bold text-[24px] mb-2 text-[#292929]">{layer.title}</div>
                <div className="layer-desc text-[16px] text-[#555] leading-snug">{layer.desc}</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2]" />
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
            className="popup bg-white/95 backdrop-blur-[15px] rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {moatLayers.find((l) => l.key === activePopup)?.title}
            </div>
            <div className="popup-content text-base leading-relaxed text-[#292929] text-center mb-4">
              {moatLayers.find((l) => l.key === activePopup)?.info}
            </div>
            <div className="key-points mt-4 text-left">
              {moatLayers.find((l) => l.key === activePopup)?.keyPoints.map((point, idx) => (
                <div key={idx} className="key-point flex items-start mb-2.5">
                  <FaCheckCircle className="text-[#54bb74] mr-2.5 mt-0.5" />
                  <span className="text-[#292929]">{point}</span>
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

export default Slide10_PixelPerfect;
