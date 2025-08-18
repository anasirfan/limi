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
    icon: <MdFlightTakeoff className="milestone-icon text-3xl text-[#54bb74] mr-3 flex-shrink-0 max-sm:text-base" />,
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
    icon: <MdRocketLaunch className="milestone-icon text-3xl text-[#54bb74] mr-3 flex-shrink-0 max-sm:text-base" />,
    period: 'Month 6-12',
    title: 'AI Platform v2.0 Launch',
    desc: 'Release next-gen Edge AI with enhanced privacy and proactive capabilities',
    popup: {
      title: 'AI Platform v2.0 Launch',
      content: 'Our second-generation AI platform will introduce significant advancements in local processing power, privacy protection, and contextual awareness. This update will be pushed to all installed devices via OTA, instantly transforming existing installations into more intelligent systems.'
    }
  },
  {
    key: 'popup3',
    icon: <MdWorkspacePremium className="milestone-icon text-3xl text-[#54bb74] mr-3 flex-shrink-0 max-sm:text-base" />,
    period: 'Month 12-18',
    title: 'Premium Services Rollout',
    desc: 'Launch subscription AI features and platform licensing',
    popup: {
      title: 'Premium Services Rollout',
      content: 'This phase marks our transition to high-margin recurring revenue through premium AI subscriptions. We\'ll introduce advanced features like proactive assistance, security monitoring, and personalization. Simultaneously, we\'ll begin licensing our platform technology to other manufacturers.'
    }
  },
  {
    key: 'popup4',
    icon: <MdTrendingUp className="milestone-icon text-3xl text-[#54bb74] mr-3 flex-shrink-0 max-sm:text-base" />,
    period: 'Month 18-24',
    title: 'Series B Preparation',
    desc: 'Achieve market share and establish data flywheel',
    popup: {
      title: 'Positioned for Series B',
      content: "By this stage, we'll have established significant market presence, activated our data flywheel effect, and demonstrated clear traction in both hardware sales and recurring revenue streams. This positions us perfectly for a Series B round to accelerate our path to market leadership."
    }
  }
];

const Slide14 = ({ slideNumber }) => {
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
    <>
      <div className="relative w-full h-[75vh] bg-[#292929] overflow-hidden font-poppins">
        {/* Background pattern */}
        <div className="background-pattern absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #54bb74 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.1
        }} />

        {/* Content */}
        <div className="slide-content relative z-10 flex flex-col h-full px-4 py-4 max-sm:px-2 max-sm:py-2" ref={containerRef}>
          {/* Headline */}
          <h1 className="headline font-[Amenti] font-bold text-2xl mb-8 text-[#f3ebe2] relative max-sm:text-lg max-sm:mb-2">
            Roadmap: 24-Month Plan
            <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-[#54bb74] rounded max-sm:w-5" />
          </h1>

          {/* Roadmap intro */}
          <div className="roadmap-intro flex items-center mb-8 bg-[#54bb74]/10 p-2 rounded border-l-2 border-[#54bb74] max-sm:mb-2 max-sm:mt-2">
            <MdTimeline className="text-2xl text-[#54bb74] mr-2 flex-shrink-0 max-sm:text-base" />
            <div className="text-lg text-[#f3ebe2] p-4 leading-tight max-sm:text-xs">
              Our <strong className="text-[#54bb74] font-semibold">strategic milestones</strong> to establish Limi as the global standard for ambient AI infrastructure.
            </div>
          </div>

          {/* Roadmap milestones */}
          <div className="roadmap-container flex flex-col gap-3 flex-grow overflow-y-auto max-sm:mt-2">
            {milestones.map((item) => (
              <div
                key={item.key}
                className={`milestone bg-[#292929]/70 border border-[#93cfa2]/30 rounded-lg p-3 flex items-start cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#54bb74] max-sm:p-2`}
                onClick={() => setActivePopup(item.key)}
              >
                {item.icon}
                <div className="milestone-content flex-grow">
                  <div className="milestone-header flex items-center mb-2 max-sm:flex-col max-sm:items-start">
                    <div className="milestone-period font-[Amenti] font-bold text-base text-[#54bb74] mr-2 min-w-[100px] max-sm:text-xs max-sm:min-w-0">{item.period}</div>
                    <div className="milestone-title font-[Amenti] font-bold text-xl text-[#f3ebe2] max-sm:text-xs">{item.title}</div>
                  </div>
                  <div className="milestone-desc text-lg leading-tight text-[#93cfa2] max-sm:text-[11px]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Overlay and Modal */}
      {activePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setActivePopup(null)}
        >
          <div
            className="popup bg-[#292929]/95 border border-[#54bb74] rounded p-4 w-[320px] shadow-lg relative max-sm:p-3 max-sm:w-[90vw] max-sm:max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <FaTimes className="absolute top-2 right-2 text-base text-[#93cfa2] cursor-pointer hover:text-[#54bb74] transition-colors" onClick={() => setActivePopup(null)} />
            <div className="popup-title font-[Amenti] font-bold text-base text-[#54bb74] mb-2 max-sm:text-sm">
              {milestones.find(m => m.key === activePopup)?.popup.title}
            </div>
            <div className="popup-content text-sm text-[#f3ebe2] leading-snug max-sm:text-xs">
              {milestones.find(m => m.key === activePopup)?.popup.content}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.92) translate(-50%, -50%); }
          to { opacity: 1; transform: scale(1) translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
};

export default Slide14;
