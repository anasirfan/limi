// Pixel-perfect React refactor of Slide 14: Roadmap 24-Month Plan
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MdTimeline,
  MdFlightTakeoff,
  MdRocketLaunch,
  MdWorkspacePremium,
  MdTrendingUp
} from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

const milestones = [
  {
    key: 'popup1',
    icon: <MdFlightTakeoff className="milestone-icon text-[48px] text-[#54bb74] mr-[25px] flex-shrink-0" />,
    period: 'Month 0-6',
    title: 'US/EU Market Entry',
    desc: 'Establish presence in key markets, secure distribution partnerships, and build regional teams',
    popup: {
      title: 'US/EU Market Entry',
      content: "This initial phase focuses on establishing our presence in high-value North American and European markets. We'll secure key distribution partnerships, set up regional offices, and build local sales and marketing teams to drive initial adoption and brand awareness."
    }
  },
  {
    key: 'popup2',
    icon: <MdRocketLaunch className="milestone-icon text-[48px] text-[#54bb74] mr-[25px] flex-shrink-0" />,
    period: 'Month 6-12',
    title: 'AI Platform v2.0 Launch',
    desc: 'Release next-generation Edge AI with enhanced privacy features and proactive capabilities',
    popup: {
      title: 'AI Platform v2.0 Launch',
      content: 'Our second-generation AI platform will introduce significant advancements in local processing power, privacy protection, and contextual awareness. This update will be pushed to all installed devices via OTA, instantly transforming existing installations into more intelligent systems.'
    }
  },
  {
    key: 'popup3',
    icon: <MdWorkspacePremium className="milestone-icon text-[48px] text-[#54bb74] mr-[25px] flex-shrink-0" />,
    period: 'Month 12-18',
    title: 'Premium Services Rollout',
    desc: 'Launch subscription-based AI features and begin platform licensing to third parties',
    popup: {
      title: 'Premium Services Rollout',
      content: 'This phase marks our transition to high-margin recurring revenue through premium AI subscriptions. We\'ll introduce advanced features like proactive assistance, security monitoring, and personalization. Simultaneously, we\'ll begin licensing our platform technology to other manufacturers.'
    }
  },
  {
    key: 'popup4',
    icon: <MdTrendingUp className="milestone-icon text-[48px] text-[#54bb74] mr-[25px] flex-shrink-0" />,
    period: 'Month 18-24',
    title: 'Positioned for Series B',
    desc: 'Achieve significant market share, establish data flywheel, and prepare for next funding round',
    popup: {
      title: 'Positioned for Series B',
      content: "By this stage, we'll have established significant market presence, activated our data flywheel effect, and demonstrated clear traction in both hardware sales and recurring revenue streams. This positions us perfectly for a Series B round to accelerate our path to market leadership."
    }
  }
];

const Slide14_PixelPerfect = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(null);
  const containerRef = useRef(null);

  // Click outside to close popup
  useEffect(() => {
    function handleClick(e) {
      if (
        activePopup &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setActivePopup(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activePopup]);

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden font-poppins" style={{ minHeight: 720 }}>
      {/* Background pattern */}
      <div className="background-pattern absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #54bb74 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.1
      }} />

      {/* Content */}
      <div className="slide-content relative z-10 flex flex-col h-full px-[70px] py-[60px]" ref={containerRef}>
        {/* Headline */}
        <h1 className="headline font-[Amenti] font-bold text-[40px] mb-[40px] text-[#f3ebe2] relative">
          Roadmap: 24-Month Plan
          <span className="absolute -bottom-[15px] left-0 w-[80px] h-[4px] bg-[#54bb74] rounded-[2px]" />
        </h1>

        {/* Roadmap intro */}
        <div className="roadmap-intro flex items-center mb-[30px] bg-[#54bb74]/10 p-[15px] rounded-[8px] border-l-[4px] border-[#54bb74]">
          <MdTimeline className="roadmap-intro-icon text-[36px] text-[#54bb74] mr-[15px] flex-shrink-0" />
          <div className="roadmap-intro-text text-[18px] text-[#f3ebe2] leading-[1.4]">
            Our <strong className="text-[#54bb74] font-semibold">strategic milestones</strong> to establish Limi as the global standard for ambient AI infrastructure.
          </div>
        </div>

        {/* Roadmap milestones */}
        <div className="roadmap-container flex flex-col gap-[25px] flex-grow">
          {milestones.map((item) => (
            <div
              key={item.key}
              className={`milestone bg-[#292929]/70 border border-[#93cfa2]/30 rounded-[12px] p-[25px_30px] flex items-start cursor-pointer transition-all duration-300 relative hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:border-[#54bb74]`}
              onClick={() => setActivePopup(item.key)}
            >
              {item.icon}
              <div className="milestone-content flex-grow">
                <div className="milestone-header flex items-center mb-[10px]">
                  <div className="milestone-period font-[Amenti] font-bold text-[22px] text-[#54bb74] mr-[15px] min-w-[180px]">{item.period}</div>
                  <div className="milestone-title font-[Amenti] font-bold text-[24px] text-[#f3ebe2]">{item.title}</div>
                </div>
                <div className="milestone-desc text-[18px] leading-[1.4] text-[#93cfa2]">{item.desc}</div>
              </div>
              {/* Popup modal */}
              {activePopup === item.key && (
                <div className="popup fixed left-1/2 top-1/2 z-50 bg-[#292929]/95 border border-[#54bb74] rounded-[8px] p-[24px] w-[340px] shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.25s_ease]" style={{ transform: 'translate(-50%, -50%)' }}>
                  <FaTimes className="absolute top-[12px] right-[12px] text-[18px] text-[#93cfa2] cursor-pointer hover:text-[#54bb74] transition-colors duration-200" onClick={e => { e.stopPropagation(); setActivePopup(null); }} />
                  <div className="popup-title font-[Amenti] font-bold text-[18px] text-[#54bb74] mb-[10px]">{item.popup.title}</div>
                  <div className="popup-content text-[14px] leading-[1.4] text-[#f3ebe2]">{item.popup.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.92) translate(-50%, -50%); }
          to { opacity: 1; transform: scale(1) translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
};

export default Slide14_PixelPerfect;
