"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import OnboardingWizard from './onboarding/OnboardingWizard';
import PlayCanvasViewer from './PlayCanvasViewer';

export default function OnboardingSection() {
  const router = useRouter();
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({});
  
  // Handle iframe messages and send configuration updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMessage = (event) => {
      try {
        // Check if the message is from our PlayCanvas iframe
        if (event.data === 'app:ready1') {
          console.log('PlayCanvas app is ready');
          setIframeLoaded(true);
          
          // Send initial configurations once app is ready
          sendConfigToPlayCanvas();
        }
      } catch (error) {
        console.error('Error handling iframe message:', error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // Function to send configuration to PlayCanvas
  const sendConfigToPlayCanvas = () => {
    try {
      if (!iframeRef.current || !iframeRef.current.contentWindow) return;
      
      // Map category selections to light types
      if (selections.category) {
        const lightTypeMap = {
          'pendant': 'ceiling',
          'wall': 'wall',
          'floor': 'floor'
        };
        const lightType = lightTypeMap[selections.category] || 'ceiling';
        iframeRef.current.contentWindow.postMessage(`light_type:${lightType}`, "*");
      }
      
      // Set light amount to 1 for the onboarding preview
      iframeRef.current.contentWindow.postMessage("light_amount:1", "*");
      
      // Map style selections to pendant designs
      if (selections.style) {
        const styleMap = {
          'modern': 'product_1',
          'classic': 'product_2',
          'minimal': 'product_3',
          'organic': 'product_4',
          'industrial': 'product_5'
        };
        const pendantDesign = styleMap[selections.style] || 'product_2';
        iframeRef.current.contentWindow.postMessage(`pendant_design:${pendantDesign}`, "*");
      }
    } catch (error) {
      console.error("Error sending configuration to PlayCanvas:", error);
    }
  };
  
  // Send configuration updates when selections change
  useEffect(() => {
    if (iframeLoaded && Object.keys(selections).length > 0) {
      sendConfigToPlayCanvas();
    }
  }, [selections, iframeLoaded]);
  
  // Handle step changes
  const handleStepChange = (step, stepSelections) => {
    setCurrentStep(step);
    setSelections(stepSelections);
  };
  
  // Handle completion
  const handleComplete = (finalSelections) => {
    // Save final selections to localStorage
    localStorage.setItem('configuratorSelections', JSON.stringify(finalSelections));
    
    // Navigate to the configurator page
    router.push('/configurator');
  };

  return (
    <section className="bg-[#2B2D2F] text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F2F0E6]">Design Your</span>{' '}
            <span className="text-[#50C878]">Perfect Light</span>
          </motion.h2>
          
          <motion.p 
            className="text-[#87CEAB] text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hidden md:inline">Follow our simple steps to create a lighting solution that perfectly matches your space and style.</span>
            <span className="inline md:hidden">Create your perfect lighting in minutes.</span>
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 items-center">
          {/* First Column (first on mobile): 3D Configurator Iframe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#1e2022] w-full order-1"
          >
            <div className="aspect-square md:aspect-auto md:h-[500px]">
            {/* Loading overlay */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1e2022] z-10">
                <div className="text-center">
                  <div className="w-12 h-12 border-3 border-[#50C878] border-t-transparent rounded-full animate-spin mb-3 mx-auto"></div>
                  <p className="text-base text-[#F2F0E6]">Loading 3D preview...</p>
                </div>
              </div>
            )}
            
            {/* 3D Viewer Iframe */}
            <iframe
              ref={iframeRef}
              src="https://playcanv.as/e/p/cW2W3Amn/"
              className="w-full h-full border-0"
              title="LIMI 3D Configurator"
              allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => {
                // Set initial quality
                if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage("highdis", "*");
                }
                // Fallback for loading state
                setTimeout(() => setIframeLoaded(true), 2000);
              }}
            ></iframe>
            
            {/* Interaction hint */}
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center z-10 animate-pulse">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15L19 19M19 19V15M19 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9L5 5M5 5V9M5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Drag to rotate</span>
            </div>
            </div>
          </motion.div>
          
          {/* Second Column (second on mobile): Onboarding Wizard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2"
          >
            <OnboardingWizard 
              onComplete={handleComplete}
              onStepChange={handleStepChange}
            />
          </motion.div>
        </div>
        
        {/* Description Text - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="max-w-3xl mx-auto bg-[#3a3d42]/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2 text-[#87CEAB]">Why Use Our Configurator?</h3>
            <p className="text-[#F2F0E6] text-sm">
              The LIMI 3D configurator allows you to visualize and customize your lighting solution in real-time, 
              making it easy to experiment with different styles until you find the perfect lighting for your space.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
