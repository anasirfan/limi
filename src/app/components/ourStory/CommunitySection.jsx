'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Community options
const communityOptions = [
  { 
    name: 'LIMI Club', 
    description: 'Join our community for exclusive updates and early access',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    name: 'The Luminaries', 
    description: 'Be part of our enlightened group of early adopters',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  { 
    name: 'LIMI Collective', 
    description: 'Connect with like-minded design & tech enthusiasts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

export default function CommunitySection() {
  const communityRef = useRef(null);
  const [selectedCommunity, setSelectedCommunity] = useState('LIMI Club');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { colors, theme } = useTheme();
  
  const handleCommunitySelect = (name) => {
    setSelectedCommunity(name);
  };
  
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <motion.section 
      data-section="community"
      ref={communityRef}
      className="max-w-3xl mx-auto rounded-xl p-8 md:p-12 text-center relative overflow-hidden"
      style={{ 
        backgroundColor: '#1e2022', // Darker Charleston Green for background
        boxShadow: `0 10px 30px -5px ${colors.primary}30, 0 0 0 1px ${colors.primary}20`
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute -inset-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.primary}20` }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ 
            backgroundColor: `${colors.primary}20`,
            color: colors.primary
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </motion.div>
        
        {/* Community name selector */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {communityOptions.map((option) => (
            <motion.button
              key={option.name}
              onClick={() => handleCommunitySelect(option.name)}
              className="px-4 py-2 rounded-full text-sm transition-all flex items-center"
              style={{ 
                backgroundColor: selectedCommunity === option.name 
                  ? colors.primary 
                  : theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                color: selectedCommunity === option.name 
                  ? '#FFFFFF' 
                  : theme === 'light' ? '#555555' : '#BBBBBB'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: selectedCommunity === option.name 
                  ? colors.primary 
                  : `${colors.primary}30`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{option.icon}</span>
              {option.name}
            </motion.button>
          ))}
        </div>
        
        <motion.div
          key={selectedCommunity}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Join the {selectedCommunity}
          </h3>
          
          <p 
            className="text-xl mb-8"
            style={{ color: `${colors.text}99` }}
          >
            {communityOptions.find(o => o.name === selectedCommunity)?.description || 'Get early access, design tips, and join the lighting revolution.'}
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {submitSuccess ? (
            <motion.div 
              className="p-4 rounded-lg mb-6 inline-block"
              style={{ 
                backgroundColor: `${colors.primary}20`,
                color: colors.primary
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Thank you for joining! Welcome to the {selectedCommunity}.</span>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleEmailSubmit} 
              className="max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none transition-all duration-300"
                    style={{ 
                      backgroundColor: theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                      borderColor: isHovered ? colors.primary : theme === 'light' ? '#E0E0E0' : '#444444',
                      color: colors.text
                    }}
                    required
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                  />
                  <div 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: isHovered ? colors.primary : '#999999' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: '#FFFFFF'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 5px 15px -5px ${colors.primary}80`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : 'Join Now'}
                </motion.button>
              </div>
              
              <p 
                className="text-xs mt-3"
                style={{ color: `${colors.text}80` }}
              >
                By joining, you'll receive exclusive updates, early access to new features, and design tips.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
        
        <div className="mt-8 flex justify-center gap-6">
          {['twitter', 'instagram', 'linkedin'].map((social) => (
            <motion.a 
              key={social}
              href={`/about`}
              className="transition-colors"
              style={{ color: theme === 'light' ? '#999999' : '#777777' }}
              whileHover={{ 
                scale: 1.2,
                color: colors.primary
              }}
              whileTap={{ scale: 0.9 }}
            >
              {social === 'twitter' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              )}
              {social === 'instagram' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )}
              {social === 'linkedin' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
