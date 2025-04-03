'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChartLine, FaHandshake, FaLightbulb, FaTrophy, FaEnvelope, FaWhatsapp, FaWpforms } from 'react-icons/fa';
import Image from 'next/image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Brand colors from the existing components
const brandColors = {
  charlestonGreen: '#292929',
  etonBlue: '#93CFA2',
  emerald: '#54BB74',
  white: '#FFFFFF',
  black: '#000000',
};

/**
 * DistributorHub component that displays distributor-specific features and benefits
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.userType - The type of user (customer, distributor, or null)
 * @returns {JSX.Element|null} The DistributorHub component or null if not visible
 */
const DistributorHub = ({ userType }) => {
  // Return null if user is not a distributor or if userType is not set yet
  // if (userType !== null && userType !== 'distributor') {
  //   return null;
  // }

  const sectionRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate benefits
    const benefits = benefitsRef.current.querySelectorAll('.benefit-item');
    
    gsap.fromTo(
      benefits,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const benefits = [
    {
      icon: <FaChartLine className="text-4xl text-[#93CFA2] mb-4" />,
      title: 'High Profit Margins',
      description: 'Enjoy competitive profit margins on our premium lighting solutions',
    },
    {
      icon: <FaTrophy className="text-4xl text-[#93CFA2] mb-4" />,
      title: 'Exclusive Products',
      description: 'Access to innovative products not available through other channels',
    },
    {
      icon: <FaLightbulb className="text-4xl text-[#93CFA2] mb-4" />,
      title: 'Innovation First',
      description: 'Be the first to offer cutting-edge lighting technology to your market',
    },
    {
      icon: <FaHandshake className="text-4xl text-[#93CFA2] mb-4" />,
      title: 'Marketing Support',
      description: 'Comprehensive marketing materials and technical training',
    },
  ];

  return (
    <section 
      id="distributor-hub" 
      ref={sectionRef}
      className="py-32   bg-[#292929] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-[Amenti]">
            Become a <span className="text-[#54BB74]"><Image src="/images/svgLogos/__Wordmark_Green.svg" className='inline w-48 px-4 pb-2 max-sm:w-40' alt="Lumi Logo" width={100} height={100} /></span> Distributor
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join our global network of distributors and bring innovative lighting solutions to your market
          </p>
        </div>

        {/* Benefits Section */}
        <div ref={benefitsRef} className="mb-20">
          <h3 className="text-2xl font-semibold mb-10 text-center">Why Partner With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-item bg-[#333333] p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
              >
                {benefit.icon}
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef} 
          className="bg-[#1e1e1e] p-8 md:p-12 rounded-xl max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Start Your Journey?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with our distributor relations team to learn more about partnership opportunities and how we can grow together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="mailto:distributors@limi.com" 
              className="flex items-center justify-center gap-2 bg-[#292929] hover:bg-[#54BB74] text-[#54BB74] hover:text-white border border-[#54BB74] py-3 px-6 rounded-md transition-colors duration-300"
            >
              <FaEnvelope /> Email Us
            </a>
            <a 
              href="https://wa.me/12345678900" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#292929] hover:bg-[#54BB74] text-[#54BB74] hover:text-white border border-[#54BB74] py-3 px-6 rounded-md transition-colors duration-300"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a 
              href="https://forms.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#292929] hover:bg-[#54BB74] text-[#54BB74] hover:text-white border border-[#54BB74] py-3 px-6 rounded-md transition-colors duration-300"
            >
              <FaWpforms /> Inquiry Form
            </a>
          </div>
        </div>

        {/* Testimonial or Additional Info */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl italic text-gray-300 max-w-3xl mx-auto">
            "Partnering with LIMI has transformed our lighting business. Their innovative products and support have helped us grow our market share significantly."
          </blockquote>
          <p className="mt-4 text-[#54BB74]">— Michael Chen, Lumina Distributors</p>
        </div>
      </div>
    </section>
  );
};

export default DistributorHub;
