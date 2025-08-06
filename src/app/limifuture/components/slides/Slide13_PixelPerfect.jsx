// Pixel-perfect React refactor of Slide 13: Use of Funds: Strategic Allocation
'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  FaGlobeAmericas,
  FaMicrochip,
  FaIndustry,
  FaUsersCog,
  FaInfoCircle,
  FaChartPie,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const allocationData = [
  {
    key: 'popup1',
    percent: 40,
    color: '#54bb74',
    icon: <FaGlobeAmericas className="allocation-icon text-[32px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2]" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />, 
    title: 'US & EU Expansion',
    desc: 'Market entry and growth',
    popup: {
      title: 'US & EU Expansion',
      content: 'Funds will be used to establish presence in key US and European markets.',
      keyPoints: [
        'Setting up local offices and teams',
        'Targeted marketing campaigns',
        'Building distribution partnerships',
        'Capturing market share in high-value regions'
      ]
    }
  },
  {
    key: 'popup2',
    percent: 30,
    color: '#93cfa2',
    icon: <FaMicrochip className="allocation-icon text-[32px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2]" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />, 
    title: 'R&D for AI Platform',
    desc: 'Next-generation capabilities',
    popup: {
      title: 'R&D for AI Platform',
      content: 'Investment in developing advanced AI models and expanding our privacy-first Edge AI capabilities.',
      keyPoints: [
        'Advanced AI model development',
        'Privacy-enhancing technologies',
        'Creating premium subscription features',
        'Deepening our competitive moat'
      ]
    }
  },
  {
    key: 'popup3',
    percent: 20,
    color: '#292929',
    icon: <FaIndustry className="allocation-icon text-[32px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2]" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />, 
    title: 'Scale Manufacturing',
    desc: 'Supply chain optimization',
    popup: {
      title: 'Scale Manufacturing',
      content: 'Expanding our owned factory in China and optimizing our supply chain processes.',
      keyPoints: [
        'Increasing production capacity',
        'Optimizing supply chain efficiency',
        'Maintaining industry-leading margins',
        'Meeting growing demand'
      ]
    }
  },
  {
    key: 'popup4',
    percent: 10,
    color: '#a3d5b3',
    icon: <FaUsersCog className="allocation-icon text-[32px] text-[#54bb74] bg-gradient-to-br from-[#54bb74] to-[#93cfa2]" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />, 
    title: 'Key Executive Hires',
    desc: 'Leadership team expansion',
    popup: {
      title: 'Key Executive Hires',
      content: 'Recruiting experienced executives in critical areas to strengthen our leadership team.',
      keyPoints: [
        'Enterprise sales leadership',
        'AI research expertise',
        'Operations and scaling experience',
        'Accelerating path to market leadership'
      ]
    }
  }
];

const pieData = allocationData.map(({ title, percent, color }) => ({ name: title, value: percent, color }));

const Slide13_PixelPerfect = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (popupKey) => {
    setActivePopup(popupKey);
    trackPopupInteraction(slideNumber, popupKey, 'open');
  };
  const closePopup = () => {
    trackPopupInteraction(slideNumber, activePopup, 'close');
    setActivePopup(null);
  };

  return (
    <div className="relative w-full h-full bg-[#292929] overflow-hidden font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/ffc8f54ee2b1.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#292929]/90 to-[#292929]/80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-[60px] py-[60px]">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-[52px] mb-[40px] text-[#f3ebe2] relative headline drop-shadow-[1px_1px_3px_rgba(0,0,0,0.2)]">
          Use of Funds: Strategic Allocation
          <div className="absolute -bottom-[15px] left-0 w-[100px] h-[5px] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-[3px]" />
        </h1>

        {/* Intro */}
        <div className="funds-intro flex items-center mb-[30px] bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-[20px] rounded-[12px] border-l-[5px] border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <FaChartPie className="funds-intro-icon text-[36px] text-[#54bb74] mr-[20px]" />
          <div className="funds-intro-text text-[20px] text-[#f3ebe2] leading-snug font-medium">
            Every dollar is strategically allocated to <strong className="text-[#54bb74] font-bold">accelerate growth</strong> and <strong className="text-[#54bb74] font-bold">strengthen our market position</strong>.
          </div>
        </div>

        {/* Chart & Allocation Cards */}
        <div className="content-container flex flex-row flex-grow gap-[40px] items-center">
          {/* Pie Chart */}
          <div className="chart-container flex-1 h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={130}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={true}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-[Amenti] font-bold text-[40px] text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>$5M</span>
              <span className="text-[#93cfa2] text-[16px] font-medium">Total Funds</span>
            </div>
          </div>

          {/* Allocation Details */}
          <div className="allocation-details flex-1 flex flex-col gap-[20px]">
            {allocationData.map((item) => (
              <div
                key={item.key}
                className="allocation-item relative bg-[#292929]/70 backdrop-blur-[10px] rounded-[16px] p-[20px] flex items-center cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#54bb74] overflow-hidden"
                onClick={() => openPopup(item.key)}
              >
                <div className="info-badge absolute top-[15px] right-[15px] w-[24px] h-[24px] bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-[12px] transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <FaInfoCircle />
                </div>
                {item.icon}
                <div className="allocation-content flex-grow ml-[20px]">
                  <div className="allocation-percentage font-[Amenti] font-bold text-[28px] text-[#54bb74] mb-[5px] bg-gradient-to-br from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>{item.percent}%</div>
                  <div className="allocation-title font-[Amenti] font-bold text-[20px] mb-[5px] text-[#f3ebe2]">{item.title}</div>
                  <div className="allocation-desc text-[16px] text-[#93cfa2] leading-[1.4]">{item.desc}</div>
                </div>
                {/* Left gradient bar */}
                <div className="absolute top-0 left-0 w-[5px] h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
              </div>
            ))}
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
            className="popup bg-[#292929]/95 backdrop-blur-[15px] rounded-[16px] p-[30px] w-[500px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={e => e.stopPropagation()}
          >
            <FaTimes
              className="popup-close absolute top-[15px] right-[15px] text-[20px] text-[#93cfa2] cursor-pointer hover:text-[#f3ebe2] transition-colors duration-300"
              onClick={closePopup}
            />
            <div className="popup-title font-[Amenti] font-bold text-[24px] text-[#54bb74] mb-[15px] text-center">
              {allocationData.find(i => i.key === activePopup)?.popup.title}
            </div>
            <div className="popup-content text-[16px] leading-[1.6] text-[#f3ebe2] text-center mb-4">
              {allocationData.find(i => i.key === activePopup)?.popup.content}
            </div>
            <div className="key-points mt-[15px] text-left">
              {allocationData.find(i => i.key === activePopup)?.popup.keyPoints.map((point, idx) => (
                <div key={idx} className="key-point flex items-start mb-[10px]">
                  <FaCheckCircle className="text-[#54bb74] mr-[10px] mt-[3px] text-[14px]" />
                  <span className="text-[#f3ebe2] text-[16px]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for popup animation */}
      <style jsx>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Slide13_PixelPerfect;
