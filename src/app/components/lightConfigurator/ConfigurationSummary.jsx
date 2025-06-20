"use client";

import { useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { FaSave, FaShoppingCart, FaUser, FaCheck, FaTimes, FaSignInAlt, FaUserPlus, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../redux/slices/cartSlice";
// import { saveConfiguration, loginUser, registerUser } from "../../../redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ConfigurationSummary = ({ 
  totalPrice, 
  lightType, 
  lightAmount, 
  cableColor, 
  cableLength, 
  pendants = [], 
  isDarkMode = false 
}) => {
  // Redux setup
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  // State for save configuration modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [configName, setConfigName] = useState('');
  const [authView, setAuthView] = useState('signup'); // Default to signup view
  
  // Auth form state
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoize the configuration summary
  const configSummary = useMemo(() => ({
    lightType,
    lightAmount,
    cableColor,
    cableLength,
    pendants: pendants.map(p => p.design).join(', '),
    price: totalPrice
  }), [lightType, lightAmount, cableColor, cableLength, pendants, totalPrice]);

  // Function to handle adding the current configuration to cart
  const handleAddToCart = useCallback(() => {
    try {
      // Create a product object from the current configuration
      const product = {
        id: `light_${Date.now()}`,
        name: `${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light (${lightAmount > 1 ? `${lightAmount} pendants` : pendants[0]?.design || 'bumble'})`,
        price: parseFloat(totalPrice || 0),
        thumbnail: `/images/products/${lightType}-${pendants[0]?.design || 'bumble'}.jpg`,
        slug: `${lightType}-light-${pendants[0]?.design || 'bumble'}`,
        category: 'Lighting',
        configuration: {
          lightType,
          lightAmount,
          pendants: pendants.map(p => ({ design: p.design, color: p.color })),
          cableColor,
          cableLength,
        }
      };
      
      // Dispatch action to add to cart
      dispatch(addToCart({ product, quantity: 1 }));
      
      // Show success notification
      toast.success('Added to cart successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        theme: isDarkMode ? "dark" : "light"
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart. Please try again.', {
        position: "bottom-right",
        autoClose: 3000,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  }, [lightType, lightAmount, pendants, cableColor, cableLength, totalPrice, isDarkMode, dispatch]);
  
  // Function to handle saving the current configuration
  const handleSaveConfig = useCallback(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setShowSaveModal(true);
    setConfigName(`${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light Configuration`);
  }, [isLoggedIn, lightType]);
  
  // Function to save configuration to Redux
  const saveConfigToRedux = useCallback(() => {
    try {
      if (!configName.trim()) {
        toast.error('Please enter a name for your configuration', {
          position: "bottom-right",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light"
        });
        return;
      }
      
      // Create configuration object
      const configData = {
        name: configName,
        lightType,
        lightAmount,
        pendants: pendants.map(p => ({ design: p.design, color: p.color })),
        cableColor,
        cableLength,
        price: parseFloat(totalPrice || 0),
        thumbnail: `/images/products/${lightType}-${pendants[0]?.design || 'bumble'}.jpg`,
        date: new Date().toISOString(),
      };
      
      // Dispatch action to save configuration
      dispatch(saveConfiguration(configData));
      
      // Close modal and show success notification
      setShowSaveModal(false);
      
      toast.success('Configuration saved successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        theme: isDarkMode ? "dark" : "light"
      });
    } catch (err) {
      console.error('Error saving configuration:', err);
      toast.error('Failed to save configuration. Please try again.', {
        position: "bottom-right",
        autoClose: 3000,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  }, [configName, lightType, lightAmount, pendants, cableColor, cableLength, totalPrice, isDarkMode, dispatch]);
  
  // Handle auth form change
  const handleAuthFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Handle auth form submission
  const handleAuthSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (authView === 'signup') {
        // Validate form
        if (!authForm.name.trim()) {
          throw new Error('Name is required');
        }
        
        if (!authForm.email.trim()) {
          throw new Error('Email is required');
        }
        
        if (!authForm.password) {
          throw new Error('Password is required');
        }
        
        if (authForm.password !== authForm.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (authForm.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        // Register user
        await dispatch(registerUser({
          name: authForm.name.trim(),
          email: authForm.email.trim(),
          password: authForm.password
        }));
        
        toast.success('Account created successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light"
        });
      } else {
        // Login user
        if (!authForm.email.trim() || !authForm.password) {
          throw new Error('Email and password are required');
        }
        
        await dispatch(loginUser({
          email: authForm.email.trim(),
          password: authForm.password
        }));
        
        toast.success('Logged in successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light"
        });
      }
      
      // Close auth modal and open save modal
      setShowAuthModal(false);
      setShowSaveModal(true);
      setConfigName(`${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light Configuration`);
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [authView, authForm, lightType, isDarkMode, dispatch]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Toggle auth view between login and signup
  const toggleAuthView = useCallback((view) => {
    setAuthView(view);
    setError('');
  }, []);

  return (
    <motion.div 
      className={`w-full mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* Price Information */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-bold mb-3 font-['Amenti']">Your Selection</h3>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Price</p>
            <p className="text-3xl font-bold">€{totalPrice}</p>
          </div>
          <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Estimated delivery: 2-3 weeks</p>
            <p>Free shipping on orders over €500</p>
          </div>
        </div>
        
        {/* Configuration Summary */}
        <div className="md:w-2/3">
          <div className={`p-4 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            <h4 className="font-bold mb-2">Configuration Summary</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center gap-1">
                <span className="font-medium">Type:</span> 
                <span className="capitalize">{lightType}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Amount:</span> 
                <span>{lightAmount} pendant{lightAmount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Cable:</span> 
                <span className="capitalize">{cableColor}, {cableLength}</span>
              </div>
              {lightAmount === 1 && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Design:</span> 
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ 
                        backgroundImage: `url(/images/configOptions/${pendants[0]?.design === 'bumble' ? '1' : pendants[0]?.design === 'radial' ? '2' : pendants[0]?.design === 'fina' ? '3' : pendants[0]?.design === 'ico' ? '4' : '5'}.png)`,
                        backgroundSize: "cover"
                      }}
                    ></div>
                    <span className="capitalize">{pendants[0]?.design || 'bumble'}</span>
                  </div>
                </div>
              )}
            </div>
            
            {lightAmount > 1 && (
              <div className="mt-2">
                <p className="font-medium mb-1">Pendant Designs:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {pendants.map((pendant, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ 
                          backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : pendant.design === 'piko' ? '5' : '1'}.png)`,
                          backgroundSize: "cover"
                        }}
                      ></div>
                      <span>Pendant {index + 1}: {pendant.design}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-3">
        <motion.button 
          onClick={handleSaveConfig}
          className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSave /> Save Configuration
        </motion.button>
        <motion.button 
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
      
      {/* Save Configuration Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#2B2D2F] rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-white mb-4">Save Your Configuration</h3>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Configuration Name</label>
                <input 
                  type="text" 
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  placeholder="My Perfect Lighting Setup"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                />
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                  <div>Type: <span className="text-white capitalize">{lightType}</span></div>
                  <div>Amount: <span className="text-white">{lightAmount}</span></div>
                  <div>Design: <span className="text-white capitalize">{pendants[0]?.design || 'bumble'}</span></div>
                  <div>Cable: <span className="text-white capitalize">{cableColor}, {cableLength}</span></div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setShowSaveModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={saveConfigToRedux}
                  className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCheck /> Save
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#2B2D2F] rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{authView === 'signup' ? 'Create an Account' : 'Log In'}</h3>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-4 text-gray-300">
                <FaUser className="text-3xl mx-auto mb-2 text-[#50C878]" />
                <p className="text-center text-sm">{authView === 'signup' ? 'Create an account to save your configurations' : 'Log in to access your saved configurations'}</p>
              </div>
              
              {/* Auth toggle buttons */}
              <div className="flex mb-6 border-b border-gray-700">
                <button 
                  className={`flex-1 py-2 font-medium ${authView === 'signup' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400'}`}
                  onClick={() => {
                    setAuthView('signup');
                    setError('');
                  }}
                >
                  <FaUserPlus className="inline mr-2" /> Sign Up
                </button>
                <button 
                  className={`flex-1 py-2 font-medium ${authView === 'login' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400'}`}
                  onClick={() => {
                    setAuthView('login');
                    setError('');
                  }}
                >
                  <FaSignInAlt className="inline mr-2" /> Log In
                </button>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              {/* Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Name field - only for signup */}
                {authView === 'signup' && (
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={authForm.name}
                        onChange={handleAuthFormChange}
                        placeholder="Enter your name"
                        className="w-full bg-gray-700 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                        required={authView === 'signup'}
                      />
                    </div>
                  </div>
                )}
                
                {/* Email field */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={authForm.email}
                      onChange={handleAuthFormChange}
                      placeholder="Enter your email"
                      className="w-full bg-gray-700 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                      required
                    />
                  </div>
                </div>
                
                {/* Password field */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={authForm.password}
                      onChange={handleAuthFormChange}
                      placeholder={authView === 'signup' ? "Create a password" : "Enter your password"}
                      className="w-full bg-gray-700 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password field - only for signup */}
                {authView === 'signup' && (
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={authForm.confirmPassword}
                        onChange={handleAuthFormChange}
                        placeholder="Confirm your password"
                        className="w-full bg-gray-700 text-white pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                        required={authView === 'signup'}
                      />
                    </div>
                  </div>
                )}
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#50C878] hover:bg-[#3da861] text-white py-2 rounded-lg transition-colors flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {authView === 'signup' ? 'Creating Account...' : 'Logging In...'}
                    </>
                  ) : (
                    <>
                      {authView === 'signup' ? <FaUserPlus className="mr-2" /> : <FaSignInAlt className="mr-2" />}
                      {authView === 'signup' ? 'Sign Up' : 'Log In'}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

ConfigurationSummary.propTypes = {
  totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lightType: PropTypes.string.isRequired,
  lightAmount: PropTypes.number.isRequired,
  cableColor: PropTypes.string.isRequired,
  cableLength: PropTypes.string.isRequired,
  pendants: PropTypes.arrayOf(
    PropTypes.shape({
      design: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ),
  isDarkMode: PropTypes.bool
};

ConfigurationSummary.defaultProps = {
  pendants: [],
  isDarkMode: false
};

export default ConfigurationSummary;
