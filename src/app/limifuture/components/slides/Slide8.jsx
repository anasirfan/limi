'use client';

import { useState, useEffect, useRef } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide8 = ({ slideNumber }) => {
  const [activePopup, setActivePopup] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
      title: "Lighting & Decoration",
      content: "The largest segment in our TAM, representing both residential and commercial lighting markets.",
      keyPoints: [
        "Consumers already upgrade lighting for aesthetic reasons",
        "Existing market behaviors support our approach",
        "High margins and frequent replacement cycles"
      ]
    },
    popup2: {
      title: "Home Security",
      content: "Includes security cameras, access control, and monitoring systems that can be integrated into our lighting infrastructure.",
      keyPoints: [
        "Growing demand for integrated security solutions",
        "Our ceiling vantage point ideal for surveillance",
        "Recurring revenue from monitoring services"
      ]
    },
    popup3: {
      title: "Smart Speakers & Voice",
      content: "Voice assistants and smart speakers that can be replaced or enhanced by our ambient AI system.",
      keyPoints: [
        "Distributed microphones offer better coverage",
        "Privacy advantages with local processing",
        "Superior contextual awareness"
      ]
    },
    popup4: {
      title: "Climate Control",
      content: "HVAC systems and smart thermostats that can be integrated with our platform for comprehensive environmental control.",
      keyPoints: [
        "Energy efficiency optimization",
        "Occupancy-based climate adjustments",
        "Integration with other systems for holistic control"
      ]
    },
    popup5: {
      title: "Safety & Monitoring",
      content: "Includes smoke detectors, health monitoring systems, and emergency response systems.",
      keyPoints: [
        "Non-contact health monitoring capabilities",
        "Early detection of potential issues",
        "Integration with emergency services"
      ]
    }
  };

  // Initialize Chart.js when component mounts
  useEffect(() => {
    const initChart = async () => {
      // Dynamically import Chart.js to avoid SSR issues
      const { Chart, ArcElement, Tooltip, Legend } = await import('chart.js');
      Chart.register(ArcElement, Tooltip, Legend);

      if (chartRef.current && !chartInstance.current) {
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Lighting & Decoration', 'Home Security', 'Smart Speakers & Voice', 'Climate Control', 'Safety & Monitoring'],
            datasets: [{
              data: [188, 100, 80, 30, 25],
              backgroundColor: [
                '#54bb74',
                '#93cfa2',
                '#292929',
                '#a3d5b3',
                '#6a9d78'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: $${context.raw}B`;
                  }
                }
              }
            },
            cutout: '60%'
          }
        });
      }
    };

    initChart();

    // Cleanup chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/86824bc9973b.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/90 to-[#f3ebe2]/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          Market Opportunity: The $400B+ Intelligent Spaces Market
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Content Container */}
        <div className="flex gap-8 flex-grow">
          {/* Chart Container */}
          <div className="flex-1 h-72 relative">
            <canvas ref={chartRef}></canvas>
          </div>
          
          {/* Market Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="font-[Amenti] font-bold text-5xl text-[#54bb74] mb-4 leading-none bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
              $400B+
            </div>
            <div className="text-lg text-[#292929] mb-6 leading-relaxed">
              Total Addressable Market for intelligent spaces that Limi is positioned to capture through our consolidation strategy.
            </div>
            
            {/* Market Segments */}
            <div className="mb-6">
              <div 
                className="flex items-center mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1"
                onClick={() => openPopup('popup1')}
              >
                <div className="w-3 h-3 rounded bg-[#54bb74] mr-2" />
                <div className="text-sm text-[#292929] flex-grow">Lighting & Decoration</div>
                <div className="font-[Amenti] font-bold text-base text-[#292929] ml-2">$188B</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <i className="fas fa-info" />
                </div>
              </div>
              
              <div 
                className="flex items-center mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1"
                onClick={() => openPopup('popup2')}
              >
                <div className="w-3 h-3 rounded bg-[#93cfa2] mr-2" />
                <div className="text-sm text-[#292929] flex-grow">Home Security</div>
                <div className="font-[Amenti] font-bold text-base text-[#292929] ml-2">$100B+</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <i className="fas fa-info" />
                </div>
              </div>
              
              <div 
                className="flex items-center mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1"
                onClick={() => openPopup('popup3')}
              >
                <div className="w-3 h-3 rounded bg-[#292929] mr-2" />
                <div className="text-sm text-[#292929] flex-grow">Smart Speakers & Voice</div>
                <div className="font-[Amenti] font-bold text-base text-[#292929] ml-2">$80B+</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <i className="fas fa-info" />
                </div>
              </div>
              
              <div 
                className="flex items-center mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1"
                onClick={() => openPopup('popup4')}
              >
                <div className="w-3 h-3 rounded bg-[#a3d5b3] mr-2" />
                <div className="text-sm text-[#292929] flex-grow">Climate Control</div>
                <div className="font-[Amenti] font-bold text-base text-[#292929] ml-2">$30B+</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <i className="fas fa-info" />
                </div>
              </div>
              
              <div 
                className="flex items-center mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer relative hover:bg-[#54bb74]/10 hover:transform hover:translate-x-1"
                onClick={() => openPopup('popup5')}
              >
                <div className="w-3 h-3 rounded bg-[#6a9d78] mr-2" />
                <div className="text-sm text-[#292929] flex-grow">Safety & Monitoring</div>
                <div className="font-[Amenti] font-bold text-base text-[#292929] ml-2">$25B</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 hover:bg-[#54bb74] hover:text-white">
                  <i className="fas fa-info" />
                </div>
              </div>
            </div>
            
            {/* Consolidation Note */}
            <div className="bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 border-l-4 border-[#54bb74] p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
              <div className="font-[Amenti] font-bold text-lg text-[#54bb74] mb-2 flex items-center">
                <i className="fas fa-object-group mr-2" />
                Consolidation Strategy
              </div>
              <div className="text-sm text-[#292929] leading-relaxed">
                Just as Apple consolidated multiple devices into one smartphone, Limi is unifying these fragmented markets into a single intelligent platform.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {activePopup && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
          onClick={() => closePopup(activePopup)}
        >
          <div 
            className="bg-white/95 backdrop-blur-md rounded-2xl p-8 w-[450px] border border-[#54bb74]/50 shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-[popupFadeIn_0.3s_ease] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <i 
              className="fas fa-times absolute top-4 right-4 text-xl text-[#93cfa2] cursor-pointer hover:text-[#292929] transition-colors duration-300"
              onClick={() => closePopup(activePopup)}
            />
            <div className="font-[Amenti] font-bold text-2xl text-[#54bb74] mb-4 text-center">
              {popupData[activePopup]?.title}
            </div>
            <div className="text-base leading-relaxed text-[#292929] text-center mb-4">
              {popupData[activePopup]?.content}
            </div>
            
            {popupData[activePopup]?.keyPoints && (
              <div className="mt-4 text-left">
                {popupData[activePopup].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-2.5">
                    <i className="fas fa-check-circle text-[#54bb74] mr-2.5 mt-0.5" />
                    <span className="text-[#292929]">{point}</span>
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

export default Slide8;
