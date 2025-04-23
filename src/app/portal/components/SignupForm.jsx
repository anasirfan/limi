'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';
import { signupUser, clearAuthStatus } from '../../redux/slices/userSlice';

export default function SignupForm({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const dispatch = useDispatch();
  const { signupStatus, error, successMessage } = useSelector((state) => state.user);
  
  // Clear auth status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthStatus());
    };
  }, [dispatch]);
  
  // Show success message and switch to login after successful signup
  useEffect(() => {
    if (signupStatus === 'succeeded' && successMessage) {
      const timer = setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [signupStatus, successMessage, onSwitchToLogin]);
  
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    dispatch(signupUser({ name, email, password }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold font-['Amenti'] text-emerald mb-6">
        Create Your Account
      </h2>
      
      {signupStatus === 'succeeded' ? (
        <div className="bg-emerald/10 border border-emerald/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald rounded-full p-1">
              <FaCheck className="text-charleston-green-dark text-sm" />
            </div>
            <p className="text-emerald font-medium">{successMessage}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-charleston-green-dark text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          
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
                className="bg-charleston-green-dark text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-charleston-green-dark text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-charleston-green-dark text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                placeholder="••••••••"
                required
              />
            </div>
            {passwordError && (
              <p className="mt-2 text-red-400 text-sm">{passwordError}</p>
            )}
          </div>
          
          {error && (
            <div className="mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={signupStatus === 'loading'}
            className="w-full bg-emerald text-charleston-green-dark py-3 rounded-md hover:bg-emerald-light transition-colors flex items-center justify-center gap-2 font-medium"
          >
            {signupStatus === 'loading' ? (
              <div className="animate-spin h-5 w-5 border-2 border-charleston-green-dark border-t-transparent rounded-full"></div>
            ) : (
              <>
                <span>Create Account</span>
                <FaArrowRight />
              </>
            )}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-emerald hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      )}
    </motion.div>
  );
}
