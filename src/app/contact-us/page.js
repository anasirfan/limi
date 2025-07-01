'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.fromTo(
      heroRef.current.querySelector('h1'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2
      }
    );

    gsap.fromTo(
      heroRef.current.querySelector('p'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.4
      }
    );

    // Animate form section
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate info section
    gsap.fromTo(
      infoRef.current.querySelectorAll('.info-card'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate map section
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('limiToken');
      
      if (!token) {
        throw new Error('Please log in to send a message');
      }
      
      const response = await fetch('https://dev.api1.limitless-lighting.co.uk/client/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setFormSuccess(true);
      
      toast.success('Your message has been sent successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'Failed to send message. Please try again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
      
      // Reset success state after 5 seconds
      if (formSuccess) {
        setTimeout(() => {
          setFormSuccess(false);
        }, 5000);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B2D2F]">
      <Header />
      <ToastContainer />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
            alt="Modern office interior"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B2D2F]/70 to-[#F2F0E6]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Connect With <span className="text-[#50C878]">Limitless</span> Possibilities
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Have questions about our modular lighting ecosystem? Want to explore how the Limitless Lighting System can transform your space? Our team is ready to illuminate the possibilities.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-[#2B2D2F]/70 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                    placeholder="Product Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2B2D2F] mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-[#F2F0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                    formSuccess 
                      ? 'bg-[#3da861] hover:bg-[#3da861]' 
                      : 'bg-[#50C878] hover:bg-[#3da861]'
                  }`}
                  whileHover={{ scale: formSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: formSuccess ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : formSuccess ? (
                    <span className="flex items-center justify-center">
                      <FaCheck className="mr-2" />
                      Message Sent!
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div ref={infoRef} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-[#2B2D2F]/70 mb-8">
                You can also reach out to us directly using the information below.
              </p>
              
              <div className="info-card flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-[#50C878] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                  <p className="text-[#2B2D2F]/70">
                    123 Innovation Drive<br />
                    San Francisco, CA 94103<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="info-card flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-[#50C878] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
                  <p className="text-[#2B2D2F]/70">
                    +1 (555) 123-4567<br />
                    Monday - Friday, 9AM - 6PM PST
                  </p>
                </div>
              </div>
              
              <div className="info-card flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-[#50C878] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Address</h3>
                  <p className="text-[#2B2D2F]/70">
                    info@limilighting.com<br />
                    support@limilighting.com
                  </p>
                </div>
              </div>
              
              <div className="pt-8 mt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-[#2B2D2F]/70">9:00 AM - 6:00 PM PST</p>
                  </div>
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-[#2B2D2F]/70">10:00 AM - 4:00 PM PST</p>
                  </div>
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-[#2B2D2F]/70">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section ref={mapRef} className="py-16 bg-[#F2F0E6]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/map-placeholder.jpg"
                alt="LIMI Office Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs text-center">
                  <h3 className="font-bold text-[#2B2D2F] mb-2">LIMI Headquarters</h3>
                  <p className="text-sm text-[#2B2D2F]/70">
                    123 Innovation Drive<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-[#2B2D2F]/70 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold mb-2">How does the Limitless Lighting System work?</h3>
              <p className="text-[#2B2D2F]/70">
                The Limitless system is built around a central ceiling hub that houses the LED driver and distributes power to all connected modules. Our specially engineered mounting bracket allows for quick, secure, tool-free attachment and detachment of various lighting components.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold mb-2">Can I update my lighting without rewiring?</h3>
              <p className="text-[#2B2D2F]/70">
                Absolutely! That's the core benefit of the Limitless system. Once the hub is installed, you can swap components, change styles, or completely transform your lighting without any rewiring, tools, or downtime.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold mb-2">What components are available in the Limitless system?</h3>
              <p className="text-[#2B2D2F]/70">
                Our system includes The Hub (central power unit), Ball System (in various sizes and finishes), Bar System (in three lengths), Universal Pendant (for non-illuminated elements), and various Pendant and Chandelier designs—all using our universal connector system.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold mb-2">Can I integrate my own design elements with the Limitless system?</h3>
              <p className="text-[#2B2D2F]/70">
                Yes! Our Universal Pendant is specifically designed to integrate non-illuminated elements—from glass shades to fabric diffusers and custom designer pieces—into your lighting setup while maintaining the system's flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
