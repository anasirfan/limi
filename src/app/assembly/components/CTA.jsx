'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import anime from 'animejs';
import { FaArrowRight, FaPlay, FaDownload, FaPhone, FaEnvelope, FaTwitter, FaLinkedin, FaGithub, FaTimes } from 'react-icons/fa';
import { HiSparkles, HiLightBulb, HiCube } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleStartJourneySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Thank you! We\'ll be in touch soon.');
    setShowStartModal(false);
    setFormData({ name: '', email: '', company: '' });
  };

  const handleBrochureSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }
    toast.success('Brochure sent to your email!');
    setShowBrochureModal(false);
    setFormData({ name: '', email: '', company: '' });
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
            onClick={() => setShowStartModal(true)}
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
              onClick={() => setShowDemoModal(true)}
              className="px-8 py-4 bg-[#292929] text-white rounded-full font-semibold border-2 border-[#292929] hover:bg-transparent hover:text-[#292929] transition-all duration-300 flex items-center space-x-3"
            >
              <FaPlay className="text-lg" />
              <span>Watch Demo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBrochureModal(true)}
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
            { title: "Assembly Demo", desc: "Watch the modular assembly process", icon: HiCube, color: "from-[#54bb74] to-[#93cfa2]" },
            { title: "Smart Features", desc: "Experience AI-powered automation", icon: HiLightBulb, color: "from-[#93cfa2] to-[#54bb74]" },
            { title: "Customization", desc: "Explore endless possibilities", icon: HiSparkles, color: "from-[#54bb74] to-[#292929]" }
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
              
              {/* Animation Placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-[#f3ebe2]/50 to-[#93cfa2]/20 rounded-2xl border border-[#54bb74]/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-sm text-[#292929]/60 font-medium">{feature.title} Animation</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                  className="absolute top-3 right-3 w-3 h-3 bg-[#54bb74] rounded-full"
                />
                <motion.div
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute bottom-3 left-3 w-2 h-2 bg-[#93cfa2] rounded-full"
                />
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
                    <FaPhone className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-gray-300">
                    <FaEnvelope className="mr-3 text-[#54bb74] text-lg" />
                    <span className="text-lg">hello@limi.lighting</span>
                  </div>
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">LIMI</div>
                <div className="text-[#54bb74] font-semibold text-lg">Modular Lighting System</div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
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
              onClick={() => setShowStartModal(false)}
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

            <form onSubmit={handleStartJourneySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="Your company name"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#292929] mb-2">Product Demo</h3>
              <p className="text-gray-600">Watch how LIMI transforms your space</p>
            </div>

            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23292929'/%3E%3Ctext x='400' y='225' text-anchor='middle' fill='%2354bb74' font-size='24' font-family='Arial'%3ELIMI Demo Video%3C/text%3E%3C/svg%3E"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Fallback content */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <FaPlay className="text-6xl mb-4 text-[#54bb74]" />
                  <p className="text-xl">Demo video will be available soon</p>
                  <p className="text-gray-400 mt-2">Experience LIMI's modular lighting system</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#292929] mb-2">Get Brochure</h3>
              <p className="text-gray-600">Download our detailed product brochure</p>
            </div>

            <form onSubmit={handleBrochureSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#54bb74] focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaDownload />
                <span>Send Brochure</span>
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
