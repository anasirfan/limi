// Pixel-perfect React version of Slide 15: Thank You & Contact
'use client';

import { MdLightbulb, MdEmail, MdPhone, MdLanguage } from 'react-icons/md';

const Slide15_PixelPerfect = () => {
  return (
    <div className="slide relative w-[1280px] min-h-[720px] bg-[#292929] overflow-hidden flex flex-col font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background pattern */}
      <div className="background-pattern absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #54bb74 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.1
      }} />

      <div className="slide-content flex-grow flex flex-col justify-center items-center px-[70px] py-[60px] relative z-2">
        {/* Logo */}
        <div className="logo-container mb-[50px]">
          <MdLightbulb className="logo-icon" style={{ fontSize: 80, color: '#54bb74' }} />
        </div>

        {/* Thank You */}
        <h1 className="thank-you font-[Amenti] font-bold text-[64px] mb-[40px] text-[#f3ebe2] text-center" style={{ fontFamily: 'Amenti, sans-serif' }}>
          Thank You
        </h1>

        {/* Contact Info */}
        <div className="contact-info flex flex-col items-center mb-[40px]">
          <div className="contact-name font-[Amenti] font-bold text-[28px] text-[#f3ebe2] mb-[15px]" style={{ fontFamily: 'Amenti, sans-serif' }}>
            Umer Asif
          </div>
          <div className="contact-title text-[20px] text-[#93cfa2] mb-[30px]">Founder & CEO</div>
          <div className="contact-details flex gap-[30px] mb-[40px]">
            <div className="contact-item flex items-center text-[18px] text-[#f3ebe2]">
              <MdEmail className="contact-icon" style={{ fontSize: 24, color: '#54bb74', marginRight: 10 }} />
              Invest@limi.ai
            </div>
            <div className="contact-item flex items-center text-[18px] text-[#f3ebe2]">
              <MdPhone className="contact-icon" style={{ fontSize: 24, color: '#54bb74', marginRight: 10 }} />
              +44 7447934035
            </div>
            <div className="contact-item flex items-center text-[18px] text-[#f3ebe2]">
              <MdLanguage className="contact-icon" style={{ fontSize: 24, color: '#54bb74', marginRight: 10 }} />
              www.limiai.co
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="closing-statement font-[Amenti] font-bold text-[24px] text-[#54bb74] text-center max-w-[700px] leading-[1.4] mt-[20px]" style={{ fontFamily: 'Amenti, sans-serif' }}>
          Join us in building the OS for physical spaces
        </div>
      </div>
    </div>
  );
};

export default Slide15_PixelPerfect;
