'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import anime from 'animejs';
import { FaArrowRight, FaPlay, FaDownload, FaPhone, FaEnvelope, FaTwitter, FaLinkedin, FaGithub, FaTimes } from 'react-icons/fa';
import { HiSparkles, HiLightBulb, HiCube } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackAssemblyEvent } from '../../utils/umamiTracking';

const CTA = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartJourneySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
        }),
      });

      if (response.ok) {
        toast.success('Thank you! We\'ll be in touch soon.');
        setShowStartModal(false);
        setFormData({ name: '', email: '', company: '' });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      const response = await fetch('https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (response.ok) {
        toast.success('Brochure sent to your email!');
        setShowBrochureModal(false);
        setFormData({ name: '', email: '', company: '' });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send brochure');
      }
    } catch (error) {
      console.error('Error sending brochure:', error);
      toast.error('Failed to send brochure. Please try again.');
    }
  };

  const trackModalInteraction = (modalName, action) => {
    trackAssemblyEvent(`Modal ${action}`, modalName);
  };

  const trackFormSubmission = (formName, success, formData) => {
    trackAssemblyEvent(`Form Submission ${success ? 'Success' : 'Failure'}`, formName, formData);
  };

  if (!mounted) return null;

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-[#f3ebe2] to-white min-h-screen"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-[#54bb74]/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.02,
                repeat: Infinity,
                repeatDelay: 8
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-6xl md:text-8xl font-black text-[#292929] mb-6 leading-tight">
              READY TO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                TRANSFORM?
              </span>
            </h2>
            
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-16 h-16 border-4 border-[#54bb74]/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-8 w-8 h-8 bg-[#93cfa2] rounded-full"
            />
          </div>

          <p className="text-2xl text-[#292929]/80 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Join the lighting revolution. Experience the future of modular, intelligent illumination 
            that adapts to your needs and grows with your space.
          </p>

          {/* Main CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowStartModal(true);
              trackModalInteraction('start_journey', 'open');
            }}
            className="inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 mb-8"
          >
            <HiLightBulb className="text-3xl" />
            <span>Start Your Journey</span>
            <FaArrowRight className="text-xl" />
          </motion.button>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowDemoModal(true);
                trackModalInteraction('demo', 'open');
              }}
              className="px-8 py-4 bg-[#292929] text-white rounded-full font-semibold border-2 border-[#292929] hover:bg-transparent hover:text-[#292929] transition-all duration-300 flex items-center space-x-3"
            >
              <FaPlay className="text-lg" />
              <span>Watch Demo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowBrochureModal(true);
                trackModalInteraction('brochure', 'open');
              }}
              className="px-8 py-4 bg-transparent text-[#292929] rounded-full font-semibold border-2 border-[#292929] hover:bg-[#292929] hover:text-white transition-all duration-300 flex items-center space-x-3"
            >
              <FaDownload className="text-lg" />
              <span>Get Brochure</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { title: "Assembly Demo", desc: "Watch the modular assembly process", icon: HiCube, color: "from-[#54bb74] to-[#93cfa2]", video: "/limiai/transform1.mp4" },
            { title: "Smart Features", desc: "Experience AI-powered automation", icon: HiLightBulb, color: "from-[#93cfa2] to-[#54bb74]", video: "/limiai/transform2.mp4" },
            { title: "Customization", desc: "Explore endless possibilities", icon: HiSparkles, color: "from-[#54bb74] to-[#292929]", video: "/limiai/transform3.mp4" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 bg-white rounded-3xl shadow-xl border border-[#54bb74]/20 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-4 text-center">{feature.title}</h3>
              <p className="text-[#292929]/70 text-center mb-6 leading-relaxed">{feature.desc}</p>
              
              {/* Video Integration */}
              <div className="w-full h-32 bg-gradient-to-br from-[#f3ebe2]/50 to-[#93cfa2]/20 rounded-2xl border border-[#54bb74]/10 flex items-center justify-center relative overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src={feature.video}
                />
                {/* Video overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl flex items-end justify-center pb-2">
                  <span className="text-xs font-medium text-white/90 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                    {feature.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { number: '10K+', label: 'Installations', icon: HiCube },
            { number: '99.9%', label: 'Uptime', icon: HiLightBulb },
            { number: '24/7', label: 'Support', icon: HiSparkles }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center p-8 bg-white rounded-3xl shadow-xl border border-[#54bb74]/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-6">
                <stat.icon className="text-3xl text-white" />
              </div>
              <div className="text-4xl font-black text-[#292929] mb-3">{stat.number}</div>
              <div className="text-[#292929]/70 font-semibold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          <div className="p-10 rounded-3xl bg-[#292929] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Contact Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                <div className="space-y-3">
                 
                  <div className="flex items-center justify-center md:justify-start text-gray-300">
                    <FaEnvelope className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">hello@limilighting.com</span>
                  </div>
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="text-center">
                <img 
                  src="/images/svgLogos/__Logo_Icon_Inverted.svg" 
                  alt="LIMI Logo" 
                  className="w-16 h-16 mx-auto mb-2"
                />
                <div className="text-[#54bb74] font-semibold text-lg">Modular Lighting System</div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full mx-auto mt-4 flex items-center justify-center"
                >
                  <HiLightBulb className="text-white text-2xl" />
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  {[
                    { icon: FaTwitter, href: '#', label: 'Twitter' },
                    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                    { icon: FaGithub, href: '#', label: 'GitHub' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                      title={social.label}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Credits */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-4 flex justify-center space-x-2"
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#54bb74] rounded-full"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Start Journey Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowStartModal(false);
                trackModalInteraction('start_journey', 'close');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightBulb className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Tell us about yourself and we'll get you started</p>
            </div>

            <form onSubmit={(e) => {
              handleStartJourneySubmit(e);
              trackFormSubmission('start_journey', true, formData);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Start My Journey
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowDemoModal(false);
                trackModalInteraction('demo', 'close');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              <FaTimes />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-[#292929] mb-4">Interactive Demo</h3>
                <p className="text-gray-600 mb-6">Experience LIMI's capabilities with our interactive demonstration</p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span className="text-gray-700">Real-time sensor data visualization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <span className="text-gray-700">AI-powered lighting adjustments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <span className="text-gray-700">Modular configuration options</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#292929] mb-4">Quick Contact</h4>
                <form onSubmit={(e) => {
                  handleStartJourneySubmit(e);
                  trackFormSubmission('demo', true, formData);
                }} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#292929] text-white rounded-xl font-semibold hover:bg-[#54bb74] transition-all duration-300"
                  >
                    Request Demo Access
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowBrochureModal(false);
                trackModalInteraction('brochure', 'close');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">Download Brochure</h3>
              <p className="text-gray-600">Download our detailed product brochure</p>
            </div>

            <form onSubmit={(e) => {
              handleBrochureSubmit(e);
              trackFormSubmission('brochure', true, formData);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#93cfa2] to-[#54bb74] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Send Brochure
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: 'white',
          color: '#292929',
          borderRadius: '12px',
          border: '1px solid #54bb74'
        }}
      />
    </section>
  );
};

export default CTA;
