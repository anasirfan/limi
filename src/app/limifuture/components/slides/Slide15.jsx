// Pixel-perfect React version of Slide 15: Thank You & Contact
'use client';

import { MdLightbulb, MdEmail, MdPhone, MdLanguage } from 'react-icons/md';

const Slide15 = () => {
  return (
    <div className="slide relative h-[75vh] w-full bg-[#292929] overflow-hidden flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background pattern */}
      <div className="background-pattern absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #54bb74 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.1
      }} />

      <div className="slide-content flex-grow flex flex-col justify-center items-center px-8 py-8 relative z-2 max-sm:px-4 max-sm:py-4">
        {/* Logo */}
        <div className="logo-container mb-6 max-sm:mb-3">
          <MdLightbulb className="logo-icon max-sm:text-3xl" style={{ fontSize: 60, color: '#54bb74' }} />
        </div>

        {/* Thank You */}
        <h1 className="thank-you font-[Amenti] font-bold text-5xl mb-6 text-[#f3ebe2] text-center max-sm:text-2xl max-sm:mb-3" style={{ fontFamily: 'Amenti, sans-serif' }}>
          Thank You
        </h1>

        {/* Contact Info */}
        <div className="contact-info flex flex-col items-center mb-6 max-sm:mb-2">
          <div className="contact-name font-[Amenti] font-bold text-2xl text-[#f3ebe2] mb-2 max-sm:text-base max-sm:mb-1" style={{ fontFamily: 'Amenti, sans-serif' }}>
            Umer Asif
          </div>
          <div className="contact-title text-lg text-[#93cfa2] mb-4 max-sm:text-xs max-sm:mb-1">Founder & CEO</div>
          <div className="contact-details flex gap-4 mb-6 max-sm:flex-col max-sm:gap-1 max-sm:mb-2">
            <div className="contact-item flex items-center text-base text-[#f3ebe2] max-sm:text-xs">
              <MdEmail className="contact-icon max-sm:text-sm" style={{ fontSize: 18, color: '#54bb74', marginRight: 8 }} />
              Invest@limi.ai
            </div>
            <div className="contact-item flex items-center text-base text-[#f3ebe2] max-sm:text-xs">
              <MdPhone className="contact-icon max-sm:text-sm" style={{ fontSize: 18, color: '#54bb74', marginRight: 8 }} />
              +44 7447934035
            </div>
            <div className="contact-item flex items-center text-base text-[#f3ebe2] max-sm:text-xs">
              <MdLanguage className="contact-icon max-sm:text-sm" style={{ fontSize: 18, color: '#54bb74', marginRight: 8 }} />
              www.limiai.co
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="closing-statement font-[Amenti] font-bold text-xl text-[#54bb74] text-center max-w-[600px] leading-tight mt-4 max-sm:text-sm max-sm:mt-1" style={{ fontFamily: 'Amenti, sans-serif' }}>
          Join us in building the OS for physical spaces
        </div>
      </div>
    </div>
  );
};

export default Slide15;
