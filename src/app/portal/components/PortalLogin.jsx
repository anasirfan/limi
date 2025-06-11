'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaMobileAlt, FaArrowRight, FaGoogle, FaApple } from 'react-icons/fa';
import { loginUser, clearAuthStatus } from '../../redux/slices/userSlice';
import SignupForm from './SignupForm';

export default function PortalLogin({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const dispatch = useDispatch();
  const { loginStatus, error, isLoggedIn, user } = useSelector((state) => state?.user || {});
  
  // Clear auth status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthStatus());
    };
  }, [dispatch]);
  
  // Update parent component when login is successful
  useEffect(() => {
    if (isLoggedIn && user) {
      onLogin(user);  
      // Don't switch to signup after successful login
      setShowSignup(false);
    }
  }, [isLoggedIn, user, onLogin]);
  
  // Handle email login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  
  const switchToSignup = () => {
    setShowSignup(true);
    dispatch(clearAuthStatus());
  };
  
  const switchToLogin = () => {
    setShowSignup(false);
    dispatch(clearAuthStatus());
  };
  
  // Handle OTP login
  const [otpStatus, setOtpStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'verifying' | 'failed'
  const [otpError, setOtpError] = useState('');
  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (phone && phone.length >= 10) {
      setOtpStatus('sending');
      setOtpError('');
      
      try {
        // Call the OTP send API
        const response = await fetch('/client/user/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send OTP');
        }
        
        setOtpSent(true);
        setOtpStatus('sent');
      } catch (error) {
        setOtpStatus('failed');
        setOtpError(error.message || 'Failed to send OTP');
      }
    } else {
      setOtpError('Please enter a valid phone number');
    }
  };
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp && otp.length === 6) {
      setOtpStatus('verifying');
      setOtpError('');
      
      try {
        // Call the OTP verification API
        const response = await fetch('/client/user/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone, otp }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Invalid OTP');
        }
        
        const data = await response.json();
        
        // Save token if provided
        if (data.token) {
          localStorage.setItem('limiToken', data.token);
        }
        
        // Get user profile
        const profileResponse = await fetch('/client/user/profile', {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const userData = await profileResponse.json();
        
        // Save to localStorage
        localStorage.setItem('limiUser', JSON.stringify(userData));
        
        // Login successful
        onLogin(userData);
      } catch (error) {
        setOtpStatus('failed');
        setOtpError(error.message || 'Failed to verify OTP');
      }
    } else {
      setOtpError('Please enter a valid 6-digit OTP');
    }
  };
  
  // Demo user login for quick testing
  const loginAsDemoUser = async () => {
    try {
      // Call the demo login API
      const response = await fetch('/client/user/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Demo login failed');
      }
      
      const data = await response.json();
      
      // Save token if provided
      if (data.token) {
        localStorage.setItem('limiToken', data.token);
      }
      
      // Get user profile
      const profileResponse = await fetch('/client/user/profile', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      if (!profileResponse.ok) {
        throw new Error('Failed to fetch demo user profile');
      }
      
      const userData = await profileResponse.json();
      
      // Save to localStorage
      localStorage.setItem('limiUser', JSON.stringify(userData));
      
      // Login successful
      onLogin(userData);
    } catch (error) {
      // Fallback to local demo user if API fails
      const demoUser = {
        id: 'demo123',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1234567890',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
      };
      
      onLogin(demoUser);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Login/Signup form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-charleston-green-dark p-8 rounded-lg"
        >
          <h1 className="text-2xl md:text-3xl font-bold font-[Amenti] text-emerald mb-6">
            Customer Portal
          </h1>
          
          <AnimatePresence mode="wait">
            {showSignup ? (
              <SignupForm key="signup" onSwitchToLogin={switchToLogin} />
            ) : (
              <motion.div 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="flex border-b border-charleston-green-light mb-6">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`px-4 py-2 font-medium flex items-center gap-2 ${loginMethod === 'email' ? 'text-emerald border-b-2 border-emerald' : 'text-gray-400 hover:text-gray-300'}`}
                  >
                    <FaEnvelope />
                    Email Login
                  </button>
                  {/* <button
                    onClick={() => setLoginMethod('otp')}
                    className={`px-4 py-2 font-medium flex items-center gap-2 ${loginMethod === 'otp' ? 'text-emerald border-b-2 border-emerald' : 'text-gray-400 hover:text-gray-300'}`}
                  >
                    <FaMobileAlt />
                    OTP Login
                  </button> */}
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
                      className="bg-charleston-green text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                      placeholder="your@email.com"
                      required
                      disabled={loginStatus === 'loading'}
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
                      className="bg-charleston-green text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                      placeholder="••••••••"
                      required
                      disabled={loginStatus === 'loading'}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loginStatus === 'loading'}
                  className="w-full bg-emerald text-charleston-green-dark py-3 rounded-md hover:bg-emerald-light transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginStatus === 'loading' ? (
                    <div className="animate-spin h-5 w-5 border-2 border-charleston-green-dark border-t-transparent rounded-full"></div>
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
                          className="bg-charleston-green text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          placeholder="+1 (234) 567-8900"
                          required
                          disabled={otpStatus === 'sending'}
                        />
                      </div>
                    </div>
                    
                    {otpError && !otpSent && (
                      <div className="mb-4 text-red-400 text-sm">
                        {otpError}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={otpStatus === 'sending'}
                      className="w-full bg-emerald text-charleston-green-dark py-3 rounded-md hover:bg-emerald-light transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      {otpStatus === 'sending' ? (
                        <div className="animate-spin h-5 w-5 border-2 border-charleston-green-dark border-t-transparent rounded-full"></div>
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
                          onClick={() => {
                            setOtpSent(false);
                            setOtpStatus('idle');
                            setOtpError('');
                          }}
                          className="text-emerald ml-2 hover:underline"
                          disabled={otpStatus === 'verifying'}
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
                        className="bg-charleston-green text-white w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-center tracking-widest font-mono text-xl"
                        placeholder="123456"
                        maxLength={6}
                        required
                        disabled={otpStatus === 'verifying'}
                      />
                    </div>
                    
                    {otpError && otpSent && (
                      <div className="mb-4 text-red-400 text-sm">
                        {otpError}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={otpStatus === 'verifying'}
                      className="w-full bg-emerald text-charleston-green-dark py-3 rounded-md hover:bg-emerald-light transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      {otpStatus === 'verifying' ? (
                        <div className="animate-spin h-5 w-5 border-2 border-charleston-green-dark border-t-transparent rounded-full"></div>
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
                <div className="border-t border-charleston-green-light w-full"></div>
                <span className="bg-charleston-green-dark text-gray-400 px-3 text-sm relative z-10">
                  or continue with
                </span>
                <div className="border-t border-charleston-green-light w-full"></div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-charleston-green text-white py-2 rounded-md hover:bg-charleston-green-light transition-colors"
                >
                  <FaGoogle />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-charleston-green text-white py-2 rounded-md hover:bg-charleston-green-light transition-colors"
                >
                  <FaApple />
                  <span>Apple</span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="flex flex-col gap-2">
                {/* <button
                  type="button"
                  onClick={loginAsDemoUser}
                  className="text-emerald hover:underline"
                >
                  Login as Demo User
                </button> */}
                
                <button
                  type="button"
                  onClick={switchToSignup}
                  className="text-emerald hover:underline"
                >
                  Create a new account
                </button>
              </div>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Right side - Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h2 className="text-xl md:text-2xl font-bold text-emerald mb-4">
            Access Your LIMI Experience
          </h2>
          <p className="text-gray-300 mb-6">
            Sign in to view your saved configurations, order history, and manage your LIMI lighting experience across all devices.
          </p>
          
          <div className="bg-charleston-green-dark p-6 rounded-lg mb-6 border border-charleston-green-light/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald/20 p-3 rounded-full">
                <FaMobileAlt className="text-emerald text-xl" />
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
              <div className="absolute inset-0 bg-gradient-to-t from-charleston-green-dark to-transparent opacity-60"></div>
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
                className="flex items-center gap-1 text-emerald hover:underline"
              >
                <FaApple />
                <span>App Store</span>
              </Link>
              <Link 
                href="https://play.google.com/store/apps/details?id=com.limi.lighting"
                target="_blank"
                className="flex items-center gap-1 text-emerald hover:underline"
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
