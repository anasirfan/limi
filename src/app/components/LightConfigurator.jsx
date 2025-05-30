"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaChevronLeft, FaChevronRight, FaSave, FaShoppingCart, FaInfoCircle, FaQuestionCircle, FaSun, FaMoon, FaPlus, FaMinus, FaChevronDown, FaLightbulb, FaLayerGroup, FaRegLightbulb, FaPallet, FaCheck, FaUser } from "react-icons/fa";
import PlayCanvasViewer from "./PlayCanvasViewer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { saveConfiguration } from "../redux/slices/userSlice";
import { useRouter } from "next/navigation";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Main Component
const LightConfigurator = () => {
  // Redux setup
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(state => state?.user?.isLoggedIn);

  // State for configuration options
  const isDarkMode = true;
  const [lightType, setLightType] = useState('ceiling');
  const [lightAmount, setLightAmount] = useState(lightType === 'ceiling' ? 1 : lightType === 'floor' ? 3 : 1);
  const [lightDesign, setLightDesign] = useState('radial');
  const [cableColor, setCableColor] = useState('black');
  const [cableLength, setCableLength] = useState('1.5m');
  const [pendants, setPendants] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [productSlug, setProductSlug] = useState(null);
  const [productOptions, setProductOptions] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [configName, setConfigName] = useState('');
  const [activeTab, setActiveTab] = useState('type');
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState([]);
  const [baseType, setBaseType] = useState('round');
  const [configurationType, setConfigurationType] = useState('individualize');
  const [selectedSystem, setSelectedSystem] = useState('bar');
  const [isSaving, setIsSaving] = useState(false);

  // Refs
  const previewBoxRef = useRef(null);
  const configuratorRef = useRef(null);

  // --- IFRAME MOBILE FIXES ---
  // We'll keep a ref to the PlayCanvas iframe
  const playcanvasIframeRef = useRef(null);

  // Helper to get the iframe window (works for both desktop and mobile)
  const getIframeWindow = () => {
    if (playcanvasIframeRef.current && playcanvasIframeRef.current.contentWindow) {
      return playcanvasIframeRef.current.contentWindow;
    }
    // fallback for SSR or if not yet mounted
    const iframe = typeof window !== "undefined" && document.getElementById('playcanvas-app');
    return iframe && iframe.contentWindow ? iframe.contentWindow : null;
  };

  // Listen for app:ready1 message from PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'app:ready1') {
        const loader = document.getElementById('playcanvas-loader');
        if (loader) {
          loader.style.transition = 'opacity 0.5s ease-out';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }
        toast.success("3D Preview Ready", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark"
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // --- END IFRAME MOBILE FIXES ---

  // Function to handle adding the current configuration to cart
  function handleAddToCart() {
    const product = {
      id: `light_${Date.now()}`,
      name: `${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light (${lightAmount > 1 ? `${lightAmount} pendants` : lightDesign})`,
      price: parseFloat(totalPrice),
      thumbnail: `/images/products/${lightType}-${lightDesign}.jpg`,
      slug: `${lightType}-light-${lightDesign}`,
      category: 'Lighting',
      configuration: {
        lightType,
        lightAmount,
        lightDesign,
        cableColor,
        cableLength,
        pendants: pendants.map(p => ({ design: p.design, color: p.color })),
      }
    };
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart successfully!', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark"
    });
  }

  // Function to handle saving the current configuration
  function handleSaveConfig() {
    setShowSaveModal(true);
    setConfigName(`${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light Configuration`);
  }

  // Function to save configuration to Redux and PlayCanvas
  function saveConfigToRedux() {
    if (!configName.trim()) {
      toast.error('Please enter a name for your configuration', {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    setIsSaving(true);

    // Use the ref for the iframe for best mobile compatibility
    const iframeWindow = getIframeWindow();

    if (iframeWindow) {
      const handleMessage = (event) => {
        if (event.data && event.data.type === 'configuration_saved') {
          setShowSaveModal(false);
          setIsSaving(false);
          toast.success('Configuration saved successfully!', {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark"
          });
          window.removeEventListener('message', handleMessage);
        }
      };
      window.addEventListener('message', handleMessage);

      try {
        // Use object-based postMessage for better cross-device compatibility
        iframeWindow.postMessage({ type: 'save_config' }, '*');
        iframeWindow.postMessage({ type: 'config_name', name: configName.trim() }, '*');
        setTimeout(() => {
          window.removeEventListener('message', handleMessage);
          if (isSaving) {
            setIsSaving(false);
            toast.error("Timed out waiting for save confirmation from 3D preview", {
              position: "bottom-right",
              autoClose: 3000,
              theme: "dark"
            });
          }
        }, 5000);
      } catch (error) {
        setIsSaving(false);
        toast.error("Failed to save configuration", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark"
        });
      }
    } else {
      setIsSaving(false);
      toast.error("3D preview not available", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark"
      });
    }
  }

  // --- Fix for iframe not showing after initial appearance on mobile ---
  // We force the PlayCanvasViewer to always render the iframe, and ensure the loader is above it until ready.
  // We also ensure the iframe is never unmounted by React, and always visible.

  // This state ensures the loader is only hidden after the app:ready1 event
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'app:ready1') {
        setIframeReady(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section 
      id="light-configurator" 
      ref={configuratorRef}
      className="py-16 bg-charleston-green text-gray-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3 font-['Amenti']">
            LIMI Light Configurator
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-400">
            Design your perfect lighting solution. Customize every aspect and visualize in real-time.
          </p>
        </motion.div>

        <div className="flex flex-col items-center lg:flex-row gap-8">
          {/* Preview Box (Left Side - Sticky) */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div ref={previewBoxRef} className="sticky top-24 " >
              <div 
                className="bg-charleston-green-dark rounded-xl shadow-2xl overflow-hidden aspect-square relative animate-glow"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(80, 200, 120, 0.2)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 via-eton-blue/5 to-transparent pointer-events-none z-[1]"></div>
                {/* --- MOBILE IFRAME FIX: Pass ref to PlayCanvasViewer --- */}
                <PlayCanvasViewer 
                  config={{
                    lightType,
                    lightAmount,
                    lightDesign,
                    cableColor,
                    cableLength,
                    pendants
                  }}
                  isDarkMode={isDarkMode}
                  className="w-full h-full"
                  iframeRef={playcanvasIframeRef}
                  alwaysShowIframe={true} // <--- ensure iframe is always rendered
                />
                {/* Loader ... */}
                {!iframeReady && (
                  <div id="playcanvas-loader" className="absolute inset-0 flex flex-col items-center justify-center bg-charleston-green z-10 overflow-hidden">
                    {/* ... Loader content ... */}
                    <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-emerald-300 font-semibold">Loading 3D Preview...</span>
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none z-10"></div>
              </div>
            </div>
          </motion.div>
          {/* ... Configuration Panel ... */}
          {/* ... (unchanged) ... */}
        </div>
        {/* ... Price and Configuration Summary Section ... */}
        {/* ... Additional Information Section ... */}
        <div id="configurator-end-marker"></div>
      </div>
      <ToastContainer />
      {/* Save Configuration Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#2B2D2F] rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Save Your Configuration</h3>
            {!isLoggedIn ? (
              <div className="text-center py-4">
                <div className="mb-4 text-gray-300">
                  <FaUser className="text-4xl mx-auto mb-3 text-[#50C878]" />
                  <p>You need to be logged in to save configurations.</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={() => router.push('/portal')}
                    className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log In
                  </motion.button>
                  <motion.button
                    onClick={() => setShowSaveModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
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
                    <div>Design: <span className="text-white capitalize">{lightDesign}</span></div>
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
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LightConfigurator;
