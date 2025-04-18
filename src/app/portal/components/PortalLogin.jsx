'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaMobileAlt, FaArrowRight, FaGoogle, FaApple } from 'react-icons/fa';

export default function PortalLogin({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle email login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock validation - in a real app this would be server-side
      if (email && password) {
        // Mock successful login
        onLogin({
          id: '12345',
          name: email.split('@')[0],
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=54BB74&color=fff`
        });
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000);
  };
  
  // Handle OTP login
  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      if (phone && phone.length >= 10) {
        setOtpSent(true);
        // Mock OTP sent
        console.log('OTP sent to', phone);
      } else {
        setError('Please enter a valid phone number');
      }
      setLoading(false);
    }, 1000);
  };
  
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      if (otp && otp.length === 6) {
        // Mock successful verification
        onLogin({
          id: '67890',
          name: 'Mobile User',
          phone: phone,
          avatar: `https://ui-avatars.com/api/?name=Mobile+User&background=54BB74&color=fff`
        });
      } else {
        setError('Please enter a valid 6-digit OTP');
      }
      setLoading(false);
    }, 1000);
  };
  
  // Demo user login for quick testing
  const loginAsDemoUser = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin({
        id: 'demo123',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1234567890',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
      });
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Login form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e1e1e] p-8 rounded-lg"
        >
          <h1 className="text-2xl md:text-3xl font-bold font-[Amenti] text-white mb-6">
            Customer Portal
          </h1>
          
          <div className="mb-6">
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`px-4 py-2 font-medium flex items-center gap-2 ${loginMethod === 'email' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <FaEnvelope />
                Email Login
              </button>
              <button
                onClick={() => setLoginMethod('otp')}
                className={`px-4 py-2 font-medium flex items-center gap-2 ${loginMethod === 'otp' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <FaMobileAlt />
                OTP Login
              </button>
            </div>
            
            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLogin}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaLock className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#54BB74] text-white py-3 rounded-md hover:bg-[#48a064] transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOTP}>
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaMobileAlt className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                          placeholder="+1 (234) 567-8900"
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#54BB74] text-white py-3 rounded-md hover:bg-[#48a064] transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <>
                          <span>Send OTP</span>
                          <FaArrowRight />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP}>
                    <div className="mb-2">
                      <p className="text-gray-300 text-sm">
                        OTP sent to {phone}. 
                        <button 
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[#54BB74] ml-2 hover:underline"
                        >
                          Change
                        </button>
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2">Enter OTP</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                        className="bg-[#292929] text-white w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74] text-center tracking-widest font-mono text-xl"
                        placeholder="123456"
                        maxLength={6}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#54BB74] text-white py-3 rounded-md hover:bg-[#48a064] transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <>
                          <span>Verify OTP</span>
                          <FaArrowRight />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
            
            {error && (
              <div className="mt-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-700 w-full"></div>
                <span className="bg-[#1e1e1e] text-gray-400 px-3 text-sm relative z-10">
                  or continue with
                </span>
                <div className="border-t border-gray-700 w-full"></div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#292929] text-white py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  <FaGoogle />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#292929] text-white py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  <FaApple />
                  <span>Apple</span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={loginAsDemoUser}
                className="text-[#54BB74] hover:underline"
              >
                Login as Demo User
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Right side - Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            Access Your LIMI Experience
          </h2>
          <p className="text-gray-300 mb-6">
            Sign in to view your saved configurations, order history, and manage your LIMI lighting experience across all devices.
          </p>
          
          <div className="bg-[#1e1e1e] p-6 rounded-lg mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#54BB74]/20 p-3 rounded-full">
                <FaMobileAlt className="text-[#54BB74] text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Cross-Platform Access</h3>
                <p className="text-sm text-gray-400">View configurations created in the LIMI mobile app</p>
              </div>
            </div>
            
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop"
                alt="LIMI App Configuration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  Your configurations sync automatically between the app and web portal
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>Don't have the LIMI app yet?</p>
            <div className="mt-2 flex gap-4 justify-center md:justify-start">
              <Link 
                href="https://apps.apple.com/app/limi-lighting"
                target="_blank"
                className="flex items-center gap-1 text-[#54BB74] hover:underline"
              >
                <FaApple />
                <span>App Store</span>
              </Link>
              <Link 
                href="https://play.google.com/store/apps/details?id=com.limi.lighting"
                target="_blank"
                className="flex items-center gap-1 text-[#54BB74] hover:underline"
              >
                <FaGoogle />
                <span>Google Play</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
