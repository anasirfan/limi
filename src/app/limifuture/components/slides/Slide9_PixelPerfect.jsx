// Pixel-perfect React refactor of Slide 9: Traction: Proof Our Strategy Works
'use client';

import { useState } from 'react';
import { FaChartLine, FaHandshake, FaBox, FaHeart, FaRocket, FaInfoCircle, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const metrics = [
  {
    key: 'popup1',
    icon: <FaHandshake className="metric-icon" />,
    value: '£50M+',
    label: '5-Year Platform Agreement',
    info: 'Signed with a leading UK distributor for our AI infrastructure platform, validating our business model at scale.',
    keyPoints: [
      'Multi-year commitment to deploy our technology',
      'Validates our platform approach at scale',
      'Provides immediate market access',
    ],
  },
  {
    key: 'popup2',
    icon: <FaBox className="metric-icon" />,
    value: '£1M+',
    label: 'Confirmed Purchase Orders',
    info: 'Confirmed orders currently in production at our owned factory in China, proving immediate demand.',
    keyPoints: [
      'Demonstrates manufacturing capability',
      'Validates product-market fit',
      'Generates immediate revenue',
    ],
  },
  {
    key: 'popup3',
    icon: <FaHeart className="metric-icon" />,
    value: '0%',
    label: 'Customer Churn',
    info: 'Achieved 0% customer churn from our initial beta launch, demonstrating strong product-market fit.',
    keyPoints: [
      'Exceptional customer satisfaction',
      '"Unbreakable hardware ecosystem lock-in"',
      'High retention drives lifetime value',
    ],
  },
  {
    key: 'popup4',
    icon: <FaRocket className="metric-icon" />,
    value: '<£200k',
    label: 'Bootstrapped to Profitability',
    info: 'Achieved significant commercial agreements with less than £200k of bootstrapped capital.',
    keyPoints: [
      'Exceptional capital efficiency',
      'Operational discipline',
      'Profitable from early stages',
    ],
  },
];

const Slide9_PixelPerfect = ({ slideNumber }) => {
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
    <div className="relative w-full h-full bg-[#292929] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/6819f3815756.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-16 py-12">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[52px] mb-10 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] headline">
          Traction: Proof Our Strategy Works
          <div className="absolute -bottom-4 left-0 w-[100px] h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded" />
        </h1>

        {/* Traction Intro */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)] traction-intro">
          <FaChartLine className="text-[36px] text-[#54bb74] mr-5 traction-intro-icon" />
          <div className="text-[20px] text-[#f3ebe2] leading-snug font-medium traction-intro-text">
            Our strategy isn't theoretical — we have <strong className="text-[#54bb74] font-bold">undeniable market validation</strong> and a proven business model.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 flex-grow metrics-grid">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="relative metric-card bg-[#292929]/70 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74]"
              onClick={() => openPopup(metric.key)}
            >
              <div className="info-badge absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                <FaInfoCircle />
              </div>
              {metric.icon}
              <div className="font-[Amenti] font-bold text-[48px] text-[#54bb74] mb-4 bg-gradient-to-tr from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent metric-value">
                {metric.value}
              </div>
              <div className="text-[18px] leading-snug text-[#f3ebe2] metric-label">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div
          className="popup-overlay fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
          onClick={() => closePopup(activePopup)}
        >
          <div
            className="popup bg-[#292929]/95 backdrop-blur-[15px] rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="popup-title font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {metrics.find((m) => m.key === activePopup)?.label}
            </div>
            <div className="popup-content text-base leading-relaxed text-[#f3ebe2] text-center mb-4">
              {metrics.find((m) => m.key === activePopup)?.info}
            </div>
            <div className="key-points mt-4 text-left">
              {metrics.find((m) => m.key === activePopup)?.keyPoints.map((point, idx) => (
                <div key={idx} className="key-point flex items-start mb-2.5">
                  <FaCheckCircle className="text-[#54bb74] mr-2.5 mt-0.5" />
                  <span className="text-[#f3ebe2]">{point}</span>
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

export default Slide9_PixelPerfect;
