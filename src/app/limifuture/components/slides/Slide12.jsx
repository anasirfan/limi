'use client';

import { useState } from 'react';
import { trackPopupInteraction } from '../../../utils/umamiTracking';

const Slide12 = ({ slideNumber }) => {
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
      title: "Privacy by Design",
      content: "Built-in privacy protection with local processing and user control over data sharing.",
      keyPoints: [
        "Local AI processing reduces data transmission",
        "User controls what data is shared and with whom",
        "Transparent data usage policies",
        "Compliance with global privacy regulations"
      ]
    },
    popup2: {
      title: "Security Architecture",
      content: "Multi-layered security approach protecting both devices and user data from threats.",
      keyPoints: [
        "End-to-end encryption for all communications",
        "Secure boot and hardware attestation",
        "Regular security updates and patches",
        "Intrusion detection and response systems"
      ]
    },
    popup3: {
      title: "Data Ownership",
      content: "Users maintain full ownership and control over their personal data and preferences.",
      keyPoints: [
        "Users own their data, not the platform",
        "Easy data export and portability",
        "Granular privacy controls",
        "No unauthorized data monetization"
      ]
    },
    popup4: {
      title: "Compliance Standards",
      content: "Adherence to international privacy and security standards and regulations.",
      keyPoints: [
        "GDPR compliance for European markets",
        "CCPA compliance for California",
        "SOC 2 Type II certification",
        "ISO 27001 security standards"
      ]
    }
  };

  return (
    <div className="relative w-full h-full bg-[#f3ebe2] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/security-privacy-bg.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2]/95 to-[#f3ebe2]/85" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        {/* Headline */}
        <h1 className="font-[Amenti] font-bold text-4xl mb-6 text-[#292929] relative drop-shadow-[1px_1px_3px_rgba(0,0,0,0.1)]">
          Privacy & Security: Trust by Design
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-full" />
        </h1>
        
        {/* Trust Statement */}
        <div className="flex items-center mb-6 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-4 rounded-xl border-l-4 border-[#54bb74] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <i className="fas fa-shield-alt text-3xl text-[#54bb74] mr-4" />
          <div className="text-lg text-[#292929] leading-relaxed font-medium">
            Like <strong className="text-[#54bb74] font-bold">Apple's</strong> privacy commitment and <strong className="text-[#54bb74] font-bold">Signal's</strong> security standards, we prioritize user trust above all else.
          </div>
        </div>
        
        {/* Security Pillars */}
        <div className="grid grid-cols-2 gap-6 flex-grow">
          {/* Privacy by Design */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup1')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-user-shield text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Privacy by Design
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Built-in privacy protection with local processing and user control over data sharing.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Local Processing
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  User Control
                </span>
              </div>
            </div>
          </div>
          
          {/* Security Architecture */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup2')}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-6">
              <i className="fas fa-lock text-6xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-2xl text-[#292929] mb-4">
                Security Architecture
              </div>
              <div className="text-base text-[#292929] leading-relaxed mb-4">
                Multi-layered security approach protecting both devices and user data from threats.
              </div>
              <div className="flex justify-center items-center gap-4">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-3 py-1 rounded-full text-sm font-medium">
                  End-to-End Encryption
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-3 py-1 rounded-full text-sm font-medium">
                  Secure Boot
                </span>
              </div>
            </div>
          </div>
          
          {/* Data Ownership */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup3')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-key text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Data Ownership
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Users maintain full ownership and control over their personal data and preferences.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  User Owned
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  Portable
                </span>
              </div>
            </div>
          </div>
          
          {/* Compliance Standards */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 border border-[#54bb74]/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:border-[#54bb74] relative overflow-hidden group"
            onClick={() => openPopup('popup4')}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#54bb74] to-[#93cfa2]" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#54bb74]/20 rounded-full flex items-center justify-center text-[#54bb74] text-xs transition-all duration-300 group-hover:bg-[#54bb74] group-hover:text-white">
              <i className="fas fa-info" />
            </div>
            
            <div className="flex justify-center mb-4">
              <i className="fas fa-certificate text-4xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent" />
            </div>
            
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-xl text-[#292929] mb-3">
                Compliance Standards
              </div>
              <div className="text-sm text-[#292929] leading-relaxed mb-3">
                Adherence to international privacy and security standards and regulations.
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  GDPR
                </span>
                <span className="bg-[#54bb74]/20 text-[#54bb74] px-2 py-1 rounded-full text-xs font-medium">
                  SOC 2
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Metrics */}
        <div className="mt-8 bg-gradient-to-r from-[#54bb74]/20 to-[#54bb74]/10 p-6 rounded-xl border border-[#54bb74]/30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <div className="font-[Amenti] font-bold text-xl text-[#54bb74] mb-4 text-center flex items-center justify-center">
            <i className="fas fa-award mr-3" />
            Trust & Security Metrics
          </div>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-[#292929] font-medium">Uptime SLA</div>
            </div>
            <div className="w-px h-12 bg-[#54bb74]/30" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
                256-bit
              </div>
              <div className="text-sm text-[#292929] font-medium">Encryption</div>
            </div>
            <div className="w-px h-12 bg-[#54bb74]/30" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
                Zero
              </div>
              <div className="text-sm text-[#292929] font-medium">Data Breaches</div>
            </div>
            <div className="w-px h-12 bg-[#54bb74]/30" />
            <div className="text-center">
              <div className="font-[Amenti] font-bold text-3xl text-[#54bb74] bg-gradient-to-r from-[#54bb74] to-[#93cfa2] bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-[#292929] font-medium">User Control</div>
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

export default Slide12;
