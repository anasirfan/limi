// Pixel-perfect React refactor of Slide 11: The Team: Forged to Win
'use client';

import { useState } from 'react';
import { FaUsers, FaLightbulb, FaCogs, FaCode, FaInfoCircle, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const teamMembers = [
  {
    key: 'popup1',
    icon: <FaLightbulb className="member-icon text-[60px] text-[#292929]" />,
    name: 'Umer Asif',
    role: 'The Visionary',
    achievements: [
      'Self-taught engineer',
      'Built core tech from first principles',
      'Relocated to China to set up factory',
      '10+ years in lighting industry',
    ],
    popup: {
      title: 'Umer Asif - The Visionary',
      content: 'A self-taught engineer and designer with deep industry expertise who built the core technology from first principles.',
      keyPoints: [
        'No formal education - completely self-taught',
        'Background in cybersecurity and networking',
        'Relocated to China to establish factory',
        '10+ years in lighting and smart home industry',
        'Family business background in lighting',
      ],
    },
  },
  {
    key: 'popup2',
    icon: <FaCogs className="member-icon text-[60px] text-[#292929]" />,
    name: 'Dr. Karen Law',
    role: 'The Operator',
    achievements: [
      'PhD in Psychology',
      'Leads China manufacturing',
      'Eliminates operational risk',
      'Cross-cultural business expert',
    ],
    popup: {
      title: 'Dr. Karen Law - The Operator',
      content: 'Holding a PhD in Psychology, she bridges East and West cultures while leading the China manufacturing operation.',
      keyPoints: [
        'PhD in Psychology with cross-cultural expertise',
        'Manages entire China supply chain',
        'Eliminates operational risk through precision',
        'Expert in cross-cultural business management',
        'Ensures quality control and efficiency',
      ],
    },
  },
  {
    key: 'popup3',
    icon: <FaCode className="member-icon text-[60px] text-[#292929]" />,
    name: 'Shahrukh Ahmed',
    role: 'The Enterprise Scaler',
    achievements: [
      "Built UK's COVID Pass system",
      'Leads Pakistan engineering office',
      'Scalable infrastructure expert',
      'Enterprise software background',
    ],
    popup: {
      title: 'Shahrukh Ahmed - The Enterprise Scaler',
      content: "A software and infrastructure engineer who architected the UK's national-scale COVID Pass system.",
      keyPoints: [
        "Architected UK's national COVID Pass system",
        'Leads engineering office in Pakistan',
        'Expert in scalable infrastructure solutions',
        'Background in enterprise software development',
        'Experience with national-scale systems',
      ],
    },
  },
];

const Slide11_PixelPerfect = ({ slideNumber }) => {
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
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/0f6880eb458b.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[60px] py-[60px]">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[52px] mb-10 text-[#f3ebe2] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)] headline">
          The Team: Forged to Win
          <div className="absolute -bottom-4 left-0 w-[100px] h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded" />
        </h1>

        {/* Team Intro */}
        <div className="flex items-center mb-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-5 rounded-xl border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)] team-intro">
          <FaUsers className="text-[36px] text-[#54bb74] mr-5 team-intro-icon" />
          <div className="text-[20px] text-[#f3ebe2] leading-snug font-medium team-intro-text">
            Our founding team combines <strong className="text-[#54bb74] font-bold">unique expertise</strong>, <strong className="text-[#54bb74] font-bold">complementary skills</strong>, and <strong className="text-[#54bb74] font-bold">shared history</strong> to execute our vision.
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-3 gap-[30px] flex-grow team-grid">
          {teamMembers.map((member) => (
            <div
              key={member.key}
              className="team-member bg-[#292929]/70 backdrop-blur-lg rounded-2xl p-[30px] flex flex-col items-center text-center cursor-pointer border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74]"
              onClick={() => openPopup(member.key)}
            >
              <div className="info-badge absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                <FaInfoCircle />
              </div>
              <div className="member-avatar w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#54bb74] to-[#93cfa2] flex items-center justify-center mb-5 shadow-[0_5px_15px_rgba(84,187,116,0.3)]">
                {member.icon}
              </div>
              <div className="member-name font-[Amenti] font-bold text-[24px] mb-1 text-[#f3ebe2]">{member.name}</div>
              <div className="member-role text-[18px] text-[#54bb74] mb-4 font-semibold">{member.role}</div>
              <div className="member-achievements text-left mt-3">
                {member.achievements.map((ach, idx) => (
                  <div key={idx} className="achievement flex items-start mb-2">
                    <FaCheckCircle className="text-[#54bb74] text-[14px] mr-2 mt-1" />
                    <div className="achievement-text text-[14px] text-[#93cfa2] leading-snug">{ach}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team Note */}
        <div className="team-note mt-10 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 rounded-xl p-6 text-center shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <div className="team-note-text text-[18px] text-[#f3ebe2] leading-snug">
            Together with a <strong className="text-[#54bb74] font-semibold">global team of 40+ staff</strong>, they form a <strong className="text-[#54bb74] font-semibold">"Uniquely Bonded Core"</strong> linked by years of friendship, family ties, and a shared mission.
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
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
              {teamMembers.find((m) => m.key === activePopup)?.popup.title}
            </div>
            <div className="popup-content text-base leading-relaxed text-[#f3ebe2] text-center mb-4">
              {teamMembers.find((m) => m.key === activePopup)?.popup.content}
            </div>
            <div className="key-points mt-4 text-left">
              {teamMembers.find((m) => m.key === activePopup)?.popup.keyPoints.map((point, idx) => (
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

export default Slide11_PixelPerfect;
