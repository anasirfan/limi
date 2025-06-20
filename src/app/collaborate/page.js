'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaHandshake, FaChartLine, FaGlobe, FaTools, FaUserTie, FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnalyticsInsights from '../components/AnalyticsInsights';
import DistributorHub from '../components/DistributorHub';

export default function Collaborate() {
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);
  const partnersRef = useRef(null);
  const ctaRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    region: '',
    experience: '',
    message: '',
    privacyPolicy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const fieldName = name || id; // Use name if available, otherwise fall back to id
    setFormData(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      // Map form field names to match the API expected format
      const requestBody = {
        name: formData.contactName,
        company: formData.companyName,
        contactName: formData.contactName,
        title: formData.position,
        email: formData.email,
        phoneNumber: formData.phone,
        country: formData.region,
        experience: formData.experience,
        message: formData.message,
        privacyPolicy: formData.privacyPolicy,
        website: formData.website
      };
      const token = localStorage.getItem('limiToken');
      if (!token) {
        throw new Error('Please log in to send a message');
      }
      
      const response = await fetch('https://api1.limitless-lighting.co.uk/client/user/distributor/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit form');
      }

      const result = await response.json();
      
      setSubmitStatus({ success: true, message: 'Thank you for your submission! We will get back to you soon.' });
      
      // Show success toast
      toast.success('Your message has been sent successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form
      setFormData({
        companyName: '',
        website: '',
        contactName: '',
        position: '',
        email: '',
        phone: '',
        region: '',
        experience: '',
        message: '',
        privacyPolicy: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'An error occurred while submitting the form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.fromTo(
      heroRef.current.querySelector('h1'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );

    gsap.fromTo(
      heroRef.current.querySelector('p'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
    );

    // Animate benefits section
    gsap.fromTo(
      benefitsRef.current.querySelectorAll('.benefit-card'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.2,
        scrollTrigger: { trigger: benefitsRef.current, start: 'top 80%' }
      }
    );

    // Animate process section
    gsap.fromTo(
      processRef.current.querySelectorAll('.process-step'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.2,
        scrollTrigger: { trigger: processRef.current, start: 'top 80%' }
      }
    );

    // Animate partners section
    gsap.fromTo(
      partnersRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: partnersRef.current, start: 'top 80%' }
      }
    );

    // Animate CTA section
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B2D2F]">
      <ToastContainer />
      <Header />
      <AnalyticsInsights />
      <DistributorHub/>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 relative overflow-hidden"
      >
      
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="Business meeting with handshake"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B2D2F]/70 to-[#F2F0E6]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Distribute the <span className="text-[#50C878]">Limitless</span> Lighting System
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Join our global network of partners and bring the future of modular, adaptable lighting to your market. Offer customers a lighting ecosystem that moves with them—across seasons, trends, and lifestyles.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#50C878] text-white px-8 py-3 rounded-md font-medium hover:bg-[#3da861] transition-colors"
              onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Partner With LIMI?</h2>
            <p className="text-lg text-[#2B2D2F]/70 max-w-2xl mx-auto">
              Discover the advantages of becoming an authorized LIMI distributor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaChartLine className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Revolutionary Product</h3>
              <p className="text-[#2B2D2F]/70">
                The Limitless Lighting System redefines the category with its modular, future-ready platform that allows effortless updates without rewiring, tools, or downtime.
              </p>
            </div>
            
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaTools className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Ecosystem</h3>
              <p className="text-[#2B2D2F]/70">
                Offer customers a full range of components: The Hub, Ball System, Bar System, Universal Pendant, and designer Pendant and Chandelier options—all built with our universal connector system.
              </p>
            </div>
            
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaGlobe className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Territories</h3>
              <p className="text-[#2B2D2F]/70">
                Secure exclusive distribution rights in your region, with protected territories and targeted market development.
              </p>
            </div>
            
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaHandshake className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Competitive Margins</h3>
              <p className="text-[#2B2D2F]/70">
                Enjoy attractive profit margins and incentive programs designed to reward growth and performance.
              </p>
            </div>
            
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaUserTie className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Design-Focused Solution</h3>
              <p className="text-[#2B2D2F]/70">
                Offer a lighting system where design meets intelligent innovation, with sculptural forms, architectural simplicity, and a wide variety of colors, textures, and artistic finishes.
              </p>
            </div>
            
            <div className="benefit-card bg-[#F2F0E6] p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaCheck className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Future-Ready Platform</h3>
              <p className="text-[#2B2D2F]/70">
                The Limitless system is designed for ongoing change—from small style swaps to full lighting transformations—forming the foundation of a smarter, more agile lighting solution.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Apply to Become a Distributor</h2>
              <p className="text-lg text-[#2B2D2F]/70 max-w-2xl mx-auto">
                Fill out the form below to start your journey as a LIMI distribution partner
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus.message && (
                <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Contact Name*
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Position/Title*
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                  Distribution Region/Country*
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                />
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                  Experience in Lighting/Smart Home Industry
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                >
                  <option value="">Select...</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                  Why are you interested in distributing LIMI products?*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy || false}
                  onChange={handleChange}
                  required
                  className="mt-1 mr-2"
                />
                <label htmlFor="privacyPolicy" className="text-sm text-[#2B2D2F]/70">
                  I agree to the processing of my data as per LIMI's <Link href="/privacy-policy" className="text-[#50C878] hover:underline">Privacy Policy</Link>
                </label>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-[#50C878] text-white rounded-md font-medium hover:bg-[#3da861] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
              
              <p className="text-sm text-center text-[#2B2D2F]/70">
                *Required fields
              </p>
            </form>
          </div>
        </div>
      </section>
      
      {/* Partnership Process Section */}
      <section 
        ref={processRef}
        className="py-20 bg-[#2B2D2F] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Partnership Process</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A straightforward journey to becoming a LIMI distributor
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-16 bg-[#50C878]"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Have Questions?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our distributor relations team is ready to assist you with any questions about our partnership program.
          </p>
          <Link 
            href="/contact-us"
            className="bg-white text-[#2B2D2F] px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors inline-block"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
