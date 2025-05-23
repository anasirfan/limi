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
  const [wizardSelections, setWizardSelections] = useState({});
  const [homepageMessageSent, setHomepageMessageSent] = useState(false);
  const [currentType, setCurrentType] = useState('');
  const [lightAmount, setLightAmount] = useState('');
  // Handle iframe messages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMessage = (event) => {
      try {
        // Check if the message is from our PlayCanvas iframe
        if (event.data === 'app:ready1') {
          console.log('PlayCanvas app is ready');
          setIframeLoaded(true);
          
          // Send 'homepage' message when app is ready (only once)
          if (iframeRef.current && iframeRef.current.contentWindow && !homepageMessageSent) {
            iframeRef.current.contentWindow.postMessage('homepage', '*');
            iframeRef.current.contentWindow.postMessage('pendant_design:product_2', "*");
            console.log('Sent homepage message to PlayCanvas');
            setHomepageMessageSent(true);
            
            // Don't send any configurations on initial load
            // We'll wait for user interaction instead
          }
        }
      } catch (error) {
        console.error('Error handling iframe message:', error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [homepageMessageSent]);
  
  // Function to send configuration to PlayCanvas based on step
  const sendConfigToPlayCanvas = (step, selections) => {
    try {
      if (!iframeRef.current || !iframeRef.current.contentWindow || !iframeLoaded) {
        console.log('Cannot send config: iframe not ready');
        return;
      }
      
      console.log(`Sending config for step ${step}:`, selections);
      
      // We're only sending the specific data for each step, no light amount
      
      // Send different data based on the step
      switch(step) {
        case 1: // Category selection (pendant/wall/floor) - ONLY send light type
          if (selections.lightCategory) {
            const lightTypeMap = {
              'ceiling': 'ceiling',
              'wall': 'wall',
              'floor': 'floor'
            };
            const lightType = lightTypeMap[selections.lightCategory] || 'ceiling';
            setCurrentType(lightType);

            iframeRef.current.contentWindow.postMessage(`light_type:${lightType}`, "*");
            if(lightType === 'floor'){
              iframeRef.current.contentWindow.postMessage('light_amount:3', "*");
            }
            
            if(lightType === 'floor'){
              iframeRef.current.contentWindow.postMessage('pendant_0:product_2', "*");
              iframeRef.current.contentWindow.postMessage('pendant_1:product_2', "*");
              iframeRef.current.contentWindow.postMessage('pendant_2:product_2', "*");
            } else {
              iframeRef.current.contentWindow.postMessage('pendant_design:product_2', "*");
            }
            console.log(`Sent light type: ${lightType}`);
          }
          break;
          
        case 2: // Vibe selection - ONLY send vibe
          if (selections.lightStyle) {
            // Direct mapping from vibe ID to message
            const vibeMessage = selections.lightStyle; // coolLux, dreamGlow, shadowHue, zenFlow
            let lightAmount = 1;
            if (currentType === 'ceiling') {
              if (vibeMessage === 'coolLux') {
                lightAmount = '1';
              } else if (vibeMessage === 'dreamGlow') {
                lightAmount = '3';
              } else if (vibeMessage === 'shadowHue') {
                lightAmount = '6';
              } else {
                lightAmount = '24';
              }

              setLightAmount(lightAmount);
              iframeRef.current.contentWindow.postMessage('light_type:ceiling', "*");

              iframeRef.current.contentWindow.postMessage(`light_amount:${lightAmount}`, "*");
              for(let i = 0; i < lightAmount; i++){
                if(lightAmount === '1'){
                  iframeRef.current.contentWindow.postMessage(`pendant_design:product_2`, "*");
                  break;
                }
                iframeRef.current.contentWindow.postMessage(`pendant_${i}:product_2`, "*");
              }
            } else if(currentType === 'floor') {
           
              iframeRef.current.contentWindow.postMessage(`light_amount:3`, "*");
              for(let i = 0; i < 3; i++){
                iframeRef.current.contentWindow.postMessage(`pendant_${i}:product_2`, "*");
              }
            } else if(currentType === 'wall') {
      
              iframeRef.current.contentWindow.postMessage(`light_amount:1`, "*");
            }
            
            
            console.log(`Sent vibe: ${vibeMessage}`);
          }
          break;
          
        case 3: // Aesthetic selection - ONLY send aesthetic
          if (selections.designAesthetic) {
            // Direct mapping from aesthetic ID to message
            const aestheticMessage = selections.designAesthetic; // aesthetic, industrial, scandinavian, modern_style
            let pendantDesign = '';
            if(aestheticMessage === 'modern_style'){
              pendantDesign='product_1';
            } else if(aestheticMessage === 'aesthetic'){
              pendantDesign='product_2';
            } else if(aestheticMessage === 'industrial'){
              pendantDesign='product_3';
            } else if(aestheticMessage === 'scandinavian'){
              pendantDesign='product_5';
            }

            for(let i = 0; i < lightAmount; i++){
              if(currentType === 'wall'){
                iframeRef.current.contentWindow.postMessage(`light_amount:1`, "*");
                iframeRef.current.contentWindow.postMessage(`pendant_design:${pendantDesign}`, "*");
                break;
              } else {
                iframeRef.current.contentWindow.postMessage(`pendant_${i}:${pendantDesign}`, "*");
              }
            }
            // Handle the special case for modern_style
            // const formattedAesthetic = aestheticMessage === 'modern_style' ? 'modern' : aestheticMessage;
            // iframeRef.current.contentWindow.postMessage(`aesthetic:${formattedAesthetic}`, "*");
       
          }
          break;
          
        case 4: // Final step - send all configurations for the "Let's Go" button
          // Send light type
          if (selections.lightCategory) {
            const lightTypeMap = {
              'ceiling': 'ceiling',
              'wall': 'wall',
              'floor': 'floor'
            };
            const lightType = lightTypeMap[selections.lightCategory] || 'ceiling';
            // iframeRef.current.contentWindow.postMessage(`light_type:${lightType}`, "*");
            console.log(`Final: Sent light type: ${lightType}`);
          }
          
          // Send vibe
          if (selections.lightStyle) {
            // iframeRef.current.contentWindow.postMessage(`vibe:${selections.lightStyle}`, "*");
            console.log(`Final: Sent vibe: ${selections.lightStyle}`);
          }
          
          // Send aesthetic
          if (selections.designAesthetic) {
            const formattedAesthetic = selections.designAesthetic === 'modern_style' ? 'modern' : selections.designAesthetic;
            // iframeRef.current.contentWindow.postMessage(`aesthetic:${formattedAesthetic}`, "*");
            console.log(`Final: Sent aesthetic: ${formattedAesthetic}`);
          }
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error("Error sending configuration to PlayCanvas:", error);
    }
  };
  
  // We're removing this useEffect to avoid the infinite update loop
  // Instead, we'll only send configurations on explicit user actions
  
  // Handle step changes - only store selections, don't send to PlayCanvas yet
  const handleStepChange = (step, stepSelections) => {
    console.log(`Step changed to ${step}`, stepSelections);
    setCurrentStep(step);
    setWizardSelections(stepSelections);
    
    // Only send configuration when moving to the next step (not on initial load or selection)
    // This ensures we only send when the user clicks "Next"
    if (iframeLoaded && step > 0) {
      sendConfigToPlayCanvas(step, stepSelections);
    }
  };
  
  // Handle completion
  const handleComplete = (finalSelections) => {
    // Send final configuration before navigating
    if (iframeLoaded) {
      sendConfigToPlayCanvas(4, finalSelections);
    }
    
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
              <div id="playcanvas-loader" className="absolute inset-0 flex flex-col items-center justify-center bg-charleston-green z-10 overflow-hidden">
                {/* Background animated pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute bg-emerald-500 rounded-full"
                        style={{
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.5 + 0.25,
                          animation: `float ${Math.random() * 10 + 10}s infinite linear`,
                          animationDelay: `${Math.random() * 5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="relative w-4/5 max-w-md aspect-square mb-8">
                  {/* Ceiling */}
                  <div className="absolute top-0 w-full h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-t-lg shadow-md">
                    {/* Ceiling mount */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-600 rounded-md"></div>
                  </div>
                  
                  {/* Multiple pendants hanging from ceiling */}
                  <div className="absolute top-0 left-1/4 w-1/5 aspect-square">
                    {/* Pendant cable */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gray-600 origin-top animate-sway-slow"></div>
                    {/* Pendant light */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden animate-sway-slow">
                      <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-20 animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  {/* Main pendant being loaded */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
                    {/* Pendant cable with loading animation */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-gray-600 to-gray-700 origin-top animate-sway-reverse-slow">
                      {/* Cable loading indicator */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="w-full h-2 bg-emerald-500 opacity-40 animate-cable-loading"></div>
                      </div>
                    </div>
                    
                    {/* Main pendant light */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden origin-top animate-sway-reverse-slow">
                      {/* Pendant light effect */}
                      <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-30 animate-pulse-slow"></div>
                      
                      {/* Pendant detail */}
                      <div className="absolute inset-4 rounded-full border border-gray-600"></div>
                      
                      {/* Loading indicator inside pendant */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Another pendant on the right */}
                  <div className="absolute top-0 right-1/4 w-1/5 aspect-square">
                    {/* Pendant cable */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gray-600 origin-top animate-sway-medium"></div>
                    {/* Pendant light */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden animate-sway-medium">
                      <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-20 animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  {/* Glowing circle under main pendant */}
                  <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/4 rounded-full bg-emerald-500 opacity-10 animate-ping-slow blur-md"></div>
                  
                  {/* Skeleton floor with reflection */}
                  <div className="absolute bottom-0 w-full h-1/6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg shadow-md">
                    {/* Floor reflection */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-emerald-500 opacity-20 blur-sm"></div>
                  </div>
                  
                  {/* Skeleton controls with hover effect */}
                  <div className="absolute bottom-[-80px] w-full flex justify-center space-x-6">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-md flex items-center justify-center group cursor-pointer"
                        style={{ animationDelay: `${num * 0.2}s` }}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-emerald-900 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-emerald-800 transition-colors duration-300 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center px-4 relative z-10">
                  {/* Loading text with animated dots */}
                  <div className="h-8 flex items-center justify-center mb-3">
                    <div className="text-emerald-500 text-xl font-bold">Loading 3D Preview</div>
                    <div className="loading-dots ml-2">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm animate-pulse">Preparing your LIMI experience</div>
                  
                  {/* Progress bar */}
                  <div className="mt-6 w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-emerald-500 animate-progress-indeterminate"></div>
                  </div>
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
                  console.log('Set quality to high');
                }
                // We'll wait for the app:ready1 message to set iframeLoaded
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
              lightType={currentType}
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
